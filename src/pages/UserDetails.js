import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { NavBar } from "../components/Header";

const UserDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { user } = useSelector((state) => state.user);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user.length) {
      navigate("/login");
    }

    const url = "http://localhost/mukuru047-backend/profile.php";

    axios.get(url, { params: { user_id: state } }).then((res) => {
      setData(res.data[0]);
      setLoading(false);
    });
  });

  const Loading = () => {
    return (
      <>
        <div className="flex justify-center items-center gap-2 pt-2 mb-2 lg:px-6">
          <Skeleton height={180} width={180} circle />
        </div>
        <div className="flex flex-col items-center gap-3 my-5">
          <Skeleton height={60} width={320} count={4} />
        </div>
      </>
    );
  };
  return (
    <div className="flex flex-col  2xl:pl-52 bg-secondary">
      <NavBar />
      <div className="flex flex-col justify-between pt-14">
        <h2 className="font-poppins text-4xl font-bold text-center pt-2 2xl:text-start 2xl:pl-16 2xl:ml-5 md:p-2">
          User Profile
        </h2>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-col justify-center items-center 2xl:items-start 2xl:pl-16 mt-8 pt-4">
              {data.user_profile ? (
                <img
                  className="w-[180px] h-[180px] 2xl:w-[220px] 2xl:h-[220px] rounded-full 2xl:ml-12 p-[2px] border-r-2 border border-primary"
                  src={`http://localhost/mukuru047-backend/${data.user_profile}`}
                  alt="profile"
                />
              ) : (
                <FaUserCircle className=" h-[180px] w-[180px] 2xl:w-[220px] 2xl:h-[220px] bg-[#999] 2xl:ml-12 rounded-full text-[#777]" />
              )}
            </div>
            <div className="flex flex-col items-center 2xl:items-start p-2 2xl:pl-16 space-y-1 mt-3">
              <div className="flex flex-col p-2 font-poppins w-[315px]">
                <div className="flex flex-col items-start w-full ">
                  <p className="text-base sm:text-sm text-[#888] font-poppins">
                    Name
                  </p>
                  <p className="text-lg sm:text-sm font-poppins">{data.name}</p>
                </div>
                <div className="flex flex-col items-start w-full ">
                  <p className="text-base sm:text-sm text-[#888] font-poppins">
                    Username
                  </p>
                  <p className="text-lg sm:text-sm font-poppins">
                    {data.user_name}
                  </p>
                </div>

                <div className="flex flex-col items-start w-full ">
                  <p className="text-base sm:text-sm text-[#888] font-poppins">
                    Email
                  </p>
                  <p className="text-lg sm:text-sm font-poppins">
                    {data.user_email}
                  </p>
                </div>

                <div className="flex flex-col justify-center items-center mt-10 mb-5 ">
                  <div className="flex justify-between items-center bg-primary rounded-md">
                    <input
                      className="text-base p-2 font-poppins font-medium"
                      type="submit"
                      value="Back"
                      onClick={() => navigate("/home")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
