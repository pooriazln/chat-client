"use client";

import React, { useCallback } from "react";
import { FabStyled } from "@/app/(application)/components/Fab/Fab.styled";
import { Fab } from "@mui/material";
import { useThemeStore } from "@/store/theme.store";
import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";
import NightlightTwoToneIcon from "@mui/icons-material/NightlightTwoTone";

export const AuthFab = () => {
  const mode = useThemeStore((state) => state.mode);
  const setMode = useThemeStore((state) => state.setMode);

  const handleChangeTheme = useCallback(() => {
    if (mode === "dark") setMode("light");
    else setMode("dark");
  }, [mode]);

  return (
    <FabStyled>
      <Fab onClick={handleChangeTheme}>
        {mode === "dark" ? <WbSunnyTwoToneIcon /> : <NightlightTwoToneIcon />}
      </Fab>
    </FabStyled>
  );
};
