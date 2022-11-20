import { UserActionTypes } from "./user.types";

const INITIALSTATE = {
  user: [],
  isLoggedIn: false,
  isAdmin: false
}

const UserReducer = (state = INITIALSTATE, action) => {
  const { LOGIN } = UserActionTypes

  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true
      }
    default:
      return state
  }
}

export default UserReducer