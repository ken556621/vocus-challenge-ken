import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "@/styles/theme";

import theme from "@/styles/theme";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
