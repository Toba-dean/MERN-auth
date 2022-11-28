import { useState } from "react";
import axios from "axios";

import { isEmail } from "../../../utils/validation/validate";
import { ShowErrorMsg, ShowSuccessMsg } from "../../../utils/notification/notification";


const initialState = {
  email: '',
  err: '',
  success: ''
}

const ForgetPassword = () => {

  const [user, setUser] = useState(initialState)
  const { email, err, success } = user

  const handleChange = e => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value,
      err: '',
      success: ''
    })
  }

  const forgetPassword = async () => {
    if (!isEmail(email)) {
      return setUser({
        ...user,
        err: 'Invalid Email',
        success: ''
      })
    }

    try {
      const res = await axios.post('/api/v1/auth/forget', { email })
      return setUser({
        ...user,
        err: '',
        success: res.data.msg
      })
    } catch (error) {
      error.response.data.msg && setUser({
        ...user,
        err: error.response.data.msg,
        success: ''
      })
    }
  }

  return (
    <div className="fg_pass">
      <h2>Forget Your Password?</h2>

      <div className="row">
        {err && ShowErrorMsg(err)}
        {success && ShowSuccessMsg(success)}

        <label htmlFor="email">Enter Your Email Address</label>
        <input type="email" name="email" id="email" value={email} onChange={handleChange} />

        <button onClick={forgetPassword}>Verify Your Email</button>
      </div>
    </div>
  )
}

export default ForgetPassword