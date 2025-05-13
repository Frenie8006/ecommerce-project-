import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.scss";
import Logo from "./Logo";

function NavBar() {
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
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
