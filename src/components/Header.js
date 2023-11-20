import React, { useState, useEffect } from "react";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineAppstoreAdd, AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";
import { IoIosArrowBack, IoIosNotificationsOutline } from "react-icons/io";
import { BiHomeAlt2 } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi2";
import { URL } from "../API";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className=" flex pl-3 justify-start fixed left-0 top-0 w-full items-center gap-3 bg-primary h-[50px] md:h-14 z-10">
      <IoIosArrowBack
        onClick={() => navigate("/")}
        className="text-2xl cursor-pointer"
      />
      <h4 className="text-xl font-poppins text-secondary">
        MUKURU<span className="text-danger">047</span>
      </h4>
    </nav>
  );
};

const Header = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  let user_id;

  if (user.length) {
    user_id = user[0].user_id;
  }

  const [data, setData] = useState([]);
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);

  function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
      <Link to={to} {...props} className={isActive ? "active" : ""}>
        {children}
      </Link>
    );
  }

  useEffect(() => {
    const url = `${URL}profile.php`;
    const url1 = `${URL}notifications.php`;

    Promise.all([
      axios.get(url, { params: { user_id: user_id } }),
      axios.get(url1, { params: { count: user_id } }),
    ]).then((res) => {
      setData(res[0].data[0]);
      setNotification(res[1].data);
      setLoading(false);
    });
  }, [user_id, data]);

  const Loading = () => (
    <>
      <FaUserCircle className=" h-[30px] w-[30px] bg-[#999] rounded-full text-[#777]" />
    </>
  );

  return (
    <nav className=" flex pl-6 justify-center fixed w-full items-end md:items-center bg-primary h-[90px] md:h-14 z-10">
      <h1
        onClick={() => navigate("/about")}
        className="md:flex pl-3 absolute top-0 md:top-[6px] left-0 py-1 text-green text-2xl md:text-xl lg:text-2xl font-bold font-poppins cursor-pointer"
      >
        MUKURU<span className="text-danger">047</span>
      </h1>
      <div className="md:flex mr-3 absolute top-0 md:top-[6px] right-0 md:right-24 my-2 text-white text-lg md:text-xl lg:text-2xl font-bold font-poppins cursor-pointer">
        <AiOutlineSearch className="text-2xl" />
      </div>
      <ul className="flex gap-[55px] md:gap-3 md:ml-6 md:space-x-5 lg:space-x-10 mr-24 md:mr-0 pb-2 md:pb-0">
        <li className="2xl:hidden text-xl font-semibold md:text-2xl text-secondary font-poppins">
          <CustomLink to="/new_post">
            <AiOutlineAppstoreAdd className="text-2xl" />
          </CustomLink>
        </li>
        <li className="text-xl font-semibold md:text-2xl text-secondary font-poppins">
          <CustomLink to="/">
            <BiHomeAlt2 className="text-2xl" />
          </CustomLink>
        </li>
        <li className="text-xl font-semibold md:text-2xl text-secondary font-poppins">
          <CustomLink to="/people">
            <HiOutlineUsers className="text-2xl" />
          </CustomLink>
        </li>
        <li className="text-xl font-semibold  md:text-2xl text-secondary font-poppins">
          <CustomLink to="/notifications">
            <div className="absolute">
              <IoIosNotificationsOutline className="text-[26px]" />
              {!notification.length ? null : (
                <p className="text-sm font-poppins bg-danger text-white rounded-full text-center w-[20px] h-[20px] relative -top-8 -right-2 ">
                  {notification.length > 9 ? "9+" : notification.length}
                </p>
              )}
            </div>
          </CustomLink>
        </li>
      </ul>
      <div
        onClick={() => navigate("/profile")}
        className="absolute right-0 bottom-[4px] md:bottom-1 mr-3 md:mr-9 cursor-pointer"
      >
        {loading ? (
          <Loading />
        ) : data.user_profile ? (
          <img
            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full p-[2px] border-r-2 border border-primary"
            src={`${URL}${data.user_profile}`}
            alt="profile"
          />
        ) : (
          <FaUserCircle className=" h-[30px] w-[30px] bg-[#999] rounded-full text-[#777]" />
        )}
      </div>
    </nav>
  );
};

export default Header;
