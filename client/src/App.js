import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { Header, Body } from "./components";
import { dispatchToken } from "./redux/token/token.action";
import { dispatchLogin, fetchUser, dispatchUser } from "./redux/user/user.action";

function App() {

  // Getting the access token
  const token = useSelector(state => state.token)
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post('api/v1/auth/access', null)
        dispatch(dispatchToken(res.data.access_token))
      }

      getToken()
    }
  }, [users.isLoggedIn, dispatch])

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin())
        return fetchUser(token).then(res => {
          dispatch(dispatchUser(res))
        })
      }
      getUser()
    }
  }, [token, dispatch])


  return (
    <div className="App">
      <Header />
      <Body />
    </div>
  );
}

export default App;
