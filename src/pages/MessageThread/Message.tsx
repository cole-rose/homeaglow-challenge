import Box from "@mui/material/Box";
import React from "react";

interface MessageProps {
  name: string;
  date: Date;
  message: string;
}
export const Message: React.FC<MessageProps> = ({ name, date, message }) => {
  return (
    <Box margin={2} height={200} width={400} sx={{ border: "2px solid grey" }}>
      <Box>{name}</Box>
      <Box>{String(date)}</Box>
      <Box>{message}</Box>
    </Box>
  );
};
