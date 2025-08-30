import "./App.css";
import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
// import SignUp from "./components/SignUp";
import ShareBrainPage from "./pages/ShareBrainPage";
// import Profile from "./components/UserProfile";
// import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            // <ProtectedRoute>
            <Home />
            // </ProtectedRoute>
          }
        />

        {/* <Route path="/" element={<Navigate to="/sign-up" replace />} /> */}

        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        {/* <Route path="/sign-up" element={<SignUp />} /> */}
        <Route path="/brain/:sharelink" element={<ShareBrainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
