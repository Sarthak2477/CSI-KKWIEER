import {
  Club,
  FlagIcon,
  GalleryVerticalIcon,
  HomeIcon,
  ImageIcon,
  UserSquareIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../components/ui/navigation-menu";
// @ts-ignore
import DarkVeil from '../../components/DarkVeil.jsx'
import { CommitteeMembersCarousel } from "./sections/CommitteeMembersCarousel";
// Import all sections
import { ComputerSocietySection } from "./sections/ComputerSocietySection";
import { FooterSection } from "./sections/FooterSection";
import { AboutUs } from "./sections/AboutUsSection";
import { EventsCarousel } from "./sections/EventsCarousel";
import { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Gallery } from "./sections/Gallery/Gallery";
import { Navbar } from "../../components/ui/navbar";

export const Home = (): JSX.Element => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items data
  const navigationItems = [
    { icon: <HomeIcon className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Home" },
    { icon: <FlagIcon className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Events" },
    {
      icon: <GalleryVerticalIcon className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: "Committee",
    },
    {
      icon: <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: "Gallery",
    },
    {
      icon: <UserSquareIcon className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: "About Us",
    },
  ];

  const scrollToSection = (sectionLabel: string) => {
    // You can implement smooth scrolling to sections here
    setIsMobileMenuOpen(false); // Close mobile menu when item is clicked
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* DarkVeil Background */}
      <div className="absolute inset-0 -z-10">
      
      </div>

      <div className="flex flex-col items-center w-full min-h-screen bg-cover bg-center bg-no-repeat">
        <div className="overflow-hidden w-full relative">
          <div className="relative w-full">
            <Navbar />
            {/* Main content sections */}
            <div className="relative w-full pt-16 lg:pt-0">
              {/* Computer Society Section */}
              <ComputerSocietySection />

              {/* Cards Section - Responsive Grid */}
              <div className="grid grid-cols-1 lg: grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 justify-items-center">
                {/* CSI India Card */}
                <Card className="w-full max-w-full lg:max-w-[600px] p-4 sm:p-6 shadow-lg rounded-xl flex flex-col justify-between bg-white min-h-[300px] lg:min-h-[400px]">
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-[#304674] text-center">
                      CSI India
                    </h2>
                    <p className="text-gray-700 sm:text-sm leading-relaxed text-justify">
                      The seed for the Computer Society of India (CSI) was first shown in the year 1965 with a handful of IT enthusiasts who were a computer user group and felt the need to organize their activities. They also wanted to share their knowledge and exchange ideas on what they felt was a fast emerging sector. Today the CSI takes pride in being the largest and most professionally managed...
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-6 flex justify-center">
                    <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors w-full sm:w-auto">
                      Read more
                    </Button>
                  </div>
                </Card>

                {/* CSI Nashik Chapter Card */}
                <Card className="w-full max-w-full lg:max-w-[600px] p-4 sm:p-6 shadow-lg rounded-xl flex flex-col justify-between bg-white min-h-[300px] lg:min-h-[400px]">
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-[#304674] text-center">
                      CSI Nashik Chapter
                    </h2>
                    <p className="text-gray-700 sm:text-sm leading-relaxed text-justify">
                      Nashik chapter of Computer Society of India (CSI) was formed in 1988-89. During the years, the chapter conducted several activities. We have won the Best Chapter award several times. The First student branch was formed in 1992, Today there are more than 20 student branches in and around in Nashik. Our ACCESS has won the Best Newsletter Award several times. The student...
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-6 flex justify-center">
                    <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors w-full sm:w-auto">
                      Read more
                    </Button>
                  </div>
                </Card>
              </div>

              <AboutUs />

              <CommitteeMembersCarousel />

              <EventsCarousel />


              <Gallery />

              <div className="w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[666px] bg-[#1e1e1e]">
                <FooterSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};