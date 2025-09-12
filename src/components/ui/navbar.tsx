import {
  FlagIcon,
  GalleryVerticalIcon,
  HomeIcon,
  ImageIcon,
  MenuIcon,
  UserSquareIcon,
  XIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu";
import { Button } from "../ui/button";

export const Navbar = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation links with route paths
  const navigationItems = [
    { icon: <HomeIcon className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Home", path: "/" },
    { icon: <FlagIcon className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Events", path: "/events" },
    { icon: <GalleryVerticalIcon className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Committee", path: "/committee" },
    { icon: <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Gallery", path: "/gallery" },
    { icon: <UserSquareIcon className="w-5 h-5 sm:w-6 sm:h-6" />, label: "About Us", path: "/#AboutUs" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <NavigationMenu
        className={`hidden lg:flex fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50 px-4 sm:px-18 py-2 rounded-xl shadow-lg transition-all duration-500 ease-in-out
          ${isAtTop
            ? "opacity-100 translate-y-0 backdrop-blur-md bg-white/80"
            : "opacity-100 -translate-y-4 backdrop-blur-sm bg-white/60"
          }`}
      >
        <img
          src="/images/csi-kkw-logo.png"
          className="h-14 w-14 lg:h-[60px] lg:w-[100px] ml-4 lg:ml-20 mr-4 lg:mr-10"
          alt="CSI Logo"
        />


        <NavigationMenuList className="flex gap-4 lg:gap-8">
          {navigationItems.map((item, index) => (
            <NavigationMenuItem key={index} className="flex items-center">
              <Link
                to={item.path}
                className="flex items-center gap-2 lg:gap-3 cursor-pointer hover:text-blue-600 transition-colors"
              >
                {item.icon}
                <span className="font-normal text-black text-sm lg:text-lg xl:text-xl whitespace-nowrap inline-block">
                  {item.label}
                </span>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>

        <img
          src="/images/csi.png"
          className="h-12 w-12 lg:h-[40px] lg:w-[40px] ml-0 lg:ml-10 mr-8 lg:mr-20"
          alt="CSI Logo"
        />
      </NavigationMenu>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <div
          className={`w-full px-4 py-3 transition-all duration-300 ${isAtTop
            ? "bg-white/90 backdrop-blur-md"
            : "bg-white/95 backdrop-blur-sm shadow-md"
            }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">

              <img
                src="/images/csi-kkw-logo.png"
                className="h-14 w-14 lg:h-[60px] lg:w-[100px] lg:ml-4 mr-2 lg:mr-6"
                alt="CSI KKW Logo"
              />
              {/* Divider */}
              <div className="h-8 sm:h-10 w-px bg-gray-300"></div>
              <img
                src="/images/csi.png"
                className="h-8 w-8 sm:h-10 sm:w-10"
                alt="CSI Logo"
              />

            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t">
            <div className="px-4 py-2">
              {navigationItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-3 px-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {item.icon}
                  <span className="font-normal text-black text-base">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div >
    </>
  );
};