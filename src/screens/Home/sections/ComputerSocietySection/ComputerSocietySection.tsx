import React, { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const ComputerSocietySection = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText1, setTypedText1] = useState("");
  const [typedText2, setTypedText2] = useState("");
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(false);

  const text1 = "Computer Society Of India,";
  const text2 = "KKWIEER Student Committee";

  useEffect(() => {
    // Trigger fade in after mount
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
        setTimeout(typeText1, 80); // Typing speed for first line
      } else {
        setShowCursor1(false);
        setShowCursor2(true);
        // Start typing second line after a brief pause
        setTimeout(() => {
          let currentIndex2 = 0;
          const typeText2 = () => {
            if (currentIndex2 < text2.length) {
              setTypedText2(text2.substring(0, currentIndex2 + 1));
              currentIndex2++;
              setTimeout(typeText2, 60); // Slightly faster for second line
            } else {
              // Hide cursor after completion
              setTimeout(() => setShowCursor2(false), 1000);
            }
          };
          typeText2();
        }, 200);
      }
    };

    // Start typing after fade-in completes
    setTimeout(typeText1, 500);
  }, [isVisible]);



  return (
    <section
      className={`flex flex-col w-full h-screen px-4 md:px-8 justify-center items-center text-center font-['Urbanist',Helvetica]
    transform transition-all duration-1000 ease-out
    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-[80px] font-bold text-black tracking-[-1.28px] leading-tight mb-4 min-h-[1.2em]">
          {typedText1}
          {showCursor1 && (
            <span className="animate-pulse text-[#304674]">|</span>
          )}
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-[64px] font-semibold text-[#515151] tracking-[-0.82px] min-h-[1.2em]">
          {typedText2}
          {showCursor2 && (
            <span className="animate-pulse text-[#304674]">|</span>
          )}
        </h2>
      </div>

      <Card className="border-0 w-full max-w-[1053px] mx-auto my-8 md:my-12 font-['Urbanist',Helvetica]">
        <CardContent className="p-8 md:p-12 text-center">
          <p className="text-lg md:text-2xl tracking-[0.92px] leading-[29px] px-4">
            Advancing IT, Empowering Knowledge Sharing, and Cultivating Professional Excellence.
          </p>
        </CardContent>
      </Card>

      
    </section>




  );
};