import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/home");
    }, 3000);
  }, [navigate]);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="bg-primary p-3 rounded-lg">
        <h4 className="text-3xl font-poppins text-green">
          MUKURU<span className="text-danger">047</span>
        </h4>
        <p className="font-mono text-xs text-secondary">
          Let's improve our community.
        </p>
      </div>
    </div>
  );
};

export default Splash;
