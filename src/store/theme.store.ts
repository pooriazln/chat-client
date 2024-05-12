"use client";

import { create } from "zustand";
import { PaletteMode } from "@mui/material";

interface IThemeStore {
  mode: PaletteMode;
  setMode: (mode: PaletteMode) => void;
}

export const useThemeStore = create<IThemeStore>((setState) => ({
  mode: "light",
  setMode: (mode) => {
    localStorage.setItem("theme", mode);
    setState({ mode });
  },
}));
