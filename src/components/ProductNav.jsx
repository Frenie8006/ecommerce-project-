import { NavLink, useParams } from "react-router-dom";
import styles from "./ProductNav.module.scss";
import { useState, useEffect } from "react";
import { useProducts } from "../../contexts/ProductsContext";

function ProductNav() {
  const { id } = useParams();
  const [lastValidId, setLastValidId] = useState(id);
  const { carts } = useProducts();

  const cartQuantities = carts.reduce((sum, cart) => sum + cart.quantity, 0);

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
          {carts.length > 0 ? <span>{cartQuantities}</span> : null}
          <NavLink to="cart">Cart</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default ProductNav;
