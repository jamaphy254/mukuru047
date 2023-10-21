import axios from "axios";
import React, { useEffect, useState } from "react";

const TotalComments = ({ post_id }) => {
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = "https://mukuru1.000webhostapp.com/comments.php";

    axios
      .get(url, { params: { post_id: post_id } })
      .then((res) => {
        setComment(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [post_id]);

  const Loading = () => {
    return <>comments</>;
  };
  return <span>{loading ? <Loading /> : comment.length}</span>;
};

export default TotalComments;
