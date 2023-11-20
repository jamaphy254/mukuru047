import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { addUser } from "../features/user/UserSlice";
import login from "../assets/IMG_2577.JPG";
import { URL } from "../API";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Alert, setAlert] = useState("");
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

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  // Convert first letter to uppercase and rest to lowercase
  const Email = email.charAt(0).toUpperCase() + email.slice(1).toLowerCase();

  const url = `${URL}login.php`;

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setAlert("Email is required!");
    } else if (!password) {
      setAlert("Password is required!");
    } else {
      let fData = new FormData();
      fData.append("email", Email);
      fData.append("password", password);

      axios
        .post(url, fData)
        .then((res) => {
          setAlert(res.data.alert);
          // console.log(res.data);
          if (res.data.status === "200") {
            dispatch(
              addUser({
                user_id: res.data.user_id,
                username: res.data.username,
                email: res.data.email,
                profile: res.data.profile,
                token: res.data.token,
                admin: res.data.admin,
              })
            );
            navigate("/");
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
        <div className="hidden 2xl:flex flex-col justify-center items-center bg-green gap-12 rounded-l-xl px-8 h-[545px]">
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
        <div className="flex flex-col justify-center relative px-6 pt-5 pb-3 w-[85%] lg:w-[60%] 2xl:w-[30%] rounded-xl 2xl:rounded-none 2xl:rounded-r-xl shadow-2xl 2xl:h-[545px] bg-secondary">
          <h2 className="text-center font-poppins text-slate-800 text-4xl font-semibold pb-2">
            Login
          </h2>
          <p className="text-[red] font-mono text-base py-2 mb-2">{Alert}</p>
          <div className="flex flex-col justify-between w-full">
            <input
              className="bg-secondary h-12 focus:outline-none border rounded-xl my-4 p-2 pl-3 border-[#999]"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <div className="flex justify-start items-center h-12 p-1 px-2 my-4 gap-2 border border-[#999]  rounded-xl mb-1">
              <input
                className="bg-secondary pl-1 focus:outline-none w-full"
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
            <Link
              className="text-base font-poppins py-3 mt-2 text-cyan-500"
              to={"/forgot"}
            >
              Forgot password?
            </Link>
            <input
              className="bg-green h-12 text-white text-xl font-poppins rounded-xl cursor-pointer mt-4 py-1"
              type="submit"
              name="login"
              value="Login"
              onClick={HandleSubmit}
            ></input>
          </div>

          <p className="pt-3 mb-2 mt-5 text-base font-poppins font-bold text-center text-slate-800">
            Don't have an account?{" "}
            <Link className="text-cyan-500" to={"/sign_up"}>
              <b>Signup</b>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
