import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ChatInfo = ({ state }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center w-full p-3 bg-primary">
      <div className="flex items-center gap-1">
        <IoIosArrowBack
          onClick={() => navigate("/chats")}
          className="text-3xl mr-1 cursor-pointer"
        />
        {state.image ? (
          <img
            className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] rounded-full p-[2px] border-r-2 border border-primary"
            src={state.image}
            alt="profile"
          />
        ) : (
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
        )}
      </div>
      <div className="flex flex-col justify-center items-center w-[80%]">
        <h3 className="font-poppins text-xl text-secondary font-semibold px-2 ">
          {state.name}
        </h3>
        <p className="font-poppins text-sm text-green font-light px-2">
          All platform members
        </p>
      </div>
      <SlOptionsVertical className="text-2xl cursor-pointer" />
    </div>
  );
};

export default ChatInfo;
