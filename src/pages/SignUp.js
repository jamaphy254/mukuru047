import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import login from "../assets/IMG_2577.JPG";
import { URL } from "../API";

const Signup = () => {
  // const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const clearInputs = () => {
    setName("");
    setPassword("");
    setConfirmPassword("");
    setUserName("");
    setEmail("");
  };

  // Convert first letter of each word to uppercase
  const Name = name
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  // Convert first letter to uppercase and rest to lowercase
  const Username =
    username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();

  // Convert first letter to lowercase
  const Email = email.slice(0).toLowerCase();

  // const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const url = `${URL}signup.php`;

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      setAlert("Full Name is required!");
    } else if (!username) {
      setAlert("Username is required!");
    } else if (!email) {
      setAlert("Email is required!");
    } else if (!email) {
      setAlert("invalid email address!");
    } else if (!password) {
      setAlert("Password is required!");
    } else if (password !== confirmPassword) {
      setAlert("Password doesn't match!");
    } else {
      let fData = new FormData();
      fData.append("name", Name);
      fData.append("email", Email);
      fData.append("username", Username);
      fData.append("password", password);
      fData.append("confirm_password", confirmPassword);

      axios
        .post(url, fData)
        .then((res) => {
          setAlert(res.data.alert);
          if (res.data.status === "200") {
            // navigate("/login");
          }
        })
        .catch((err) => alert(err));
      clearInputs();
    }
  };

  return (
    <>
      <nav className=" flex pl-3 justify-start fixed w-full 2xl:w-[60%] items-center gap-3 bg-primary h-[50px] md:h-14 z-10">
        <h4 className="text-2xl font-bold font-poppins text-green">
          MUKURU<span className="text-danger">047</span>
        </h4>
      </nav>
      <div className="flex justify-center items-center bg-primary h-[100vh] pt-9">
        <div className="hidden 2xl:flex flex-col justify-center items-center bg-green gap-12 rounded-l-xl px-8 h-[555px]">
          <div className="bg-primary p-3 rounded-lg">
            <h4 className="text-4xl font-poppins text-green">
              MUKURU<span className="text-danger">047</span>
            </h4>
            <p className="font-mono text-sm text-secondary">
              Let's improve our community.
            </p>
          </div>
          <img className="h-80 w-80 rounded-xl" src={login} alt="logo" />
        </div>
        <div className="flex flex-col justify-center relative px-6 pt-5 pb-3 w-[88%] lg:w-[60%] 2xl:w-[30%] rounded-xl 2xl:rounded-none 2xl:rounded-r-xl shadow-2xl 2xl:h-[555px] bg-secondary">
          <h3 className="text-center text-slate-800 text-3xl font-poppins font-semibold p-">
            Signup
          </h3>
          <p className="text-[red] text-base font-mono py-2">{Alert}</p>

          <div className="flex flex-col justify-between w-full">
            <input
              className="bg-secondary h-12 focus:outline-none border rounded-xl mb-4 p-2 pl-3 border-[#999]"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
            <input
              className="bg-secondary h-12 focus:outline-none border rounded-xl mb-4 p-2 pl-3 border-[#999]"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="username"
            />
            <input
              className="bg-secondary h-12 focus:outline-none border rounded-xl mb-4 p-2 pl-3 border-[#999]"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <div className="flex justify-start items-center h-12 p-1 px-2 gap-2 border border-[#999] rounded-xl mb-1">
              <input
                className="bg-secondary pl-1 focus:outline-none w-full"
                type={type}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <span className="cursor-pointer py-1 px-[2px]" onClick={showPass}>
                {!password ? null : <>{!toggle ? <BiShow /> : <BiHide />}</>}
              </span>
            </div>
            <span className="font-poppins mb-3 pl-3">
              <PasswordStrengthMeter password={password} />
            </span>
            <div className="flex justify-start items-center h-12 p-1 px-2 gap-2 border border-[#999]  rounded-xl mb-4">
              <input
                className="bg-secondary pl-1 focus:outline-none w-full"
                type={type2}
                name="confirm_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
              <span
                className="cursor-pointer py-1 px-[2px]"
                onClick={showPass2}
              >
                {!confirmPassword ? null : (
                  <>{!toggle1 ? <BiShow /> : <BiHide />}</>
                )}
              </span>
            </div>
            <input
              className="bg-green h-12 text-white text-xl font-poppins rounded-xl cursor-pointer mt-4"
              type="submit"
              name="signup"
              value="Signup"
              onClick={HandleSubmit}
            />
            <p className="my-3 text-base font-poppins font-bold text-center text-slate-800">
              Already a user?{" "}
              <Link className="text-cyan-500" to={"/login"}>
                <b>Login</b>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
