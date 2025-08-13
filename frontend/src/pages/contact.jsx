// Contact.jsx
import * as React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="items-center justify-center flex flex-col px-4 py-10 text-black">
        <div className="w-full max-w-3xl">
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold text-primary">
        Contact Us
      </h1>
      <hr className="border-t-3 border-primary" />

      {/* Contact Info */}
      <div className="space-y-5 py-8">
        <div className="flex items-center gap-4">
          <Clock className="text-primary w-6 h-6" />
          <span className="text-sm md:text-base">
            Open daily for all Salahs Fajr to Isha
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Phone className="text-primary w-6 h-6" />
          <span className="text-sm md:text-base">+44 1234 567890</span>
        </div>

        <div className="flex items-center gap-4">
          <Mail className="text-primary w-6 h-6" />
          <span className="text-sm md:text-base">
            info@barrymasjid.org
          </span>
        </div>

        <div className="flex items-center gap-4">
          <MapPin className="text-primary w-6 h-6" />
          <span className="text-sm md:text-base">
            332 Holton Road Barry, Vale of Glamorgan<br />
            Wales, United Kingdom<br />CF63 4HY
          </span>
        </div>
      </div>

      {/* Map Card */}
      <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg p-3 md:p-5">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2488.6086996905133!2d-3.2530625!3d51.4102442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486e05b917763677%3A0x35601617263a0fef!2s332%20Holton%20Rd%2C%20Barry%20CF63%204HY!5e0!3m2!1sen!2suk!4v1755034580030!5m2!1sen!2suk"
          className="w-full h-64 rounded-lg border border-gray-200"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      </div>
    </div>
  );
};

export default Contact;
