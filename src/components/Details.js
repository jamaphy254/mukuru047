import React, { useState } from "react";
import { GrEdit } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import ChangeUserData from "./ChangeUserData";
import axios from "axios";
import { clearUser } from "../features/user/UserSlice";

const Details = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  let user_id;
  let token;

  if (user.length) {
    user_id = user[0].user_id;
    token = user[0].token;
  }

  const [toggle, setToggle] = useState(false);
  const [type, setType] = useState("password");

  const showPass = () => {
    setToggle((prev) => !prev);
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const [toggle1, setToggle1] = useState(false);
  const [title, setTitle] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [about_value, setAbout_value] = useState("");

  const ShowBox = ({ title, placeholder, about_value }) => {
    setToggle1((prev) => !prev);
    setTitle(title);
    setPlaceholder(placeholder);
    setAbout_value(about_value);
  };

  const closeBox = () => {
    setToggle1(false);
  };

  const url = "https://mukuru1.000webhostapp.com/logout.php";

  const Logout = () => {
    let fData = new FormData();
    fData.append("user_id", user_id);
    fData.append("action", "leave");
    fData.append("token", token);

    axios
      .post(url, fData)
      .then((res) => {
        if (res.data.status === "200") {
          dispatch(clearUser());
          navigate("/login");
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="flex flex-col items-center 2xl:items-start p-2 2xl:pl-16 space-y-1 mt-3">
      <div className="flex flex-col p-2 font-poppins w-[315px]">
        <div
          className={`flex justify-between items-center text-base p-1 py-2  border-b border-b-sky-900 border-opacity-25 gap-2`}
        >
          <div className="flex flex-col items-start w-full ">
            <div
              className={`flex justify-between items-center text-base p-1 py-2 w-full gap-2`}
            >
              <p className="text-base sm:text-sm text-[#888] font-poppins">
                About
              </p>
              <span className="cursor-pointer">
                <GrEdit
                  onClick={() =>
                    ShowBox({
                      title: "Change About",
                      placeholder: "About",
                      about_value: data.user_about,
                    })
                  }
                />
              </span>
            </div>
            <textarea
              className="pl-1 bg-transparent text-sm sm:text-sm font-poppins w-[100%] h-28 focus:outline-none"
              readOnly={true}
              type="text"
              cols="30"
              rows="2"
              value={
                data.user_about.length > 1000
                  ? data.user_about.slice(0, 1000) + "..."
                  : data.user_about
              }
            />
          </div>
        </div>
        <div className="flex justify-between items-center text-base p-1 py-2 border-b border-b-sky-900 border-opacity-25 gap-5">
          <div className="flex flex-col items-start w-full ">
            <p className="text-base sm:text-sm text-[#888] font-poppins">
              Name
            </p>
            <p className="text-lg sm:text-sm font-poppins">{data.nam}</p>
          </div>
          <span className="cursor-pointer">
            <GrEdit
              onClick={() =>
                ShowBox({ title: "Change Name", placeholder: "New Name" })
              }
            />
          </span>
        </div>
        <div className="flex justify-between items-center text-base p-1 py-2 border-b border-b-sky-900 border-opacity-25 gap-5">
          <div className="flex flex-col items-start w-full ">
            <p className="text-base sm:text-sm text-[#888] font-poppins">
              Username
            </p>
            <p className="text-lg sm:text-sm font-poppins">{data.user_name}</p>
          </div>
          <span className="cursor-pointer">
            <GrEdit
              onClick={() =>
                ShowBox({
                  title: "Change Username",
                  placeholder: "New Username",
                })
              }
            />
          </span>
        </div>
        <div className="flex justify-between items-center text-base p-1 py-2 border-b border-b-sky-900 border-opacity-25 gap-5">
          <div className="flex flex-col items-start w-full ">
            <p className="text-base sm:text-sm text-[#888] font-poppins">
              Email
            </p>
            <p className="text-lg sm:text-sm font-poppins">{data.user_email}</p>
          </div>
          <span className="cursor-pointer">
            <GrEdit
              onClick={() =>
                ShowBox({ title: "Change Email", placeholder: "New Email" })
              }
            />
          </span>
        </div>
        <div className="flex justify-between items-center text-base p-1 py-2 border-b border-b-sky-900 border-opacity-25 gap-2">
          <div className="flex justify-start items-center w-full">
            <div className="flex flex-col items-start w-full ">
              <p className="text-base sm:text-sm text-[#888] font-poppins">
                Password
              </p>
              <input
                className="px-1 bg-transparent w-[100%] focus:outline-none"
                readOnly={true}
                type={type}
                value={data.user_password}
              />
            </div>
            <span className="cursor-pointer" onClick={showPass}>
              {!toggle ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <span className="cursor-pointer">
            <GrEdit
              onClick={() =>
                ShowBox({
                  title: "Change Password",
                  placeholder: "New Password",
                })
              }
            />
          </span>
        </div>
        <Link className="w-28 mt-12 font-poppins text-cyan-500" to={"/about"}>
          Go to About
        </Link>
        <div className="flex flex-col justify-center items-center mt-10 mb-5 ">
          <div className="flex justify-between items-center bg-primary rounded-md">
            <input
              className="text-lg p-3 font-poppins font-medium"
              type="submit"
              value="Logout"
              onClick={Logout}
            />
          </div>
        </div>
        {toggle1 ? (
          <ChangeUserData
            user_id={user_id}
            closeBox={closeBox}
            title={title}
            placeholder={placeholder}
            about_value={about_value}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Details;
