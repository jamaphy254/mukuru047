import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Chats from "./pages/Chats";
import Profile from "./pages/Profile";
import ChatRoom from "./pages/ChatRoom";
import About from "./pages/About";
import NewPost from "./pages/NewPost";
import Comments from "./pages/Comments";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Splash from "./pages/Splash";
import UserDetails from "./pages/UserDetails";
import Forgot from "./pages/Forgot";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign_up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/new_post" element={<NewPost />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/chat_room" element={<ChatRoom />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user_details" element={<UserDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
