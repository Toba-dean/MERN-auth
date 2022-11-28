import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./auth/login.auth";
import Register from "./auth/register.auth";
import ActivateEmail from "./auth/activateEmail.auth";
import NotFound from "../notFound/NotFound.component";
import ForgetPassword from "./auth/ForgetPassword.auth";
import ResetPassword from "./auth/ResetPassword.auth";
import Profile from "./profile/Profile.component";

const Body = () => {

  const users = useSelector(state => state.users);
  const { isLoggedIn } = users

  return (
    <section>
      <Routes>
        <Route path="/login" element={!isLoggedIn ? <Login /> : <NotFound />} />
        <Route path="/signup" element={!isLoggedIn ? <Register /> : <NotFound />} />
        <Route path="/api/v1/auth/activate/:activation_token" element={<ActivateEmail />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/api/v1/auth/reset/:id" element={<ResetPassword />} />
        <Route path="/profile" element={!isLoggedIn ? <Login /> : <Profile />} />
      </Routes>
    </section>
  )
}

export default Body
