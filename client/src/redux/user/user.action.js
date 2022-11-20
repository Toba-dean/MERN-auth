import { UserActionTypes } from "./user.types";

const { LOGIN } = UserActionTypes

export const dispatchLogin = () => ({
  type: LOGIN,
})