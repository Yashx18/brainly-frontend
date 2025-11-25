import axios from "axios";
import { useRef, useState } from "react";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const API_URL = import.meta.env.VITE_API_URL;

const SignUp = () => {
  const [signUpMessage, setSignUpMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const nextPage = () => {
    setTimeout(() => {
      navigate("/sign-in");
    }, 2000);
  };
  const goToSignIn = () => {
    navigate("/sign-in");
  };

  async function signUp(e?: React.FormEvent<HTMLFormElement>) {
    if (e) e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    setLoading(true);
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
        setLoading(false);
        alert("Sign up failed");
      }
    } catch (error) {
      setLoading(false);
      alert("Error signing up");
      console.error(error);
    }
  }

  return (
    <div className="font-inter fixed top-0 left-0 z-1 flex h-full w-screen items-center justify-center bg-neutral-200">
      {/* Modal Body */}
      <div className="flex h-auto w-full max-w-sm flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg">
        <form
          action="#"
          className="w-full"
          autoComplete="off"
          onSubmit={signUp}
          aria-labelledby="sign-up-title"
        >
          <div className="mb-5 flex w-full items-center justify-between">
            <h1 id="sign-up-title" className="text-2xl font-medium text-neutral-900">
              Sign Up
            </h1>
          </div>
          <div className="mb-2">
            <label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              ref={usernameRef}
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              className="text-md w-full rounded-md border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-neutral-800 ring-blue-300 transition duration-150 focus:ring-2 focus:outline-none"
              required
              aria-required="true"
              aria-label="Username"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              ref={passwordRef}
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              className="text-md w-full rounded-md border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-neutral-800 ring-blue-300 transition duration-150 focus:ring-2 focus:outline-none"
              required
              aria-required="true"
              aria-label="Password"
            />
          </div>

          {signUpMessage && (
            <div
              className="fixed bottom-6 right-6 z-50 flex min-w-[250px] max-w-sm items-center rounded-lg border border-blue-300 bg-white px-4 py-3 shadow-xl animate-fadeIn pointer-events-auto"
              role="status"
              aria-live="polite"
            >
              <MdVerified aria-hidden="true" className="text-blue-500 mr-2 text-xl" />
              <span className="text-base font-medium text-neutral-800">{signUpMessage}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "flex w-full my-6 cursor-pointer items-center justify-center rounded-md bg-blue-500 py-2 font-medium text-white transition-all duration-200 will-change-transform hover:bg-blue-600 active:scale-98 active:bg-blue-600",
                loading && "cursor-not-allowed opacity-70"
              )}
              aria-busy={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>

          <div className=" flex items-center justify-center text-neutral-800">
            <span>
              Already have an account?{" "}
              <button
                type="button"
                className="cursor-pointer border-none bg-transparent p-0 align-baseline font-medium text-blue-600"
                onClick={goToSignIn}
                tabIndex={0}
              >
                Sign In
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
