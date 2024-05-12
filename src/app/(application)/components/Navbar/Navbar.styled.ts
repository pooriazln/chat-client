"use client";

import { AppBar, AppBarProps, Menu, MenuProps, styled } from "@mui/material";

export const NavbarStyled = styled(AppBar)<AppBarProps>(({ theme }) => ({
  position: "fixed",
  zIndex: theme.zIndex.drawer + 1,
  backdropFilter: "blur(10px)",
}));

export const MenuStyled = styled(Menu)<MenuProps>(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "12px !important",
  },

  "& .MuiMenu-list": {
    backgroundColor: theme.palette.background.default,
  },
}));
