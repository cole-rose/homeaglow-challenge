import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Conversations } from "./pages/Conversations/Conversations";
import { MessageThread } from "./pages/MessageThread/MessageThread";
import { CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/conversations" Component={Conversations} />
          <Route path="/message-thread/:id" Component={MessageThread} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
