import { Button, Card } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { routes } from "../../routes";

interface MessageProps {
  name: string;
  date: Date;
  message: string;
  id_: string;
}
export const Message: React.FC<MessageProps> = ({
  name,
  date,
  message,
  id_,
}) => {
  const navigate = useNavigate();
  const myDate = new Date(date);
  const onMessageClick = (id_: string) => {
    navigate(generatePath(routes.messageThread, { id: id_, name: name }));
  };
  return (
    //If doing on the job would style this signifigantly and add hover effects
    <Box margin={4} onClick={() => onMessageClick(id_)}>
      <Card variant="outlined">
        <Box>{name}</Box>
        <Box>{message}</Box>
        <Box>{myDate.toISOString()}</Box>
      </Card>
    </Box>
  );
};
