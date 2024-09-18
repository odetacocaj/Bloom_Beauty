import { Tabs, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTab = styled(Tab)(() => ({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 500,
  fontSize: "16px",
  color: "black",
  textTransform: "none",
  "&.Mui-selected": {
    color: "#F5A3B7",
  },
  "&:hover": {
    color: "#F5A3B7",
  },
}));

const AboutSidebar = ({ sections, onSelectSection }) => {
  const handleChange = (event, newValue) => {
    onSelectSection(newValue);
  };

  return (
    <div className="sidebar h-fit rounded-[4px] shadow-custom">
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={false}
        onChange={handleChange}
        aria-label="About sections"
      >
        {sections.map((section) => (
          <StyledTab key={section.id} label={section.title} value={section.id} />
        ))}
      </Tabs>
    </div>
  );
};

export default AboutSidebar;
