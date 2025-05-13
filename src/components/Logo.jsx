import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";

function Logo({ isLogo = true, color = "#d6dee0" }) {
  return (
    <Link to="/" className={styles.logo}>
      <div style={{ color: color }}>
        {isLogo && <ion-icon name="bag-check-outline"></ion-icon>}
        <span>VeraShop</span>
      </div>
    </Link>
  );
}

export default Logo;
