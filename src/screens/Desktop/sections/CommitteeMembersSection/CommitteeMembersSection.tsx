import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const CommitteeMembersSection = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedWords, setTypedWords] = useState(["", "", "", ""]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const words = ["Let's.", "Make.", "it.", "Happen."];

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
          setTimeout(typeChar, 90); // Typing speed
        } else {
          // Move to next word after a pause
          setTimeout(() => {
            setCurrentWordIndex(wordIndex + 1);
            typeWord(wordIndex + 1);
          }, 250);
        }
      };

      typeChar();
    };

    // Start typing after a delay
    setTimeout(() => typeWord(0), 500);
  }, [isVisible]);

  const teamMembers = [
    {
      name: "Ankit Khandelwal",
      position: "President",
      description:
        "Leads the club with vision and direction.\nOversees all activities, decisions, and growth initiatives.",
    },
    {
      name: "Manasi Jadhav",
      position: "Vice President",
      description:
        "Supports the President and manages internal coordination. Ensures smooth execution of events and team synergy.",
    },
    {
      name: "Shweta Yeola",
      position: "Secretary",
      description:
        "Handles communication, documentation, and scheduling. Keeps the club organized and informed at all times.",
    },
  ];

  const socialIcons = [
    { bg: "bg-[#e5ebf5]", src: "/images/github.svg" },
    { bg: "bg-[#e5f2fe]", src: "/images/linkedin.svg" },
    { bg: "bg-[#edf5ff]", src: "/images/insta.png" },
  ];

  return (
    <section
      ref={sectionRef}
      className={`flex flex-col justify-center w-full py-20 md:py-24  md:px-8 transform transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <h6 className="text-6xl font-bold p-6 min-h-[1.2em]">
        {words.map((word, index) => (
          <span key={index}>
            {index === 3 ? (
              <span className="bg-gradient-to-r from-[#002483] to-[#0044cc] bg-clip-text text-transparent font-extrabold">
                {typedWords[index]}
              </span>
            ) : (
              <span>{typedWords[index]}</span>
            )}
            {index < words.length - 1 && typedWords[index].length === word.length && " "}
          </span>
        ))}
        {showCursor && currentWordIndex < words.length && (
          <span className="animate-pulse text-[#304674]">|</span>
        )}
      </h6>
      
      <h4 className="text-4xl px-6 py-2">The Committee</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center w-full">
        {teamMembers.map((member, index) => (
          <Card
            key={index}
            className="w-full max-w-[398px]  rounded-[15.54px] border-[1.04px] border-solid border-[#898989] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            style={{
              transitionDelay: `${index * 150}ms`,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              opacity: isVisible ? 1 : 0,
            }}
          >
            <div className="h-[404px] rounded-t-[15.54px] border-t-[1.04px] border-r-[1.04px] border-l-[1.04px] border-[#898989] bg-[linear-gradient(226deg,rgba(255,255,255,0.5)_9%,rgba(193,224,254,0.5)_100%)]" />

            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-black text-2xl md:text-[31.1px] tracking-[-0.93px] leading-[35.6px] [font-family:'Maven_Pro',Helvetica]">
                {member.name}
              </h3>

              <p className="font-semibold text-[#003399] text-[18.5px] tracking-[-0.55px] leading-[21.2px] [font-family:'Maven_Pro',Helvetica]">
                {member.position}
              </p>

              <p className="font-medium text-[#5b5b5b] text-[18.5px] tracking-[-0.55px] leading-[21.2px] [font-family:'Maven_Pro',Helvetica] w-full whitespace-pre-line">
                {member.description}
              </p>

              {/* Social Icons */}
              <div className="flex gap-4 pt-4">
                {socialIcons.map((icon, i) => (
                  <div
                    key={i}
                    className={`${icon.bg} w-12 h-12 rounded-full flex items-center justify-center`}
                  >
                    <img src={icon.src} alt="Social Icon" className="w-6 h-6" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};