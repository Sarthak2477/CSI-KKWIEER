import RollingGallery from "@/components/RollingGallery";
import React, { useState, useEffect } from "react";

export const ComputerSocietySection = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText1, setTypedText1] = useState("");
  const [typedText2, setTypedText2] = useState("");
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(false);

  const text1 = "Computer Society Of India,";
  const text2 = "KKWIEER Student's Branch";

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let currentIndex = 0;
    const typeText1 = () => {
      if (currentIndex < text1.length) {
        setTypedText1(text1.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeText1, 80);
      } else {
        setShowCursor1(false);
        setShowCursor2(true);
        setTimeout(() => {
          let currentIndex2 = 0;
          const typeText2 = () => {
            if (currentIndex2 < text2.length) {
              setTypedText2(text2.substring(0, currentIndex2 + 1));
              currentIndex2++;
              setTimeout(typeText2, 60);
            } else {
              setTimeout(() => setShowCursor2(false), 1000);
            }
          };
          typeText2();
        }, 200);
      }
    };
    setTimeout(typeText1, 500);
  }, [isVisible]);

  return (
    <section
      className={`relative flex flex-col w-full h-screen px-4 md:px-8 justify-center items-start font-['Urbanist',Helvetica]
    transform transition-all duration-1000 ease-out
    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{
        backgroundImage: "url('/images/background.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Text Content */}
      <div className="ml-10 relative z-10 max-w-5xl mx-auto sm:mx-0 sm:ml-10">
  <div className="flex flex-col gap-2 text-center sm:text-left mt-4 sm:mt-10">
    <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-black tracking-[-1.28px] leading-tight min-h-[1.2em]">
      {typedText1}
      {showCursor1 && <span className="animate-pulse text-[#304674]">|</span>}
    </h1>

    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#515151] tracking-[-0.82px] min-h-[1.2em]">
      {typedText2}
      {showCursor2 && <span className="animate-pulse text-[#304674]">|</span>}
    </h2>
  </div>
</div>

{/* <div className="mt-12 absolute right-0 top-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="relative w-full h-full">
          <div 
            className={`absolute top-20 right-1/4 transform transition-all duration-1000 delay-500 ease-out pointer-events-auto
              ${isVisible ? "opacity-100 translate-x-0 rotate-0" : "opacity-0 translate-x-8 "}`}
          >
            <img
              src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop&crop=center"
              alt="Technology workspace"
              className="w-40 md:w-48 h-28 md:h-36 object-cover rounded-xl shadow-lg transform  hover:rotate-8 transition-transform duration-300"
            />
          </div>

          <div 
            className={`absolute top-16 right-16 transform transition-all duration-1000 delay-600 ease-out
              ${isVisible ? "opacity-100 translate-x-0 rotate-0" : "opacity-0 translate-x-12 3"}`}
          >
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-gray-100 transform hover:-rotate-4 transition-transform duration-300">
              <p className="text-xs md:text-sm text-gray-700 font-medium">"Code is poetry written in logic"</p>
            </div>
          </div>
          
          <div 
            className={`absolute top-1/2 right-32 transform -translate-y-1/2 transition-all duration-1000 delay-900 ease-out pointer-events-auto
              ${isVisible ? "opacity-100 translate-x-0 rotate-0" : "opacity-0 translate-x-16 "}`}
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop&crop=center"
              alt="Team collaboration"
              className="w-56 md:w-64 h-40 md:h-48 object-cover rounded-xl shadow-lg transform  hover:rotate-0 transition-transform duration-300 z-10"
            />
          </div>

          <div 
            className={`absolute top-40 right-56 transform transition-all duration-1000 delay-1100 ease-out
              ${isVisible ? "opacity-100 translate-x-0 rotate-0" : "opacity-0 translate-x-20 "}`}
          >
            <div className="bg-blue-50/70 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-blue-100 transform  hover:-rotate-6 transition-transform duration-300">
              <p className="text-xs md:text-sm text-blue-800 font-medium">"Innovation through collaboration"</p>
            </div>
          </div>

          <div 
            className={`absolute bottom-32 right-28 transform transition-all duration-1000 delay-1300 ease-out pointer-events-auto
              ${isVisible ? "opacity-100 translate-x-0 rotate-0" : "opacity-0 translate-x-24 "}`}
          >
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop&crop=center"
              alt="Coding session"
              className="w-48 md:w-56 h-32 md:h-40 object-cover rounded-xl shadow-lg transform  hover:rotate-12 transition-transform duration-300"
            />
          </div>

          <div 
            className={`absolute bottom-16 right-12 transform transition-all duration-1000 delay-1500 ease-out
              ${isVisible ? "opacity-100 translate-x-0 rotate-0" : "opacity-0 translate-x-28 "}`}
          >
            <div className="bg-gray-50/70 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-gray-200 transform  hover:-rotate-3 transition-transform duration-300">
              <p className="text-xs md:text-sm text-gray-600 font-medium">"Learn. Build. Share."</p>
            </div>
          </div>

          <div 
            className={`absolute top-56 right-44 transform transition-all duration-1000 delay-1700 ease-out
              ${isVisible ? "opacity-100 translate-x-0 rotate-0" : "opacity-0 translate-x-16 "}`}
          >
            <div className="bg-purple-50/60 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-purple-100 transform hover:rotate-16 transition-transform duration-300">
              <p className="text-xs md:text-sm text-purple-700 font-medium">"Technology shapes tomorrow"</p>
            </div>
          </div>

          <div 
            className={`absolute top-72 right-20 transform transition-all duration-1000 delay-1900 ease-out pointer-events-auto
              ${isVisible ? "opacity-100 translate-x-0 rotate-0" : "opacity-0 translate-x-12 "}`}
          >
            <img
              src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=300&h=200&fit=crop&crop=center"
              alt="Students learning"
              className="w-32 md:w-40 h-20 md:h-28 object-cover rounded-xl shadow-lg transform hover:-rotate-8 transition-transform duration-300"
            />
          </div>
        </div>
      </div> */}
      
      {/* Decorative Elements */}
      <div className="absolute right-4 top-20 w-2 h-2 bg-[#304674] rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute right-12 bottom-32 w-3 h-3 bg-[#515151] rounded-full opacity-40 animate-pulse delay-500"></div>
    </section>
  );
};