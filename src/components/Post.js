import axios from "axios";
import React, { useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import TotalLikes from "./TotalLikes";
import TotalComments from "./TotalComments";

const Post = ({ item, user_id, admin }) => {
  const navigate = useNavigate();

  const url = "https://mukuru1.000webhostapp.com/likes.php";

  const ADDLike = (post_id) => {
    let fData = new FormData();
    fData.append("post_id", post_id);
    fData.append("user_id", user_id);

    axios
      .post(url, fData)
      .then((res) => {
        if (res.data.status === "200") {
        }
      })
      .catch((err) => alert(err));
  };

  const [toggle, setToggle] = useState(false);

  // let row;
  // let prevOpenedRow;

  // const closeRow = (index) => {
  //   console.log(index);
  //   if (prevOpenedRow && prevOpenedRow !== row[index]) {
  //     prevOpenedRow.setToggle(false);
  //   }
  //   prevOpenedRow = row[index];
  // };

  const url1 = "https://mukuru1.000webhostapp.com/posts.php";

  const DeletePost = (post_id) => {
    let fData = new FormData();
    fData.append("post_id", post_id);
    fData.append("delete", "delete");

    axios
      .post(url1, fData)
      .then((res) => {
        if (res.data.status === "200") {
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="mb-14 lg:mb-20 bg-white w-full rounded-md">
      <div className="flex justify-start items-center gap-2 pt-3 px-3 mb-2 lg:px-6">
        <div
          onClick={() =>
            navigate(item.user_id === user_id ? "/profile" : "/user_details", {
              state: item.user_id,
            })
          }
        >
          {item.user_profile ? (
            <img
              className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full p-[2px] border-r-2 border border-primary"
              src={`https://mukuru1.000webhostapp.com/${item.user_profile}`}
              alt="profile"
            />
          ) : (
            <FaUserCircle className=" h-[40px] w-[40px] bg-[#999] rounded-full text-[#777]" />
          )}
        </div>
        <div className="flex flex-col justify-start items-start">
          <p
            onClick={() =>
              navigate(
                item.user_id === user_id ? "/profile" : "/user_details",
                {
                  state: item.user_id,
                }
              )
            }
            className="text-lg font-poppins font-semibold"
          >
            {item.user_name}
            {item.user_id === user_id ? (
              <span className="text-xs font-poppins text-primary ml-1">me</span>
            ) : null}
          </p>
          <p className="font-poppins text-xs text-[#888]">{item.created_on}</p>
        </div>
        {/* {item.user_id === user_id || admin === "Admin" ? (
          <SlOptionsVertical
            onClick={() => setToggle((prev) => !prev)}
            className="absolute right-6  mr-2 text-2xl cursor-pointer"
          />
        ) : null} */}
        {toggle ? (
          <div className="bg-secondary flex flex-col justify-center w-28 h-12">
            <p
              onClick={() => DeletePost(item.post_id)}
              className="text-lg font-poppins pl-2"
            >
              Delete
            </p>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col items-center">
        <p
          onClick={() => navigate("/comments", { state: item })}
          className="text-base self-start font-poppins p-2 mx-1 mb-2 cursor-pointer"
        >
          {item.post_text.length > 75
            ? item.post_text.slice(0, 75) + "..."
            : item.post_text}
        </p>
        {item.post_media ? (
          <img
            className="w-[97%] 2xl:h-[490px] rounded-md"
            src={`https://mukuru1.000webhostapp.com/${item.post_media}`}
            alt=""
          />
        ) : null}
      </div>
      <div className=" px-4 lg:px-16 py-2 flex justify-between items-center border-b">
        <p onClick={() => ADDLike(item.post_id)}>
          <TotalLikes
            ADDLike={ADDLike}
            post_id={item.post_id}
            user_id={user_id}
          />
        </p>

        <p className="flex items-center gap-1 text-sm font-[500] text-gray-600">
          <BsChatDots className="text-base" />
          <TotalComments post_id={item.post_id} />
        </p>
      </div>
      <div
        onClick={() => navigate("/comments", { state: item })}
        className="flex justify-center w-full items-center gap-2 p-1 py-3 rounded-lg cursor-pointer"
      >
        <BsChatDots className="text-2xl" />
        <p>Comment</p>
      </div>
    </div>
  );
};

export default Post;
