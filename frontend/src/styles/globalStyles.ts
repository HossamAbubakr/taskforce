import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Helvetica Neue', Helvetica, sans-serif;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.50s linear, color 0.50s linear;
    margin: 0;
    height: 100%;
  }

  header, div, button {
    transition: background-color 0.50s linear, color 0.50s linear, border-color 0.50s linear, box-shadow 0.50s linear;
  }

  .shape-fill {
    transition: fill 0.50s linear, color 0.50s linear;
  }
`;

export default GlobalStyles;
