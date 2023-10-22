import React, { useEffect, useState } from "react";

export const NetStatus = () => {
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
        <p className="text-xs font-poppins text-green">online</p>
      ) : (
        <p className="text-xs font-poppins text-danger">offline</p>
      )}
    </div>
  );
};
