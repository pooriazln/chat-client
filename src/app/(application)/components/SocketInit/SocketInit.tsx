"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";
import { useSocketStore } from "@/store/socket.store";
import { useAuthStore } from "@/store/auth.store";

export const SocketInit = ({ token, user }: { token: string; user: User }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);
  const setIo = useSocketStore((state) => state.setIo);

  useEffect(() => {
    setUser(user);
    setToken(token);
  }, [setUser, user, token, setToken]);

  useEffect(() => {
    const socket = io("localhost:5000", {
      transportOptions: {
        polling: {
          extraHeaders: {
            authorization: `Bearer ${token}`,
          },
        },
      },
    });

    setIo(socket);
  }, [setIo, token]);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  return <></>;
};
