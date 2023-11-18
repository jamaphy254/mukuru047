import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewPost from "./NewPost";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import Post from "../components/Post";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  let user_id;
  let user_name;
  let user_profile;
  let admin;

  if (user.length) {
    user_id = user[0].user_id;
    user_name = user[0].username;
    user_profile = user[0].profile;
    admin = user[0].admin;
  }

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user.length) {
      navigate("/login");
    }
    const url = "http://localhost/back-end/posts.php";

    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, navigate, data]);

  const Loading = () => {
    return (
      <>
        <div className="mb-14 px-3 pb-3 lg:mb-20 bg-white w-full rounded-md">
          <div className="flex justify-start items-center gap-2 pt-2 mb-2 lg:px-6">
            <Skeleton height={40} width={40} circle />
            <Skeleton height={10} width={150} count={2} />
          </div>
          <Skeleton />
          <Skeleton height={200} />
          <div className="flex justify-between border-b">
            <Skeleton width={25} />
            <Skeleton width={25} />
          </div>
          <div className="flex justify-center items-center">
            <Skeleton height={30} width={90} />
          </div>
        </div>
        <div className="mb-14 px-3 pb-3 lg:mb-20 bg-white w-full rounded-md">
          <div className="flex justify-start items-center gap-2 pt-2 mb-2 lg:px-6">
            <Skeleton height={40} width={40} circle />
            <Skeleton height={10} width={150} count={2} />
          </div>
          <Skeleton />
          <Skeleton height={200} />
          <div className="flex justify-between border-b">
            <Skeleton width={25} />
            <Skeleton width={25} />
          </div>
          <div className="flex justify-center items-center">
            <Skeleton height={30} width={90} />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex justify-start items-start">
      {/* {!user.length ? (
        navigate("/login")
      ) : (
        <> */}
      <Header />
      <div className="hidden 2xl:flex mt-14 mx-8 ">
        <NewPost user_id={user_id} />
      </div>
      <div className="bg-secondary w-full pt-20 md:pt-14">
        <div className="flex flex-col justify-start items-center">
          <h2 className="text-lg text-green font-bold mt-5 text-center py-2">
            POLITICS | BUSSINESS | JOBS
          </h2>
          <h2
            onClick={() => navigate("/new_post")}
            className="2xl:hidden w-[45%] text-lg text-primary font-bold text-center pt-2 cursor-pointer hover:bg-[#558b76] border-b-2 border-b-primary "
          >
            CREATE NEW POST
          </h2>
          <h2 className="hidden 2xl:block absolute left-14 top-16 ml-8 w-[180px] text-center text-xl text-primary font-bold mt-5 cursor-pointer border-b-2 border-b-primary ">
            CREATE NEW POST
          </h2>
        </div>
        <div className="border-b mt-4 mb-7" />
        <div className="px-4">
          {loading ? (
            <Loading />
          ) : (
            <>
              {data.map((item, index) => {
                return (
                  <div key={index}>
                    <Post
                      admin={admin}
                      item={item}
                      user_id={user_id}
                      user_name={user_name}
                      user_profile={user_profile}
                      loading={loading}
                    />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      {/* </>
      )} */}
    </div>
  );
};

export default Home;
