import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  TwitterIcon,
} from "lucide-react";
import React from "react";

export const FooterSection = (): JSX.Element => {
  // Footer navigation data
  const footerSections = [
    {
      title: "Quick links",
      links: ["Home", "Departments", "Admissions"],
    },
    {
      title: "Resources",
      links: ["Library", "Research", "Alumni"],
    },
    {
      title: "Support",
      links: ["FAQs", "Feedback", "Help Center"],
    },
    {
      title: "Legal",
      links: ["Terms & Conditions", "Privacy Policy", "Disclaimer"],
    },
  ];

  // Social media icons
  const socialIcons = [
    { icon: <MailIcon className="w-[31px] h-[22px]" />, alt: "Email" },
    { icon: <FacebookIcon className="w-7 h-[27px]" />, alt: "Facebook" },
    { icon: <TwitterIcon className="w-7 h-7" />, alt: "Twitter" },
    { icon: <InstagramIcon className="w-[17px] h-7" />, alt: "Instagram" },
  ];

  return (
    <footer className="w-full py-12 px-4 md:px-8 lg:px-10 bg-black text-white">
      <div className="flex justify-center  mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Institute information */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="font-['Poppins',Helvetica] font-bold text-white text-[56.9px] tracking-[-2.84px] leading-none">
                CSI KKWIEER
              </h2>
              <h3 className="font-['Poppins',Helvetica] font-bold text-white text-[45.5px] tracking-[-2.27px] leading-tight mt-2">
                Student Committee
              </h3>
            </div>

            <address className="font-['Poppins',Helvetica] font-light text-white text-[18.2px] tracking-[-0.91px] leading-normal not-italic">
              KK Wagh Institute of Engineering Education and Research
              <br />
              Hirabai Haridas Vidyanagari,
              <br />
              Amrutdham, Panchavati,
              <br />
              Nashik, Maharashtra 422003,
              <br />
              India.
            </address>

            <div className="flex space-x-4 mt-6">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label={social.alt}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="flex flex-col">
              <h4 className="font-['Poppins',Helvetica] font-semibold text-white text-[34.1px] tracking-[-1.71px] leading-normal mb-6">
                {section.title}
              </h4>
              <nav>
                <ul className="font-['Poppins',Helvetica] font-light text-white text-[18.2px] tracking-[-0.91px]">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="mb-[39.8px] last:mb-0">
                      <a href="#" className="hover:underline">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};
