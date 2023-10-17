import { Routes, Route } from "react-router-dom";

import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignUpPage";

const Router: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
      </Routes>
    </div>
  );
};

export default Router;
