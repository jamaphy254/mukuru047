import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Details from "../components/Details";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { NavBar } from "../components/Header";

const Profile = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  let user_id;

  if (user.length) {
    user_id = user[0].user_id;
  }

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user_profile, setUser_profile] = useState("");

  const url = "http://localhost/mukuru047-backend/profile.php";

  const ChangePhoto = (e) => {
    e.preventDefault();

    let fData = new FormData();
    fData.append("user_id", user_id);
    fData.append("user_profile", user_profile);
    fData.append("current_user_profile", data.user_profile);

    axios
      .post(url, fData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status === "200") {
        }
      })
      .catch((err) => alert(err));
    setUser_profile("");
  };

  const dlt = "Delete";

  const DeletePhoto = (e) => {
    e.preventDefault();

    let fData = new FormData();
    fData.append("delete", dlt);
    fData.append("user_id", user_id);
    fData.append("current_user_profile", data.user_profile);

    axios
      .post(url, fData)
      .then((res) => {
        if (res.data.status === "200") {
        }
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    if (!user.length) {
      navigate("/login");
    }
    const url = "http://localhost/mukuru047-backend/profile.php";

    axios.get(url, { params: { user_id: user_id } }).then((res) => {
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
        <div className="flex justify-around my-11">
          <Skeleton height={60} width={120} />
          <Skeleton height={60} width={120} />
        </div>
        <div className="flex flex-col items-center gap-3 my-5">
          <Skeleton height={60} width={320} count={4} />
        </div>
      </>
    );
  };
  return (
    <div className="flex flex-col  2xl:pl-52 bg-secondary">
      {/* {!user.length ? (
        navigate("/login")
      ) : (
        <> */}
      <NavBar />
      <div className="flex flex-col justify-between pt-14">
        <h2 className="font-poppins text-4xl font-bold text-center pt-2 2xl:text-start 2xl:pl-16 2xl:ml-5 md:p-2">
          Account settings
        </h2>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-col justify-center items-center 2xl:items-start 2xl:pl-16 pt-4">
              {data.user_profile ? (
                <img
                  className="w-[180px] h-[180px] 2xl:w-[220px] 2xl:h-[220px] rounded-full 2xl:ml-12 p-[2px] border-r-2 border border-primary"
                  src={`http://localhost/mukuru047-backend/${data.user_profile}`}
                  alt="profile"
                />
              ) : (
                <FaUserCircle className=" h-[180px] w-[180px] 2xl:w-[220px] 2xl:h-[220px] bg-[#999] 2xl:ml-12 rounded-full text-[#777]" />
              )}
              <div className="flex flex-col justify-center items-center 2xl:items-start 2xl:ml-6 mt-10 mb-5 ">
                <input
                  className="mb-6"
                  type="file"
                  onChange={(e) => setUser_profile(e.target.files[0])}
                />
                <div className="flex justify-between items-center gap-12 ">
                  <input
                    className="text-base bg-green rounded-xl p-2 font-poppins font-medium focus:outline-none"
                    type="submit"
                    value="Change photo"
                    onClick={ChangePhoto}
                  />
                  <input
                    className="text-base bg-danger rounded-xl p-2 font-poppins font-medium focus:outline-none"
                    type="submit"
                    name="delete"
                    value="Delete photo"
                    onClick={DeletePhoto}
                  />
                </div>
              </div>
            </div>
            <Details data={data} />
          </>
        )}
      </div>
      {/* </>
      )} */}
    </div>
  );
};

export default Profile;
