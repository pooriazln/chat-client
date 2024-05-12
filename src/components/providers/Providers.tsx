"use client";

import React, { PropsWithChildren, useEffect, useMemo } from "react";

import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import { getDesignTokens } from "@/styles/theme/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "@/constants/react-query";
import { ToastContainer } from "react-toastify";
import { useThemeStore } from "@/store/theme.store";

import "react-toastify/dist/ReactToastify.css";

export const Providers = ({ children }: PropsWithChildren) => {
  const mode = useThemeStore((state) => state.mode);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const setMode = useThemeStore((state) => state.setMode);

  useEffect(() => {
    const mode = localStorage.getItem("theme");
    if (mode) setMode(mode as PaletteMode);
    else setMode("light");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={client}>
        <CssBaseline />
        <ToastContainer theme={mode} />
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
};
