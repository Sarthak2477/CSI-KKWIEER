import { useState } from "react";
import { Award, Calendar, ChevronDown, ChevronUp, Network, Users, FileText } from "lucide-react";

export const AboutUs = () => {
  const [expanded, setExpanded] = useState(false);
  const [activityReportsExpanded, setActivityReportsExpanded] = useState(false);
  const [committeeListsExpanded, setCommitteeListsExpanded] = useState(false);

  const committeeData = [
    { year: "2023-2024", link: "/pdfs/committee_2023_2024.pdf" },
    { year: "2022-2023", link: "/pdfs/committee_2022_2023.pdf" },
    { year: "2021-2022", link: "/pdfs/committee_2021_2022.pdf" },
    { year: "2020-2021", link: "/pdfs/committee_2020_2021.pdf" },
    { year: "2019-2020", link: "/pdfs/committee_2019_2020.pdf" },
  ];

  const activityReports = [
    { year: "2022-2023", link: "/pdfs/activity_2022_2023.pdf" },
    { year: "2021-2022", link: "/pdfs/activity_2021_2022.pdf" },
    { year: "2020-2021", link: "/pdfs/activity_2020_2021.pdf" },
    { year: "2019-2020", link: "/pdfs/activity_2019_2020.pdf" },
  ];

  return (
    <section className="py-4 sm:py-6 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <h2 className="relative inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold gradient-text mb-6 sm:mb-8 animate-fade-in-up">
        About Us
        <span className="absolute left-0 -bottom-2 w-full h-[2px] sm:h-[3px] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 rounded-full"></span>
      </h2>

      {/* Intro (always visible) */}
      <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 text-center sm:text-left">
        The CSI student branch at KKWIEER, established in 1995-96, is one of the most vibrant in Maharashtra & Goa.
        Recognized 7 times as the "Best Student Branch", it has over 500 student members and organizes regular technical
        events such as quizzes, seminars, and workshops. Faculty and students benefit from publications, communication
        networks, and financial support for research.
      </p>

      {/* Modern Read More/Less Button */}
      <div className="flex justify-center mb-4 sm:mb-6">
        <button
          onClick={() => setExpanded(!expanded)}
          className="group relative inline-flex items-center gap-2 px-4 sm:px-5 md:px-7 py-2 sm:py-3 
               bg-white text-blue-600 font-medium rounded-full border border-blue-600
               transition-all duration-300 ease-out
               hover:bg-blue-600 hover:text-white"
        >
          <span className="text-sm sm:text-base md:text-lg">
            {expanded ? "Read Less" : "Read More"}
          </span>

          <div className="transition-transform duration-300 ease-out group-hover:translate-y-[-1px]">
            {expanded ? (
              <ChevronUp className="w-4 h-4 md:w-5 md:h-5" />
            ) : (
              <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
            )}
          </div>
        </button>
      </div>

      {/* Expanded Content with Smooth Animation */}
      <div
        className={`overflow-hidden transition-all duration-700 ease-in-out ${expanded
          ? "max-h-[5000px] opacity-100"
          : "max-h-0 opacity-0"
          }`}
      >
        <div className="space-y-6 sm:space-y-8 md:space-y-10 pt-4">
          {/* Detailed Info */}
          <div className="text-gray-700 space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base leading-relaxed transform transition-transform duration-500 ease-out">
            <p className="animate-fade-in-up" style={{ animationDelay: "0.1s", textAlign: "justify" }}>
              CSI was founded in 1965 by a small group of IT professionals who wanted to exchange ideas and organize activities
              in the emerging computer science field. Today, CSI is the largest and most professionally managed association for
              IT professionals in India with over 100,000 members.
            </p>
            <p className="animate-fade-in-up" style={{ animationDelay: "0.2s", textAlign: "justify" }}>
              Members include software developers, scientists, academicians, CIOs, CTOs, and vendors across various sectors.
              CSI currently has over 500 student branches across 73+ locations and aims to expand further into smaller towns and cities.
            </p>
            <p className="animate-fade-in-up" style={{ animationDelay: "0.3s", textAlign: "justify" }}>
              At KKWIEER, Prof. A. V. Kolapkar leads the student branch as Coordinator and has received the "Best Student Branch Coordinator" award.
              Faculty receive access to CSI Journals and Communications, and both students and faculty benefit from research grants and tech exposure.
              Prof. Dr. S. S. Sane, a key contributor, now serves as Regional Vice President for Maharashtra & Goa.
            </p>
          </div>

          {/* Image 1 - Fully Responsive */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="w-full max-w-4xl mx-auto">
              <img
                src="/images/csi_img1.png"
                alt="Prof. Dr. S.S. Sane receiving Best Student Branch Award"
                className="w-full h-auto max-h-[180px] sm:max-h-[250px] md:max-h-[350px] lg:max-h-[400px] object-contain rounded-lg sm:rounded-xl transition-transform duration-500 shadow-md"
              />
              <p className="text-xs sm:text-sm text-gray-600 text-center font-medium mt-2 px-2">
                Prof. Dr. S.S. Sane receiving "Best Student Branch" Award on 51th Annual Convention at Coimbatore. The seed for the Computer Society of India (CSI) was first sown in the year 1965 with a handful of IT enthusiasts who were a computer user group and felt the need to organize their activities.
              </p>
            </div>
          </div>

          {/* Image 2 - Fully Responsive */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <div className="w-full max-w-4xl mx-auto">
              <img
                src="/images/csi_img2.png"
                alt="Mr. A. V. Kolapkar receiving Longest Continuous Student Branch Counselor Award"
                className="w-full h-auto max-h-[180px] sm:max-h-[250px] md:max-h-[350px] lg:max-h-[400px] object-contain rounded-lg sm:rounded-xl transition-transform duration-500 shadow-md"
              />
              <p className="mt-2 text-xs sm:text-sm text-gray-600 text-center font-medium px-2">
                Mr. A. V. Kolapkar receiving "Longest Continuous Student Branch Counselor" Award from CSI President Prof. Bipin Mehta on 5dec 2015 at CSI Golden Jubilee Annual convention at New Delhi
              </p>
            </div>
          </div>

          {/* Image 3 - Fully Responsive */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <div className="w-full max-w-4xl mx-auto">
              <img
                src="/images/csi_img3.png"
                alt="Mr. Khitij Khakurdikar receiving Highest Committed Student Branch Activist Award"
                className="w-full h-auto max-h-[180px] sm:max-h-[250px] md:max-h-[350px] lg:max-h-[400px] object-contain rounded-lg sm:rounded-xl transition-transform duration-500  shadow-md"
              />
              <p className="mt-2 text-xs sm:text-sm text-gray-600 text-center font-medium px-2">
                Mr. Khitij Khakurdikar receiving "Highest Committed Student Branch Activist" Award by CSI President on 2013 at CSI Annual convention at Vishakapattanam
              </p>
            </div>
          </div>

          {/* Activity Reports Section with Dropdown */}
          <div className="mt-8 sm:mt-12 md:mt-16">
            <div className="flex justify-center mb-6 sm:mb-8">
              <button
                onClick={() => setActivityReportsExpanded(!activityReportsExpanded)}
                className="group relative inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 
                bg-white text-blue-600 font-medium rounded-full 
                transition-all duration-300 ease-out
                focus:outline-none 
                min-w-[220px] justify-center"
              >
                <FileText className="w-4 h-4" />
                <span className="text-sm sm:text-base">
                  {activityReportsExpanded ? "Hide Activity Reports" : "View Activity Reports"}
                </span>
                <div className="transition-transform duration-300 ease-out group-hover:translate-y-[-1px]">
                  {activityReportsExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
         <span className="absolute left-0 -bottom-2 w-full h-[2px] sm:h-[3px] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 rounded-full"></span>
              </button>
            </div>

            {/* Activity Reports Grid with Animation */}
            <div
              className={`overflow-hidden transition-all duration-700 ease-in-out ${activityReportsExpanded
                ? "max-h-[2000px] opacity-100"
                : "max-h-0 opacity-0"
                }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pt-4">
                {activityReports.map((report, index) => (
                  <div
                    key={report.year}
                    className="group bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-500 rounded-full p-2 sm:p-3">
                          <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                            Activity Report
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">{report.year}</p>
                        </div>
                      </div>
                    </div>

                    <a
                      href={report.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center w-full justify-center px-3 sm:px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-medium text-sm sm:text-base"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View Report
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CSI Committee Lists Section with Dropdown */}
          <div className="mt-8 sm:mt-12 md:mt-16">
            <div className="flex justify-center mb-6 sm:mb-8">
              <button
                onClick={() => setCommitteeListsExpanded(!committeeListsExpanded)}
                className="group relative inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 
                bg-white text-blue-600 font-medium rounded-full 
                transition-all duration-300 ease-out
                focus:outline-none 
                min-w-[220px] justify-center"
              >
                <Users className="w-4 h-4" />
                <span className="text-sm sm:text-base">
                  {committeeListsExpanded ? "Hide Committee Lists" : "View Committee Lists"}
                </span>
                <div className="transition-transform duration-300 ease-out group-hover:translate-y-[-1px]">
                  {committeeListsExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
         <span className="absolute left-0 -bottom-2 w-full h-[2px] sm:h-[3px] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 rounded-full"></span>

              </button>
            </div>

            {/* Committee Lists Grid with Animation */}
            <div
              className={`overflow-hidden transition-all duration-700 ease-in-out ${committeeListsExpanded
                ? "max-h-[2000px] opacity-100"
                : "max-h-0 opacity-0"
                }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pt-4">
                {committeeData.map((committee, index) => (
                  <div
                    key={committee.year}
                    className="group bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-500 rounded-full p-2 sm:p-3">
                          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                            Committee List
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">{committee.year}</p>
                        </div>
                      </div>
                    </div>

                    <a
                      href={committee.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center w-full justify-center px-3 sm:px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-medium text-sm sm:text-base"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View List
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Grid - Enhanced Mobile Responsiveness */}
      <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 lg:grid-rows-5 gap-3 sm:gap-4 lg:gap-6 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">

        {/* Main CSI Logo Section */}
        <div className="sm:col-span-2 lg:col-span-3 lg:row-span-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
          <div className="relative">
            <img
              src="/images/csi.png"
              alt="CSI Logo"
              className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-full blur-xl -z-10"></div>
          </div>
          <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-800 mt-2 sm:mt-4 lg:mt-6 text-center">
            Computer Society of India
          </h3>
          <p className="text-blue-600 text-center mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base">
            KKWIEER Chapter
          </p>
        </div>

        {/* Events Organized */}
        <div className="lg:row-span-2 lg:col-start-1 lg:row-start-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 mb-2 sm:mb-3 lg:mb-4" />
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2">30+</div>
          <div className="text-xs sm:text-sm lg:text-base font-medium text-center">Events Organized</div>
          <div className="text-xs lg:text-sm text-blue-100 text-center mt-1">This Year</div>
        </div>

        {/* Student Branches */}
        <div className="lg:row-span-2 lg:col-start-2 lg:row-start-4 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
          <Network className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 mb-2 sm:mb-3 lg:mb-4" />
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2">72</div>
          <div className="text-xs sm:text-sm lg:text-base font-medium text-center">Student Branches</div>
          <div className="text-xs lg:text-sm text-blue-100 text-center mt-1">Across Region</div>
        </div>

        {/* Leadership Card */}
        <div className="sm:col-span-2 lg:col-span-3 lg:col-start-3 lg:row-start-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 flex items-center shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
          <div className="bg-blue-500 rounded-full p-2 sm:p-3 lg:p-4 mr-3 sm:mr-4 lg:mr-6 flex-shrink-0">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-blue-800 mb-1 sm:mb-2">Leadership</h4>
            <p className="text-blue-700 text-xs sm:text-sm lg:text-base leading-relaxed">
              Guiding and inspiring others toward a common goal through innovation and excellence.
            </p>
          </div>
        </div>

        {/* Networking Card */}
        <div className="sm:col-span-2 lg:col-span-3 lg:col-start-3 lg:row-start-5 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 flex items-center shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
          <div className="bg-blue-600 rounded-full p-2 sm:p-3 lg:p-4 mr-3 sm:mr-4 lg:mr-6 flex-shrink-0">
            <Network className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-blue-800 mb-1 sm:mb-2">Networking</h4>
            <p className="text-blue-700 text-xs sm:text-sm lg:text-base leading-relaxed">
              Building valuable connections and collaborations within the tech community.
            </p>
          </div>
        </div>

        {/* Team Members */}
        <div className="sm:col-span-2 lg:col-span-2 lg:row-span-3 lg:col-start-4 lg:row-start-1 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
          <Users className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 mb-2 sm:mb-3 lg:mb-4 xl:mb-6" />
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-1 sm:mb-2 lg:mb-3 xl:mb-4">26</div>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold mb-1 sm:mb-2">Strong & Committed</div>
            <div className="text-xs sm:text-sm lg:text-base text-blue-100">Team Members</div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        .gradient-text {
          background: linear-gradient(135deg, #3B82F6, #1E40AF, #6366F1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        @media (max-width: 640px) {
          .xs\\:w-20 { width: 5rem; }
          .xs\\:h-20 { height: 5rem; }
          .xs\\:w-24 { width: 6rem; }
          .xs\\:h-24 { height: 6rem; }
        }
      `}</style>
    </section>
  );
};

export default AboutUs;
