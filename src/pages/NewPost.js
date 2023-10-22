import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { useSelector } from "react-redux";
import ReactEmoji from "react-emoji";

const NewPost = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  let user_id;

  if (user.length) {
    user_id = user[0].user_id;
  }

  useEffect(() => {
    if (!user.length) {
      navigate("/login");
    }
  });

  const [post_text, setPost_text] = useState("");
  const [post_media, setPost_Media] = useState("");

  // Convert first letter to uppercase and rest to lowercase
  const text =
    post_text.charAt(0).toUpperCase() + post_text.slice(1).toLowerCase();

  const url = "https://mukuru1.000webhostapp.com/posts.php";

  const UploadPost = (e) => {
    e.preventDefault();

    let fData = new FormData();
    fData.append("user_id", user_id);
    fData.append("post_media", post_media);
    fData.append("post_text", text);
    fData.append("add", "add");

    axios
      .post(url, fData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status === "200") {
        }
      })
      .catch((err) => alert(err));
    navigate("/home");
  };
  return (
    <>
      <div className="2xl:hidden">
        <Header user_id={user_id} />
      </div>
      <div className="pt-20  md:pt-14 h-[100vh] bg-secondary">
        <div className="flex flex-col items-center">
          <div className="flex flex-col justify-start items-center gap-3 py-5 my-8 bg-orange-50 rounded-md w-[90%] md:w-full">
            <h4 className="text-xl self-center text-primary font-poppins font-semibold px-5">
              New Post
            </h4>

            <textarea
              className="w-[90%] h-52 p-3 border rounded focus:outline-none font-poppins"
              value={ReactEmoji.emojify(post_text)}
              onChange={(e) => setPost_text(e.target.value)}
              name="post_text"
              cols="30"
              rows="10"
              placeholder="Caption..."
            />
            <input
              className="py-3"
              type="file"
              onChange={(e) => setPost_Media(e.target.files[0])}
            />
            <input
              disabled={post_text || post_media ? false : true}
              className={`${
                post_text || post_media ? `bg-primary` : `bg-[#999]`
              } w-[90%] h-12 rounded-md mt-2 font-poppins text-white text-lg font-semibold cursor-pointer shadow-primary`}
              type="submit"
              name="post"
              value="Post"
              onClick={UploadPost}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPost;
