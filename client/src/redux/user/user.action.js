import { UserActionTypes } from "./user.types";
import axios from 'axios';

const { LOGIN, GET_USER } = UserActionTypes

export const dispatchLogin = () => ({
  type: LOGIN,
})

export const fetchUser = async (token) => {
  const res = await axios('/api/v1/user', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res
}

export const dispatchUser = res => {
  return {
    type: GET_USER,
    payload: {
      user: res.data,
      isAdmin: res.data.role === 1 ? true : false
    }
  }
}