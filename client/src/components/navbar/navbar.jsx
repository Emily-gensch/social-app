import { Outlet, Link } from "react-router-dom";
import './navbar.css';

const NavBar = () => {
  return (
    <>
      <nav className="nav-container">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/admin">Admin</Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default NavBar;