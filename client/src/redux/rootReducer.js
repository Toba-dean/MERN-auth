import { combineReducers } from "redux";

import UserReducer from "./user/user.reducer";
import TokenReducer from "./token/token.reducer";

export default combineReducers({
  users: UserReducer,
  token: TokenReducer
})