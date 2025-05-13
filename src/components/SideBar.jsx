import { Outlet } from "react-router-dom";
import styles from "./SideBar.module.scss";

import Logo from "./Logo";
import ProductNav from "./ProductNav";

function SideBar() {
  return (
    <div className={styles.sideBar}>
      <Logo isLogo={true} color="var(--color-brand--2)" />

      <ProductNav />

      <Outlet />

      <footer>
        <p>&copy; Copyright {new Date().getFullYear()} by VeraShop Inc.</p>
      </footer>
    </div>
  );
}

export default SideBar;
