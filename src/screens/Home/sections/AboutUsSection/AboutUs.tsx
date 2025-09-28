import { useState } from "react";
import { Award, Calendar, ChevronDown, ChevronUp, Network, Users, FileText, BookOpen, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const AboutUs = () => {
  const [activityReportsExpanded, setActivityReportsExpanded] = useState(false);
  const [showMoreCommittees, setShowMoreCommittees] = useState(false);

  const committeeData = [
    { year: "2023-2024", link: "https://www.kkwagh.edu.in/engineering/pdf/csi-committee-list-2023-24.pdf" },
    { year: "2022-2023", link: "https://www.kkwagh.edu.in/engineering/pdf/csi-committee-list-2022-23.pdf" },
    { year: "2021-2022", link: "https://www.kkwagh.edu.in/engineering/pdf/csi-committee-list-2021-22.pdf" },
    { year: "2020-2021", link: "https://www.kkwagh.edu.in/engineering/pdf/csi-committee-list-2020-21.pdf" },
    { year: "2019-2020", link: "https://www.kkwagh.edu.in/engineering/pdf/csi-committee-list-2019-02.pdf" },
  ];

  const activityReports = [
    { year: "2022-2023", link: "https://www.kkwagh.edu.in/engineering/pdf/2022-23-ar.pdf" },
    { year: "2021-2022", link: "https://www.kkwagh.edu.in/engineering/pdf/2021-22-ar.pdf" },
    { year: "2020-2021", link: "https://www.kkwagh.edu.in/engineering/pdf/2020-21-ar.pdf" },
    { year: "2019-2020", link: "https://www.kkwagh.edu.in/engineering/pdf/2019-20-cr.pdf" },
    { year: "2018-2019", link: "https://www.kkwagh.edu.in/engineering/pdf/iste-students-chapter-annual-report-2017-18.pdf" },
    { year: "2017-2018", link: "https://www.kkwagh.edu.in/engineering/pdf/iste-students-chapter-annual-report-2017-18.pdf" },
    { year: "2016-2017", link: "https://www.kkwagh.edu.in/engineering/pdf/iste-students-chapter-annual-report-2016-17.pdf" },
    { year: "2015-2016", link: "https://www.kkwagh.edu.in/engineering/pdf/csi-committee-list-2019-02.pdf" },
    { year: "2014-2015", link: "https://www.kkwagh.edu.in/engineering/pdf/iste-students-chapter-annual-report-2015-16.pdf" },
  ];

  return (
    <section className="py-4 sm:py-6 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <h2 className="relative inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold gradient-text mb-6 sm:mb-8 animate-fade-in-up">
        About Us
        <span className="absolute left-0 -bottom-2 w-full h-[2px] sm:h-[3px] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 rounded-full"></span>
      </h2>

      <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 text-center sm:text-left">
        The CSI student branch at KKWIEER, established in 1995-96, is one of the most vibrant in Maharashtra & Goa.
        Recognized 7 times as the "Best Student Branch", it has over 500 student members and organizes regular technical
        events such as quizzes, seminars, and workshops. Faculty and students benefit from publications, communication
        networks, and financial support for research.
      </p>

      {/* Main Content */}
      <div className="space-y-6 sm:space-y-8 md:space-y-10">
        {/* Detailed Info */}
        <div className="text-gray-700 space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base leading-relaxed">
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
        {/* Activity Reports Section */}
        <div className="mt-8 sm:mt-12 md:mt-16">
          <div className="flex justify-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text text-center">
              Activity Reports
            </h3>
          </div>

          {/* Always Visible First 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
            {activityReports.slice(0, 3).map((report, index) => (
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

          {/* Additional Reports */}
          <div
            className={`overflow-hidden transition-all duration-700 ease-in-out ${activityReportsExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pt-4">
              {activityReports.slice(3).map((report, index) => (
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

          {/* Toggle Button */}
          {activityReports.length > 3 && (
            <div className="flex justify-center mb-6 mt-6">
              <button
                onClick={() => setActivityReportsExpanded(!activityReportsExpanded)}
                className="group relative inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 
                bg-white text-blue-600 font-medium rounded-full border border-blue-200
                transition-all duration-300 ease-out hover:bg-blue-50
                focus:outline-none min-w-[200px] justify-center"
              >
                <FileText className="w-4 h-4" />
                <span className="text-sm sm:text-base">
                  {activityReportsExpanded ? "View Less Reports" : `View More Reports (${activityReports.length - 3})`}
                </span>
                <div className="transition-transform duration-300 ease-out group-hover:translate-y-[-1px]">
                  {activityReportsExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Committee Lists Section */}
        <div className="mt-8 sm:mt-12 md:mt-16">
          <div className="flex justify-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text text-center">
              Committee Lists
            </h3>
          </div>

          {/* Always Visible Committee Lists (First 3) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
            {committeeData.slice(0, 3).map((committee, index) => (
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

          {/* Additional Committee Lists */}
          <div
            className={`overflow-hidden transition-all duration-700 ease-in-out ${showMoreCommittees ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pt-4">
              {committeeData.slice(3).map((committee, index) => (
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

          {/* Toggle Button */}
          {committeeData.length > 3 && (
            <div className="flex justify-center mb-6 mt-6">
              <button
                onClick={() => setShowMoreCommittees(!showMoreCommittees)}
                className="group relative inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 
                bg-white text-blue-600 font-medium rounded-full border border-blue-200
                transition-all duration-300 ease-out hover:bg-blue-50
                focus:outline-none min-w-[200px] justify-center"
              >
                <Users className="w-4 h-4" />
                <span className="text-sm sm:text-base">
                  {showMoreCommittees ? "View Less Lists" : `View More Lists (${committeeData.length - 3})`}
                </span>
                <div className="transition-transform duration-300 ease-out group-hover:translate-y-[-1px]">
                  {showMoreCommittees ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

     

      {/* Custom CSS */}
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
      `}</style>
    </section>
  );
};

export default AboutUs;
