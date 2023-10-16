import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import ChangeName from "./ChangeName";
import ChangeUsername from "./ChangeUsername";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Details from "./Details";

const Account = () => {
  const navigate = useNavigate();

  const { isOpenUsername } = useSelector((state) => state.changeAccount);
  const { isOpenName } = useSelector((state) => state.changeAccount);
  const { isOpenEmail } = useSelector((state) => state.changeAccount);
  const { isOpenPassword } = useSelector((state) => state.changeAccount);

  const { id } = useSelector((state) => state.user);
  const auth = id[0];

  useEffect(() => {
    if (!auth) {
      navigate("/");
      return;
    }
  });

  return (
    <div>
      <div className="flex flex-col">
        <Header />
        <div className="flex flex-col justify-between pt-14">
          <h2 className="font-poppins text-4xl font-bold text-center pt-2 sm:text-center md:text-start md:p-2">
            Account settings
          </h2>
          <div className="flex flex-col justify-center items-center sm:items-start sm:pl-16 pt-4">
            <FaUserCircle className=" h-[120px] w-[120px]  sm:ml-24 bg-[#999] rounded-full text-slate-600" />
          </div>
          <Details />
        </div>
        <div className=" absolute left-0 right-0 flex flex-col">
          {isOpenUsername && <ChangeUsername />}
          {isOpenName && <ChangeName />}
          {isOpenEmail && <ChangeEmail />}
          {isOpenPassword && <ChangePassword />}
        </div>
      </div>
    </div>
  );
};

export default Account;
