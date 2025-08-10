import requests
import time
from bs4 import BeautifulSoup
from fastapi import HTTPException
from config.redisClient import redisClient
from redis.exceptions import RedisError
import json
import re
import models.models as models


def fetch_mawaqit(masjid_id: str, max_retries: int = 10, retry_delay: float = 0.1):
    WEEK_IN_SECONDS = 604800
    retrieved_data = None

    # Check Redis cache first
    if redisClient is not None:
        try:
            retrieved_data = redisClient.get(masjid_id)
        except RedisError:
            print("Error reading from Redis")
        if retrieved_data:
            return json.loads(retrieved_data)

    # Retry logic for scraping
    attempt = 0
    while attempt < max_retries:
        try:
            r = requests.get(f"https://mawaqit.net/fr/{masjid_id}")
            if r.status_code == 404:
                raise HTTPException(status_code=404, detail=f"{masjid_id} not found")

            if r.status_code != 200:
                raise Exception(f"Unexpected status code: {r.status_code}")

            soup = BeautifulSoup(r.text, 'html.parser')
            script = soup.find('script', string=re.compile(r'var confData = (.*?);', re.DOTALL))
            if not script:
                raise Exception("Script containing confData not found")

            match = re.search(r'var confData = (.*?);', script.string, re.DOTALL)
            if not match:
                raise Exception("confData regex match failed")

            conf_data_json = match.group(1)
            conf_data = json.loads(conf_data_json)

            # Save to Redis cache
            if redisClient is not None:
                try:
                    redisClient.set(masjid_id, json.dumps(conf_data), ex=WEEK_IN_SECONDS)
                except RedisError:
                    print("Error writing to Redis")

            return conf_data  # ✅ Success

        except Exception as e:
            attempt += 1
            print(f"[Retry {attempt}/{max_retries}] Failed to fetch {masjid_id}: {e}")
            if attempt >= max_retries:
                raise HTTPException(status_code=503, detail=f"Failed to fetch data from Mawaqit after {max_retries} attempts")
            time.sleep(retry_delay)

    # Should never reach here
    raise HTTPException(status_code=503, detail="Unknown fetch failure")


def get_prayer_times_of_the_day(masjid_id):
    confData = fetch_mawaqit(masjid_id)

    if not confData or "times" not in confData or "shuruq" not in confData:
        raise HTTPException(status_code=503, detail="Invalid or missing data from Mawaqit")

    times = confData["times"]
    sunset = confData["shuruq"]

    if not isinstance(times, list) or len(times) < 5:
        raise HTTPException(status_code=503, detail="Incomplete prayer times data")

    prayer_time = models.PrayerTimes(
        fajr=times[0],
        sunset=sunset,
        dohr=times[1],
        asr=times[2],
        maghreb=times[3],
        icha=times[4]
    )

    return prayer_time.dict()


def get_calendar(masjid_id):
    confData = fetch_mawaqit(masjid_id)
    if "calendar" not in confData:
        raise HTTPException(status_code=503, detail="Missing calendar data from Mawaqit")
    return confData["calendar"]


def get_month(masjid_id, month_number):
    if not (1 <= month_number <= 12):
        raise HTTPException(status_code=400, detail="Month number must be between 1 and 12")

    confData = fetch_mawaqit(masjid_id)

    if "calendar" not in confData:
        raise HTTPException(status_code=503, detail="Missing calendar data from Mawaqit")

    month = confData["calendar"][month_number - 1]
    try:
        prayer_times_list = [
            models.PrayerTimes(
                fajr=prayer[0],
                sunset=prayer[1],
                dohr=prayer[2],
                asr=prayer[3],
                maghreb=prayer[4],
                icha=prayer[5]
            )
            for prayer in month.values()
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse prayer times: {str(e)}")

    return prayer_times_list
