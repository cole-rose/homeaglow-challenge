import React, { useState } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import { fetchAndStoreToken } from "./fetchLoginToken";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

export const Login = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  const navigate = useNavigate();
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasError(false);
    setUsername(e.target.value);
  };

  const onPassWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasError(false);
    setPassword(e.target.value);
  };

  const onClick = async () => {
    if (
      username === null ||
      username === "" ||
      password === null ||
      password === ""
    ) {
      setHasError(true);
    }
    try {
      await fetchAndStoreToken({ username: username!, password: password! });
      navigate(routes.conversations);
    } catch (e) {
      console.error(e);
      setHasError(true);
    }
  };
  return (
    <Container>
      <Box>Login</Box>
      <Box>
        <TextField
          id="filled-basic"
          label="Enter your username"
          variant="filled"
          onChange={onNameChange}
          error={hasError}
        />
      </Box>
      <Box>
        {/* To-Do: Ensure this is hidden when the user is typing */}
        <TextField
          id="filled-basic"
          label="Enter your password"
          variant="filled"
          onChange={onPassWordChange}
          error={hasError}
        />
      </Box>
      {/* To-Do make more descriptive for different fail cases */}
      {hasError && <Box>You must enter a correct username and password</Box>}
      <Box>
        <Button onClick={onClick}>Login</Button>
      </Box>
    </Container>
  );
};
