import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/Login/Login";
import { Conversations } from "./pages/Conversations/Conversations";
import { MessageThread } from "./pages/MessageThread/MessageThread";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/conversations" Component={Conversations} />
          <Route path="/message-thread/:id" Component={MessageThread} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
