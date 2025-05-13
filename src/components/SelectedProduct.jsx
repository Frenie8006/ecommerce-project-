import { useEffect, useState } from "react";
import { useProducts } from "../../contexts/ProductsContext";
import styles from "./SelectedProduct.module.scss";
import { useParams } from "react-router-dom";

import Spinner from "./Spinner";

function SelectedProduct() {
  const { id } = useParams(); // Get the id from the URL parameters
  const { getProduct, selectedProduct, isLoadingProduct } = useProducts();

  // const [cart, setCart] = useState([]); // Initialize cart state
  const [quantity, setQuantity] = useState(1); // Initialize quantity state

  useEffect(
    function () {
      getProduct(id); // Fetch the product details using the id
    },
    [id]
  );

  console.log(selectedProduct); // Log the selected product details

  function incrementQuantity() {
    if (quantity < selectedProduct.stock)
      setQuantity((prevQuantity) => prevQuantity + 1); // Increment quantity
  }

  function decrementQuantity() {
    if (quantity > 1) setQuantity((prevQuantity) => prevQuantity - 1); // Decrement quantity
  }

  if (isLoadingProduct) return <Spinner />;

  return (
    <div className={styles.selectedProduct}>
      {selectedProduct && selectedProduct.images ? (
        <img
          src={
            selectedProduct.images.length > 0
              ? selectedProduct.images[0]
              : selectedProduct.images
          }
          alt={selectedProduct.title}
        />
      ) : (
        <p>Loading product image...</p>
      )}
      <h1>{selectedProduct.title}</h1>
      <p>${selectedProduct.price}</p>
      <article>{selectedProduct.description}</article>
      <div className={styles.quantity}>
        <button onClick={decrementQuantity}>−</button>
        <input
          type="number"
          value={quantity}
          min="1"
          max={selectedProduct.stock}
          onChange={(e) =>
            e.target.value > selectedProduct.stock
              ? setQuantity(selectedProduct.stock)
              : setQuantity(e.target.value)
          }
        />
        <button onClick={incrementQuantity}>+</button>
      </div>
      <div className={styles.buttons}>
        <button>Add to Cart</button>
        <button>Buy Now</button>
      </div>
    </div>
  );
}

export default SelectedProduct;
