import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Calendar, Users, MapPin, Award, ExternalLink } from "lucide-react";

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
    description: "A practical workshop introducing AI concepts.",
    highlights: ["Live coding", "AI Models", "Q&A with experts"],
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
    description: "Students collaborated to solve real-world problems.",
    highlights: ["Team projects", "Prizes", "Mentorship"],
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
    description: "Industry expert shared insights on cybersecurity trends.",
    highlights: ["Latest trends", "Networking", "Live Q&A"],
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
    description: "Projects from multiple domains were exhibited.",
    highlights: ["Project demos", "Faculty review", "Innovations"],
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
    description: "Students competed to solve coding problems efficiently.",
    highlights: ["Algorithms", "Time challenges", "Certificates"],
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
    description: "An opportunity for students to meet and interact.",
    highlights: ["Career advice", "Industry insights", "Networking"],
  },
];

const categories = [
  "All",
  "Workshop",
  "Hackathon",
  "Seminar",
  "Exhibition",
  "Competition",
  "Professional Development",
  "Academic",
  "Networking",
];

export const GallerySection = (): JSX.Element => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredData, setFilteredData] = useState(galleryData);
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <span className="inline-block px-5 py-2 bg-blue-600/90 text-white text-sm font-medium rounded-xl mb-6 tracking-wide uppercase shadow-md">
              Event Gallery
            </span>
            <h1 className="text-5xl xl:text-6xl font-light text-slate-900 mb-6 tracking-tight">
              Excellence in Action
            </h1>
            <div className="w-96 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mb-8 rounded-full"></div>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              Documenting our commitment to innovation, leadership, and academic
              excellence through impactful events that shape tomorrow’s
              technology leaders.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-slate-200">
            {[
              { label: "Participants", value: "500+" },
              { label: "Technical Competitions", value: "5+" },
              { label: "Workshops", value: "15+" },
              { label: "Seminars", value: "20+" },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-3xl font-light text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-6 py-2.5 text-sm rounded-2xl font-medium transition-all duration-300 border shadow-sm ${
                activeCategory === category
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:text-blue-800 hover:shadow"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-12 gap-6 auto-rows-[250px]">
          {filteredData.map((item, index) => {
            const gridPatterns = [
              "col-span-12 md:col-span-6 lg:col-span-8 row-span-2",
              "col-span-12 md:col-span-6 lg:col-span-4 row-span-2",
              "col-span-12 md:col-span-6 lg:col-span-4 row-span-1",
              "col-span-12 md:col-span-6 lg:col-span-8 row-span-2",
              "col-span-12 md:col-span-6 lg:col-span-4 row-span-2",
              "col-span-12 md:col-span-6 lg:col-span-8 row-span-1",
            ];

            const pattern = gridPatterns[index % gridPatterns.length];

            return (
              <div
                key={item.id}
                className={`group cursor-pointer relative overflow-hidden rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:z-10 ${pattern}`}
                onClick={() => openModal(item)}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Floating expand icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="bg-white/20 backdrop-blur-md text-white p-2 rounded-lg shadow-lg">
                    <ExternalLink size={18} />
                  </div>
                </div>

                {/* Overlay text */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0">
                  <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wide mb-3 self-start rounded-md backdrop-blur-sm">
                    {item.category}
                  </span>

                  <h3 className="font-medium text-white mb-1 text-lg leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-200 text-sm mb-3 font-light line-clamp-2">
                    {item.event}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {item.date.split(",")[0]}
                    </div>
                    <div className="flex items-center">
                      <Users size={12} className="mr-1" />
                      {item.participants}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/all-gallery")}
            className="relative px-6 sm:px-8 py-2 sm:py-3
              bg-gradient-to-b from-blue-600 via-blue-500 to-blue-600
              text-white font-semibold rounded-lg shadow-lg
              overflow-hidden group transition-all duration-300
              ease-in-out hover:scale-105"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 via-blue-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-md"></span>
            <span className="absolute -left-8 top-0 w-24 h-full bg-white/20 rounded-full transform rotate-45 translate-x-0 group-hover:translate-x-[200%] transition-transform duration-700"></span>
            <span className="relative z-10 tracking-wider text-base sm:text-lg group-hover:scale-105 transition-transform duration-300">
              View Gallery
            </span>
          </button>
        </div>

        {/* Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-[fadeIn_0.4s_ease-out]"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-xl max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl transform animate-[modalScale_0.4s_ease-out]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="w-full h-96 object-cover rounded-t-xl"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 bg-white text-slate-800 p-3 rounded-full shadow-md hover:bg-slate-100 transition-colors duration-300"
                >
                  <X size={20} />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-t-xl"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white drop-shadow-md">
                  <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wide mb-3 rounded-md backdrop-blur-sm bg-white/10">
                    {selectedItem.category}
                  </span>
                  <h2 className="text-4xl font-light mb-2">
                    {selectedItem.title}
                  </h2>
                  <p className="text-lg text-slate-200 font-light">
                    {selectedItem.event}
                  </p>
                </div>
              </div>

              <div className="p-10">
                <div className="mb-8">
                  <p className="text-lg text-slate-700 leading-relaxed font-light">
                    {selectedItem.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-slate-900 mb-4 flex items-center">
                    <Award size={20} className="mr-2 text-slate-600" />
                    Key Highlights
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedItem.highlights.map((highlight, i) => (
                      <div
                        key={i}
                        className="flex items-center text-slate-600 bg-slate-50 px-3 py-2 rounded-md"
                      >
                        <div className="w-2 h-2 bg-slate-400 rounded-full mr-3"></div>
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-200">
                  <div className="text-center">
                    <div className="bg-slate-50 p-4 mb-4 inline-flex items-center justify-center rounded-lg shadow-sm">
                      <Calendar size={24} className="text-slate-600" />
                    </div>
                    <p className="font-medium text-slate-900 mb-1">Event Date</p>
                    <p className="text-slate-600 text-sm">{selectedItem.date}</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-slate-50 p-4 mb-4 inline-flex items-center justify-center rounded-lg shadow-sm">
                      <Users size={24} className="text-slate-600" />
                    </div>
                    <p className="font-medium text-slate-900 mb-1">
                      Attendance
                    </p>
                    <p className="text-slate-600 text-sm">
                      {selectedItem.participants} participants
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-slate-50 p-4 mb-4 inline-flex items-center justify-center rounded-lg shadow-sm">
                      <MapPin size={24} className="text-slate-600" />
                    </div>
                    <p className="font-medium text-slate-900 mb-1">Venue</p>
                    <p className="text-slate-600 text-sm">
                      {selectedItem.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes modalScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};
