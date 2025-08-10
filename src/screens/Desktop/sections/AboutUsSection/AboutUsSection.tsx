import { BarChart2Icon, MonitorIcon, UsersIcon } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const AboutUsSection = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Typing effect state
  const fullText = "What We Do?";
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Typing effect logic
  useEffect(() => {
    if (!isVisible) return;
    if (charIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, 100); // typing speed in ms
      return () => clearTimeout(timeout);
    }
  }, [charIndex, isVisible]);

  const missionText =
    "We organize a wide range of impactful events including coding contests, technical quizzes, seminars, expert talks, and national-level hackathons. By bridging academia and industry, CSI KKWIEER provides a platform for students to grow professionally, sharpen their skills, and stay updated with the latest developments in the tech world.";

  const featureCards = [
    {
      icon: <UsersIcon className="w-[38px] h-8" />,
      imageSrc: "/group-14.png",
      imageAlt: "Group",
      imageWidth: "189px",
      imageHeight: "43px",
    },
    {
      icon: <MonitorIcon className="w-[31px] h-[31px]" />,
      imageSrc: "/group-15.png",
      imageAlt: "Group",
      imageWidth: "209px",
      imageHeight: "43px",
    },
    {
      icon: <BarChart2Icon className="w-[31px] h-[31px]" />,
      imageSrc: "/group-13.png",
      imageAlt: "Group",
      imageWidth: "188px",
      imageHeight: "42px",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`flex flex-col lg:flex-row gap-12 lg:gap-[85px] w-full max-w-[1473px] mx-auto my-20 md:my-24 px-4 md:px-8 transform transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {/* Left side - Mission text */}
      <div className="flex flex-col w-full  space-y-8">
        <h2 className="font-['Maven_Pro',Helvetica] font-normal text-[#242424] text-2xl md:text-3xl tracking-[-0.30px]">
          Our Mission in Action
        </h2>
        <h6 className="text-6xl font-bold">
          {displayText.split(" ").map((word, i) =>
            word === "We" ? (
              <span
                key={i}
                className="bg-gradient-to-r from-[#002483] to-[#0044cc] bg-clip-text text-transparent font-extrabold"
              >
                {word}
              </span>
            ) : (
              <span key={i}> {word} </span>
            )
          )}
        </h6>
        <p className="font-['Maven_Pro',Helvetica] font-normal text-[#242424] text-xl md:text-2xl lg:text-3xl text-justify tracking-[-0.30px] leading-[37.6px]">
          {missionText}
        </p>
      </div>

      {/* Right side - Images and cards */}
      <div className="flex flex-col gap-6 w-full lg:max-w-[608px]">
        <div className="flex flex-col md:flex-row gap-6 md:gap-[26px]">
          {/* Main image */}
          <Card className="w-full md:w-[268px] h-[268px] rounded-2xl border-[#898989] mx-auto md:mx-0">
            <CardContent className="p-0">
              <img
                className="w-full h-full rounded-2xl object-cover p-8"
                alt="Group"
                src="/images/csi.png"
              />
            </CardContent>
          </Card>

          {/* Feature cards column */}
          <div className="flex flex-col gap-4 md:gap-[18px]">
            {featureCards.map((card, index) => (
              <Card
                key={index}
                className="w-full md:w-[314px] h-[77px] rounded-2xl border-[#898989]"
              >
                <CardContent className="p-0 relative">
                  <div className="absolute w-[53px] h-[53px] top-3 left-3 bg-[#002483] rounded-[26.5px] flex items-center justify-center">
                    {card.icon}
                  </div>
                  <img
                    className={`absolute top-4 left-[72px]`}
                    style={{ width: card.imageWidth, height: card.imageHeight }}
                    alt={card.imageAlt}
                    src={card.imageSrc}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom card */}
        <Card className="w-full h-40 md:h-52 rounded-2xl border-[#898989]">
          <CardContent className="p-0"></CardContent>
        </Card>
      </div>
    </section>
  );
};
