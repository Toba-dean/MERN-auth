import { UserActionTypes } from "./user.types";

const INITIALSTATE = {
  user: [],
  isLoggedIn: false,
  isAdmin: false
}

const UserReducer = (state = INITIALSTATE, action) => {
  const { LOGIN, GET_USER } = UserActionTypes

  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true
      }
    case GET_USER:
      return {
        ...state,
        user: action.payload.user,
        isAdmin: action.payload.isAdmin
      }
    default:
      return state
  }
}

export default UserReducer