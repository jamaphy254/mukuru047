import React from "react";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-secondary flex flex-col px-6 pb-6 text-lg font-poppins">
      <div className="md:text-center mt-4 mb-8 border-t border-t-primary " />
      <div className="flex flex-col justify-center items-center md:flex-row md:justify-center md:items-center my-6 gap-4">
        <Link className="font-poppins">Terms & Conditions</Link>
        <p className="hidden md:flex">|</p>
        <Link className="font-poppins mt-2">Privacy Policy</Link>
      </div>
      <div className="flex items-center justify-center gap-4 my-7">
        <FaFacebook className="text-3xl text-white bg-blue-600 rounded-full" />
        <FaGithub className="text-3xl" />
        <FcGoogle className="text-3xl" />
      </div>
      <h4 className="text-center font-poppins text-lg mt-6 mb-3">
        &#169; 2023 Elitestar Developers
      </h4>
      <p className="text-center font-poppins text-lg">All rights reserved.</p>
    </div>
  );
};

export default Footer;
