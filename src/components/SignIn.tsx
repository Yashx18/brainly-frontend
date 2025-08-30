import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useContentStore } from "../store";
import { useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton";

const API_URL = import.meta.env.VITE_API_URL;


const SignIn = () => {
  const { fetchContent } = useContentStore();
  const [signInMessage, setSignInMessage] = useState("");
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordeRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/home")
  }
    const goToSignUp = () => {
      navigate("/sign-up");
    };


  async function signIn() {
    const username = usernameRef.current?.value;
    const password = passwordeRef.current?.value;

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/sign-in`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        const message = response.data.message;
        setSignInMessage(message);
        goToHome();
        setTimeout(() => {
          fetchContent();
        }, 2000);
      } else {
        alert("User not found");
      }
    } catch (error) {
      alert("Error signing in");
      console.error(error);
    }
  }

  useEffect(() => {
    console.log(signInMessage);
    
  },[signInMessage])
  return (
    // <div
    //   className="fixed top-0 left-0 w-screen h-full bg-[#3131315f] flex items-center justify-center z-1
    //   "
    // >
    //   <div className="bg-white rounded-md w-110 h-auto px-12 py-8 flex flex-col items-center justify-center">
    //     <div className="w-full flex items-center justify-between mb-4">
    //       <span className="text-2xl font-medium ">Sign In</span>
    //       <IoMdClose className="size-6 cursor-pointer hover:text-[#5c5c5c]" />
    //     </div>
    //     <form
    //       action="#"
    //       className="w-full"
    //       onSubmit={(e) => {
    //         e.preventDefault();
    //         signIn();
    //       }}
    //     >
    //       <div className="mb-2">
    //         <p>Username</p>
    //         <input
    //           ref={usernameRef}
    //           type="text"
    //           className="w-full border-2 border-[#696969] rounded-md text-black px-2 py-1"
    //         />
    //       </div>
    //       <div className="mb-3">
    //         <p>Password</p>
    //         <input
    //           ref={passwordeRef}
    //           type="password"
    //           className="w-full border-2 border-[#696969] rounded-md text-black px-2 py-1"
    //         />
    //         <span className="cursor-pointer w-full flex items-center justify-end my-1">
    //           Forgot Password ?
    //         </span>
    //       </div>
    //       {signInMessage && (
    //         <div className=" text-xl">
    //           <p>{signInMessage}</p>
    //         </div>
    //       )}
    //       <div>
    //         <div
    //           className="w-full cursor-pointer bg-purple-500 text-white font-medium flex items-center justify-center py-2 rounded-md hover:bg-[#9f579c]"
    //           onClick={signIn}
    //         >
    //           Sign In
    //         </div>
    //       </div>

    //       <div className="flex items-center justify-center mt-5">
    //         <span>
    //           Don't have an account?{" "}
    //           <span
    //             className="underline text-[#5a54c7] cursor-pointer"
    //             onClick={goToSignUp}
    //           >
    //             Sign Up
    //           </span>
    //         </span>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <LoginButton />
  );
};

export default SignIn;
