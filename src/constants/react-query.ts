import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const client = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        let message;
        if (error instanceof AxiosError) {
          message = error.response?.data.message || error.message;
        } else {
          message = error.message;
        }
        toast.error(message);
      },
    },
  },
});
