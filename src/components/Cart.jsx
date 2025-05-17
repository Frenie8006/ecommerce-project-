import ViewProduct from "./ViewProduct";
import styles from "./Cart.module.scss";
import { useProducts } from "../../contexts/ProductsContext";

function Cart() {
  const { carts, deleteCart } = useProducts();
  console.log(carts);

  // Derive state
  const cartSubTotal = carts
    .reduce((sum, cart) => sum + cart.price, 0)
    .toFixed(2);
  const cartQuantities = carts.reduce((sum, cart) => sum + cart.quantity, 0);

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
            <h2>${cart.price.toFixed(2)}</h2>
            <button onClick={() => deleteCart(cart.id)}>×</button>
          </div>
        </li>
      ))}

      <li>
        <h2>
          Cart Subtotal: <span>${cartSubTotal}</span>
        </h2>
        <button>Proceed to checkout ({cartQuantities} items)</button>
      </li>
    </ul>
  );
}

export default Cart;
