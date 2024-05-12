"use client";

import { IChatPageProps } from "@/app/(application)/[username]/page.types";
import {
  Box,
  Chip,
  CircularProgress,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  BottomInputsStyled,
  ChatPageStyled,
} from "@/app/(application)/[username]/page.styled";
import { NavbarProfile } from "@/app/(application)/components/NavbarProfile/NavbarProfile";
import { useCallback, useEffect, useState } from "react";
import { useSocketStore } from "@/store/socket.store";
import { MyMessage } from "@/app/(application)/[username]/components/MyMessage";
import { useAuthStore } from "@/store/auth.store";
import { OtherMessage } from "@/app/(application)/[username]/components/OtherMessage";
import { LoadingButton } from "@mui/lab";
import { SendTwoTone } from "@mui/icons-material";
import { useForm } from "react-hook-form";

export default function ChatPage({ params }: IChatPageProps) {
  const socket = useSocketStore((state) => state.io);
  const user = useAuthStore((state) => state.user);

  const [messages, setMessages] = useState<Message[] | null>(null);
  const [chat, setChat] = useState<Chat | null>(null);
  const [approveLoading, setApproveLoading] = useState<boolean>(false);
  const [sendMessageLoading, setSendMessageLoading] = useState<boolean>(false);
  const form = useForm();

  useEffect(() => {
    socket?.emit("get-chat", params.username, ({ data }: { data: Chat }) => {
      setMessages(data.messages);
      setChat(data);
    });
    socket?.on("update-chat", ({ chat }: { chat: Chat }) => {
      setChat(chat);
    });
    socket?.on("new-message", ({ message }) => {
      console.log("here");
      setMessages((prev) => [...(prev || []), message]);
    });
  }, [socket]);

  const handleApprove = useCallback(() => {
    setApproveLoading(true);
    socket?.emit("approve-chat", chat?._id, () => {
      setApproveLoading(false);
    });
  }, [chat]);

  const handleSubmit = useCallback(
    (data: any) => {
      setSendMessageLoading(true);
      socket?.emit("new-message", { ...data, chatId: chat?._id }, () => {
        setSendMessageLoading(false);
        form.reset();
      });
    },
    [chat?._id, socket],
  );

  return (
    <>
      <NavbarProfile chat={chat} />
      <Toolbar />
      <ChatPageStyled>
        {!messages ? (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
          >
            <CircularProgress />
          </Box>
        ) : null}

        <Box px={2} py={2} display={"flex"} flexDirection={"column"} gap={2}>
          {messages?.map((message) =>
            message.user._id === user?._id ? (
              <MyMessage
                key={message._id}
                message={message.text}
                avatar={message.user.profile_img}
              />
            ) : (
              <OtherMessage
                key={message._id}
                message={message.text}
                avatar={message.user.profile_img}
              />
            ),
          )}
          <Toolbar />
        </Box>
        <BottomInputsStyled>
          {chat?.is_approved ? (
            <Box
              display={"flex"}
              alignItems={"center"}
              component={"form"}
              onSubmit={form.handleSubmit(handleSubmit)}
              width={"100%"}
              gap={2}
            >
              <TextField
                size={"small"}
                fullWidth
                placeholder={"write your message"}
                multiline
                {...form.register("text", { required: true })}
                color={"secondary"}
              />
              <LoadingButton
                loading={sendMessageLoading}
                color={"secondary"}
                type={"submit"}
                variant={"contained"}
              >
                <SendTwoTone />
              </LoadingButton>
            </Box>
          ) : chat?.creator._id !== user?._id ? (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={1}
              width={"100%"}
            >
              <Chip
                label={
                  <Typography variant={"subtitle1"}>
                    <Typography
                      color={"primary"}
                      component={"span"}
                      variant={"subtitle1"}
                    >
                      {chat?.creator.username}
                    </Typography>{" "}
                    wants to chat with you
                  </Typography>
                }
              />
              <LoadingButton
                variant={"contained"}
                size={"small"}
                onClick={() => handleApprove()}
                loading={approveLoading}
              >
                Approve
              </LoadingButton>
            </Box>
          ) : (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={1}
              width={"100%"}
            >
              <Chip
                label={`Your chat request has ben sent, wait for them to approve`}
              />
            </Box>
          )}
        </BottomInputsStyled>
      </ChatPageStyled>
    </>
  );
}
