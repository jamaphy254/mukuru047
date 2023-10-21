import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Reset from "../components/Reset";
import login from "../assets/IMG_2577.JPG";

const Forgot = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [Alert, setAlert] = useState("");

  const clearInputs = () => {
    setName("");
    setUserName("");
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

  const url = "https://mukuru1.000webhostapp.com/forget.php";

  const HandleSubmit = useCallback((e) => {
    e.preventDefault();

    if (!name) {
      setAlert("Name is required!");
    } else if (!username) {
      setAlert("Username is required!");
    } else {
      let fData = new FormData();
      fData.append("name", Name);
      fData.append("username", Username);
      fData.append("forget", "forget");

      axios
        .post(url, fData)
        .then((res) => {
          setAlert(res.data.alert);
          console.log(res.data);
          if (res.data.status === "200") {
            window.localStorage.setItem("username", res.data.username);
            window.localStorage.setItem("email", res.data.email);
            window.localStorage.setItem("code", res.data.code);
            window.localStorage.setItem("alert", res.data.alert1);
          }
        })
        .catch((err) => alert(err));

      clearInputs();
    }
  });

  const [verify, setVerify] = useState();
  useEffect(() => {
    const alert = localStorage.getItem("alert");
    setVerify(alert);
  }, [HandleSubmit]);

  const goBack = () => {
    localStorage.clear();
  };

  return (
    <>
      <nav className=" flex pl-3 justify-start fixed w-full 2xl:w-[60%] items-center gap-3 bg-primary h-[50px] md:h-14 z-10">
        <h4 className="text-2xl font-bold font-poppins text-green">
          MUKURU<span className="text-danger">047</span>
        </h4>
      </nav>
      <div className="flex justify-center items-center bg-primary h-[100vh] pt-9">
        <div className="hidden 2xl:flex flex-col justify-center items-center bg-green gap-12 rounded-l-xl px-8 h-[490px]">
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
        {!verify ? (
          <div className="flex flex-col justify-center relative px-6 pt-5 pb-3 w-[85%] lg:w-[60%] 2xl:w-[30%] rounded-xl 2xl:rounded-none 2xl:rounded-r-xl shadow-2xl 2xl:h-[490px] bg-secondary">
            <h3 className="text-center text-slate-800 font-poppins text-3xl font-semibold pb-2">
              Forgot password
            </h3>
            <p className="text-[red] font-mono text-base py-2">{Alert}</p>
            <div className="flex flex-col justify-between w-full">
              <input
                className="bg-secondary h-12 focus:outline-none border rounded-xl my-4 p-2 pl-3 border-[#999]"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
              />
              <input
                className="bg-secondary h-12 focus:outline-none border rounded-xl my-4 p-2 pl-3 border-[#999]"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="username"
              />

              <input
                className="bg-green h-12 text-white text-xl font-poppins rounded-xl cursor-pointer mt-6 py-1"
                type="submit"
                name="confirm"
                value="Confirm"
                onClick={HandleSubmit}
              />
              <p className="mx-4 mt-8 text-base text-center ">
                <Link
                  className="font-poppins text-cyan-500"
                  to={"/login"}
                  onClick={goBack}
                >
                  <b>Back</b>
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <Reset name={HandleSubmit} back={goBack} show={verify} />
          </div>
        )}
      </div>
    </>
  );
};

export default Forgot;
