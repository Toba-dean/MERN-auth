import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <h2>
          <Link to='/'>Dean</Link>
        </h2>
      </div>

      <ul>
        <li>
          <Link to='/'>
            Cart
          </Link>
        </li>
        <li>
          <Link to='/login'>
            Sign In
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
