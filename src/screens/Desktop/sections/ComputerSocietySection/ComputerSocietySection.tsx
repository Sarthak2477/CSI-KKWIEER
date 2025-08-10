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

  const stats = [
    { value: "488", description: "student branches" },
    { value: "73", description: "different locations" },
  ];

  return (
    <section
      className={`flex flex-col w-full py-12 md:py-24 px-4 md:px-8 mt-4 justify-center items-center font-['Urbanist',Helvetica]
        transform transition-all duration-1000 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="text-center max-w-4xl mx-auto">
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

      <Card className="w-full max-w-[1053px] mx-auto my-12 md:my-16 font-['Urbanist',Helvetica] mx-4 md:mx-auto">
        <CardContent className="p-8 md:p-12 text-center">
          <p className="text-lg md:text-2xl tracking-[0.92px] leading-[29px] px-4">
            Having{" "}
            <span className="font-bold text-[#304674]">{stats[0].value}</span>{" "}
            {stats[0].description} and rooted firmly at{" "}
            <span className="font-bold text-[#304674]">{stats[1].value}</span>{" "}
            {stats[1].description}, CSI has plans of opening more chapters &amp;
            activity centers in smaller towns of the country. The idea is to
            spread the knowledge.
          </p>
        </CardContent>
      </Card>

      <Button className="mt-8 rounded-[51.13px] shadow-[1.88px_17.82px_29.08px_#0000004c,inset_-1.41px_-1.88px_3.28px_#ffffff26] [background:radial-gradient(50%_50%_at_86%_88%,rgba(0,0,0,0.23)_0%,rgba(0,0,0,0)_86%),radial-gradient(50%_50%_at_26%_21%,rgba(255,255,255,0.41)_0%,rgba(255,255,255,0)_70%,rgba(255,255,255,0)_100%),linear-gradient(0deg,rgba(0,51,153,1)_0%,rgba(0,51,153,1)_100%)] px-8 py-3">
        <span className="text-white font-bold text-[16.9px] [text-shadow:0.47px_0.47px_0.47px_#00000040]">
          Read More
        </span>

      </Button>
    </section>
  );
};