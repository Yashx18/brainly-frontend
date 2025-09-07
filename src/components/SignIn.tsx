import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store";
import { useNavigate } from "react-router-dom";
import { MdVerified } from "react-icons/md";

const API_URL = import.meta.env.VITE_API_URL;

const SignIn = () => {
  const { fetchContent } = useContentStore();
  const [signInMessage, setSignInMessage] = useState("");
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordeRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const goToHome = () => {
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };
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
      
      if (response.data.done) {
        const message = response.data.message;
        setSignInMessage(message);
        goToHome();
        setTimeout(() => {
          fetchContent();
        }, 1000);
      } else {
        alert("User not found");
      }
    } catch (error) {
      alert("Error signing in");
      console.error(error);
    }
  }

  useEffect(() => {
  }, [signInMessage]);
  return (
    <div
      className="fixed top-0 left-0 w-screen h-full bg-[#3131315f] flex items-center justify-center z-1
      "
    >
      <div className="bg-white rounded-md w-full max-w-80 h-auto px-8 py-6 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between mb-4">
          <span className="text-2xl font-medium ">Sign In</span>
        </div>
        <form
          action="#"
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          <div className="mb-2">
            <p>Username</p>
            <input
              ref={usernameRef}
              type="text"
              className="w-full border border-[#969696] focus-within:outline-[#919191] rounded-md text-black px-2 py-1"
            />
          </div>
          <div className="mb-2">
            <p>Password</p>
            <input
              ref={passwordeRef}
              type="password"
              className="w-full border border-[#969696] focus-within:outline-[#919191] rounded-md text-black px-2 py-1"
            />
          </div>
          {signInMessage && (
            <div className="w-fit border rounded-lg bg-white shadow-sm flex items-center justify-start mb-2">
              <div className="px-2 py-1 flex items-center justify-between">
                <MdVerified />
                <p className="text-lg font-medium ml-1">{signInMessage}</p>
              </div>
            </div>
          )}{" "}
          <div>
            <div
              className="w-full cursor-pointer bg-purple-500 text-white font-medium flex items-center justify-center py-2 rounded-md hover:bg-[#9f579c]"
              onClick={signIn}
            >
              Sign In
            </div>
          </div>
          <div className="flex items-center justify-center mt-5">
            <span>
              Don't have an account?{" "}
              <span
                className=" text-[#5a54c7] cursor-pointer"
                onClick={goToSignUp}
              >
                Sign Up
              </span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
