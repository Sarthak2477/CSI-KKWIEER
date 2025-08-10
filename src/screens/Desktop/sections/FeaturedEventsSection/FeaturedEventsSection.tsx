import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const FeaturedEventsSection = (): JSX.Element => {
  const images = [
    "/images/kkw.png",
    "/images/kkw.png",
    "/images/kkw.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const eventData = {
    name: "Event Name",
    location: "K.K.Wagh, Nashik - 422009",
    date: "12th August,2024",
    time: "03:00pm",
  };

  return (
    <section className="w-full py-8 relative">
      <Card className="w-full border-0 overflow-hidden">
        <CardContent className="p-0 relative">
          <div className="relative w-full h-[698px] overflow-hidden">
            {/* Slideshow images */}
            {images.map((src, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                } bg-cover bg-center`}
                style={{ backgroundImage: `url(${src})` }}
              />
            ))}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

            {/* Event details */}
            <div className="absolute bottom-20 left-10 space-y-2">
              <h2 className="text-[34px] tracking-[-1.02px] text-white font-bold font-['Maven_Pro',Helvetica]">
                {eventData.name}
              </h2>
              <div className="text-2xl tracking-[-0.72px] leading-[23.4px] text-white font-medium font-['Maven_Pro',Helvetica]">
                {eventData.location}
                <br />
                {eventData.date}&nbsp;&nbsp;{eventData.time}
              </div>
            </div>

            {/* Navigation dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? "bg-white" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
