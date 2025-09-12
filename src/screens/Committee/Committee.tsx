import React, { useState } from "react";
import { Navbar } from "../../components/ui/navbar";
import ProfileCard from "../../components/ProfileCard";
import { useCommitteeMembers } from "../../hooks/useCommittee";
import { Loader2 } from "lucide-react";

// Define all 6 positions in order
const ALL_POSITIONS = [
  "President",
  "Vice-President",
  "Secretary",
  "Joint-Secretary",
  "Treasurer",
  "Joint Treasurer",
  "Editorial Team",
  "Social Media Team",
  "Creative Team",
  "Technical Team",
  "Core Committee",
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
  
  // Fetch committee members from backend
  const { members, availableYears, loading, error } = useCommitteeMembers({
    ...(selectedYear !== "all" && { year: selectedYear }),
    limit: 100,
  });

  const handleViewAllMembers = () => {
    console.log("Navigate to all members view");
  };

  // Use backend data if available
  const filteredMembers = members;

  // Sort members by position hierarchy
  const sortedMembers = filteredMembers.sort((a, b) => {
    const aIndex = ALL_POSITIONS.indexOf(a.position);
    const bIndex = ALL_POSITIONS.indexOf(b.position);

    // If position is not found, put it at the end
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  // Use years from backend or fallback to default years
  const yearsToShow = availableYears.length > 0 ? availableYears : ["2025", "2024", "2023"];

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
            {yearsToShow.map((year) => (
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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading committee members...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 text-red-600">
            <p>Error loading committee members: {error}</p>
          </div>
        )}

        {/* Members Grid */}
        {!loading && !error && sortedMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {sortedMembers.map((member) => (
              <div key={member._id} className="flex justify-center">
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
          !loading && !error && <div className="text-center py-12">
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
