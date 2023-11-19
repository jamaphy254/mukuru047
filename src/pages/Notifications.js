import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Notifications = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  let user_id;

  if (user.length) {
    user_id = user[0].user_id;
  }

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = "https://mukuru1.000webhostapp.com/notifications.php";

  const OpenNotification = (item) => {
    navigate("/comments", { state: item });

    let fData = new FormData();
    fData.append("notification_id", item.notification_id);
    fData.append("isRead", true);

    axios
      .post(url, fData)
      .then((res) => {
        if (res.data.status === "200") {
        }
      })
      .catch((err) => alert(err));
  };

  const ClearAllNotifications = () => {
    console.log(user_id);
    let fData = new FormData();
    fData.append("clear_all_notifications", "clear");
    fData.append("user_id", user_id);

    axios
      .post(url, fData)
      .then((res) => {
        if (res.data.status === "200") {
        }
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    axios
      .get(url, { params: { user_id: user_id } })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const Loading = () => {
    return (
      <div className="py-2 px-4">
        <div className="flex justify-start items-center gap-2 mb-2 lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={270} count={2} />
        </div>
        <div className="flex justify-start items-center gap-2 mb-2  lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={270} count={2} />
        </div>
        <div className="flex justify-start items-center gap-2 mb-2  lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={270} count={2} />
        </div>
        <div className="flex justify-start items-center gap-2 mb-2  lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={270} count={2} />
        </div>
        <div className="flex justify-start items-center gap-2 mb-2  lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={270} count={2} />
        </div>
        <div className="flex justify-start items-center gap-2 mb-2  lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={270} count={2} />
        </div>
        <div className="flex justify-start items-center gap-2 mb-2  lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={270} count={2} />
        </div>
        <div className="flex justify-start items-center gap-2 mb-2  lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={270} count={2} />
        </div>
        <div className="flex justify-start items-center gap-2 mb-2  lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={270} count={2} />
        </div>
        <div className="flex justify-start items-center gap-2 mb-2  lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={270} count={2} />
        </div>
        <div className="flex justify-start items-center gap-2 mb-2  lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={270} count={2} />
        </div>
        <div className="flex justify-start items-center gap-2 mb-2  lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={270} count={2} />
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="pt-[90px] md:pt-12 h-[100vh]">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-2xl font-bold font-poppins p-2">Notifications</h3>
          <p
            onClick={ClearAllNotifications}
            className="text-primary font-poppins text-base mr-2"
          >
            Clear All
          </p>
        </div>
        <div className="border-b" />
        <>
          {loading ? (
            <Loading />
          ) : (
            <>
              {!data.length ? (
                <div className="flex items-center justify-center h-[85%]">
                  <p className="text-base italic">No notifications.</p>
                </div>
              ) : (
                <>
                  {data.map((item, i) => (
                    <div
                      key={i}
                      className={`flex justify-start items-center gap-3 mb-1 py-2 border-b px-4 ${
                        item.isRead === "false" ? "bg-secondary" : null
                      }`}
                      onClick={() => OpenNotification(item)}
                    >
                      {item.sender_user_profile ? (
                        <img
                          className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] rounded-full p-[2px] border-r-2 border border-primary"
                          src={`http://localhost/back-end/${item.sender_user_profile}`}
                          alt="profile"
                        />
                      ) : (
                        <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
                      )}

                      <div className="w-[80%] ">
                        <p className="font-poppins text-base">
                          {item.type === "Like"
                            ? `${item.sender_user_name} liked your post.`
                            : `${item.sender_user_name} commented on your post.`}
                        </p>

                        <p className="font-poppins text-base">
                          {item.created_on}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </>
      </div>
    </>
  );
};

export default Notifications;
