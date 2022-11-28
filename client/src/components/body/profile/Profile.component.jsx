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

  const [data, SetData] = useState(initialState)
  const { name, password, confirmPassword, err, success } = data

  const [avatar, setAvatar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [callback, setCallback] = useState(false)

  return (
    <div className="profile_page">
      <div className="col_left">
        <h2>{isAdmin ? "Admin Profile" : "User Profile"}</h2>

        <div className="avatar">
          <img src={avatar ? avatar : user.avatar} alt="" />
          <span>
            <FontAwesomeIcon icon={faCamera} />
            <p>Change</p>
            <input type="file" name="file" id="file_up" />
          </span>
        </div>

        <div className="form_group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="your name"
            defaultValue={user.name}
            value={name}
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
          />
        </div>

        <div className="form_group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
          />
        </div>

        <button disabled={loading}>Update Profile</button>
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
              <td>ID</td>
              <td>Name</td>
              <td>Email</td>
              <td>Admin</td>
              <td>Action</td>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Profile