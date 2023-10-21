import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Set from "./Set";

const Reset = ({ name, show, back }) => {
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstCode, setFirstCode] = useState("");
  const [Alert, setAlert] = useState("");
  const [code1, setCode1] = useState();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const firstCode = localStorage.getItem("code");
    setUsername(username);
    setEmail(email);
    setFirstCode(firstCode);
  }, [name]);

  const clearInputs = () => {
    setCode("");
  };

  const HandleResend = (e) => {
    const url = "http://localhost/mukuru047-backend/forget.php";
    e.preventDefault();
    let fData = new FormData();
    fData.append("code", firstCode);
    fData.append("username", username);
    fData.append("email", email);
    fData.append("resend", "resend");

    axios
      .post(url, fData)
      .then((res) => alert(res.data.alert))
      .catch((err) => alert(err));
  };

  const url = "http://localhost/mukuru047-backend/forget.php";

  const HandleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      let fData = new FormData();
      fData.append("code", code);
      fData.append("username", username);
      fData.append("email", email);
      fData.append("reset", "reset");

      axios
        .post(url, fData)
        .then((res) => {
          setAlert(res.data.alert);
          if (res.data.status === "200") {
            localStorage.removeItem("alert");
            localStorage.removeItem("code");
          }
        })
        .catch((err) => alert(err));
      clearInputs();
    },
    [code, email, username]
  );

  useEffect(() => {
    const code = localStorage.getItem("code");
    setCode1(code);
  }, [HandleSubmit]);

  return (
    <div>
      {code1 ? (
        <div className="flex flex-col justify-between relative px-6 pt-3 pb-3 w-[95%] lg:w-[60%] 2xl:w-[30%] rounded-xl 2xl:rounded-none 2xl:rounded-r-xl shadow-2xl h-[500px] 2xl:h-[490px] bg-secondary">
          <h3 className="text-center text-slate-800  text-3xl font-semibold pb-1">
            Account verification
          </h3>

          <p className="w-[280px] text-green text-base py-1">{show}</p>
          <p className="text-[red] font-mono text-base ">{Alert}</p>

          <div className="flex flex-col justify-evenly mb-8 h-[110px]">
            <div className="flex flex-col mt-7">
              <label className="font-poppins" htmlFor="code">
                Enter verification code:{" "}
              </label>
              <input
                className="bg-secondary h-12 focus:outline-none border rounded-xl my-4 p-2 pl-3 border-[#999]"
                type="text"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="G-123456"
              />
            </div>

            <input
              className="bg-green h-12 text-white text-xl font-poppins rounded-xl cursor-pointer mt-1 py-1"
              type="submit"
              name="verify"
              value="Verify"
              onClick={HandleSubmit}
            />
          </div>
          <p className="mt-3 text-base font-poppins font-bold text-center text-slate-800">
            Didn't get verification code?{" "}
            <Link type="submit" onClick={HandleResend}>
              <b>Resend</b>
            </Link>
          </p>
          <p className=" text-base text-center font-poppins text-cyan-500">
            <Link to={"/login"} onClick={back}>
              <b>Back</b>
            </Link>
          </p>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Set back={back} />
        </div>
      )}
    </div>
  );
};

export default Reset;
