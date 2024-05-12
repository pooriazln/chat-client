import { create } from "zustand";
import { Socket } from "socket.io-client";

interface ISocketStore {
  io?: Socket;
  setIo: (socket: Socket) => void;
}

export const useSocketStore = create<ISocketStore>((set) => ({
  setIo: (socket: Socket) => {
    set({ io: socket });
  },
}));
