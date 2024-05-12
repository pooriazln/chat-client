"use client";

import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Toolbar,
} from "@mui/material";
import Image from "next/image";
import { BadgeStyled, SidebarStyled } from "./Sidebar.styled";
import { useChatsStore } from "@/store/chats.store";
import { useCallback, useEffect } from "react";
import { useSocketStore } from "@/store/socket.store";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/auth.store";
import Link from "next/link";

export const Sidebar = () => {
  const chats = useChatsStore((state) => state.chats);
  const appendChat = useChatsStore((state) => state.appendChat);
  const setChats = useChatsStore((state) => state.setChats);
  const socket = useSocketStore((state) => state.io);
  const user = useAuthStore((state) => state.user);

  const showNotification = useCallback(
    (title: string, message: string, profile: string) => {
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(title, {
          body: message,
          icon: profile,
        });
      }
    },
    [],
  );

  useEffect(() => {
    socket?.emit("get-chats", (data: SocketData) => {
      if (data.error) return toast.error(data.data);
      if (data.data) return setChats(data.data);
    });
  }, [setChats, socket]);

  useEffect(() => {
    socket?.on("new_chat", ({ chat }: { chat: Chat }) => {
      appendChat(chat);
      showNotification(
        chat.creator.username,
        chat.messages[0].text,
        chat.creator.profile_img,
      );
    });
  }, [socket]);

  return (
    <SidebarStyled variant={"permanent"} anchor="left">
      <Toolbar />
      <TextField placeholder={"Search..."} size={"small"} color={"secondary"} />
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          height: !chats?.length || !chats ? "100%" : "unset",
        }}
      >
        {!chats ? (
          <Box
            height={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <CircularProgress color={"primary"} />
          </Box>
        ) : null}
        {chats && !chats.length ? (
          <Box
            height={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {" "}
            <Chip label="No chat to display" />{" "}
          </Box>
        ) : null}
        {chats?.map((chat) => (
          <ListItemButton
            key={chat._id}
            sx={{ borderRadius: (t) => t.shape.borderRadius }}
            component={Link}
            href={`/${user?._id === chat.creator._id ? chat.user.username : chat.creator.username}`}
          >
            <ListItemAvatar>
              <BadgeStyled
                variant={"dot"}
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                isOnline={
                  user?._id === chat.creator._id
                    ? chat.user.online
                    : chat.creator.online
                }
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
            </ListItemAvatar>
            <ListItemText
              primary={
                user?._id === chat.creator._id
                  ? chat.user.username
                  : chat.creator.username
              }
              secondary={chat.messages[0].text}
            />
          </ListItemButton>
        ))}
      </List>
    </SidebarStyled>
  );
};
