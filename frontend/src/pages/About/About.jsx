import { useState } from "react";
import AboutSidebar from "../../components/AboutSidebar/AboutSidebar";
import AboutContent from "../../components/AboutContent/AboutContent";
import "./About.scss";

const About = () => {
  const [selectedSection, setSelectedSection] = useState("aboutUs");

  const sections = [
    { id: "aboutUs", title: "About Us" },
    { id: "shipping", title: "Shipping & Returns" },
    { id: "refunds", title: "Refunds & Exchanges" },
    { id: "contactUs", title: "Contact Us" },
    { id: "privacyPolicy", title: "Privacy Policy" },
    { id: "terms", title: "Terms & Conditions" },
  ];

  return (
    <div className="info-page gap-4 flex flex-col sm:flex-row">
      <AboutSidebar
        sections={sections}
        onSelectSection={setSelectedSection}
        selectedSection={selectedSection}
      />
      <AboutContent sectionId={selectedSection} sectionTitle={sections[selectedSection]} />
    </div>
  );
};

export default About;
