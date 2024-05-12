"use client";

import { Button, Fab as MuiFab, Grid, Modal, TextField } from "@mui/material";
import ChatBubbleTwoToneIcon from "@mui/icons-material/ChatBubbleTwoTone";
import {
  FabStyled,
  ModalContentStyled,
} from "@/app/(application)/components/Fab/Fab.styled";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { INewChatForm } from "@/app/(application)/page.types";
import { useSocketStore } from "@/store/socket.store";
import { toast } from "react-toastify";
import { useChatsStore } from "@/store/chats.store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useThemeStore } from "@/store/theme.store";

export const Fab = () => {
  const [open, setOpen] = useState(false);
  const socket = useSocketStore((state) => state.io);
  const appendChat = useChatsStore((state) => state.appendChat);
  const form = useForm<INewChatForm>();
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const mode = useThemeStore((state) => state.mode);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => {
    setOpen(false);
    router.push(pathname);
  }, [pathname, router]);

  const handleSubmit = useCallback(
    (data: INewChatForm) => {
      socket?.emit("new-chat", data, (result: SocketData) => {
        if (result?.error) return toast.error(result?.error);
        if (result.data?.chat) {
          console.log(result.data.chat);
          appendChat(result.data.chat);
        }

        handleClose();
      });
    },
    [socket],
  );

  useEffect(() => {
    if (params.get("user")) {
      form.setValue("username", params.get("user")!);
      handleOpen();
    }
  }, [params]);

  return (
    <>
      <FabStyled onClick={handleOpen}>
        <MuiFab color="primary">
          <ChatBubbleTwoToneIcon />
        </MuiFab>
      </FabStyled>
      <Modal open={open} onClose={handleClose}>
        <ModalContentStyled>
          <Grid
            container
            gap={2}
            component={"form"}
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <Grid item xs={12}>
              <TextField
                label={"Username"}
                fullWidth
                size={"small"}
                color={"secondary"}
                {...form.register("username", {
                  required: "Username is required",
                })}
                error={Boolean(form.formState.errors.username)}
                helperText={form.formState.errors.username?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={"Text"}
                multiline
                minRows={2}
                fullWidth
                color={"secondary"}
                {...form.register("text", {
                  required: "Text is required",
                })}
                error={Boolean(form.formState.errors.text)}
                helperText={form.formState.errors.text?.message}
              />
            </Grid>
            <Grid item xs container gap={1} justifyContent={"end"}>
              <Button variant={"contained"} type={"submit"}>
                Submit
              </Button>
              <Button
                color={mode === "dark" ? "error" : "error"}
                type={"button"}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </ModalContentStyled>
      </Modal>
    </>
  );
};
