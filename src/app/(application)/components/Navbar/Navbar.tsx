"use client";

import { MouseEvent, useCallback, useState } from "react";
import { MenuStyled, NavbarStyled } from "./Navbar.styled";
import {
  Avatar,
  Box,
  IconButton,
  MenuItem,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { INavbarProps } from "./Navbar.types";
import ShareTwoToneIcon from "@mui/icons-material/ShareTwoTone";
import { REMOVE_TOKEN } from "@/actions/token.actions";
import { useRouter } from "next/navigation";
import { useThemeStore } from "@/store/theme.store";
import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";
import NightlightTwoToneIcon from "@mui/icons-material/NightlightTwoTone";

export const Navbar = ({ user }: INavbarProps) => {
  const setMode = useThemeStore((state) => state.setMode);
  const mode = useThemeStore((state) => state.mode);
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpen = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleShare = useCallback(() => {
    navigator.share({
      title: "Hello Friend, You can text me here",
      url: `http://localhost:3000/?user=${user.username}`,
    });
  }, [user]);

  const handleLogout = useCallback(async () => {
    await REMOVE_TOKEN();
    router.replace("/login");
  }, []);

  const handleChangeTheme = useCallback(() => {
    if (mode === "dark") setMode("light");
    else setMode("dark");
  }, [mode]);

  return (
    <NavbarStyled color={"transparent"}>
      <Toolbar>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpen} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp">
                <Image src={user.profile_img} alt={user.username} fill />
              </Avatar>
            </IconButton>
          </Tooltip>
          <MenuStyled
            sx={{ mt: "45px", p: 4, borderRadius: 12 }}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Box px={2} py={1} display={"flex"} alignItems={"center"} gap={2}>
              <Typography textAlign="center">{user.username}</Typography>
              <IconButton onClick={() => handleShare()}>
                <ShareTwoToneIcon fontSize={"small"} />
              </IconButton>
            </Box>

            <Box
              px={2}
              py={1}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={1}
            >
              <WbSunnyTwoToneIcon />
              <Switch checked={mode === "dark"} onClick={handleChangeTheme} />
              <NightlightTwoToneIcon />
            </Box>

            <MenuItem onClick={handleLogout}>
              <Typography textAlign="center" color={"error"}>
                Logout
              </Typography>
            </MenuItem>
          </MenuStyled>
        </Box>
      </Toolbar>
    </NavbarStyled>
  );
};
