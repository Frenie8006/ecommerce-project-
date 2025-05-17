import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./SelectedProduct.module.scss";

import Spinner from "./Spinner";
import { useProducts } from "../../contexts/ProductsContext";

function SelectedProduct() {
  const { id } = useParams(); // Get the id from the URL parameters
  const { getProduct, selectedProduct, isLoadingProduct, addToCart } =
    useProducts();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  useEffect(
    function () {
      getProduct(id); // Fetch the product details using the id
      setQuantity(1);
    },
    [id, setQuantity]
  );

  console.log(selectedProduct); // Log the selected product details

  function incrementQuantity() {
    if (quantity < selectedProduct.stock)
      setQuantity((prevQuantity) => prevQuantity + 1); // Increment quantity
  }

  function decrementQuantity() {
    if (quantity > 1) setQuantity((prevQuantity) => prevQuantity - 1); // Decrement quantity
  }

  function handleChange(e) {
    const value = e.target.value;

    if (value > selectedProduct.stock) {
      setQuantity(selectedProduct.stock);
    } else if (Number(value) < 1) {
      setQuantity(1);
    } else {
      setQuantity(e.target.value);
    }
  }

  function handleAddToCart() {
    const cartItem = {
      id: selectedProduct.id,
      title: selectedProduct.title,
      price: selectedProduct.price * quantity,
      image: selectedProduct.images[0],
      quantity: quantity,
    };

    addToCart(cartItem);
    navigate("/products/cart");
  }

  return (
    <div className={styles.selectedProduct}>
      {isLoadingProduct ? (
        <Spinner />
      ) : selectedProduct && selectedProduct.images ? (
        <>
          <img
            src={
              selectedProduct.images.length > 0
                ? selectedProduct.images[0]
                : selectedProduct.images
            }
            alt={selectedProduct.title}
          />
          <h1>{selectedProduct.title}</h1>
          <p>${(selectedProduct.price * quantity).toFixed(2)}</p>
          <article>{selectedProduct.description}</article>
          <small>{selectedProduct.stock} stocks left</small>
          <div className={styles.quantity}>
            <button onClick={decrementQuantity}>−</button>

            <input
              type="number"
              value={quantity}
              min="1"
              max={selectedProduct.stock}
              onChange={handleChange}
            />
            <button onClick={incrementQuantity}>+</button>
          </div>
          <div className={styles.buttons}>
            <button onClick={handleAddToCart}>Add to Cart</button>
            <button>Buy it Now</button>
          </div>
        </>
      ) : (
        <h1>❌ Product not found</h1>
      )}
    </div>
  );
}

export default SelectedProduct;
