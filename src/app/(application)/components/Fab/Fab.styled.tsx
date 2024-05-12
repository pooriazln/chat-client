"use client";

import { Box, BoxProps, styled } from "@mui/material";

export const FabStyled = styled(Box)<BoxProps>(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  right: 0,
  padding: theme.spacing(2, 4),
  zIndex: theme.zIndex.modal - 1,

  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(4),
  },
}));

export const ModalContentStyled = styled(Box)<BoxProps>(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  background: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));
