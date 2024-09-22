import { useState } from "react";
import AboutSidebar from "../../components/AboutSidebar/AboutSidebar";
import UserProfileContent from "../UserProfileContent/UserProfileContent";

const Profile = () => {
  const [selectedSection, setSelectedSection] = useState("personal");

  const sections = [
    { id: "personal", title: "Personal Information" },
    { id: "password", title: "Change Password" },
    { id: "orders", title: "My Orders" },
  ];

  return (
    <div className="info-page gap-4 flex flex-col sm:flex-row">
      <AboutSidebar sections={sections} onSelectSection={setSelectedSection} />
      <UserProfileContent sectionId={selectedSection} sectionTitle={sections[selectedSection]} />
    </div>
  );
};

export default Profile;
