import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React from "react";

interface MessageProps {
  name: string;
  date: string;
  message: string;
}
export const Message: React.FC<MessageProps> = ({ name, date, message }) => {
  return (
    <Container>
      <Box>{name}</Box>
      <Box>{date}</Box>
      <Box>{message}</Box>
    </Container>
  );
};
