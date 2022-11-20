import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import axios from "axios";

const Header = () => {

  const users = useSelector(state => state.users)
  const { user, isLoggedIn } = users

  const transform = {
    transform: isLoggedIn ? 'translateY(-5px)' : 0
  }

  const userLink = () => {
    return (
      <li className="drop-nav">
        <Link to='/'>
          <img src={user.avatar} alt="" />{user.name}
        </Link>

        <ul className="dropdown">
          <li><Link to='/profile'>Profile</Link></li>
          <li><Link to='/logout'>Log Out</Link></li>
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
