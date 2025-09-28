import React, { useState } from "react";
import { X, Calendar, Users, MapPin, ExternalLink } from "lucide-react";
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
    description:
      "A practical workshop introducing AI concepts to students with interactive sessions and real-world applications.",
    highlights: [
      "Live coding demonstrations",
      "AI model training",
      "Q&A with industry experts",
    ],
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
    description:
      "Students collaborated in teams to solve real-world problems using cutting-edge technology and innovative solutions.",
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
    description:
      "Industry expert shared comprehensive insights on the latest cybersecurity trends and threat landscape.",
    highlights: [
      "Latest security trends",
      "Professional networking",
      "Interactive Q&A session",
    ],
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
    description:
      "A comprehensive showcase of innovative student projects spanning multiple technology domains and research areas.",
    highlights: [
      "Live project demonstrations",
      "Faculty evaluation",
      "Innovation awards",
    ],
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
    description:
      "Intense coding competition where students demonstrated their algorithmic thinking and problem-solving skills.",
    highlights: [
      "Complex algorithms",
      "Time-based challenges",
      "Achievement certificates",
    ],
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
    description:
      "An exclusive opportunity for students to connect with successful alumni and industry professionals.",
    highlights: [
      "Career guidance",
      "Industry insights",
      "Professional connections",
    ],
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
      setFilteredData(
        galleryData.filter((item) => item.category === category)
      );
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

  // ✅ Balanced patterns for perfect rectangle layout
  const patterns = [
    "col-span-2 row-span-2", // big square
    "col-span-2 row-span-1", // wide
    "col-span-1 row-span-2", // tall
    "col-span-1 row-span-1", // small
    "col-span-2 row-span-1", // wide
    "col-span-1 row-span-1", // small
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-6 sm:py-10 px-2 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl mb-6 shadow-md">
            Event Gallery
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent mb-6">
            Excellence in Action
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto text-center">
            Documenting our commitment to innovation, leadership, and academic
            excellence through impactful events that shape tomorrow's technology
            leaders and drive meaningful change.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-6 py-2 text-sm rounded-xl font-semibold transition-all ${
                activeCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:text-blue-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* ✅ Final Perfect Bento Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 auto-rows-[150px] gap-4">
          {filteredData.map((item, index) => {
            const sizeClass = patterns[index % patterns.length];
            return (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-xl border border-slate-200 hover:border-blue-300 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] ${sizeClass}`}
                onClick={() => openModal(item)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="font-bold text-sm sm:text-base mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm">{item.event}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate("/gallery")}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-md hover:scale-105 transition-transform"
          >
            <ExternalLink size={18} className="inline mr-2" />
            View Complete Gallery
          </button>
        </div>

        {/* Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white/90 text-slate-800 p-2 rounded-full shadow hover:bg-white"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">
                  {selectedItem.title}
                </h2>
                <p className="text-slate-600 mb-6">{selectedItem.event}</p>
                <p className="text-slate-700 mb-6">{selectedItem.description}</p>
                <h3 className="font-bold mb-3">Highlights</h3>
                <ul className="list-disc pl-5 text-slate-700 mb-6">
                  {selectedItem.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div>
                    <Calendar className="mx-auto text-blue-600 mb-2" />
                    <p className="font-bold">{selectedItem.date}</p>
                  </div>
                  <div>
                    <Users className="mx-auto text-green-600 mb-2" />
                    <p className="font-bold">
                      {selectedItem.participants} participants
                    </p>
                  </div>
                  <div>
                    <MapPin className="mx-auto text-purple-600 mb-2" />
                    <p className="font-bold">{selectedItem.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
