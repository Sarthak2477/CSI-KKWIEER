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
      icon: <UsersIcon className="w-7 h-7 text-white" />,
      title: "Networking",
      description: "Connect with peers, mentors, and industry professionals."
    },
    {
      icon: <MonitorIcon className="w-7 h-7 text-white" />,
      title: "Skill Development",
      description: "Learn new technologies and improve coding and teamwork skills."
    },
    {
      icon: <BarChart2Icon className="w-7 h-7 text-white" />,
      title: "Personal Growth",
      description: "Enhance personal and professional development through events and workshops."
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`flex flex-col lg:flex-row items-start gap-12 lg:gap-16 xl:gap-20 w-full max-w-[1473px] mx-auto my-20 md:my-24 px-4 md:px-8 transform transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {/* Left side - Mission text */}
      <div className="flex flex-col w-full lg:w-1/2 space-y-6 lg:space-y-8">
        <h2 className="font-['Maven_Pro',Helvetica] font-normal text-[#242424] text-2xl md:text-3xl tracking-[-0.30px] leading-tight">
          Our Mission in Action
        </h2>
        
        <h6 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
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
        
        <p className="font-['Maven_Pro',Helvetica] font-normal text-[#242424] text-lg md:text-xl lg:text-2xl text-justify tracking-[-0.30px] leading-relaxed lg:leading-[37.6px]">
          {missionText}
        </p>
      </div>

      {/* Right side - Images and cards */}
      <div className="flex flex-col w-full lg:w-1/2 lg:max-w-[608px]">
        <div className="flex flex-col md:flex-row gap-6 md:gap-[26px] items-start h-full">
          {/* Main image */}
          <div className="flex flex-col justify-start">
            <Card className="w-full md:w-[268px] h-[268px] rounded-2xl border border-0 overflow-hidden shadow-sm">
              <CardContent className="p-0">
                <img
                  className="w-full h-full object-cover"
                  alt="CSI KKWIEER Group"
                  src="/images/csi.png"
                />
              </CardContent>
            </Card>
          </div>

          {/* Feature cards column */}
          <div className="flex flex-col gap-4 md:gap-[18px] justify-start flex-1">
            {featureCards.map((card, index) => (
              <Card
                key={index}
                className="w-full md:min-w-[314px] rounded-2xl border border-[#898989] bg-gradient-to-r from-[#eaf6ff] to-[#dce9ff] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <CardContent className="p-5 flex items-center">
                  {/* Icon Container */}
                  <div className="w-14 h-14 bg-[#002483] rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                    {card.icon}
                  </div>

                  {/* Text Content */}
                  <div className="ml-5 flex-1">
                    <h6 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
                      {card.title}
                    </h6>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};