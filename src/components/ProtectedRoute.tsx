import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { FaGraduationCap } from "react-icons/fa6";


const API_URL = import.meta.env.VITE_API_URL;

interface ProtectedRouteProps {
  children: any;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/auth/userInfo`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setAuthenticated(true);
        }
      } catch (err) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <span className="animate-pulse">
          <FaGraduationCap className=" text-[#585858] size-7" />
        </span>
      </div>
    );

  if (!authenticated) return <Navigate to="/sign-in" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
