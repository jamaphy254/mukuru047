import axios from "axios";
import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

const ChangeUserData = ({ user_id, closeBox, title, placeholder }) => {
  const [Alert, setAlert] = useState("");
  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [type, setType] = useState("password");
  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");

  const showPass = () => {
    setToggle((prev) => !prev);
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const showPass1 = () => {
    setToggle1((prev) => !prev);
    if (type1 === "password") {
      setType1("text");
    } else {
      setType1("password");
    }
  };
  const showPass2 = () => {
    setToggle2((prev) => !prev);
    if (type2 === "password") {
      setType2("text");
    } else {
      setType2("password");
    }
  };

  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confNewPassword, setConfNewPassword] = useState("");
  const [password, setPassword] = useState("");

  const clearInputs = () => {
    setNewName("");
    setNewUsername("");
    setNewEmail("");
    setNewPassword("");
    setConfNewPassword("");
    setPassword("");
  };

  // Convert first letter of each word to uppercase
  const Name = newName
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  // Convert first letter to uppercase and rest to lowercase
  const Username =
    newUsername.charAt(0).toUpperCase() + newUsername.slice(1).toLowerCase();

  // Convert first letter to lowercase and rest to lowercase
  const Email =
    newEmail.charAt(0).toLowerCase() + newEmail.slice(1).toLowerCase();

  const url = "http://localhost/mukuru047-backend/profile.php";

  const change = "Change";

  const HandleSubmit = (e) => {
    e.preventDefault();
    let fData = new FormData();

    if (title === "Change Name") {
      fData.append("change_name", change);
      fData.append("new_name", Name);
    } else if (title === "Change Username") {
      fData.append("change_username", change);
      fData.append("new_username", Username);
    } else if (title === "Change Email") {
      fData.append("change_email", change);
      fData.append("new_email", Email);
    } else {
      fData.append("change_password", change);
      fData.append("new_password", newPassword);
      fData.append("conf_new_password", confNewPassword);
    }

    fData.append("password", password);
    fData.append("user_id", user_id);

    axios
      .post(url, fData)
      .then((res) => {
        setAlert(res.data.alert);
        if (res.data.status === "200") {
        }
      })
      .catch((err) => alert(err));

    clearInputs();
    closeBox();
  };
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center px-5 bg-[#00000099] fixed left-0 right-0 top-0 bottom-0 pt-[15%] 2xl:items-start 2xl:pl-[270px] 2xl:pt-[5%]">
        <div className="flex flex-col p-4 mx-4 rounded-md bg-secondary">
          <h3 className="text-center text-slate-900 text-2xl font-poppins font-semibold pt-3 pb-2">
            {title}
          </h3>
          <p className="text-[red] text-base py-2">{Alert}</p>

          <div className="flex flex-col justify-center  w-[250px]">
            {title !== "Change Password" ? (
              <input
                className="bg-transparent border-b-2 mb-2 p-1 py-3 border-b-primary focus:outline-none"
                type={title !== "Change Email" ? "text" : "email"}
                name="name"
                value={
                  title === "Change Name"
                    ? newName
                    : title === "Change Username"
                    ? newUsername
                    : Email
                }
                onChange={
                  title === "Change Name"
                    ? (e) => setNewName(e.target.value)
                    : title === "Change Username"
                    ? (e) => setNewUsername(e.target.value)
                    : (e) => setNewEmail(e.target.value)
                }
                placeholder={placeholder}
              />
            ) : null}
            <div className="flex justify-start items-center border-b-2 p-1 py-3 border-b-primary">
              <input
                className="bg-transparent w-full focus:outline-none"
                type={type}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
              />
              <span className="cursor-pointer py-1 px-[2px]" onClick={showPass}>
                {!password ? null : <>{!toggle ? <BiShow /> : <BiHide />}</>}
              </span>
            </div>
            {title === "Change Password" ? (
              <>
                <div className="flex justify-start items-center border-b-2 px-1 py-3 border-b-primary">
                  <input
                    className="bg-transparent w-full focus:outline-none"
                    type={type1}
                    name="new_password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={placeholder}
                  />
                  <span
                    className="cursor-pointer py-1 px-[2px]"
                    onClick={showPass1}
                  >
                    {!newPassword ? null : (
                      <>{!toggle1 ? <BiShow /> : <BiHide />}</>
                    )}
                  </span>
                </div>
                <span className="font-poppins">
                  <PasswordStrengthMeter password={newPassword} />
                </span>
                <div className="flex justify-start items-center border-b-2 px-1 py-3 border-b-primary">
                  <input
                    className="bg-transparent w-full focus:outline-none"
                    type={type2}
                    name="conf_new_password"
                    value={confNewPassword}
                    onChange={(e) => setConfNewPassword(e.target.value)}
                    placeholder="Confirm new Password"
                  />
                  <span
                    className="cursor-pointer py-1 px-[2px]"
                    onClick={showPass2}
                  >
                    {!confNewPassword ? null : (
                      <>{!toggle2 ? <BiShow /> : <BiHide />}</>
                    )}
                  </span>
                </div>
              </>
            ) : null}

            <div className="flex justify-between px-3 mt-8 mb-2">
              <input
                className="font-poppins text-lg font-medium w-16 rounded cursor-pointer py-1 focus:outline-none"
                type="submit"
                name="cancel"
                value="Cancel"
                onClick={() => closeBox()}
              />
              <input
                className="bg-green w-16 font-poppins text-lg font-medium text-white rounded cursor-pointer py-1 focus:outline-none"
                type="submit"
                name="save"
                value="Save"
                onClick={HandleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserData;
