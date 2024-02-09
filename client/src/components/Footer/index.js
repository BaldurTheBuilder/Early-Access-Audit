import React from "react";

//icons
import githubIcon from "../../assets/github-mark.png";
import linkedInIcon from "../../assets/LinkedInIcon.png";
import gmailIcon from "../../assets/gmail-icon.png";

import "../../styles/Footer.css";

// WHEN I view the footer I am presented with text or icon links to the developer’s GitHub and LinkedIn profiles, and their profile on a third platform (Stack Overflow, Twitter)
const Footer = () => {
  const socialMediaLinks = [
    {
      website: "Github",
      mediaLink: "https://github.com/BaldurTheBuilder",
      icon: githubIcon,
      iconWidth: "30",
      iconHeight: "30"
    },
    {
      website: "LinkedIn",
      mediaLink: "https://www.linkedin.com/in/jack-kokcarlson/",
      icon: linkedInIcon,
      iconWidth: "30",
      iconHeight: "25"
    },
    {
      website: "Gmail",
      mediaLink: "mailto:jack.kokcarlson@gmail.com",
      icon: gmailIcon,
      iconWidth: "30",
      iconHeight: "25"
    },
  ];
  return (
    <footer className="footer text-center fixed-bottom ">
      <div className="container">
        <div className="row">
          {socialMediaLinks.map((socialMediaLink) => (
            <div className="col-4">
              <a href={socialMediaLink.mediaLink}>
                <img
                  src={socialMediaLink.icon}
                  width={socialMediaLink.iconWidth}
                  height={socialMediaLink.iconHeight}
                  alt={socialMediaLink.website}
                ></img>
              </a>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;