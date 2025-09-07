"use client"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../../../components/ProfileCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel";
import UserCard from "@/components/UserCard";
// Define the committee member interface
interface CommitteeMember {
  id: string;
  name: string;
  position: string;
  year: string;
  image: string;
  linkedin?: string;
  description?: string;
}

// Define all 6 positions in order
const ALL_POSITIONS = [
  "President",
  "Vice-President",
  "Secretary",
  "Joint-Secretary",
  "Treasurer",
  "Joint Treasurer",
];

// Sample committee members data
const committeeMembers: CommitteeMember[] = [
  {
    id: "1",
    name: "Ankit Khandelwal",
    position: "President",
    year: "2025",
    image: "/images/Ankit.png",
    linkedin:
      "https://www.linkedin.com/in/ankit-khandelwal-002474295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
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

// Custom Carousel Component using shadcn/ui Carousel
const CustomCarousel: React.FC<{
  children: React.ReactNode;
  itemsData: CommitteeMember[];
}> = ({ children }) => {
  return (
    <Carousel
      className="w-full max-w-7xl mx-auto"
      opts={{
        align: "start",
        loop: true,
      }}
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

// Main Carousel Component
const CommitteeMembersCarousel: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const navigate = useNavigate();

  const handleViewAllMembers = () => {
    navigate("/committee");
  };

  const filteredMembers = committeeMembers.filter(
    (member) => selectedYear === "all" || member.year === selectedYear
  );

  // Sort members by position hierarchy (including all 6 positions)
  const sortedMembers = filteredMembers.sort((a, b) => {
    const aIndex = ALL_POSITIONS.indexOf(a.position);
    const bIndex = ALL_POSITIONS.indexOf(b.position);

    // If position is not found, put it at the end
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

        {/* Carousel */}
        {sortedMembers.length > 0 ? (
          <div className="relative mb-12">
            <CustomCarousel itemsData={sortedMembers}>
              {sortedMembers.slice(0, 6).map((member) => (
                <div key={member.id} className="w-full h-full min-h-[400px] flex">
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
                    onContactClick={() => console.log(`Contact ${member.name}`)}
                  />
                 
                </div>
              ))}
            </CustomCarousel>
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
          <CustomButton onClick={handleViewAllMembers} size="lg">
            View All Members
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default CommitteeMembersCarousel;