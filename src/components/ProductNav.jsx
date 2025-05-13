import { NavLink, useParams } from "react-router-dom";
import styles from "./ProductNav.module.scss";
import { useState, useEffect } from "react";

function ProductNav() {
  const { id } = useParams();
  const [lastValidId, setLastValidId] = useState(id);

  useEffect(() => {
    if (id && id !== "irrelevant") {
      setLastValidId(id);
    }
  }, [id]);

  return (
    <nav className={styles.productNav}>
      <ul>
        <li>
          <NavLink
            to={lastValidId === undefined ? "view-product" : `${lastValidId}`}
          >
            Main
          </NavLink>
        </li>
        <li>
          <NavLink to="cart">Cart</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default ProductNav;
