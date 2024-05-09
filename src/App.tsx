import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Conversations } from "./pages/Conversations/Conversations";
import { MessageThread } from "./pages/MessageThread/MessageThread";
import { CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { routes } from "./routes";
import { QueryClient, QueryClientProvider } from "react-query";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient({});
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path={routes.home} Component={Login} />
            <Route path={routes.conversations} Component={Conversations} />
            <Route path={routes.messageThread} Component={MessageThread} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
