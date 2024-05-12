"use client";

import { Box, BoxProps, styled } from "@mui/material";

export const HomePageStyled = styled(Box)<BoxProps>(({ theme }) => ({
  display: "none",

  [theme.breakpoints.up("md")]: {
    display: "flex",
    width: `calc(100% - ${360}px)`,
    marginLeft: `${360}px`,
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  },
}));
