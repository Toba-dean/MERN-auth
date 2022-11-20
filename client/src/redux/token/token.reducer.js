import { TokenActionTypes } from "./token.types"

const token = ''

const TokenReducer = (state = token, action) => {
  const { GET_TOKEN } = TokenActionTypes

  switch (action.type) {
    case GET_TOKEN:
      return action.payload
    default:
      return state
  }
}

export default TokenReducer