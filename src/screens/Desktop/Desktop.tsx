import {
  FlagIcon,
  GalleryVerticalIcon,
  HomeIcon,
  UserSquareIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../components/ui/navigation-menu";
import { Separator } from "../../components/ui/separator";

import { AboutUsSection } from "./sections/AboutUsSection";
import { CommitteeMembersSection } from "./sections/CommitteeMembersSection";
// Import all sections
import { ComputerSocietySection } from "./sections/ComputerSocietySection";
import { FooterSection } from "./sections/FooterSection";
import { FeaturedEventsSection } from "./sections/FeaturedEventsSection";
import { ResourceLinksSection } from "./sections/ResourceLinksSection";
import { StudentEngagementSection } from "./sections/StudentEngagementSection";
import { EventsSection } from "./sections/EventsSection";
import { StatsSection } from "./sections/StatsSection";

export const Desktop = (): JSX.Element => {
  // Navigation items data
  const navigationItems = [
    { icon: <HomeIcon className="w-[23px] h-[23px]" />, label: "Home" },
    { icon: <FlagIcon className="w-[23px] h-[23px]" />, label: "Events" },
    {
      icon: <GalleryVerticalIcon className="w-[23px] h-[23px]" />,
      label: "Committee",
    },
    {
      icon: <UserSquareIcon className="w-[23px] h-[23px]" />,
      label: "AboutUs",
    },
  ];

  return (
    <div   style={{ backgroundImage: "url('/images/image1.png')" }}
    className="bg-cover bg-center flex flex-col items-center w-full min-h-screen">
      <div className="overflow-hidden w-full relative">
        {/* Background images */}
        <div className="relative w-full">
          
          {/* Navigation Menu */}
          <NavigationMenu className="absolute top-6 left-1/2 transform -translate-x-1/2 ">
            <NavigationMenuList className="flex gap-8">
              {navigationItems.map((item, index) => (
                <NavigationMenuItem key={index} className="flex items-center">
                  <div className="flex items-center gap-3 cursor-pointer">
                    {item.icon}
                    <span className="font-normal text-black text-lg md:text-2xl">
                      {item.label}
                    </span>
                  </div>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Main content sections */}
          <div className="relative w-full">
            {/* Computer Society Section */}
            <ComputerSocietySection />   

            {/* Read More Button */}

            {/* Separator after first sections */}
            <div className="w-full flex justify-center mt-16 mb-8">
              <img
                className="w-full object-cover"
                alt="separator"
                src="/images/Union.png"
                />
            </div>

            {/* Committee Members Section */}
            <StatsSection />

            {/* Separator */}
            <div className="w-full flex justify-center mt-16 mb-8">
              <img
              className="w-full object-cover"
              alt="separator"
              src="/images/Union.png"
              />
            </div>

            {/* Featured Events Section */}
            <FeaturedEventsSection />

            {/* Separator */}
            <div className="w-full flex justify-center mt-16 mb-8">
              <img
                  className="w-full object-cover"
                  alt="separator"
                  src="/images/Union.png"
                  />
            </div>

            {/* Team Overview Section */}
            <EventsSection />

            {/* Separator */}
            <div className="w-full flex justify-center mt-16 mb-8">
              <img
                  className="w-full object-cover"
                  alt="separator"
                  src="/images/Union.png"
              />
            </div>

            {/* Resource Links Section */}
            <ResourceLinksSection />

            {/* Separator */}
            <div className="w-full flex justify-center mt-16 mb-8">
              <img
                  className="w-full object-cover"
                  alt="separator"
                  src="/images/Union.png"
                  />
            </div>

            {/* About Us Section */}
            <AboutUsSection />

            {/* Call To Action Section */}
            {/* <CallToActionSection /> */}
            <CommitteeMembersSection/>

            {/* Footer area */}

            {/* Dark background for Event Highlights */}
            <div className="w-full h-[666px] bg-[#1e1e1e]">
              {/* Event Highlights Section */}
              <FooterSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
