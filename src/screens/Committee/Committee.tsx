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

  // 2024 Members
  {
    id: "27",
    name: "Kundan Suryawanshi",
    position: "President",
    year: "2024",
    image: "/images/2024/1Kundan.png",
    linkedin: "https://www.linkedin.com/in/kundansurya/",
  },
  {
    id: "28",
    name: "Aryan Deshmukh",
    position: "Vice-President",
    year: "2024",
    image: "/images/2024/2aryan.png",
    linkedin: "https://www.linkedin.com/in/aryan-deshmukh-793840259/",
  },
  {
    id: "29",
    name: "Khushi Bedmutha",
    position: "Secretary",
    year: "2024",
    image: "/images/2024/3Khushi.png",
    linkedin: "https://www.linkedin.com/in/khushi-bedmutha-850041257/",
  },
  {
    id: "30",
    name: "Harish Lukare",
    position: "Joint-Secretary",
    year: "2024",
    image: "/images/2024/4Harish.png",
    linkedin: "https://www.linkedin.com/in/lukare-harish/",
  },
  {
    id: "31",
    name: "Soham Penshanwar",
    position: "Treasurer",
    year: "2024",
    image: "/images/2024/5Soham.png",
    linkedin: "https://www.linkedin.com/in/thesoham2203/",
  },
  {
    id: "32",
    name: "Abhishek Malajangam",
    position: "Joint Treasurer",
    year: "2024",
    image: "/images/2024/6Abhishek.png",
    linkedin: "https://www.linkedin.com/in/abhishek-malajangam/",
  },
  {
    id: "33",
    name: "Kashish Dange",
    position: "Editorial Team",
    year: "2024",
    image: "/images/2024/11Kashish.png",
    linkedin: "https://www.linkedin.com/in/kashish-dange-35179b27b/",
  },
  {
    id: "34",
    name: "Samruddhi Narkhede",
    position: "Editorial Team",
    year: "2024",
    image: "/images/2024/12Samruddhi.png",
    linkedin: "https://www.linkedin.com/in/samruddhi-narkhede/",
  },
  {
    id: "35",
    name: "Harshal Patil",
    position: "Social Media Team",
    year: "2024",
    image: "/images/2024/7harsh.png",
    linkedin: "https://www.linkedin.com/in/harshal-patil-534502259/",
  },
  {
    id: "36",
    name: "Yash Chavan",
    position: "Social Media Team",
    year: "2024",
    image: "/images/2024/8Yash.png",
    linkedin: "https://www.linkedin.com/in/yashvchavan/",
  },
  {
    id: "37",
    name: "Kajal Kedar",
    position: "Creative Team",
    year: "2024",
    image: "/images/2024/9Kajal.png",
    linkedin: "https://www.linkedin.com/in/kajal-kedar-293a49258/",
  },
  {
    id: "38",
    name: "Snehal Thombare",
    position: "Creative Team",
    year: "2024",
    image: "/images/2024/10snehal.png",
    linkedin:
      "https://www.linkedin.com/in/snehal-thombare?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    id: "39",
    name: "Pankaj Marathe",
    position: "Core Committee",
    year: "2024",
    image: "/images/2024/13Pankaj.png",
    linkedin: "https://www.linkedin.com/in/pankaj-marathe-9522a8257/",
  },
  {
    id: "40",
    name: "Vinisha Dsouza",
    position: "Core Committee",
    year: "2024",
    image: "/images/2024/19Vinisha.png",
    linkedin: "https://www.linkedin.com/in/vinisha-dsouza-9b9087257/",
  },
  {
    id: "41",
    name: "Sahil Kulkarni",
    position: "Core Committee",
    year: "2024",
    image: "/images/2024/17sahil.png",
    linkedin: "https://www.linkedin.com/in/sahil-kulkarni-181ab1246/",
  },
  {
    id: "42",
    name: "Naman Verma",
    position: "Core Committee",
    year: "2024",
    image: "/images/2024/14Naman.png",
    linkedin: "https://www.linkedin.com/in/namanverma001/",
  },
  {
    id: "43",
    name: "Nishant Khalkar",
    position: "Core Committee",
    year: "2024",
    image: "/images/2024/16Nishant.png",
    linkedin: "https://www.linkedin.com/in/nishant-khalkar-89b0ab34a/",
  },
  {
    id: "44",
    name: "Swarali Bedse",
    position: "Core Committee",
    year: "2024",
    image: "/images/2024/20Swarali.png",
    linkedin: "https://www.linkedin.com/in/swarali-bedse-9440ab256/",
  },
  {
    id: "45",
    name: "Arundhati Sarvadnya",
    position: "Core Committee",
    year: "2024",
    image: "/images/2024/15arundhati.png",
    linkedin: "https://www.linkedin.com/in/arundhati-sarvadnya-081179257/",
  },
  {
    id: "46",
    name: "Satkar Garje",
    position: "Core Committee",
    year: "2024",
    image: "/images/2024/24Satkar.png",
    linkedin: "https://www.linkedin.com/in/satkar-garje-8ba754256/",
  },
  {
    id: "47",
    name: "Nishant Bhise",
    position: "Core Committee",
    year: "2024",
    image: "/images/2024/16Nishant.png",
    linkedin: "https://www.linkedin.com/in/nishant-bhise-825809262/",
  },
  {
    id: "48",
    name: "Priti Rathi",
    position: "Core Committee",
    year: "2024",
    image: "/images/2024/21priti.png",
    linkedin: "https://www.linkedin.com/in/priti-rathi-9090a4258/",
  },
  {
    id: "49",
    name: "Samrudhi Pawar",
    position: "Core Committee",
    year: "2024",
    image: "/images/2024/18samruddhi.png",
    linkedin: "https://www.linkedin.com/in/samrudhi-pawar-68aa03262/",
  },
  {
    id: "50",
    name: "Darshana Kherde",
    position: "Core Committee",
    year: "2024",
    image: "/images/2024/22Darhsna.png",
    linkedin: "https://www.linkedin.com/in/darshana-kherde-baa08428b/",
  },
  // 2023 Members
  {
    id: "51",
    name: "Aditi Avhad",
    position: "President",
    year: "2023",
    image: "/images/2023/1Aditi.png",
    linkedin:
      "https://www.linkedin.com/in/aditi-avhad-a82bb0244/?trk=opento_nprofile_details",
  },
  {
    id: "52",
    name: "Mrunal Bagal",
    position: "Vice-President",
    year: "2023",
    image: "/images/2023/2Mrunal.png",
    linkedin: "https://www.linkedin.com/in/mrunal-bagal-3b8934294/",
  },
  {
    id: "53",
    name: "Chinmay Kotkar",
    position: "Secretary",
    year: "2023",
    image: "/images/2023/3Chinmay.png",
    linkedin: "https://www.linkedin.com/in/chinmaykotkar/",
  },
  {
    id: "54",
    name: "Aditya Date",
    position: "Joint-Secretary",
    year: "2023",
    image: "/images/2023/4aditya.png",
    linkedin: "https://www.linkedin.com/in/adityadate917/",
  },
  {
    id: "55",
    name: "Karan Patel",
    position: "Treasurer",
    year: "2023",
    image: "/images/2023/5karan.png",
    linkedin: "",
  },
  {
    id: "56",
    name: "Om Bankar",
    position: "Joint Treasurer",
    year: "2023",
    image: "/images/2023/6Om.png",
    linkedin: "",
  },
  {
    id: "57",
    name: "Priyanka Patil",
    position: "Editorial Team",
    year: "2023",
    image: "/images/2023/11Priyanka.png",
    linkedin: "",
  },
  {
    id: "58",
    name: "Swarali Tarle",
    position: "Editorial Team",
    year: "2023",
    image: "/images/2023/12Swarali.png",
    linkedin: "https://www.linkedin.com/in/swarali-tarle/",
  },
  {
    id: "59",
    name: "Raj Kuwar",
    position: "Social Media Team",
    year: "2023",
    image: "/images/2023/7Raj.png",
    linkedin: "https://www.linkedin.com/in/raj-kuwar/",
  },
  {
    id: "60",
    name: "Omkar Khurdal",
    position: "Social Media Team",
    year: "2023",
    image: "/images/2023/8Omkar.png",
    linkedin: "https://www.linkedin.com/in/omkar-khurdal-738716252/",
  },
  {
    id: "61",
    name: "Shreya Patil",
    position: "Creative Team",
    year: "2023",
    image: "/images/2023/9Shreya.png",
    linkedin: "https://www.linkedin.com/in/shreyap13/",
  },
  {
    id: "62",
    name: "Ojas Deshpande",
    position: "Creative Team",
    year: "2023",
    image: "/images/2023/10Ojas.png",
    linkedin: "https://www.linkedin.com/in/ojas-deshpande-183b08253/",
  },
  {
    id: "63",
    name: "Jatin Gade",
    position: "Core Committee",
    year: "2023",
    image: "/images/2023/13Jatin.png",
    linkedin: "https://www.linkedin.com/in/jatin-g-0204b5277/",
  },
  {
    id: "64",
    name: "Chaitali Kapse",
    position: "Core Committee",
    year: "2023",
    image: "/images/2023/24Chaitali.png",
    linkedin: "https://www.linkedin.com/in/chaitali-kapse-b60651276/",
  },
  {
    id: "65",
    name: "Sanika Dighe",
    position: "Core Committee",
    year: "2023",
    image: "/images/2023/19sanika.png",
    linkedin: "https://www.linkedin.com/in/sanika-dighe-492370246/",
  },
  {
    id: "66",
    name: "Zaid Patel",
    position: "Core Committee",
    year: "2023",
    image: "/images/2023/14Zaid.png",
    linkedin: "https://www.linkedin.com/in/zaidpatel663/",
  },
  {
    id: "67",
    name: "Ashartha Pagar",
    position: "Core Committee",
    year: "2023",
    image: "/images/2023/23Ashartha.png",
    linkedin: "https://www.linkedin.com/in/ashartha-pagar-46416b291/",
  },
  {
    id: "68",
    name: "Sakshi Nagare",
    position: "Core Committee",
    year: "2023",
    image: "/images/2023/21Sakshi.png",
    linkedin: "https://www.linkedin.com/in/sakshi-nagare-524b38257/",
  },
  {
    id: "69",
    name: "Muskan Verma",
    position: "Core Committee",
    year: "2023",
    image: "/images/2023/15Muskan.png",
    linkedin: "",
  },
  {
    id: "70",
    name: "Vedarth Khandve",
    position: "Core Committee",
    year: "2023",
    image: "/images/2023/18Vedarth.png",
    linkedin: "https://www.linkedin.com/in/vedarth-khandve-tech-professional/",
  },

  {
    id: "71",
    name: "Anshara Pathan",
    position: "Core Committee",
    year: "2023",
    image: "/images/2023/16anshara.png",
    linkedin: "",
  },
  {
    id: "72",
    name: "Yogini Jadhav",
    position: "Core Committee",
    year: "2023",
    image: "/images/2023/22Yogini.png",
    linkedin: "https://www.linkedin.com/in/yoginijadhav/",
  },
  {
    id: "73",
    name: "Yash Khadilkar",
    position: "Core Committee",
    year: "2023",
    image: "/images/2023/17Yash.png",
    linkedin: "https://www.linkedin.com/in/yash-d-khadilkar-603b41253/",
  },
  {
    id: "74",
    name: "Purva Phadol",
    position: "Core Committee",
    year: "2023",
    image: "/images/2023/20Purva.png",
    linkedin: "https://www.linkedin.com/in/purva-phadol/",
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