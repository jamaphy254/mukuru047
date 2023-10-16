import React, { useEffect, useState } from "react";
import ChatInfo from "../components/ChatInfo";
import Message from "../components/Message";
import ScrollToBottom from "react-scroll-to-bottom";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BsSend } from "react-icons/bs";
import { VscStarEmpty } from "react-icons/vsc";
import axios from "axios";

let conn;

const ChatRoom = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  // console.log(data);

  const ENDPOINT = "ws://localhost:8080";

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.length) {
      navigate("/login");
    }

    conn = new WebSocket(ENDPOINT);

    conn.onopen = function (e) {
      console.log("Connection established!");
    };
    conn.onmessage = function (e) {
      setData(JSON.parse(e.data));
      // console.log(JSON.parse(e.data));
    };
  }, [ENDPOINT]);

  const SendMessage = (e) => {
    e.preventDefault();

    const data = {
      userId: user[0].user_id,
      msg: message,
    };

    conn.send(JSON.stringify(data));

    // console.log(data);

    setMessage("");
  };

  useEffect(() => {
    const url = "http://localhost/mukuru047-backend/database/ChatRooms.php";

    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [SendMessage]);

  return (
    <div className="flex flex-col justify-between w-full 2xl:w-[65%] h-[100vh]">
      <ChatInfo state={state} />
      <ScrollToBottom
        initialScrollBehavior="smooth"
        className="overflow-auto flex-auto mb-12"
      >
        {data.map((data, i) => (
          <div key={i} className="w-full mb-4">
            <Message data={data} id={user[0].user_id} />
          </div>
        ))}
      </ScrollToBottom>
      <div className="bg-primary fixed bottom-0 flex justify-start items-center w-full 2xl:w-[65%] gap-2 p-2 pl-3">
        <textarea
          className="w-[90%] h-10 px-3 pt-2 focus:outline-none font-poppins rounded-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name="message"
          cols="30"
          rows="10"
          placeholder="Message"
        />
        <button
          disabled={!message ? true : false}
          className="font-bold pr-2 cursor-pointer"
          type="submit"
          name="submit"
          onClick={SendMessage}
        >
          {message ? (
            <BsSend className="text-2xl text-secondary" />
          ) : (
            <VscStarEmpty className=" text-2xl text-green" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
