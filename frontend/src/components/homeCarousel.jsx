// homeCarousel.jsx
// carousel for the home page
// has information and links to what the navbar does but with graphics
// To Do: Make carousel contents correct
//        add ones that display info from the raw data such as announcements
//        maybe ones that are time bound ,such as eid salaah and if you wanna be creative, stuff like ashurah

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import carouselItems from "../assets/courasel.json";

const HomeCarousel = () => {
    return (
        <>
            <Carousel>
                    <CarouselContent>
                    {carouselItems.map((item, index) => (
                    <CarouselItem key={index}>
                        <div className="relative h-70 md:h-100 w-full text-white">
                        <img
                            src={item.image}
                            className="h-full w-full object-cover object-[50%_40%]"
                            alt={`Slide ${index + 1}`}
                        />
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black/50 flex items-start justify-start p-4">
                            <div>
                            <h1 className="text-2xl md:text-4xl font-bold text-left">
                                {item.title}
                            </h1>
                            <p className="text-sm md:text-lg mt-2">
                                {item.description}
                            </p>
                            </div>
                        </div>
                        </div>
                    </CarouselItem>
                    ))}
                    </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext />
            </Carousel>
        </>
    );
}

export default HomeCarousel;