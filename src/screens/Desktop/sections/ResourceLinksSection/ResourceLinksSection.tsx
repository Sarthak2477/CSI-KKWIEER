import React, { useState, useEffect, useRef } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";
import { Separator } from "../../../../components/ui/separator";

export const ResourceLinksSection = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const eventReports = [
    { title: "DBMS Miniproject", date: "August 2024", isActive: false },
    { title: "Equinox", date: "January 2024", isActive: false },
    { title: "E-Waste Collection Drive", date: "February 2024", isActive: true },
    { title: "Campus to Corporate", date: "October 2024", isActive: false },
    { title: "Design Thinking Workshop", date: "July 2024", isActive: false },
  ];

  const keyHighlights = [
    { title: "Environmental Awareness" },
    { title: "Community participation" },
    { title: "Waste segregation" },
    { title: "Recycling partners" },
  ];

  // Intersection Observer for fade-in animation
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

  return (
    <section
      ref={sectionRef}
      className={`w-full py-28 flex justify-center transform transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="flex flex-col md:flex-row gap-5 max-w-[1294px] w-full">
        {/* Event Reports List Card */}
        <Card className="w-full md:w-[406px] border-[#898989] rounded-[19.44px]">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <img
                className="w-[25px] h-[25px]"
                alt="Folder icon"
                src="/vuesax-broken-folder-2.svg"
              />
              <CardTitle className="text-[#003399] text-[28.6px] tracking-[-0.86px] leading-[32.8px] font-bold">
                Event Reports
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[488px] w-full pr-2">
              <div className="px-5 space-y-4">
                {eventReports.map((event, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-[14.32px] ${
                      event.isActive ? "bg-[#003499] text-white" : ""
                    }`}
                  >
                    <h3
                      className={`text-[25.6px] tracking-[-0.77px] leading-[29.3px] font-medium ${
                        event.isActive ? "text-white" : "text-[#003399]"
                      }`}
                    >
                      {event.title}
                    </h3>
                    <p
                      className={`text-[18.3px] tracking-[-0.55px] leading-[27.2px] font-medium ${
                        event.isActive ? "text-[#a4c8eb]" : "text-[#5b5b5b]"
                      }`}
                    >
                      {event.date}
                    </p>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Event Details Card */}
        <Card className="w-full md:w-[870px] border-[#898989] rounded-[20px]">
          <CardHeader className="pt-10 pb-0">
            <div className="flex justify-between items-center">
              <CardTitle className="text-[#003399] text-[33px] tracking-[-0.99px] leading-[37.9px] font-bold">
                E-Waste Collection Drive
              </CardTitle>
              <Button
                variant="outline"
                className="h-[45px] border-[#003399] text-[#003399]"
              >
                <img
                  className="w-6 h-6 mr-2"
                  alt="PDF icon"
                  src="/vuesax-broken-send-sqaure-2.svg"
                />
                View PDF
              </Button>
            </div>
            <div className="flex gap-10 mt-4">
              <div className="flex items-center gap-2">
                <img
                  className="w-6 h-6"
                  alt="Calendar icon"
                  src="/vuesax-broken-calendar-edit.svg"
                />
                <span className="text-[#5b5b5b] text-[17.9px] tracking-[-0.54px] leading-[20.5px] font-medium">
                  August 2025
                </span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  className="w-6 h-6"
                  alt="Participants icon"
                  src="/vuesax-broken-profile-2user.svg"
                />
                <span className="text-[#5b5b5b] text-[17.9px] tracking-[-0.54px] leading-[20.5px] font-medium">
                  150+ participants
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-10 px-[45px]">
            <div className="space-y-8">
              <div>
                <h3 className="text-[#003399] text-[25px] tracking-[-0.75px] leading-[28.6px] font-bold mb-4">
                  Description
                </h3>
                <p className="text-[#5b5b5b] text-[17.9px] tracking-[-0.54px] leading-[26.6px] font-medium">
                  An e-waste drive to collect and recycle old electronics. Let's
                  build a cleaner campus, one device at a time.
                </p>
              </div>

              <div>
                <h3 className="text-[#003399] text-[25px] tracking-[-0.75px] leading-[28.6px] font-bold mb-4">
                  Key Highlights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {keyHighlights.map((highlight, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-slate-100 border-[#a4c8eb] rounded-[14px] h-[57px] flex items-center justify-start px-4 font-normal"
                    >
                      <div className="w-2 h-2 bg-[#003399] rounded-full mr-3" />
                      <span className="text-[#003399] text-[17.9px] tracking-[-0.54px] leading-[20.5px] font-medium">
                        {highlight.title}
                      </span>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col items-start px-[45px]">
            <Separator className="w-full h-px mb-4" />
            <div className="flex justify-between items-center w-full">
              <span className="text-[#5b5b5b] text-[17.9px] tracking-[-0.54px] leading-[20.5px] font-medium">
                Report Generated on 08/08/2025
              </span>
              <Button className="h-[45px] bg-[#003399] rounded-[14px] text-white">
                Download Report
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
