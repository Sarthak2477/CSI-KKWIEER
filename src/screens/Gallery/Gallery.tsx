import React, { useState } from "react";
import { useGallery } from "../../hooks/useGallery";
import { Navbar } from "../../components/ui/navbar";
import { Loader2, Calendar, Users, MapPin } from "lucide-react";

const categories = [
  "All",
  "workshop",
  "seminar", 
  "competition",
  "hackathon",
  "conference",
  "networking",
  "exhibition",
  "other"
];

const Gallery = (): JSX.Element => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Fetch gallery images from backend
  const { images, loading, error } = useGallery({
    ...(activeCategory !== "All" && { category: activeCategory }),
    limit: 20,
  });

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Event Gallery
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Capturing moments of excellence and innovation
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading gallery...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 text-red-600">
            <p>Error loading gallery: {error}</p>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div
                key={image._id}
                className="group cursor-pointer relative overflow-hidden rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Overlay content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0">
                  {image.category && (
                    <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wide mb-3 self-start rounded-md backdrop-blur-sm bg-white/20 text-white">
                      {image.category}
                    </span>
                  )}
                  
                  <h3 className="font-medium text-white mb-1 text-lg leading-tight">
                    {image.title}
                  </h3>
                  
                  {image.description && (
                    <p className="text-slate-200 text-sm mb-3 font-light line-clamp-2">
                      {image.description}
                    </p>
                  )}
                  
                  {image.eventName && (
                    <div className="flex items-center text-xs text-slate-300">
                      <Calendar size={12} className="mr-1" />
                      {image.eventName}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && images.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Images Found
            </h3>
            <p className="text-gray-500">
              Check back soon for new gallery images in this category!
            </p>
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
      `}</style>
    </div>
  );
};

export default Gallery;
