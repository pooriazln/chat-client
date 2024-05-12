import React from "react";
import { Avatar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { NavbarProfileStyled } from "@/app/(application)/components/NavbarProfile/NavbarProfile.styled";
import { BadgeStyled } from "@/app/(application)/components/Sidebar/Sidebar.styled";
import Image from "next/image";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

export const NavbarProfile = ({ chat }: { chat: Chat | null }) => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  if (!chat) return <></>;
  if (!user) return <></>;

  return (
    <NavbarProfileStyled color={"transparent"}>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: 2,
          }}
        >
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <IconButton onClick={() => router.back()}>
              <ChevronLeftIcon />
            </IconButton>
            <BadgeStyled
              variant={"dot"}
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              isOnline={Boolean(
                user?._id === chat.creator._id
                  ? chat.user.online
                  : chat.creator.online,
              )}
            >
              <Avatar sx={{ position: "relative" }}>
                <Image
                  src={
                    user?._id === chat.creator._id
                      ? chat.user.profile_img
                      : chat.creator.profile_img
                  }
                  alt={
                    user?._id === chat.creator._id
                      ? chat.user.username
                      : chat.creator.username
                  }
                  fill
                />
              </Avatar>
            </BadgeStyled>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <Typography variant={"body1"}>
              {user?._id === chat.creator._id
                ? chat.user.username
                : chat.creator.username}
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </NavbarProfileStyled>
  );
};
