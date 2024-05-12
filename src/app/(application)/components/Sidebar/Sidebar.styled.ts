"use client";

import { Badge, Drawer, DrawerProps, styled } from "@mui/material";
import { IOnlineStatusStyledProps } from "@/app/(application)/components/Sidebar/Sidebar.types";

export const SidebarStyled = styled(Drawer)<DrawerProps>(({ theme }) => ({
  width: "100%",
  "& .MuiPaper-root": {
    width: "100%",
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.background.paper,
  },

  [theme.breakpoints.up("md")]: {
    "& .MuiPaper-root": {
      maxWidth: 360,
      width: "100%",
      padding: theme.spacing(1, 3),
    },
  },
}));

export const BadgeStyled = styled(Badge, {
  shouldForwardProp: (propName) => propName !== "isOnline",
})<IOnlineStatusStyledProps>(({ theme, isOnline }) => ({
  "& .MuiBadge-badge": {
    background: isOnline
      ? theme.palette.success.main
      : theme.palette.grey["500"],
    borderRadius: "100%",
    zIndex: theme.zIndex.tooltip,
    padding: theme.spacing(0.5),
    height: "10px",
    minWidth: "10px",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));
