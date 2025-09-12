"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";

import ProfileCard from "../../../../components/ProfileCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel";
import { useCommitteeMembers } from "../../../../hooks/useCommittee";

// Position hierarchy
const ALL_POSITIONS = [
  "President",
  "Vice-President",
  "Secretary",
  "Joint-Secretary",
  "Treasurer",
  "Joint Treasurer",
];

// Custom Button Component
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

// Custom Carousel with autoplay
const CustomCarousel: React.FC<{
  children: React.ReactNode;
  itemsData: any[];
}> = ({ children }) => {
  return (
    <Carousel
      className="w-full max-w-7xl mx-auto"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {React.Children.map(children, (child, index) => (
          <CarouselItem
            key={index}
            className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
          >
            <div className="p-1 h-full">{child}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
};

// Main Component
const CommitteeMembersCarousel: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const navigate = useNavigate();
  
  // Fetch committee members from backend
  const { members, loading } = useCommitteeMembers({
    year: selectedYear,
    limit: 6,
  });

  const filteredMembers = members;
  const sortedMembers = filteredMembers.sort((a, b) => {
    const aIndex = ALL_POSITIONS.indexOf(a.position);
    const bIndex = ALL_POSITIONS.indexOf(b.position);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Let's. Make. It. Happen
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            The strength behind CSI's success
          </p>

          {/* Year Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["2025", "2024", "2023"].map((year) => (
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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading committee members...</span>
          </div>
        )}

        {/* Carousel */}
        {!loading && sortedMembers.length > 0 ? (
          <div className="relative mb-12">
            <CustomCarousel itemsData={sortedMembers}>
              {sortedMembers.slice(0, 6).map((member) => (
                <div
                  key={member._id}
                  className="w-full h-full min-h-[400px] flex"
                >
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
              ))}
            </CustomCarousel>
          </div>
        ) : (
          !loading && <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No committee members found for {selectedYear}
            </p>
          </div>
        )}

        {/* View All Members Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/committee")}
            className="relative px-6 sm:px-8 py-2 sm:py-3
              bg-gradient-to-b from-blue-600 via-blue-500 to-blue-600
              text-white font-semibold rounded-lg shadow-lg
              overflow-hidden group transition-all duration-300
              ease-in-out hover:scale-105"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 via-blue-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-md"></span>
            <span className="absolute -left-8 top-0 w-24 h-full bg-white/20 rounded-full transform rotate-45 translate-x-0 group-hover:translate-x-[200%] transition-transform duration-700"></span>
            <span className="relative z-10 tracking-wider text-base sm:text-lg group-hover:scale-105 transition-transform duration-300">
              View All Members
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CommitteeMembersCarousel;
