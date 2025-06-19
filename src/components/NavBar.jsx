import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.scss";
import { useAuth } from "../../contexts/FakeAuthContext";

import Logo from "./Logo";
import MenuBar from "./MenuBar";

function NavBar() {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogout() {
    if (isAuthenticated) logout();
  }

  // Close the menu when the user clicks outside of it or presses Escape
  useEffect(() => {
    function handleClickOutside(event) {
      const menu = document.querySelector(`.${styles.activeMenu}`);
      if (menu && !menu.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <nav className={styles.navBar}>
      <Logo />
      <MenuBar onMenuOpen={setIsMenuOpen} />
      <ul className={isMenuOpen ? styles.activeMenu : ""}>
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
