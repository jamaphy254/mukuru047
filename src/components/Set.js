import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { URL } from "../API";

const Set = ({ back }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [Alert, setAlert] = useState("");
  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [type, setType] = useState("password");
  const [type2, setType2] = useState("password");

  const showPass = () => {
    setToggle((prev) => !prev);
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const showPass2 = () => {
    setToggle1((prev) => !prev);
    if (type2 === "password") {
      setType2("text");
    } else {
      setType2("password");
    }
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    setUsername(username);
    setEmail(email);
  }, []);

  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const clearInputs = () => {
    setPassword("");
    setConfPassword("");
  };

  const url = `${URL}forget.php;`;

  const HandleSubmit = (e) => {
    e.preventDefault();
    let fData = new FormData();
    fData.append("password", password);
    fData.append("conf_password", confPassword);
    fData.append("username", username);
    fData.append("email", email);

    axios
      .post(url, fData)
      .then((res) => {
        setAlert(res.data.alert);
        if (res.data.status === "200") {
          localStorage.removeItem("username");
          localStorage.removeItem("email");
          localStorage.clear();
          navigate("/login");
        }
      })
      .catch((err) => alert(err));

    clearInputs();
  };
  return (
    <div className="flex flex-col justify-center relative px-6 pt-5 pb-3 w-[95%] lg:w-[60%] 2xl:w-[30%] rounded-xl 2xl:rounded-none 2xl:rounded-r-xl shadow-2xl 2xl:h-[490px] bg-secondary">
      <h3 className="text-center text-slate-800 text-3xl font-semibold pb-2">
        Create new password
      </h3>
      <p className="text-[red] text-base font-mono py-2">{Alert}</p>

      <div className="flex flex-col justify-between w-full">
        <div className="flex justify-start items-center h-12 p-1 px-2 gap-2 border border-[#999] rounded-xl mb-1">
          <input
            className="bg-secondary pl-1 focus:outline-none w-full"
            type={type}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
          />
          <span className="cursor-pointer py-1 px-[2px]" onClick={showPass}>
            {!password ? null : <>{!toggle ? <BiShow /> : <BiHide />}</>}
          </span>
        </div>
        <span className="font-poppins mb-3 pl-3">
          <PasswordStrengthMeter password={password} />
        </span>
        <div className="flex justify-start items-center h-12 p-1 px-2 gap-2 border border-[#999] rounded-xl mb-1">
          <input
            className="bg-secondary pl-1 focus:outline-none w-full"
            type={type2}
            name="conf_password"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            placeholder="Confirm new Password"
          />
          <span className="cursor-pointer py-1 px-[2px]" onClick={showPass2}>
            {!confPassword ? null : <>{!toggle1 ? <BiShow /> : <BiHide />}</>}
          </span>
        </div>
        <input
          className="bg-green h-12 text-white text-xl font-poppins rounded-xl cursor-pointer mt-4"
          type="submit"
          name="save"
          value="Save"
          onClick={HandleSubmit}
        />
      </div>
      <p className="mt-4 text-base text-center font-poppins text-cyan-500">
        <Link to={"/login"} onClick={back}>
          <b>Back</b>
        </Link>
      </p>
    </div>
  );
};

export default Set;
