import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Message = ({ data, id }) => {
  return (
    <div>
      {data.user_id === id ? (
        <div className="flex justify-end items-start w-[100%] pr-4">
          <div className="bg-emerald-200 max-w-[80%] min-w-[30%] rounded-md p-2 ml-3">
            <p className="text-base">{data.msg}</p>
            <p className="text-xs text-slate-400 text-end">{data.created_on}</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-start items-start w-[80%] m-3">
          {data.user_profile ? (
            <img
              className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full p-[2px] border-r-2 border border-primary"
              src={`http://localhost/mukuru047-backend/${data.user_profile}`}
              alt="profile"
            />
          ) : (
            <FaUserCircle className=" h-[40px] w-[40px] bg-[#999] rounded-full text-[#777]" />
          )}
          <div className="bg-secondary rounded-md p-2 max-w-[80%] min-w-[30%] ml-3">
            <div className="flex justify-between items-center">
              <p className="text-sm text-purple-500">{data.user_name}</p>
            </div>
            <p className="text-base">{data.msg}</p>
            <p className="text-xs text-orange-300 text-end">
              {data.created_on}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
