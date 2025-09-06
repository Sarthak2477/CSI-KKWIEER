import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Card } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";

type Event = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const DESCRIPTION_LIMIT = 120;

const events: Event[] = [
  {
    id: 1,
    title: "CSI Installation Ceremony",
    description:
      "Installation for the new board members of the CSI KKWIEER for academic year 2025-26. Every ending writes a new beginning, together we carry the legacy ahead",
    image: "/images/installation.jpg",
  },
  {
    id: 2,
    title: "Google Cohort Programme",
    description:
      "The Department of Computer Engineering at KKWIEER hosted the Google Cloud Arcade Facilitator Program 2025 – Cohort 2 Guidance Sessions, aimed at introducing students to cloud learning opportunities, gamified upskilling, and community building.",
    image: "/images/cohort.jpg",
  },
  {
    id: 3,
    title: "Campus To Corporate 3.0",
    description:
      "Campus to Corporate was a powerful-packed session filled with industry trends, career insights, and practical tips to help students transition from academic life to the corporate world with confidence.",
    image: "/images/c2c.jpg",
  },
  {
    id: 4,
    title: "E-Yantran 2024-25",
    description:
      "Turn your trash into Treasure is what we followed in E-Yantran 2025. A flagship initiative . driving change through E-Waste awareness and collection, empowering communities for a sustainable future.",
    image: "/images/eyantran.jpg",
  }
];

export const EventsCarousel = (): JSX.Element => {
  const navigate = useNavigate();

  const truncateDescription = (text: string) => {
    if (text.length <= DESCRIPTION_LIMIT) return text;
    return text.substring(0, DESCRIPTION_LIMIT) + "...more";
  };

  return (
    <section className="relative w-full py-20 overflow-hidden bg-transparent">
      {/* Section heading */}
      <div className="relative z-10 text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600">Think. Build. Compete</h1>
        <p className="text-lg text-black-800 mt-2">Recent Events</p>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={false}
        pagination={{ clickable: true }}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        speed={3000}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-6xl px-4 mb-8"
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <Card className="p-6 shadow-xl rounded-2xl bg-white/80 backdrop-blur-lg border border-white-200 h-[500px] flex flex-col">
              {/* Fixed Image with constant 1:2 horizontal rectangle ratio */}
              <div className="w-full h-[180px] md:h-[200px] lg:h-[220px] overflow-hidden rounded-xl shadow-md">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 mt-4">
                <h2 className="text-2xl font-semibold text-gray-800">{event.title}</h2>
                <p className="mt-2 text-gray-600 leading-relaxed flex-1">
                  {truncateDescription(event.description)}
                </p>
                <Button
                  className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow hover:opacity-90 transition"
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  Learn More
                </Button>
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* View All Button */}
      {/* View All Button */}
      {/* View All Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/events")}
          className="
            relative
            px-8 py-3
            bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500
            text-white
            font-semibold
            rounded-md
            shadow-lg
            overflow-hidden
            group
            transition-all
            duration-300
            ease-in-out
            hover:scale-105
          "
        >
          {/* Animated text overlay */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-md"></span>

          {/* Moving background stripe on hover */}
          <span className="absolute -left-8 top-0 w-24 h-full bg-white/20 rounded-full transform rotate-45 translate-x-0 group-hover:translate-x-[200%] transition-transform duration-700"></span>

          {/* Button text */}
          <span className="relative z-10 tracking-wider text-lg group-hover:scale-105 transition-transform duration-300">
            View All
          </span>
        </button>
      </div>


    </section>
  );
};
