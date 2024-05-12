"use client";

import { createTheme, Palette, PaletteMode, Shadows } from "@mui/material";
import { montserrat } from "@/styles/theme/fonts";

const theme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily,
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [...Array(25).fill("none")] as Shadows,
});

export const getDesignTokens = (mode: PaletteMode) => {
  return {
    ...theme,
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode

            primary: { main: "#f5cb5c" },
            background: {
              default: "#e8eddf",
              paper: "#cfdbd5",
            },
            secondary: { main: "#111d4a" },
          }
        : {
            // palette values for dark mode
            primary: { main: "#f5cb5c" },
            background: {
              default: "#333533",
              paper: "#242423",
            },
            secondary: { main: "#9381ff" },
          }),
    } as Palette,
  };
};
