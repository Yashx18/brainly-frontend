import axios from 'axios';
import { useState } from 'react';
import { useContentStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { MdVerified } from 'react-icons/md';
import { cn } from '@/lib/utils';

const API_URL = import.meta.env.VITE_API_URL;

const SignIn = () => {
  const { fetchContent } = useContentStore();
  const [form, setForm] = useState({ username: '', password: '' });
  const [signInMessage, setSignInMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const goToHome = () => {
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };

  const goToSignUp = () => {
    navigate('/sign-up');
  };

  async function signIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/sign-in`,
        {
          username: form.username,
          password: form.password,
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
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
        alert('User not found');
      }
    } catch (error) {
      setLoading(false);
      alert('Error signing in');
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
          onSubmit={signIn}
          aria-labelledby="sign-in-title"
        >
          <div className="mb-5 flex w-full items-center justify-between">
            <h1 id="sign-in-title" className="text-2xl font-medium text-neutral-900">
              Sign In
            </h1>
          </div>
          <div className="mb-2">
            <label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              autoComplete="username"
              onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
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
              id="password"
              name="password"
              type="password"
              value={form.password}
              autoComplete="current-password"
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="text-md w-full rounded-md border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-neutral-800 ring-blue-300 transition duration-150 focus:ring-2 focus:outline-none"
              required
              aria-required="true"
              aria-label="Password"
            />
          </div>
          {/* Toast notification fixed to bottom right */}
          {signInMessage && (
            <div
              className="fixed bottom-6 right-6 z-50 flex min-w-[250px] max-w-sm items-center rounded-lg border border-blue-300 bg-white px-4 py-3 shadow-xl animate-fadeIn pointer-events-auto"
              role="status"
              aria-live="polite"
            >
              <MdVerified aria-hidden="true" className="text-blue-500 mr-2 text-xl" />
              <span className="text-base font-medium text-neutral-800">{signInMessage}</span>
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
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
          <div className=" flex items-center justify-center text-neutral-800">
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                className="cursor-pointer border-none bg-transparent p-0 align-baseline font-medium text-blue-600"
                onClick={goToSignUp}
                tabIndex={0}
              >
                Sign Up
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
