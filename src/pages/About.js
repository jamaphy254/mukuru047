import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import profile from "../assets/pasp.jpg";
import Afro from "../assets/Afro.jpg";
import { NavBar } from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const About = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.length) {
      navigate("/login");
    }
  });

  return (
    <>
      <NavBar />
      <div className="bg-secondary pt-14 md:pt-14 px-[5px]">
        <div className="flex justify-center items-center my-10">
          <div className="bg-primary p-3 rounded-lg">
            <h4 className="text-4xl font-poppins text-green">
              MUKURU<span className="text-danger">047</span>
            </h4>
            <p className="font-mono text-sm text-secondary">
              Let's improve our community.
            </p>
          </div>
        </div>
        <p className="my-3 font-poppins px-3">
          MUKURU047 is a platform aiming at bringing people together and sharing
          business and political ideas. It also looks for job opportunities for
          the people in the community.
        </p>
        <p className="my-3 font-poppins px-3">
          It was developed by Fredrick Muoki (popular known as Afro), Obina and
          Japheth Mbuvi.
        </p>
        <h3 className="text-2xl font-bold font-poppins text-green text-center mt-10 mb-2">
          Platform Founders
        </h3>
        <div className="flex flex-col md:mx-16 lg:mx-44 mb-12 p-3 border-2 rounded-[50px]">
          <div className="flex justify-center items-center gap-1 p-2 my-8">
            <img
              className="w-[115px] h-[115px] md:w-[180px] md:h-[180px] rounded-full p-[2px] shadow-blue-500 border-r-2 border-r-primary border-b-2 border-b-primary"
              src={Afro}
              alt="profile"
            />
            <div className="flex flex-col px-2 w-[250px] md:w-[550px]">
              <p className="mt-2 font-poppins font-bold">Eng. Fredrick Muoki</p>
              <p className=" font-poppins font-bold">(Afro)</p>
              <p className="text-base font-poppins">
                Political influencer, Civil & Structural Engineer, businessman,
                EHS and Socialogist.
              </p>
              <div className="flex flex-row justify-start items-center gap-1">
                <FcGoogle className="text-xl" />
                <span className="my-1 font-poppins">fredmuoki8@gmail.com</span>
              </div>
              <div className="flex flex-row justify-start items-center gap-1">
                <FaGithub className="text-xl" />
                <span className="my-1 font-poppins">Afro254</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-1 my-12">
            <div className="flex flex-col px-2 w-[250px] md:w-[550px]">
              <p className="my-2 font-poppins font-bold">Obina</p>
              <p className="text-base font-poppins">
                Political influencer, businessman e.t.c
              </p>
              <div className="flex flex-row justify-start items-center gap-1">
                <FcGoogle className="text-xl" />
                <span className="my-1 font-poppins">dobbiero@gmail.com</span>
              </div>
            </div>
            {/* <img
            className="w-[115px] h-[115px] md:w-[180px] md:h-[180px] rounded-full p-[2px] shadow-blue-500 border-l-2 border-l-primary border-b-2 border-b-primary"
            src={profile}
            alt="profile"
          /> */}
            <Link to="/profile">
              <FaUserCircle className=" h-[115px] w-[115px]  md:w-[180px] md:h-[180px] bg-[#999] rounded-full text-[#777] " />
            </Link>
          </div>
          <div className="flex justify-center items-center gap-1 my-12">
            <img
              className="w-[115px] h-[115px] md:w-[180px] md:h-[180px] rounded-full p-[2px] shadow-blue-500 border-r-2 border-r-primary border-b-2 border-b-primary"
              src={profile}
              alt="profile"
            />
            <div className="flex flex-col px-2 w-[250px] md:w-[550px]">
              <p className="my-2 font-poppins font-bold">Japheth Mbuvi</p>
              <p className="text-base font-poppins">
                Political influencer, Electrical Engineer, Full-stack Software
                developer, businessman.
              </p>
              <div className="flex flex-row justify-start items-center gap-1">
                <FcGoogle className="text-xl" />
                <span className="my-1 font-poppins">
                  japhethmbuvi002@gmail.com
                </span>
              </div>
              <div className="flex flex-row justify-start items-center gap-1">
                <FaGithub className="text-xl" />
                <span className="my-1 font-poppins">jamaphy254</span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default About;
