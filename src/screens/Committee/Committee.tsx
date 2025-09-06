import React, { useState } from "react";
import { Navbar } from "../../components/ui/navbar";
import ProfileCard from "../../components/ProfileCard";

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
  "Editorial Team",
];

// Complete committee members data for all years
const committeeMembers: CommitteeMember[] = [
  // 2025 Members
  {
    id: "1",
    name: "Ankit Khandelwal",
    position: "President",
    year: "2025",
    image: "/images/Ankit.png",
    linkedin:
      "https://www.linkedin.com/in/ankit-khandelwal-002474295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    id: "2",
    name: "Mansi Jadhav",
    position: "Vice-President",
    year: "2025",
    image: "/images/Mansi.jpg",
    linkedin: "https://www.linkedin.com/in/manasi-jadhav-3ba44228b/",
  },
  {
    id: "3",
    name: "Shweta Yeola",
    position: "Secretary",
    year: "2025",
    image: "/images/Shweta.jpg",
    linkedin: "http://www.linkedin.com/in/shweta-yeola-3a8075296/din:",
  },
  {
    id: "4",
    name: "Meghraj Bhavsar",
    position: "Joint-Secretary",
    year: "2025",
    image: "/images/Meghraj.jpg",
    linkedin:
      "https://www.linkedin.com/in/meghraj-bhavsar-3449ba289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    id: "5",
    name: "Atharva Jadhav",
    position: "Treasurer",
    year: "2025",
    image: "/images/Atharva.jpg",
    linkedin:
      "https://www.linkedin.com/in/atharva-jadhav-73a997295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    id: "6",
    name: "Sadique Khatib",
    position: "Joint Treasurer",
    year: "2025",
    image: "/images/Sadique.jpg",
    linkedin:
      "https://www.linkedin.com/in/sadique-khatib-4175342a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },

  // 2024 Members
  {
    id: "7",
    name: "Kundan Suryawanshi",
    position: "President",
    year: "2024",
    image: "/images/Ankit.png",
    linkedin: "",
  },
  {
    id: "8",
    name: "Aryan Deshmukh",
    position: "Vice-President",
    year: "2024",
    image: "/images/Mansi.jpg",
    linkedin: "",
  },
  {
    id: "9",
    name: "Khushi Bedmutha",
    position: "Secretary",
    year: "2024",
    image: "/images/Shweta.jpg",
    linkedin: "",
  },
  {
    id: "10",
    name: "Harish Lukare",
    position: "Joint-Secretary",
    year: "2024",
    image: "/images/Meghraj.jpg",
    linkedin: "",
  },
  {
    id: "11",
    name: "Soham Penshanwar",
    position: "Treasurer",
    year: "2024",
    image: "/images/Atharva.jpg",
    linkedin: "",
  },
  {
    id: "12",
    name: "Abhishek Malajangam",
    position: "Joint Treasurer",
    year: "2024",
    image: "/images/Sadique.jpg",
    linkedin: "",
  },

  // 2023 Members
  {
    id: "13",
    name: "Aditi Avhad",
    position: "President",
    year: "2023",
    image: "/images/Ankit.png",
    linkedin: "",
  },
  {
    id: "14",
    name: "Mrunal Bagal",
    position: "Vice-President",
    year: "2023",
    image: "/images/Mansi.jpg",
    linkedin: "",
  },
  {
    id: "15",
    name: "Chinmay Kotkar",
    position: "Secretary",
    year: "2023",
    image: "/images/Shweta.jpg",
    linkedin: "",
  },
  {
    id: "16",
    name: "Aditya Date",
    position: "Joint-Secretary",
    year: "2023",
    image: "/images/Meghraj.jpg",
    linkedin: "",
  },
  {
    id: "17",
    name: "Karan Patel",
    position: "Treasurer",
    year: "2023",
    image: "/images/Atharva.jpg",
    linkedin: "",
  },
  {
    id: "18",
    name: "Om",
    position: "Joint Treasurer",
    year: "2023",
    image: "/images/Sadique.jpg",
    linkedin: "",
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

export const Committee = (): JSX.Element => {
  const [selectedYear, setSelectedYear] = useState("2025");

  const handleViewAllMembers = () => {
    console.log("Navigate to all members view");
  };

  const filteredMembers = committeeMembers.filter(
    (member) => selectedYear === "all" || member.year === selectedYear
  );

  // Sort members by position hierarchy
  const sortedMembers = filteredMembers.sort((a, b) => {
    const aIndex = ALL_POSITIONS.indexOf(a.position);
    const bIndex = ALL_POSITIONS.indexOf(b.position);

    // If position is not found, put it at the end
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  const availableYears = Array.from(
    new Set(committeeMembers.map((member) => member.year))
  ).sort((a, b) => b.localeCompare(a));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            CSI KKWIEER Core Team for{" "}
            {selectedYear === "all"
              ? "All Years"
              : `${selectedYear}-${String(parseInt(selectedYear) + 1).slice(
                  -2
                )}`}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Fuelled by an Unstoppable Crew, Charting the Course to Achievement
          </p>

          {/* Year Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {availableYears.map((year) => (
              <CustomButton
                key={year}
                variant={year === selectedYear ? "default" : "outline"}
                size="md"
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </CustomButton>
            ))}
            <CustomButton
              variant={selectedYear === "all" ? "default" : "outline"}
              size="md"
              onClick={() => setSelectedYear("all")}
            >
              All Years
            </CustomButton>
          </div>
        </div>

        {/* Members Grid */}
        {sortedMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {sortedMembers.map((member) => (
              <div key={member.id} className="flex justify-center">
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
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No members found for the selected year.
            </p>
          </div>
        )}

        {/* Bottom Action Buttons */}
        <div className="flex justify-center gap-4">
          <CustomButton
            variant="default"
            size="lg"
            onClick={handleViewAllMembers}
          >
            Membership
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
