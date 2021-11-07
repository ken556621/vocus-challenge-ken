import { createGlobalStyle } from "styled-components";

const theme = {
    fontSize: {
        h1: "18px",
        h2: "16px",
        normal: "13px",
        small: "12px"
    },
    color: {
        main: "#222222",
        second: "#665E5C"
    },
    backgroundColor: {
        main: "#f9f7f5"
    },
    radius: {
        main: "6px",
        second: "3px"
    },
    shadow: {
        main: "0px 2px 6px rgba(0, 0, 0, 0.0838145)"
    },
    breakpoints: {
        md: "768px"
    }
};

export const GlobalStyle = createGlobalStyle`
  html, h1, h2, h3, h4, h5, h6 {
    margin: 0px;
    padding: 0px;
  }
  body {
    margin: 0px;
    background-color: ${props => props.theme.backgroundColor.main};
  }
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
`;

export default theme;