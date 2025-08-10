import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

export const StatsSection = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const statistics = [
    { value: 500, suffix: "+", label: "Student\nBranches" },
    { value: 72, suffix: "", label: "Student\nBranches" },
    { value: 100000, suffix: "", label: "Student\nBranches" },
  ];

  // Intersection Observer for fade-in
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

  // Hook for counting up numbers
  const useCountUp = (end: number, duration = 1500) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      if (!isVisible) return;
      let start: number | null = null;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, [isVisible, end, duration]);
    return count;
  };

  return (
    <section
      ref={sectionRef}
      className={`w-full transform transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="container mx-auto">
        <h2 className="text-center font-sans font-extrabold text-[#353535] text-3xl md:text-6xl mb-12 md:mb-16">
          The Journey So Far
        </h2>

        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <div className="bg-[#0033991a] relative">
              <Separator className="w-full h-[3px]" />

              <div className="flex flex-col md:flex-row">
                {statistics.map((stat, index) => {
                  const animatedValue = useCountUp(stat.value);
                  return (
                    <React.Fragment key={index}>
                      <div className="flex-1 py-12 md:py-[102px] px-6 md:px-8 flex items-start justify-center md:justify-start">
                        <div className="font-sans font-extrabold text-[#003399] text-4xl md:text-6xl whitespace-nowrap">
                          {animatedValue}
                          {stat.suffix}
                        </div>
                        <div className="ml-4 md:ml-5 font-sans font-medium text-[#003399] text-2xl md:text-[34px] tracking-[-0.34px] leading-[29.6px]">
                          {stat.label.split("\n").map((line, i) => (
                            <React.Fragment key={i}>
                              {line}
                              {i === 0 && <br />}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                      {index < statistics.length - 1 && (
                        <Separator
                          orientation={
                            typeof window !== "undefined" &&
                            window.innerWidth >= 768
                              ? "vertical"
                              : "horizontal"
                          }
                          className="h-[3px] md:h-[277px] w-full md:w-[3px]"
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              <Separator className="w-full h-[3px]" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
