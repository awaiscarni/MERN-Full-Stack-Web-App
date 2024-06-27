import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import CreatePost from "./Pages/CreatePost";
import BasicTabs from "./Pages/BasicTabs";
import Post from "./Pages/Post";
import Register from "./Pages/Register";
import SignIn from "./Pages/SignIn";
import NotFoundPage from "./Pages/NotFoundPage";
import { authContext } from "../helpers/authContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./Pages/Profile";
import EditPost from "./Pages/EditPost";
import ChangePassword from "./Pages/ChangePassword";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/check", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.error || !res.data.username) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: res.data.username,
            id: res.data.id,
            status: true,
          });
        }
      });
  }, []);

  return (
    <authContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <BasicTabs />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/editpost/:id" element={<EditPost />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </authContext.Provider>
  );
}

export default App;
