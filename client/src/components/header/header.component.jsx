import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";

const Header = () => {

  const users = useSelector(state => state.users)
  const { user, isLoggedIn } = users

  const transform = {
    transform: isLoggedIn ? 'translateY(-5px)' : 0
  }

  const handleLogout = async () => {
    try {
      await axios('api/v1/auth/logout')
      localStorage.removeItem('firstLogin')
      window.location.href = '/'
    } catch (error) {
      console.log(error.message);
    }
  }

  const userLink = () => {

    return (
      <li className="drop-nav">
        <Link to='/'>
          <img src={user.avatar} alt="" />{user.name}
          <FontAwesomeIcon icon={faAngleDown} style={{ marginLeft: 5 }} />
        </Link>

        <ul className="dropdown">
          <li><Link to='/profile'>Profile</Link></li>
          <li><Link to='/' onClick={handleLogout}>Log Out</Link></li>
        </ul>
      </li>
    )
  }

  return (
    <header>
      <div className="logo">
        <h2>
          <Link to='/'>Dean</Link>
        </h2>
      </div>

      <ul style={transform}>
        <li>
          <Link to='/'>
            Cart
          </Link>
        </li>

        {
          isLoggedIn ? userLink() :
            <li>
              <Link to='/login'>
                Sign In
              </Link>
            </li>
        }
      </ul>
    </header>
  )
}

export default Header
