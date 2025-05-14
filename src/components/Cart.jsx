import ViewProduct from "./ViewProduct";
import styles from "./Cart.module.scss";
import { useProducts } from "../../contexts/ProductsContext";

function Cart() {
  const { carts } = useProducts();
  console.log(carts);

  if (carts.length < 1) return <ViewProduct>🛒 Your cart is empty</ViewProduct>;

  return (
    <ul className={styles.cart}>
      {carts.map((cart, index) => (
        <li key={index}>
          <div>
            <h2>{cart.quantity}x</h2>
            <img src={cart.image} alt={cart.title} />
            <p>{cart.title}</p>
          </div>

          <div>
            <h2>${(cart.price * cart.quantity).toFixed(2)}</h2>
            <button>×</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Cart;
