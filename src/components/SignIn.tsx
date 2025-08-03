import { IoMdClose } from "react-icons/io";
interface SignInProps {
  setFn: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn = ({ setFn,setPage }: SignInProps) => {
  return (
    <div
      className="fixed top-0 left-0 w-screen h-full bg-[#3131315f] flex items-center justify-center
      "
    >
      <div className="bg-white rounded-md w-110 h-auto px-12 py-8 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between mb-4">
          <span className="text-2xl font-medium ">Sign In</span>
          <IoMdClose className="size-6 cursor-pointer hover:text-[#5c5c5c]" onClick={() => {
            setPage(val => !val)
          }}/>
        </div>
        <form action="#" className="w-full">
          <div className="mb-2">
            <p>Email</p>
            <input
              type="text"
              className="w-full border-2 border-[#696969] rounded-md text-black px-2 py-1"
            />
          </div>
          <div className="mb-3">
            <p>Password</p>
            <input
              type="text"
              className="w-full border-2 border-[#696969] rounded-md text-black px-2 py-1"
            />
            <span className="cursor-pointer w-full flex items-center justify-end my-1">
              Forgot Password ?
            </span>
          </div>
          <div>
            <div className="w-full cursor-pointer bg-purple-500 text-white font-medium flex items-center justify-center py-2 rounded-md hover:bg-[#9f579c]">
              Sign In
            </div>
          </div>

          <div className="flex items-center justify-center mt-5">
            <span>
              Don't have an account?{" "}
              <span
                className="underline text-[#5a54c7] cursor-pointer"
                onClick={() => {
                  {
                    setFn((val) => !val);
                  }
                }}
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
