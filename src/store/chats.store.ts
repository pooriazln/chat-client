import { create } from "zustand";

interface IChatsStore {
  chats: Chat[] | null;
  setChats: (chats: Chat[]) => void;
  appendChat: (chat: Chat) => void;
}

export const useChatsStore = create<IChatsStore>((setState) => ({
  chats: null,
  setChats: (chats: Chat[]) => {
    setState({ chats });
  },
  appendChat: (chat) => {
    setState((prev) => ({
      chats: [...(prev?.chats || []), chat],
    }));
  },
}));
