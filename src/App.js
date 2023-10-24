import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { People } from "./pages/Chats";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NewPost from "./pages/NewPost";
import Comments from "./pages/Comments";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import UserDetails from "./pages/UserDetails";
import Forgot from "./pages/Forgot";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<Splash />} /> */}
        <Route exact path="/home" element={<Home />} />
        <Route path="/sign_up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/new_post" element={<NewPost />} />
        <Route path="/people" element={<People />} />
        {/* <Route path="/chats" element={<Chats />} /> */}
        <Route path="/comments" element={<Comments />} />
        {/* <Route path="/chat_room" element={<ChatRoom />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/user_details" element={<UserDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
