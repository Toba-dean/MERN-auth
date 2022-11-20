import { TokenActionTypes } from "./token.types";

const { GET_TOKEN } = TokenActionTypes

export const dispatchToken = token => ({
  type: GET_TOKEN,
  payload: token
})