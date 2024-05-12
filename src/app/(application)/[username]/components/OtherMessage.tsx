"use client";

import { Avatar, Box } from "@mui/material";
import { IMessageProps } from "@/app/(application)/[username]/page.types";

export const OtherMessage = ({ message, avatar }: IMessageProps) => {
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"start"}>
      <Avatar src={avatar} />
      <Box
        bgcolor={(theme) => theme.palette.background.paper}
        borderRadius={32}
        px={2}
        py={1}
        ml={1}
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </Box>
  );
};
