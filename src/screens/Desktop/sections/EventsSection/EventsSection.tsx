import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const EventsSection = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedWords, setTypedWords] = useState(["", "", "", ""]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const words = ["Think.", "Build.", "Compete.", "Repeat."];
  const wordColors = ["bg-gradient-to-r from-[#002483] to-[#0044cc] bg-clip-text text-transparent font-extrabold", "", "", ""];

  const events = [
    {
      title: "Campus To Corporate",
      department: "COMP/AI&DS/CSD",
      description:
        "A mock placement event simulating real interviews and tests. Prepare, perform, and experience the hiring hustle!",
    },
    {
      title: "Equinox",
      department: "All branches",
      description:
        "Our annual fest with thrilling competitions and creative battles. Celebrate tech, talent, and teamwork!",
    },
    {
      title: "E-Yantran",
      department: "All Branches",
      description:
        "An e-waste drive to collect and recycle old electronics. Let's build a cleaner campus, one device at a time.",
    },
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

  // Typing effect
  useEffect(() => {
    if (!isVisible) return;

    setShowCursor(true);
    
    const typeWord = (wordIndex: number) => {
      if (wordIndex >= words.length) {
        // Hide cursor after all words are typed
        setTimeout(() => setShowCursor(false), 1000);
        return;
      }

      const currentWord = words[wordIndex];
      let charIndex = 0;

      const typeChar = () => {
        if (charIndex <= currentWord.length) {
          setTypedWords(prev => {
            const newWords = [...prev];
            newWords[wordIndex] = currentWord.substring(0, charIndex);
            return newWords;
          });
          charIndex++;
          setTimeout(typeChar, 80); // Typing speed
        } else {
          // Move to next word after a pause
          setTimeout(() => {
            setCurrentWordIndex(wordIndex + 1);
            typeWord(wordIndex + 1);
          }, 300);
        }
      };

      typeChar();
    };

    // Start typing after a delay
    setTimeout(() => typeWord(0), 500);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className={`w-full max-w-[1292px] mx-auto py-20 md:py-24 px-4 md:px-8 transform transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="flex flex-col gap-8">
        <h6 className="text-6xl font-bold min-h-[1.2em]">
          {words.map((word, index) => (
            <span key={index}>
              <span className={index === 0 ? wordColors[0] : ""}>
                {typedWords[index]}
              </span>
              {index < words.length - 1 && typedWords[index].length === word.length && " "}
            </span>
          ))}
          {showCursor && currentWordIndex < words.length && (
            <span className="animate-pulse text-[#304674]">|</span>
          )}
        </h6>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
          Welcome To Our Flagship Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {events.map((event, index) => (
            <Card
              key={index}
              className={`w-full max-w-[384px] h-[622px] border border-solid border-[#898989] rounded-[15px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform transition-all duration-1000 ease-out`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? "translateY(0)"
                  : "translateY(24px)",
                transitionDelay: `${index * 0.15}s`, // staggered fade-in
              }}
            >
              <div className="h-[413px] rounded-t-[15px] border-t border-r border-l border-[#898989] bg-[linear-gradient(225deg,rgba(255,255,255,1)_0%,rgba(229,242,254,1)_100%)]" />
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="font-['Maven_Pro',Helvetica] font-semibold text-black text-2xl md:text-3xl tracking-[-0.90px] leading-[34.4px]">
                    {event.title}
                  </h3>
                  <p className="font-['Maven_Pro',Helvetica] font-semibold text-[#003399] text-[17.9px] tracking-[-0.54px] leading-[20.5px]">
                    {event.department}
                  </p>
                  <p className="font-['Maven_Pro',Helvetica] font-medium text-[#5b5b5b] text-[17.9px] tracking-[-0.54px] leading-[20.5px]">
                    {event.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};