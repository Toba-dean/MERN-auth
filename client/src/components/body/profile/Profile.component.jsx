import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import { isMatch, isLength } from "../../../utils/validation/validate";
import { ShowErrorMsg, ShowSuccessMsg } from "../../../utils/notification/notification";

const initialState = {
  name: '',
  password: '',
  confirmPassword: '',
  err: '',
  success: ''
}

const Profile = () => {


  const users = useSelector(state => state.users)
  const token = useSelector(state => state.token)
  const { user, isAdmin } = users

  const [data, setData] = useState(initialState)
  const { name, password, confirmPassword, err, success } = data

  const [avatar, setAvatar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [callback, setCallback] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
      err: '',
      success: ''
    })
  }

  const updateProfile = async () => {
    try {
      await axios.patch('/api/v1/user/update', {
        name: name ? name : user.name,
        avatar: avatar ? avatar : user.avatar
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

      return setData({
        ...data,
        err: '',
        success: 'Update Successful'
      })

    } catch (error) {
      error.response.data.msg && setData({
        ...data,
        err: error.response.data.msg,
        success: ''
      })
    }
  }

  const updatePassword = async () => {
    if (isLength(password)) {
      setData({
        ...data,
        err: "Password must be a minimum of 7 characters.",
        success: ''
      })
    }

    if (!isMatch(password, confirmPassword)) {
      setData({
        ...data,
        err: "Password don't match, try again..",
        success: ''
      })
    }

    try {
      await axios.post('/api/v1/auth/reset', { password },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

      return setData({
        ...data,
        err: '',
        success: 'Update Successful.'
      })

    } catch (error) {
      error.response.data.msg && setData({
        ...data,
        err: error.response.data.msg,
        success: ''
      })
    }
  }

  const handleUpdate = () => {
    if (name || avatar) updateProfile()
    if (password) updatePassword()
  }

  const changeAvatar = async e => {
    e.preventDefault()

    try {
      const file = e.target.files[0]
      if (!file) {
        setData({
          ...data,
          err: 'No file uploaded.',
          success: ''
        })
      }

      if (file.size > 1024 * 1024) {
        setData({
          ...data,
          err: 'Image too large.',
          success: ''
        })
      }

      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        setData({
          ...data,
          err: 'Incorrect Image format.',
          success: ''
        })
      }
      
      let formData = new FormData()
      formData.append('file', file)
      setLoading(true)

      const res = await axios.post('/api/v1/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })

      setLoading(false)
      setAvatar(res.data.url)

    } catch (error) {
      setData({
        ...data,
        err: error.response.data.msg,
        success: ''
      })
    }
  }

  return (
    <>
      <div>
        {err && ShowErrorMsg(err)}
        {success && ShowSuccessMsg(success)}
        {loading && <h3>Loading...</h3>}
      </div>

      <div className="profile_page">
        <div className="col_left">
          <h2>{isAdmin ? "Admin Profile" : "User Profile"}</h2>

          <div className="avatar">
            <img src={avatar ? avatar : user.avatar} alt="" />
            <span>
              <FontAwesomeIcon icon={faCamera} />
              <p>Change</p>
              <input type="file" name="file" id="file_up" onChange={changeAvatar} />
            </span>
          </div>

          <div className="form_group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="your name"
              value={name}
              onChange={handleChange}
            />
          </div>

          <div className="form_group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="your email"
              defaultValue={user.email}
              disabled
            />
          </div>

          <div className="form_group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
            />
          </div>

          <div className="form_group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button disabled={loading} onClick={handleUpdate}>Update Profile</button>
        </div>

        <div className="col_right">
          <h2>{isAdmin ? "Users" : "My Orders"}</h2>

          <div style={{ overflowX: 'auto' }}>
            <table className="customer">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Admin</td>
                  <td>Action</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile