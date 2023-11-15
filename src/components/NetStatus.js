import React, { useEffect, useState } from "react";

export const NetStatus = ({ item }) => {
  const [status, setStatus] = useState(true);

  useEffect(() => {
    function changeStatus() {
      setStatus(navigator.onLine);
    }
    window.addEventListener("online", changeStatus);
    window.addEventListener("offline", changeStatus);

    return () => {
      window.removeEventListener("online", changeStatus);
      window.removeEventListener("offline", changeStatus);
    };
  }, []);
  return (
    <div>
      {status ? (
        item.user_login_status === "Login" && status ? (
          <p className="text-xs font-poppins text-green">online</p>
        ) : (
          <p className="text-xs font-poppins text-danger">offline</p>
        )
      ) : null}
    </div>
  );
};
