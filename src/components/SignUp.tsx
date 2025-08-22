import axios from "axios";
import { useRef , useState} from "react";
import { IoMdClose } from "react-icons/io";


const SignUp = () => {
  const [signUpMessage, setSignUpMessage] = useState("");
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordeRef = useRef<HTMLInputElement>(null);

  async function signUp() {
    const username = usernameRef.current?.value;
    const password = passwordeRef.current?.value;

    try {
      const response = await axios.post("http://localhost:3000/api/vi/sign-up", {
        username,
        password,
      });
      if (response.data) {
        const message = response.data.message;
        setSignUpMessage(message)
        console.log('Signed up successfully');
      } else {
        alert('Sign up failed');
      }
    } catch (error) {
      alert('Error signing up');
      console.error(error);
    }
  }

  return (
    <div
      className="fixed top-0 left-0 w-screen h-full bg-[#3131315f] flex items-center justify-center
      "
    >
      <div className="bg-white rounded-md w-110 h-auto px-12 py-8 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between mb-4">
          <span className="text-2xl font-medium ">Sign Up</span>
          <IoMdClose
            className="size-6 cursor-pointer hover:text-[#5c5c5c]"
          />
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
              className="w-full border-2 border-[#696969] rounded-md text-black px-2 py-1"
            />
          </div>
          <div className="mb-3">
            <p>Password</p>
            <input
              ref={passwordeRef}
              type="password"
              className="w-full border-2 border-[#696969] rounded-md text-black px-2 py-1"
            />
            <span className="cursor-pointer w-full flex items-center justify-end my-1">
              Forgot Password ?
            </span>
          </div>

          {signUpMessage && (
            <div className=" text-xl">
              <p>{signUpMessage}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full cursor-pointer bg-purple-500 text-white font-medium flex items-center justify-center py-2 rounded-md hover:bg-[#9f579c]"
            >
              Sign Up
            </button>
          </div>

          <div className="flex items-center justify-center mt-5">
            <span>
              Already have an Account?{" "}
              <span
                className="underline text-[#5a54c7] cursor-pointer"
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
