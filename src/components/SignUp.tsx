const SignUp = () => {
  return (
    <div
      className="fixed top-0 left-0 w-screen h-full bg-[#3131315f] flex items-center justify-center
      "
    >
      <div className="bg-white rounded-md w-110 h-auto px-12 py-8 flex flex-col items-center justify-center">
        <span className="text-2xl font-medium mb-6">Sign Up</span>
        <form action="#" className="w-full">
          <div className="mb-2">
            <p>Email</p>
            <input
              type="text"
              className="w-full border-2 border-[#696969] rounded-md text-black px-2 py-1"
            />
          </div>
          <div className="mb-1">
            <p>Password</p>
            <input
              type="text"
              className="w-full border-2 border-[#696969] rounded-md text-black px-2 py-1"
            />
            <span className="cursor-pointer w-full flex items-center justify-end my-1">
              Forgot Password ?
            </span>
          </div>

          <div className="w-full flex items-center justify-start mb-2">
            <input type="checkbox" className="cursor-pointer mr-2 w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
            <span>Remember me?</span>
          </div>
          <div>
            <div className="w-full cursor-pointer bg-purple-500 text-white font-medium flex items-center justify-center py-2 rounded-md hover:bg-[#9f579c]">
              Sign Up
            </div>
          </div>

          <div className="flex items-center justify-center mt-5">
            <span>
              Already have an Account?{" "}
              <a href="" className="underline text-[#5a54c7] cursor-pointer">
                Sign In
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
