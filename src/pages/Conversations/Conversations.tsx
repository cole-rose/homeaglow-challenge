import React from "react";
import { useGetConversations } from "../../hooks/useGetConversations";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Container, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { Message } from "../MessageThread/Message";
export const Conversations = () => {
  const [cookies] = useCookies();
  const { data: convoData, isLoading: isLoadingConvos } = useGetConversations(
    cookies["access"]
  );
  const { data: userInfoData, isLoading: isLoadingUser } = useGetUserInfo(
    cookies["access"]
  );
  console.log("data", convoData, userInfoData);

  if (!userInfoData || !convoData) {
    return <>Data is invalid or loading</>;
  }
  return isLoadingConvos || isLoadingUser ? (
    <CircularProgress />
  ) : (
    <Container>
      <Box>
        <Typography variant="h1">Messages</Typography>
      </Box>
      <Box>
        <Typography variant="h2">
          {`${userInfoData?.first_name} ${userInfoData?.last_name}`}
        </Typography>
      </Box>
      <Box>
        {convoData.map((message) => (
          <Message
            name={`${message.firstName} ${message.lastName}`}
            date={message.messageDateTime}
            message={message.message}
          />
        ))}
      </Box>
    </Container>
  );
};
