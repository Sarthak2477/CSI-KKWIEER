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
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";

export const Navbar = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("home");

  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { icon: <HomeIcon className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Home", target: "home", path: "/" },
    { icon: <UserSquareIcon className="w-5 h-5 sm:w-6 sm:h-6" />, label: "About Us", target: "AboutUs", path: "/" },
    { icon: <FlagIcon className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Events", path: "/events" },
    { icon: <GalleryVerticalIcon className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Committee", path: "/committee" },
    { icon: <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Gallery", path: "/gallery" },
  ];

  // Navbar scroll effect
  useEffect(() => {
    const handleScrollTop = () => setIsAtTop(window.scrollY < 200);
    window.addEventListener("scroll", handleScrollTop);
    return () => window.removeEventListener("scroll", handleScrollTop);
  }, []);

  // Set active item based on current route when component mounts or route changes
  useEffect(() => {
    if (location.pathname === "/") {
      // Only reset to "home" if we don't have a pending section navigation
      if (!location.hash && activeItem.startsWith("/")) {
        setActiveItem("home");
      }
    } else {
      setActiveItem(location.pathname);
    }
  }, [location.pathname]);

  // Scrollspy effect - only works when user hasn't manually clicked
  useEffect(() => {
    if (location.pathname !== "/") return;
    
    const handleScroll = () => {
      // Only update if current active item is a section (not a route)
      if (activeItem.startsWith("/")) return;
      
      const scrollPos = window.scrollY + 120;
      
      // If we're at the very top (within 50px), always show Home as active
      if (window.scrollY < 50) {
        if (activeItem !== "home") {
          setActiveItem("home");
        }
        return;
      }
      
      const sections = ["home", "AboutUs"];
      
      for (const sectionId of sections.reverse()) {
        const element = document.getElementById(sectionId);
        if (element && scrollPos >= element.offsetTop) {
          if (activeItem !== sectionId) {
            setActiveItem(sectionId);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, activeItem]);

  // Handle navigation clicks
  const handleNavClick = (item: typeof navigationItems[0], e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (item.target) {
      // Section navigation
      setActiveItem(item.target);
      
      if (location.pathname === "/") {
        // Already on homepage, just scroll
        scrollToSection(item.target);
      } else {
        // Navigate to homepage first, then scroll
        navigate("/");
        // Use setTimeout to ensure navigation completes
        setTimeout(() => {
          scrollToSection(item.target);
        }, 100);
      }
    } else {
      // Route navigation
      setActiveItem(item.path);
      navigate(item.path);
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Check if an item is active
  const isActive = (item: typeof navigationItems[0]) => {
    if (item.target) {
      return activeItem === item.target;
    } else {
      return activeItem === item.path;
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <NavigationMenu
        className={`hidden lg:flex fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50 px-4 sm:px-18 py-2 rounded-xl shadow-lg transition-all duration-500 ease-in-out
          ${isAtTop ? "opacity-100 translate-y-0 backdrop-blur-md bg-white/80" : "opacity-100 -translate-y-4 backdrop-blur-sm bg-white/60"}`}
      >
        <img
          src="/images/csi-kkw-logo.png"
          className="h-20 w-20 lg:h-[60px] lg:w-[160px] ml-4 lg:ml-20 mr-4 lg:mr-10"
          alt="CSI Logo"
        />

        <NavigationMenuList className="flex gap-4 lg:gap-8">
          {navigationItems.map((item, index) => (
            <NavigationMenuItem key={index} className="flex items-center">
              <a
                href={item.path}
                className={`flex items-center gap-2 lg:gap-3 cursor-pointer transition-colors
                    ${isActive(item) ? "text-blue-600" : "text-black hover:text-blue-600"}`}
                onClick={(e) => handleNavClick(item, e)}
              >
                {item.icon}
                <span className="font-normal text-sm lg:text-lg xl:text-xl whitespace-nowrap inline-block">
                  {item.label}
                </span>
              </a>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>

        <img
          src="/images/csi.png"
          className="h-15 w-15 lg:h-[50px] lg:w-[60px] ml-0 lg:ml-10 mr-8 lg:mr-20"
          alt="CSI Logo"
        />
      </NavigationMenu>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <div
          className={`w-full px-4 py-3 transition-all duration-300 ${isAtTop ? "bg-white/90 backdrop-blur-md" : "bg-white/95 backdrop-blur-sm shadow-md"}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/images/csi-kkw-logo.png"
                className="h-16 w-16 sm:h-18 sm:w-18 lg:h-[60px] lg:w-[100px] lg:ml-4 mr-2 lg:mr-6"
                alt="CSI KKW Logo"
              />
              <div className="h-10 w-px bg-gray-300"></div>
              <img
                src="/images/csi.png"
                className="h-10 w-10 sm:h-12 sm:w-12"
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

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t">
            <div className="px-4 py-2">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={item.path}
                  onClick={(e) => handleNavClick(item, e)}
                  className={`flex items-center gap-3 py-3 px-2 cursor-pointer rounded-lg transition-colors
                    ${isActive(item) ? "text-blue-600" : "text-black hover:bg-gray-100"}`}
                >
                  {item.icon}
                  <span className="font-normal text-base">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};