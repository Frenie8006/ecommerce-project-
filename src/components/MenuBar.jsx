import styles from "./MenuBar.module.scss";

function MenuBar({ onMenuOpen }) {
  return (
    <span className={styles.menuBar} onClick={() => onMenuOpen(true)}>
      <ion-icon name="menu-outline"></ion-icon>
    </span>
  );
}

export default MenuBar;
