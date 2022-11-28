import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { ShowErrorMsg, ShowSuccessMsg } from "../../../utils/notification/notification";
import { isLength, isMatch } from "../../../utils/validation/validate";


const initialState = {
  password: '',
  cf_password: '',
  err: '',
  success: ''
}

const ResetPassword = () => {

  const [data, setData] = useState(initialState)
  const { password, cf_password, err, success } = data
  const { id: token } = useParams()

  const handleChange = e => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
      err: '',
      success: ''
    })
  }

  const resetPassword = async () => {
    if (isLength(password)) {
      setData({
        ...data,
        err: "Password must be a minimum of 7 characters.",
        success: ''
      })
    }

    if (!isMatch(password, cf_password)) {
      setData({
        ...data,
        err: "Password don't match, try again..",
        success: ''
      })
    }

    try {
      const res = await axios.post('/api/v1/auth/reset', { password }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      return setData({
        ...data,
        err: '',
        success: res.data.msg
      })
    } catch (error) {
      error.response.data.msg && setData({
        ...data,
        err: error.response.data.msg,
        success: ''
      })
    }
  }

  return (
    <div className="fg_pass">
      <h2>Reset Password</h2>

      <div className="row">
        {err && ShowErrorMsg(err)}
        {success && ShowSuccessMsg(success)}

        <label htmlFor="password">Enter New Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
        />

        <label htmlFor="cf_password">Confirm New Password</label>
        <input
          type="password"
          name="cf_password"
          id="cf_password"
          value={cf_password}
          onChange={handleChange}
        />


        <button onClick={resetPassword}>Reset Password</button>
      </div>
    </div>
  )
}

export default ResetPassword
