import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import { ShowErrorMsg, ShowSuccessMsg } from '../../../utils/notification/notification';


const initialstate = {
  email: '',
  password: '',
  err: '',
  success: ''
}

const Login = () => {

  const [user, setUser] = useState(initialstate);
  const { email, password, err, success } = user;

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

    try {
      const res = await axios.post("/api/v1/auth/login", {
        email, password
      })

      setUser({
        ...user,
        err: '',
        success: res.data.msg
      })

      localStorage.setItem('firstLogin', true)
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
      <h2>Login</h2>

      {err && ShowErrorMsg(err)}
      {success && ShowSuccessMsg(success)}

      <form onSubmit={handleSubmit}>
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
          />
        </div>

        <div className="row">
          <button>
            Login
          </button>

          <Link to='/forget'>Forget password?</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
