import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import { ShowErrorMsg, ShowSuccessMsg } from '../../../utils/notification/notification';
import { isEmail, isLength, isMatch, isEmpty } from '../../../utils/validation/validate';


const initialstate = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  err: '',
  success: ''
}

const Register = () => {

  const [user, setUser] = useState(initialstate);
  const { name, email, password, confirmPassword, err, success } = user;

  const handleChange = e => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value,
      err: '',
      success: ''
    })
  }

  const handleSubmit = async e => {
    e.preventDefault();

    if (isEmpty(name) || isEmpty(password)) {
      setUser({
        ...user,
        err: "All field must be filled.",
        success: ''
      })
    }

    if (!isEmail(email)) {
      setUser({
        ...user,
        err: "Please enter a valid email..",
        success: ''
      })
    }

    if (isLength(password)) {
      setUser({
        ...user,
        err: "Password must be a minimum of 7 characters.",
        success: ''
      })
    }

    if (!isMatch(password, confirmPassword)) {
      setUser({
        ...user,
        err: "Password don't match, try again..",
        success: ''
      })
    }

    try {
      const res = await axios.post("/api/v1/auth/register", {
        name, email, password
      })

      setUser({
        ...user,
        err: '',
        success: res.data.msg
      })

      // nav('/')
    } catch (error) {
      error.response.data.msg && setUser({
        ...user,
        err: error.response.data.msg,
        success: ''
      })
    }
  }

  return (
    <div className='login'>
      <h2>Sign Up</h2>

      {err && ShowErrorMsg(err)}
      {success && ShowSuccessMsg(success)}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder='enter username'
            value={name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder='enter email'
            value={email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
            placeholder="password"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="confirm password"
          />
        </div>

        <div className="row">
          <button>
            Sign Up
          </button>
        </div>
      </form>

      <p>Have an account? <Link to='/login'>Login Now.</Link></p>
    </div>
  )
}

export default Register
