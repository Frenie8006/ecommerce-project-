import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.scss";
import { useAuth } from "../../contexts/FakeAuthContext";

import Logo from "./Logo";

function NavBar() {
  const { isAuthenticated, logout } = useAuth();

  function handleLogout() {
    if (isAuthenticated) logout();
  }

  return (
    <nav className={styles.navBar}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/products">Product</NavLink>
        </li>
        <li>
          <NavLink to="/testimonial">Testimonial</NavLink>
        </li>
        <li className="login">
          <NavLink to="/login" onClick={handleLogout}>
            {isAuthenticated ? "Logout" : "Login"}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
