"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../../../components/ProfileCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// -------------------- Types --------------------
interface CommitteeMember {
  id: string;
  name: string;
  position: string;
  year: string;
  image: string;
  linkedin?: string;
  description?: string;
}

// Position Order
const ALL_POSITIONS = [
  "President",
  "Vice-President",
  "Secretary",
  "Joint-Secretary",
  "Treasurer",
  "Joint Treasurer",
];

// -------------------- Data --------------------
const committeeMembers: CommitteeMember[] = [
  {
    id: "1",
    name: "Ankit Khandelwal",
    position: "President",
    year: "2025",
    image: "/images/2025/1Ankit.png",
    linkedin:
      "https://www.linkedin.com/in/ankit-khandelwal-002474295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    id: "2",
    name: "Manasi Jadhav",
    position: "Vice-President",
    year: "2025",
    image: "/images/2025/2Manasi.png",
    linkedin: "https://www.linkedin.com/in/manasi-jadhav-3ba44228b/",
  },
  {
    id: "3",
    name: "Shweta Yeola",
    position: "Secretary",
    year: "2025",
    image: "/images/2025/3Shweta.png",
    linkedin: "https://www.linkedin.com/in/shweta-yeola-3a8075296/",
  },
  {
    id: "4",
    name: "Meghraj Bhavsar",
    position: "Joint-Secretary",
    year: "2025",
    image: "/images/2025/4Meghraj.png",
    linkedin:
      "https://www.linkedin.com/in/meghraj-bhavsar-3449ba289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    id: "5",
    name: "Atharva Jadhav",
    position: "Treasurer",
    year: "2025",
    image: "/images/2025/5Atharva.png",
    linkedin:
      "https://www.linkedin.com/in/atharva-jadhav-73a997295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    id: "6",
    name: "Sadique Khatib",
    position: "Joint Treasurer",
    year: "2025",
    image: "/images/2025/6Sadique.png",
    linkedin:
      "https://www.linkedin.com/in/sadique-khatib-4175342a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
];

// -------------------- Button Component --------------------
const CustomButton: React.FC<{
  children: React.ReactNode;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}> = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  onClick,
}) => {
  const baseClasses =
    "font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center";

  const variantClasses = {
    default: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    outline:
      "border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 bg-white",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2",
    lg: "px-8 py-3 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// -------------------- Main Component --------------------
const CommitteeMembersCarousel: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const navigate = useNavigate();

  const handleViewAllMembers = () => {
    navigate("/committee");
  };

  // Filter by year
  const filteredMembers = committeeMembers.filter(
    (member) => selectedYear === "all" || member.year === selectedYear
  );

  // Sort by defined positions
  const sortedMembers = filteredMembers.sort((a, b) => {
    const aIndex = ALL_POSITIONS.indexOf(a.position);
    const bIndex = ALL_POSITIONS.indexOf(b.position);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  // Decide loop condition (fixes Swiper warning)
  const enableLoop = sortedMembers.length > 3;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Let's. Make. It. Happen
          </h2>


          {/* Year Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["2025"].map((year) => (
              <CustomButton
                key={year}
                variant={year === selectedYear ? "default" : "outline"}
                size="md"
                onClick={() => setSelectedYear(year)}
                className="min-w-[80px]"
              >
                {year}
              </CustomButton>
            ))}
          </div>
        </div>

        {/* Swiper Carousel */}
        {sortedMembers.length > 0 ? (
          <div className="relative mb-12">
            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              loop={enableLoop}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: Math.min(2, sortedMembers.length) },
                1024: { slidesPerView: Math.min(3, sortedMembers.length) },
              }}
              className="w-full max-w-7xl mx-auto"
            >
              {sortedMembers.map((member) => (
                <SwiperSlide key={member.id}>
                  <div className="flex justify-center">
                    <ProfileCard
                      name={member.name}
                      title={member.position}
                      handle={member.year}
                      status="Active"
                      contactText="Contact Me"
                      avatarUrl={member.image}
                      miniAvatarUrl={member.image}
                      linkedinUrl={member.linkedin}
                      showUserInfo={true}
                      onContactClick={() =>
                        console.log(`Contact ${member.name}`)
                      }
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No committee members found for {selectedYear}
            </p>
          </div>
        )}

        {/* View All Members Button */}
        <div className="text-center">
          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate("/committee")}
              className="
                relative
                px-6 sm:px-8 py-2 sm:py-3
                bg-gradient-to-b from-blue-600 via-blue-500 to-blue-600
                text-white
                font-semibold
                rounded-lg
                shadow-lg
                overflow-hidden
                group
                transition-all
                duration-300
                ease-in-out
                hover:scale-105
              "
            >
              
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 via-blue-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-md"></span>

              {/* Moving background stripe on hover */}
              <span className="absolute -left-8 top-0 w-24 h-full bg-white/20 rounded-full transform rotate-45 translate-x-0 group-hover:translate-x-[200%] transition-transform duration-700"></span>

              {/* Button text */}
              <span className="relative z-10 tracking-wider text-base sm:text-lg group-hover:scale-105 transition-transform duration-300">
                View All Members
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommitteeMembersCarousel;