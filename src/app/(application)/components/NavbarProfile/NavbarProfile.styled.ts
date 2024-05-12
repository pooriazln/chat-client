"use client";

import { AppBar, AppBarProps, styled } from "@mui/material";

export const NavbarProfileStyled = styled(AppBar)<AppBarProps>(({ theme }) => ({
  position: "fixed",
  zIndex: theme.zIndex.drawer + 1,
  backdropFilter: "blur(10px)",
}));
