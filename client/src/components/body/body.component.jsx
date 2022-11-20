import { Routes, Route } from "react-router-dom";

import Login from "./auth/login.auth";
import Register from "./auth/register.auth";
import ActivateEmail from "./auth/activateEmail.auth";

const Body = () => {
  return (
    <section>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/api/v1/auth/activate/:activation_token" element={<ActivateEmail />} />
      </Routes>
    </section>
  )
}

export default Body
