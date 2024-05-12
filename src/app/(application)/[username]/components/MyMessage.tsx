"use client";

import { Box } from "@mui/material";
import { IMessageProps } from "@/app/(application)/[username]/page.types";

export const MyMessage = ({ message }: IMessageProps) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"end"}
      flexDirection={"row-reverse"}
    >
      <Box
        bgcolor="primary.main"
        borderRadius={32}
        px={2}
        py={1}
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </Box>
  );
};
