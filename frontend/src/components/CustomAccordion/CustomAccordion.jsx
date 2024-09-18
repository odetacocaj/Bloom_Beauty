import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

const CustomAccordion = ({ items, bgcolor, textcolor, fontSize, expandedbgcolor, fontWeight }) => {
  return (
    <div>
      {items.map((item, index) => (
        <StyledAccordion
          key={index}
          bgcolor={bgcolor}
          textcolor={textcolor}
          fontSize={fontSize}
          expandedbgcolor={expandedbgcolor}
          fontWeight={fontWeight}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <p>{item.question}</p>
          </AccordionSummary>
          <AccordionDetails>
            <p>{item.answer}</p>
          </AccordionDetails>
        </StyledAccordion>
      ))}
    </div>
  );
};

const StyledAccordion = styled(Accordion)(
  ({ bgcolor, textcolor, fontSize, expandedbgcolor, fontWeight }) => ({
    boxShadow: "none",
    backgroundColor: bgcolor || "white",
    fontSize: fontSize || "16px",
    borderTop: "1px solid #ddd",
    "&:last-child": {
      borderBottom: "none",
    },
    "& .MuiAccordionSummary-root": {
      backgroundColor: "transparent",
      fontFamily: "Poppins, sans-serif",
      transition: "background-color 0.3s",
      fontWeight: fontWeight || "400",
    },
    "&.Mui-expanded .MuiAccordionSummary-root": {
      backgroundColor: expandedbgcolor || "none",
    },
    "& .MuiAccordionDetails-root": {
      color: textcolor || "black",
      fontFamily: "Poppins, sans-serif",
    },
  }),
);

export default CustomAccordion;
