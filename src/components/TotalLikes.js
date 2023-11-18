import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

const TotalLikes = ({ post_id, user_id, ADDLike }) => {
  const [like, setLike] = useState([]);
  const [loading, setLoading] = useState(true);

  let like_user_id;

  useEffect(() => {
    const url = "http://localhost/back-end/likes.php";

    axios
      .get(url, { params: { post_id: post_id } })
      .then((res) => {
        setLike(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [post_id, ADDLike]);

  const Loading = () => {
    return <>likes</>;
  };
  return (
    <span className="flex items-center gap-1 text-sm font-[500] text-gray-600">
      {loading ? (
        <Loading />
      ) : (
        <>
          {like.map((itm) => {
            if (itm.user_id === user_id) {
              like_user_id = itm.user_id;
            }
            return null;
          })}
          {like.length !== 0 && like_user_id === user_id ? (
            <FcLike className="text-base text-primary cursor-pointer" />
          ) : (
            <FcLikePlaceholder className="text-base text-primary cursor-pointer" />
          )}
          {like.length}
        </>
      )}
    </span>
  );
};

export default TotalLikes;
