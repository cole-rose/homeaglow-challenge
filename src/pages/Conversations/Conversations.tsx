import React from "react";
import { useGetConversations } from "../../hooks/useGetConversations";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Container } from "@mui/material";
import { useCookies } from "react-cookie";
export const Conversations = () => {
  const [cookies] = useCookies();
  const { data, isLoading } = useGetConversations(cookies["access"]);
  console.log("data", data);
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Container>
      <Box>Messages</Box>
    </Container>
  );
};
