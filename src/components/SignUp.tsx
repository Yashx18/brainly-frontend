import axios from "axios";
import { useRef, useState } from "react";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const SignUp = () => {
  const [signUpMessage, setSignUpMessage] = useState("");
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordeRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const nextPage = () => {
    setTimeout(() => {
      navigate("/sign-in");
    }, 2000);
  };
  const goToSignUp = () => {
      navigate("/sign-in");
  };

  async function signUp() {
    const username = usernameRef.current?.value;
    const password = passwordeRef.current?.value;

    try {
      const response = await axios.post(`${API_URL}/api/auth/sign-up`, {
        username,
        password,
      });
      if (response.data.done) {
        const message = response.data.message;
        setSignUpMessage(message);
        nextPage();
      } else {
        alert("Sign up failed");
      }
    } catch (error) {
      alert("Error signing up");
      console.error(error);
    }
  }

  return (
    <div
      className="fixed top-0 left-0 w-screen h-full bg-[#3131315f] flex items-center justify-center
      "
    >
      <div className="bg-white rounded-md w-full max-w-80 h-auto px-8 py-6 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between mb-4">
          <span className="text-2xl font-medium ">Sign Up</span>
        </div>
        <form
          action="#"
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            signUp();
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

          {signUpMessage && (
            <div className="w-fit border rounded-lg bg-white shadow-sm flex items-center justify-start mb-2">
              <div className="px-2 py-1 flex items-center justify-between">
                <MdVerified />
                <p className="text-lg font-medium ml-1">{signUpMessage}</p>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="mt-5 w-full cursor-pointer bg-purple-500 text-white font-medium flex items-center justify-center py-2 rounded-md hover:bg-[#9f579c]"
            >
              Sign Up
            </button>
          </div>

          <div className="flex items-center justify-center mt-5">
            <span>
              Already have an Account?{" "}
              <span
                className=" text-[#5a54c7] cursor-pointer"
                onClick={goToSignUp}
              >
                Sign In
              </span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
