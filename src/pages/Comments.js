import React, { useEffect, useState } from "react";
import { BsChatDots, BsSend } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { VscStarEmpty } from "react-icons/vsc";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import axios from "axios";
import { useSelector } from "react-redux";
import CommentList from "../components/CommentList";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { NavBar } from "../components/Header";
import { URL } from "../API";

const Comments = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { user } = useSelector((state) => state.user);

  let user_id;
  let user_name;
  let user_profile;
  let post_id;

  if (user.length && state) {
    user_id = user[0].user_id;
    user_name = user[0].username;
    user_profile = user[0].profile;
    post_id = state.post_id;
  }

  const [comment, setComment] = useState("");
  const [data, setData] = useState([]);
  const [like, setLike] = useState([]);
  const [loading, setLoading] = useState(true);

  // const onEmojiClick = (e, emojiObject) => {
  //   setComment(e.target.value)
  //   setComment((prevInput) => prevInput + emojiObject.emoji);
  // };

  let like_user_id;

  // Convert first letter to uppercase and rest to lowercase
  const Comment =
    comment.charAt(0).toUpperCase() + comment.slice(1).toLowerCase();

  const url = `${URL}comments.php`;

  const AddComment = (e) => {
    e.preventDefault();

    let fData = new FormData();
    fData.append("post_id", state.post_id);
    fData.append("user_id", user_id);
    fData.append("comment_text", Comment);
    fData.append("user_name", user_name);
    fData.append("user_profile", user_profile);
    fData.append("recipient_user_id", state.user_id);
    fData.append("type", "Comment");
    // fData.append("created_on", moment().format());
    fData.append("isRead", false);

    axios
      .post(url, fData)
      .then((res) => {
        if (res.data.status === "200") {
        }
      })
      .catch((err) => alert(err));
    setComment("");
  };

  const url1 = `${URL}likes.php`;

  const ADDLike = () => {
    let fData = new FormData();
    fData.append("post_id", post_id);
    fData.append("user_id", user_id);
    fData.append("user_name", user_name);
    fData.append("user_profile", user_profile);
    fData.append("recipient_user_id", state.user_id);
    fData.append("type", "Like");
    // fData.append("created_on", moment().format());
    fData.append("isRead", false);

    axios
      .post(url1, fData)
      .then((res) => {
        if (res.data.status === "200") {
        }
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    if (!user.length) {
      navigate("/login");
    }

    Promise.all([
      axios.get(url, { params: { post_id: post_id } }),
      axios.get(url1, { params: { post_id: post_id } }),
    ])
      .then((res) => {
        setData(res[0].data);
        setLike(res[1].data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const Loading = () => {
    return (
      <>
        <div className="mb-14 px-3 pb-3 lg:mb-20 bg-white w-full rounded-md">
          <div className="flex justify-start items-center gap-2 pt-2 mb-2 lg:px-6">
            <Skeleton height={40} width={40} circle />
            <Skeleton height={10} width={150} count={2} />
          </div>
          <Skeleton />
          <Skeleton height={200} />
          <div className="flex justify-between border-b">
            <Skeleton width={25} />
            <Skeleton width={25} />
          </div>
          <div className="flex justify-start items-center gap-4 mt-5">
            <Skeleton height={40} width={40} circle />
            <Skeleton height={80} width={150} />
          </div>
          <div className="flex justify-start items-center gap-4 mt-5">
            <Skeleton height={40} width={40} circle />
            <Skeleton height={80} width={150} />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex 2xl:justify-center">
      <NavBar />
      <div className="flex flex-col justify-between pt-[55px] md:pt-14  w-full 2xl:w-[60%]">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="px-3">
              <div className="mb-4 lg:mb-10 bg-white rounded-md">
                <div className="flex justify-start items-center gap-2 pt-3 px-3 lg:px-6">
                  {state.user_profile ? (
                    <img
                      className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full p-[2px] border-r-2 border border-primary"
                      src={`${URL}${state.user_profile}`}
                      alt="profile"
                    />
                  ) : (
                    <FaUserCircle className=" h-[40px] w-[40px] bg-[#999] rounded-full text-[#777]" />
                  )}
                  <div className="flex flex-col justify-start items-start">
                    <p className="text-lg font-poppins font-semibold">
                      {state.user_name}
                      {state.user_id === user_id ? (
                        <span className="text-xs font-poppins text-primary ml-1">
                          me
                        </span>
                      ) : null}
                    </p>
                    <p className="font-poppins text-xs text-[#888]">
                      {state.post_created_on}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center my-2">
                  <p className="text-base self-start mx-5 mb-2 font-poppins p-2">
                    {state.post_text}
                  </p>
                  {state.post_media ? (
                    <img
                      className="w-[95%] 2xl:h-[490px] rounded-md"
                      src={`${URL}${state.post_media}`}
                      alt="profile"
                    />
                  ) : null}
                </div>
                <div className=" px-4 lg:px-16 py-2 flex justify-between items-center border-b">
                  <p
                    onClick={ADDLike}
                    className="flex items-center gap-1 text-sm font-[500] text-gray-600"
                  >
                    {like.map((itm) => {
                      if (itm.user_id === user[0].user_id) {
                        like_user_id = itm.user_id;
                      }
                      return null;
                    })}
                    {like.length !== 0 && like_user_id === user[0].user_id ? (
                      <FcLike className="text-base text-primary cursor-pointer" />
                    ) : (
                      <FcLikePlaceholder className="text-base text-primary cursor-pointer" />
                    )}
                    {like.length}
                  </p>
                  <p className="flex items-center gap-1 text-sm font-[500] text-gray-600">
                    <BsChatDots />
                    {data.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="overflow-auto overflow-x-hidden flex-auto mb-12">
              {data.map((item, i) => (
                <CommentList
                  key={i}
                  item={item}
                  post_id={state.post_id}
                  user_id={user[0].user_id}
                />
              ))}
            </div>
          </>
        )}
        <div className="bg-primary fixed bottom-0 flex justify-start items-center w-full 2xl:w-[60%] gap-2 p-2 pl-3">
          <textarea
            className="w-[90%] h-10 px-3 pt-2 focus:outline-none font-poppins rounded-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            name="comment"
            cols="30"
            rows="10"
            placeholder="Comment"
          />
          <button
            disabled={!comment ? true : false}
            className="font-bold pr-2 cursor-pointer"
            type="submit"
            name="submit"
            onClick={AddComment}
          >
            {comment ? (
              <BsSend className="text-2xl text-secondary" />
            ) : (
              <VscStarEmpty className=" text-2xl text-green" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
