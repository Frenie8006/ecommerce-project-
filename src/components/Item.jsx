import { useNavigate } from "react-router-dom";
import styles from "./Item.module.scss";

// This will prevent from re-rendering every time the Item is clicked. This called Optimization Trick With children
function ItemHandle({ children, item }) {
  const navigate = useNavigate();

  function handleClick(e) {
    e.stopPropagation(); // Prevent the click event from bubbling up
    e.preventDefault(); // Prevent the default action of the event
    navigate(`/products/${item.id}`); // Navigate to the product page with the item's id
  }

  return (
    <li className={styles.item} onClick={handleClick}>
      {children}
    </li>
  );
}

function Item({ item }) {
  return (
    <ItemHandle item={item}>
      <img src={item.images[0]} alt={item.name} />
      <p>{item.title}</p>
      <h3>${item.price}</h3>
      <button title="Add to cart">🛒</button>
      <div>{item.category}</div>
    </ItemHandle>
  );
}

export default Item;
