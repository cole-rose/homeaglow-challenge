import React, { ChangeEvent, useState } from "react";
// import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Box, Grid } from "@mui/material";
export const Login = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  const onPassWordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  console.log("username:", username);
  console.log("password:", password);
  return (
    <Container>
      <Box>Login</Box>
      <Box>
        <TextField
          id="filled-basic"
          label="Enter your username"
          variant="filled"
          onChange={onNameChange}
        />
      </Box>
      <Box>
        {/* To-Do: Ensure this is hidden when the user is typing */}
        <TextField
          id="filled-basic"
          label="Enter your password"
          variant="filled"
          onChange={onPassWordChange}
        />
      </Box>
    </Container>
  );
};
