import { Tabs, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTab = styled(Tab)(() => ({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 500,
  fontSize: "16px",
  color: "black",
  textTransform: "none",
  "&:hover": {
    color: "#F5A3B7",
  },
}));

const AboutSidebar = ({ sections, onSelectSection, selectedSection }) => {
  const handleChange = (event, newValue) => {
    onSelectSection(newValue);
  };

  return (
    <div className="sidebar h-fit rounded-[4px] shadow-custom">
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedSection}
        onChange={handleChange}
        aria-label="About sections"
        sx={{
          ".MuiTabs-indicator": {
            backgroundColor: "black",
          },
        }}
      >
        {sections.map((section) => (
          <StyledTab
            key={section.id}
            label={section.title}
            value={section.id}
            style={{
              backgroundColor: selectedSection === section.id ? "#F5A3B7" : "transparent",
              color: selectedSection === section.id ? "white" : "black",
            }}
          />
        ))}
      </Tabs>
    </div>
  );
};
export default AboutSidebar;
