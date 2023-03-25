import { extendTheme } from "@chakra-ui/react";

export const projectTheme = extendTheme({
  fonts: {
    heading: "'Inter', sans-serif", 
    Text: "'Inter', sans-serif",
  },
  breakpoints: {
    sm: "320px",
    smHome: "430px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    xlHome: "1361px",
    "2xl": "1500px",
  },

});
