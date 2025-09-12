import React, { useState } from "react";
import { X, Calendar, Users, MapPin, Award, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
export interface GalleryItem {
  id: number;
  src: string;
  title: string;
  event: string;
  date: string;
  participants: number;
  location: string;
  category: string;
  description: string;
  highlights: string[];
}

// ✅ Gallery data
export const galleryData: GalleryItem[] = [
  {
    id: 1,
    src: "/images/installation.jpg",
    title: "AI Workshop",
    event: "Hands-on session on AI and ML",
    date: "March 2025",
    participants: 120,
    location: "Auditorium",
    category: "Workshop",
    description: "A practical workshop introducing AI concepts to students with interactive sessions and real-world applications.",
    highlights: ["Live coding demonstrations", "AI model training", "Q&A with industry experts"],
  },
  {
    id: 2,
    src: "/images/cohort.jpg",
    title: "Hackathon 2025",
    event: "24-hour coding challenge",
    date: "April 2025",
    participants: 200,
    location: "Lab Complex",
    category: "Hackathon",
    description: "Students collaborated in teams to solve real-world problems using cutting-edge technology and innovative solutions.",
    highlights: ["Team collaboration", "Cash prizes", "Expert mentorship"],
  },
  {
    id: 3,
    src: "/images/csi-kkw-logo.png",
    title: "Tech Seminar",
    event: "Talk on Cybersecurity",
    date: "May 2025",
    participants: 80,
    location: "Seminar Hall",
    category: "Seminar",
    description: "Industry expert shared comprehensive insights on the latest cybersecurity trends and threat landscape.",
    highlights: ["Latest security trends", "Professional networking", "Interactive Q&A session"],
  },
  {
    id: 4,
    src: "/images/eyantran.jpg",
    title: "Exhibition Day",
    event: "Student project showcase",
    date: "June 2025",
    participants: 150,
    location: "Main Hall",
    category: "Exhibition",
    description: "A comprehensive showcase of innovative student projects spanning multiple technology domains and research areas.",
    highlights: ["Live project demonstrations", "Faculty evaluation", "Innovation awards"],
  },
  {
    id: 5,
    src: "/images/c2c.jpg",
    title: "Coding Competition",
    event: "Algorithmic coding challenge",
    date: "July 2025",
    participants: 100,
    location: "Computer Lab",
    category: "Competition",
    description: "Intense coding competition where students demonstrated their algorithmic thinking and problem-solving skills.",
    highlights: ["Complex algorithms", "Time-based challenges", "Achievement certificates"],
  },
  {
    id: 6,
    src: "/images/pc.jpg",
    title: "Networking Meetup",
    event: "Connect with alumni and industry professionals",
    date: "August 2025",
    participants: 60,
    location: "Cafeteria",
    category: "Networking",
    description: "An exclusive opportunity for students to connect with successful alumni and industry professionals.",
    highlights: ["Career guidance", "Industry insights", "Professional connections"],
  },
];

const categories = [
  "All",
  "Workshop",
  "Hackathon",
  "Seminar",
  "Exhibition",
  "Competition",
  "Networking",
];

export const GallerySection = (): JSX.Element => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredData, setFilteredData] = useState(galleryData);

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredData(galleryData);
    } else {
      setFilteredData(galleryData.filter((item) => item.category === category));
    }
  };

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = "unset";
  };

  // Get responsive grid classes for each item
  const getGridClass = (index: number) => {
    const patterns = [
      "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-8 row-span-1 sm:row-span-2 md:row-span-2 lg:row-span-2",
      "col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-4 row-span-1 sm:row-span-1 md:row-span-2 lg:row-span-2", 
      "col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-4 row-span-1 sm:row-span-2 md:row-span-1 lg:row-span-1",
      "col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-6 row-span-1 sm:row-span-1 md:row-span-2 lg:row-span-2",
      "col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-3 row-span-1 sm:row-span-2 md:row-span-1 lg:row-span-1",
      "col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3 row-span-1 sm:row-span-1 md:row-span-2 lg:row-span-2",
    ];
    return patterns[index % patterns.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-6 sm:py-8 md:py-12 lg:py-20 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-20">
          <div className="mb-6 sm:mb-8 lg:mb-12">
            <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs sm:text-sm lg:text-base font-semibold rounded-full mb-4 sm:mb-6 tracking-wide uppercase shadow-lg transform hover:scale-105 transition-transform duration-300">
              ✨ Event Gallery
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent mb-4 sm:mb-6 tracking-tight leading-tight">
              Excellence in Action
            </h1>
            <div className="w-32 sm:w-48 lg:w-80 h-1 sm:h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 mx-auto mb-4 sm:mb-6 lg:mb-8 rounded-full shadow-sm"></div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light px-4 sm:px-6">
              Documenting our commitment to innovation, leadership, and academic excellence through impactful events that shape tomorrow's technology leaders and drive meaningful change.
            </p>
          </div>

          {/* Enhanced Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-6 sm:mt-8 md:mt-12 lg:mt-16 pt-6 sm:pt-8 md:pt-12 lg:pt-16 border-t border-slate-200">
            {[
              { label: "Total Participants", value: "710+", color: "from-blue-600 to-blue-700" },
              { label: "Tech Competitions", value: "8+", color: "from-purple-600 to-purple-700" },
              { label: "Workshops Hosted", value: "25+", color: "from-green-600 to-green-700" },
              { label: "Expert Sessions", value: "30+", color: "from-orange-600 to-orange-700" },
            ].map((stat, i) => (
              <div key={i} className="text-center group cursor-pointer">
                <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-all duration-300`}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-slate-500 uppercase tracking-wider font-medium px-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Category Filter */}
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-1 sm:px-2 md:px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 text-xs sm:text-sm lg:text-base rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg ${
                activeCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-blue-200 scale-105"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-2 sm:gap-3 md:gap-4 lg:gap-6 auto-rows-[180px] sm:auto-rows-[200px] md:auto-rows-[240px] lg:auto-rows-[280px]">
          {filteredData.map((item, index) => (
            <div
              key={item.id}
              className={`group cursor-pointer relative overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 hover:border-blue-300 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-100 transform hover:scale-[1.02] lg:hover:scale-[1.03] hover:z-20 ${getGridClass(index)}`}
              onClick={() => openModal(item)}
              style={{
                animation: `slideUp 0.8s ease-out ${index * 0.15}s both`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
              
              {/* Enhanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-500"></div>

              {/* Floating Action Button */}
              <div className="absolute top-3 sm:top-4 lg:top-6 right-3 sm:right-4 lg:right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-white/20 backdrop-blur-xl text-white p-2 sm:p-3 rounded-xl shadow-2xl border border-white/20 hover:bg-white/30 transition-all duration-300">
                  <ExternalLink size={16} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </div>
              </div>

              {/* Enhanced Content Overlay */}
              <div className="absolute inset-0 p-4 sm:p-5 lg:p-8 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 sm:translate-y-6 group-hover:translate-y-0">
                <div className="mb-3 sm:mb-4">
                  <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-sm border border-white/20 shadow-lg">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-bold text-lg sm:text-xl lg:text-2xl leading-tight mb-2 sm:mb-3 drop-shadow-lg">
                  {item.title}
                </h3>
                <p className="text-slate-200 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 font-medium line-clamp-2 drop-shadow-md">
                  {item.event}
                </p>

                <div className="flex items-center justify-between text-xs sm:text-sm lg:text-base text-slate-300">
                  <div className="flex items-center bg-black/20 px-2 sm:px-3 py-1 rounded-lg backdrop-blur-sm">
                    <Calendar size={12} className="sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="font-medium">{item.date}</span>
                  </div>
                  <div className="flex items-center bg-black/20 px-2 sm:px-3 py-1 rounded-lg backdrop-blur-sm">
                    <Users size={12} className="sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="font-medium">{item.participants}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced View All Button */}
        <div className="flex justify-center mt-10 sm:mt-12 lg:mt-16 px-4">
          <button
            onClick={() => navigate("/gallery")}
            className="group relative px-8 sm:px-10 lg:px-12 py-3 sm:py-4 lg:py-5
              bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600
              text-white font-bold rounded-2xl shadow-2xl shadow-blue-200
              overflow-hidden transition-all duration-500
              hover:scale-105 hover:shadow-3xl hover:shadow-blue-300
              transform active:scale-95"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 via-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            <span className="absolute -left-12 top-0 w-32 h-full bg-white/30 transform skew-x-12 translate-x-0 group-hover:translate-x-[400%] transition-transform duration-1000"></span>
            <span className="relative z-10 tracking-wider text-sm sm:text-base lg:text-lg font-bold group-hover:scale-105 transition-transform duration-300 flex items-center">
              <ExternalLink size={18} className="mr-2 sm:mr-3 group-hover:rotate-12 transition-transform duration-300" />
              View Complete Gallery
            </span>
          </button>
        </div>

        {/* Enhanced Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6"
            onClick={closeModal}
            style={{ animation: "fadeIn 0.4s ease-out" }}
          >
            <div
              className="bg-white rounded-2xl sm:rounded-3xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-3xl border border-slate-100"
              onClick={(e) => e.stopPropagation()}
              style={{ animation: "modalSlide 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            >
              <div className="relative">
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="w-full h-48 sm:h-64 lg:h-96 object-cover rounded-t-2xl sm:rounded-t-3xl"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8 bg-white/90 backdrop-blur-sm text-slate-800 p-2 sm:p-3 lg:p-4 rounded-full shadow-2xl hover:bg-white hover:scale-110 transition-all duration-300 border border-slate-200"
                >
                  <X size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent rounded-t-2xl sm:rounded-t-3xl"></div>
                <div className="absolute bottom-4 sm:bottom-6 lg:bottom-10 left-4 sm:left-6 lg:left-10 right-4 sm:right-6 lg:right-10 text-white">
                  <span className="inline-block px-3 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 text-xs sm:text-sm lg:text-base font-bold uppercase tracking-wider mb-3 sm:mb-4 lg:mb-6 rounded-xl bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-xl border border-white/20 shadow-2xl">
                    {selectedItem.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-2 sm:mb-3 lg:mb-4 drop-shadow-2xl">
                    {selectedItem.title}
                  </h2>
                  <p className="text-sm sm:text-base lg:text-xl text-slate-200 font-medium drop-shadow-lg">
                    {selectedItem.event}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:p-12">
                <div className="mb-8 sm:mb-10 lg:mb-12">
                  <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed font-normal">
                    {selectedItem.description}
                  </p>
                </div>

                {/* Enhanced Highlights */}
                <div className="mb-8 sm:mb-10 lg:mb-12">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center">
                    <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mr-3 sm:mr-4">
                      <Award size={20} className="sm:w-6 sm:h-6 text-white" />
                    </div>
                    Key Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {selectedItem.highlights.map((highlight, i) => (
                      <div
                        key={i}
                        className="flex items-center text-slate-700 bg-gradient-to-r from-slate-50 to-blue-50 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg group"
                      >
                        <div className="w-2 sm:w-3 h-2 sm:h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-3 sm:mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                        <span className="text-sm sm:text-base font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 pt-8 sm:pt-10 lg:pt-12 border-t-2 border-slate-100">
                  {[
                    { icon: Calendar, label: "Event Date", value: selectedItem.date, color: "from-blue-600 to-blue-700" },
                    { icon: Users, label: "Attendance", value: `${selectedItem.participants} participants`, color: "from-green-600 to-green-700" },
                    { icon: MapPin, label: "Venue", value: selectedItem.location, color: "from-purple-600 to-purple-700" }
                  ].map((detail, i) => (
                    <div key={i} className="text-center group hover:scale-105 transition-transform duration-300">
                      <div className={`bg-gradient-to-r ${detail.color} p-4 sm:p-5 lg:p-6 mb-4 sm:mb-6 inline-flex items-center justify-center rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        <detail.icon size={24} className="sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                      </div>
                      <p className="font-bold text-slate-900 mb-2 text-sm sm:text-base lg:text-lg">{detail.label}</p>
                      <p className="text-slate-600 text-sm sm:text-base font-medium">{detail.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlide {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(40px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 640px) {
          .shadow-3xl {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
        }
      `}</style>
    </div>
  );
};