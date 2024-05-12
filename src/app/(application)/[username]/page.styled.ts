"use client";

import { Box, BoxProps, styled } from "@mui/material";

export const ChatPageStyled = styled(Box)<BoxProps>(({ theme }) => ({
  position: "relative",
  width: "100%",

  [theme.breakpoints.up("md")]: {
    width: `calc(100% - ${360}px)`,
    marginLeft: `${360}px`,
    height: "100%",
  },
}));

export const BottomInputsStyled = styled("section")(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  width: `calc(100% - ${360}px)`,
  padding: theme.spacing(1, 2),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  background: theme.palette.background.default,
}));
