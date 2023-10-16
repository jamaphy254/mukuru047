import React from "react";
import { FaUserCircle } from "react-icons/fa";

const CommentList = ({ item, post_id, user_id }) => {
  return (
    <div>
      {post_id === item.post_id ? (
        <div className="flex justify-start items-start w-full m-3">
          {item.user_profile ? (
            <img
              className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full p-[2px] border-r-2 border border-primary"
              src={`http://localhost/mukuru047-backend/${item.user_profile}`}
              alt="profile"
            />
          ) : (
            <FaUserCircle className=" h-[40px] w-[40px] bg-[#999] rounded-full text-[#777]" />
          )}
          <div className="flex flex-col justify-start items-start max-w-[75%] min-w-[30%] ml-3 gap-2">
            <div className="bg-secondary rounded-md p-2  ">
              <div className="flex justify-between items-center">
                <p className="text-sm text-purple-500">
                  {item.user_name}
                  {item.user_id === user_id ? (
                    <span className="text-xs font-poppins text-primary ml-1">
                      me
                    </span>
                  ) : null}
                </p>
              </div>
              <p className="text-base">{item.comment_text}</p>
              <p className="text-xs text-orange-300 text-end">
                {item.created_on}
              </p>
            </div>
            <div className="flex ml-4 gap-6">
              <p className="text-sm font-poppins">like</p>
              <p className="text-sm font-poppins">Reply</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CommentList;
