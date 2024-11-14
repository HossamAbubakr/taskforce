export type ThemeMode = "light" | "dark";

type Theme = {
  body: string;
  text: string;
  primary: string;
  secondary: string;
  background: string;
  accent: string;
  isDarkMode: boolean;
};

const theme: Record<ThemeMode, Theme> = {
  light: {
    body: "#FFFFFF",
    text: "#333333",
    primary: "#6200EE",
    secondary: "#BB86FC",
    background: "#F5F5F5",
    accent: "#03DAC5",
    isDarkMode: false,
  },
  dark: {
    body: "#121212",
    text: "#FFFFFF",
    primary: "#03DAC6",
    secondary: "#03DAC6",
    background: "#1a1a1a",
    accent: "#03DAC6",
    isDarkMode: true,
  },
};

export default theme;
