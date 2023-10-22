import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { NetStatus } from "../components/NetStatus";

export const People = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  let user_id;

  if (user.length) {
    user_id = user[0].user_id;
  }

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user.length) {
      navigate("/login");
    }

    const url = "https://mukuru1.000webhostapp.com/users.php";

    axios
      .get(url, { params: { user_id: user_id } })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const Loading = () => {
    return (
      <div className="pt-7 px-5">
        <div className="flex justify-start items-center gap-2 mb-5 lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={250} count={2} />
        </div>
        <div className="flex justify-start items-center gap-2 mb-5  lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={250} count={2} />
        </div>
        <div className="flex justify-start items-center gap-2 mb-5  lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={250} count={2} />
        </div>
        <div className="flex justify-start items-center gap-2 mb-5  lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={250} count={2} />
        </div>
        <div className="flex justify-start items-center gap-2 mb-5  lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={250} count={2} />
        </div>
        <div className="flex justify-start items-center gap-2 mb-5  lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={250} count={2} />
        </div>
        <div className="flex justify-start items-center gap-2 mb-5  lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={250} count={2} />
        </div>
        <div className="flex justify-start items-center gap-2 mb-5  lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={250} count={2} />
        </div>
        <div className="flex justify-start items-center gap-2 mb-5  lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={250} count={2} />
        </div>
        <div className="flex justify-start items-center gap-2 mb-5  lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={250} count={2} />
        </div>
        <div className="flex justify-start items-center gap-2 mb-5  lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={250} count={2} />
        </div>
        <div className="flex justify-start items-center gap-2 mb-5  lg:px-6">
          <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
          <Skeleton height={15} width={250} count={2} />
        </div>
      </div>
    );
  };
  return (
    <>
      <Header />
      <div className="pt-[85px] md:pt-14 h-[100vh] bg-secondary">
        <div className="flex justify-center items-center">
          <div className="bg-primary p-2 rounded-full  w-[70%] flex justify-evenly mt-4">
            <h3 className="text-xl text-green font-poppins font-semibold">
              People
            </h3>
            <h3 className="text-xl text-secondary font-poppins font-semibold">
              {users.length}
            </h3>
          </div>
        </div>
        <>
          {loading ? (
            <Loading />
          ) : (
            <>
              {users.length === 0 ? (
                <div className="flex items-center justify-center h-[85%]">
                  <p className="text-base italic">User list is empty.</p>
                </div>
              ) : (
                <>
                  {users.map((item, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        navigate("/user_details", { state: item.user_id })
                      }
                      className="flex justify-start items-center gap-3 m-4 p-2"
                    >
                      {item.user_profile ? (
                        <img
                          className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] rounded-full p-[2px] border-r-2 border border-primary"
                          src={`https://mukuru1.000webhostapp.com/${item.user_profile}`}
                          alt="profile"
                        />
                      ) : (
                        <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
                      )}
                      <div className=" flex justify-start items-center cursor-pointer w-[82%]">
                        <div className="w-[80%]">
                          <p className="font-poppins text-base font-semibold">
                            {item.user_name}
                          </p>
                          <p className="font-poppins text-sm font-medium">
                            {item.user_about}
                          </p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          {item.admn === "Admin" ? (
                            <p className="text-xs font-poppins text-purple-500">
                              admin
                            </p>
                          ) : null}
                          <NetStatus item={item} />
                          {/* {item.user_login_status === "Login" ? (
                            <p className="text-xs font-poppins text-green">
                              online
                            </p>
                          ) : (
                            <p className="text-xs font-poppins text-danger">
                              offline
                            </p>
                          )} */}
                        </div>
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

// const Chats = () => {
//   const navigate = useNavigate();

//   const { user } = useSelector((state) => state.user);

//   let user_id;

//   if (user.length) {
//     user_id = user[0].user_id;
//   }

//   const [active, setActive] = useState(0);
//   const [data, setData] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const last_msg = data[data.length - 1];

//   useEffect(() => {
//     if (!user.length) {
//       navigate("/login");
//     }

//     const url = "http://localhost/mukuru047-backend/database/ChatRooms.php";
//     const url1 = "http://localhost/mukuru047-backend/users.php";

//     Promise.all([axios.get(url), axios.get(url1)])
//       .then((res) => {
//         setData(res[0].data);
//         setUsers(res[1].data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//   const Loading = () => {
//     return (
//       <>
//         <div className="flex justify-start items-center gap-2 mb-2 lg:px-6">
//           <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
//           <Skeleton height={15} width={250} count={2} />
//         </div>
//       </>
//     );
//   };

//   return (
//     <div className="">
//       <Header />
//       <div className="pt-[85px] md:pt-14 h-[100vh] bg-secondary">
//         <div className="flex justify-center">
//           <div className="bg-primary p-2 rounded-full w-[90%] flex justify-between mt-4">
//             {["Messages", "People"].map((item, index) => (
//               <p
//                 onClick={() => setActive(index)}
//                 key={index}
//                 className={`w-1/2 py-2 text-center cursor-pointer rounded-full font-semibold font-poppins text-xl ${
//                   index === active ? `bg-white text-primaryColor` : ``
//                 }`}
//               >
//                 {item}
//               </p>
//             ))}
//           </div>
//         </div>

//         {active === 0 && (
//           <div>
//             {groups.length === 0 ? (
//               <div className="items-center justify-center h-[85%]">
//                 <p className="text-base italic">No group joined</p>
//               </div>
//             ) : (
//               <>
//                 {groups.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex justify-start items-center gap-3 m-4 p-2"
//                   >
//                     {loading ? (
//                       <Loading />
//                     ) : (
//                       <>
//                         {item.image ? (
//                           <img
//                             className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] rounded-full p-[2px] border-r-2 border border-primary"
//                             src={item.image}
//                             alt="profile"
//                           />
//                         ) : (
//                           <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
//                         )}
//                         <div
//                           onClick={() =>
//                             navigate("/chat_room", { state: item })
//                           }
//                           className=" flex justify-start items-center cursor-pointer w-[82%]"
//                         >
//                           <div className="w-[80%]">
//                             <p className="font-poppins text-base font-semibold">
//                               {item.name}
//                             </p>
//                             <p className="font-poppins text-sm font-medium">
//                               {last_msg.user_id === user_id ? (
//                                 <span>You: </span>
//                               ) : (
//                                 <>
//                                   {last_msg.user_name.length > 4
//                                     ? last_msg.user_name.slice(0, 4) + " : "
//                                     : last_msg.user_name + " : "}
//                                 </>
//                               )}
//                               {last_msg.msg.length > 22
//                                 ? last_msg.msg.slice(0, 22) + "..."
//                                 : last_msg.msg}
//                             </p>
//                           </div>
//                           <p className="text-xs">{last_msg.created_on}</p>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 ))}
//               </>
//             )}
//           </div>
//         )}

//         {active === 1 && (
//           <div>
//             {users.length === 0 ? (
//               <div className="items-center justify-center h-[85%]">
//                 <p className="text-base italic">User list is empty.</p>
//               </div>
//             ) : (
//               <>
//                 {users.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex justify-start items-center gap-3 m-4 p-2"
//                   >
//                     {item.user_profile ? (
//                       <img
//                         className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] rounded-full p-[2px] border-r-2 border border-primary"
//                         src={`http://localhost/mukuru047-backend/${item.user_profile}`}
//                         alt="profile"
//                       />
//                     ) : (
//                       <FaUserCircle className=" h-[45px] w-[45px] bg-[#999] rounded-full text-[#777]" />
//                     )}
//                     <div className=" flex justify-start items-center cursor-pointer w-[82%]">
//                       <div className="w-[80%]">
//                         <p className="font-poppins text-base font-semibold">
//                           {item.user_name}
//                         </p>
//                         <p className="font-poppins text-sm font-medium">
//                           0712345678
//                         </p>
//                       </div>
//                       <div className="flex flex-col justify-center items-center">
//                         {item.admin === "Admin" ? (
//                           <p className="text-xs font-poppins text-purple-500">
//                             admin
//                           </p>
//                         ) : null}
//                         {item.user_login_status === "Login" ? (
//                           <p className="text-xs font-poppins text-green">
//                             online
//                           </p>
//                         ) : (
//                           <p className="text-xs font-poppins text-danger">
//                             offline
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chats;
