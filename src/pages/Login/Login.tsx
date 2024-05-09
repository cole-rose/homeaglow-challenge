import React, { ChangeEvent, useState } from "react";
// import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Box, Button, Grid } from "@mui/material";
import { fetchAndStoreToken } from "./fetchLoginToken";

export const Login = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasError(false);
    setUsername(e.target.value);
  };

  const onPassWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasError(false);
    setPassword(e.target.value);
  };
  console.log("username:", username);
  console.log("password:", password);

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
      {hasError && <Box>You must enter a correct username and password</Box>}
      <Box>
        <Button onClick={onClick}>Login</Button>
      </Box>
    </Container>
  );
};
