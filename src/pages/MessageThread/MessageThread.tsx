import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../routes";
import { useGetMessageThread } from "../../hooks/useGetMessageThread";
import { useCookies } from "react-cookie";
import { Message } from "./Message";

export const MessageThread = () => {
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const params = useParams();
  const { data, isLoading, refetch } = useGetMessageThread(
    cookies["access"],
    params["id"]!
  );
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onMessageSend = async (token: string, message: string) => {
    const endpoint = `https://homeaglow-staging.herokuapp.com/api/cp/messages/${params[
      "id"
    ]!}/`;
    try {
      const auth_header = `Bearer ${token}`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: auth_header,
        },
        mode: "cors",
        body: JSON.stringify({ message: message }),
      });

      if (response) {
        const data = await response.json();
        refetch();
        return data;
      } else {
        throw new Error("Failed to fetch user info");
      }
    } catch (error) {
      console.error("Error fetching user info", error);
      return null;
    }
  };

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Container>
      <Box>
        <Button onClick={() => navigate(routes.conversations)}>
          Back to convos
        </Button>
        <Typography variant="h1"></Typography>
      </Box>
      <Typography variant="h2">{params["name"]!}</Typography>
      {/* I would never use any in a real typescript project :D 
      In a real project I would sort this to have newest messages appear at bottom 
      of convo with a scrollbar. 
      */}

      {data?.messages.map((message: any) => (
        <Message
          name={""}
          date={message.messageDateTime}
          message={message.message}
          id_={message.cleanerId!}
        />
      ))}
      <TextField
        id="filled-basic"
        label="Send a message"
        variant="filled"
        onChange={onNameChange}
      />
      <Button onClick={() => onMessageSend(cookies["access"], message)}>
        Send
      </Button>
    </Container>
  );
};
