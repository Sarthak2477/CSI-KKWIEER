import React, { useState, useRef, useCallback } from "react";
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
  "Social Media Team",
  "Creative Team",
  "Technical Team",
  "Core Committee",
];

// Complete committee members data for all years
const committeeMembers: CommitteeMember[] = [
  // 2025 Members
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
    linkedin: "http://www.linkedin.com/in/shweta-yeola-3a8075296/din:",
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
  {
    id: "7",
    name: "Akshada Kale",
    position: "Editorial Team",
    year: "2025",
    image: "/images/2025/7Akshada.png",
    linkedin:
      "https://www.linkedin.com/in/sadique-khatib-4175342a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    id: "8",
    name: "Palak Lokwani",
    position: "Editorial Team",
    year: "2025",
    image: "/images/2025/8Palak.png",
    linkedin:
      "https://www.linkedin.com/in/palak-lokwani-4137a2244?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    id: "9",
    name: "Deepali Patil",
    position: "Social Media Team",
    year: "2025",
    image: "/images/2025/9Deepali.png",
    linkedin:
      "https://www.linkedin.com/in/deepali-patil-4a0a64211?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    id: "10",
    name: "Vaibhav Patil",
    position: "Social Media Team",
    year: "2025",
    image: "/images/2025/10Vaibhav.png",
    linkedin:
      "https://www.linkedin.com/in/deepali-patil-4a0a64211?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    id: "11",
    name: "Shantanu Patil",
    position: "Creative Team",
    year: "2025",
    image: "/images/2025/11Shantanu.png",
    linkedin:
      "https://www.linkedin.com/in/deepali-patil-4a0a64211?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    id: "12",
    name: "Prasad Borade",
    position: "Creative Team",
    year: "2025",
    image: "/images/2025/12Prasad.png",
    linkedin: "https://www.linkedin.com/in/prasad-borade-6a512b298",
  },
  {
    id: "13",
    name: "Dhruvesh Patil",
    position: "Technical Team",
    year: "2025",
    image: "/images/2025/13Dhruvesh.png",
    linkedin: "https://www.linkedin.com/in/dhruvesh-patil-a31917280",
  },
  {
    id: "14",
    name: "Sarthak Pawar",
    position: "Technical Team",
    year: "2025",
    image: "/images/2025/14Sarthak.png",
    linkedin: "https://www.linkedin.com/in/sarthak-pawar/",
  },
  {
    id: "15",
    name: "Yash Gatkal",
    position: "Core Committee",
    year: "2025",
    image: "/images/2025/15Yash.png",
    linkedin: "https://www.linkedin.com/in/yash-gatkal-b55b18219",
  },
  {
    id: "16",
    name: "Hetavi Rampariya",
    position: "Core Committee",
    year: "2025",
    image: "/images/2025/16Hetavi.png",
    linkedin:
      "https://www.linkedin.com/in/hetavi-rampariya-130423296?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    id: "17",
    name: "Ayush Lad",
    position: "Core Committee",
    year: "2025",
    image: "/images/2025/17Ayush.png",
    linkedin:
      "https://www.linkedin.com/in/ayush-lad-163a05295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_mediuim=android_app",
  },
  {
    id: "18",
    name: "Bhavesh Kale",
    position: "Core Committee",
    year: "2025",
    image: "/images/2025/18Bhavesh.png",
    linkedin: "http://www.linkedin.com/in/bhaveshka23",
  },
  {
    id: "19",
    name: "Sanket Chaudhari",
    position: "Core Committee",
    year: "2025",
    image: "/images/2025/19Sanket.png",
    linkedin: "https://www.linkedin.com/in/sanketchaudhari1035",
  },
  {
    id: "20",
    name: "Rutuja Nagare",
    position: "Core Committee",
    year: "2025",
    image: "/images/2025/20Rutuja.png",
    linkedin:
      "https://www.linkedin.com/in/rutuja-nagare-8916b5291?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    id: "21",
    name: "Piyush Sanap",
    position: "Core Committee",
    year: "2025",
    image: "/images/2025/21Piyush.png",
    linkedin: "https://linkedin.com/in/piyush-sanap-577855329",
  },
  {
    id: "22",
    name: "Omkar More",
    position: "Core Committee",
    year: "2025",
    image: "/images/2025/22Omkar.png",
    linkedin:
      "https://www.linkedin.com/in/omkar-more-504417320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    id: "23",
    name: "Sakshi Malunjkar",
    position: "Core Committee",
    year: "2025",
    image: "/images/2025/23Sakshi.png",
    linkedin: "https://www.linkedin.com/in/sakshi-malunjkar/",
  },
  {
    id: "24",
    name: "Deodatta Pagar",
    position: "Core Committee",
    year: "2025",
    image: "/images/2025/24Deodatta.png",
    linkedin: "https://www.linkedin.com/in/deodatta-pagar/",
  },
  {
    id: "25",
    name: "Sanchita Rajurkar",
    position: "Core Committee",
    year: "2025",
    image: "/images/2025/25Sanchita.png",
    linkedin: "http://linkedin.com/in/sanchita-rajurkar-840180297",
  },
  {
    id: "26",
    name: "Sneha Nikam",
    position: "Core Committee",
    year: "2025",
    image: "/images/2025/26Sneha.png",
    linkedin:
      "https://www.linkedin.com/in/sneha-nikam-9778422a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
];

// Lazy Loading Hook
const useLazyLoading = (itemsPerPage = 12) => {
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setLoading(true);
          setTimeout(() => {
            setVisibleItems((prevVisible) => prevVisible + itemsPerPage);
            setLoading(false);
          }, 500); // Small delay to show loading state
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, itemsPerPage]
  );

  const resetVisibleItems = () => {
    setVisibleItems(itemsPerPage);
  };

  return { visibleItems, loading, lastElementRef, resetVisibleItems };
};

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm mx-auto">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
        <div className="space-y-2 w-full">
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto"></div>
        </div>
        <div className="w-full h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);

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
  const { visibleItems, loading, lastElementRef, resetVisibleItems } = useLazyLoading(12);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    resetVisibleItems();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  // Get visible members for lazy loading
  const visibleMembers = sortedMembers.slice(0, visibleItems);
  const hasMoreMembers = visibleItems < sortedMembers.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-56">
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
                onClick={() => handleYearChange(year)}
              >
                {year}
              </CustomButton>
            ))}
          </div>

         
        </div>

        {/* Members Grid */}
        {sortedMembers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {visibleMembers.map((member, index) => (
                <div 
                  key={member.id} 
                  className="flex justify-center"
                  ref={
                    index === visibleMembers.length - 1 && hasMoreMembers
                      ? lastElementRef
                      : null
                  }
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
                    onContactClick={() => console.log(`Contact ${member.name}`)}
                  />
                </div>
              ))}
            </div>

            {/* Loading Skeletons */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                {Array.from({ length: 8 }).map((_, index) => (
                  <LoadingSkeleton key={`skeleton-${index}`} />
                ))}
              </div>
            )}

            {/* Load More Button (fallback for users who prefer manual loading) */}
            {hasMoreMembers && !loading && (
              <div className="text-center">
                <CustomButton
                  onClick={() => {
                    setVisibleItems(prev => prev + 12);
                  }}
                  variant="outline"
                  size="lg"
                  className="mb-8"
                >
                  Load More Members
                </CustomButton>
              </div>
            )}

            
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No members found for the selected year.
            </p>
          </div>
        )}

        {/* Scroll to Top Button */}
        {visibleItems > 24 && (
          <div className="fixed bottom-8 right-8">
            <CustomButton
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="rounded-full w-12 h-12 p-0 shadow-lg"
            >
              ↑
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
};