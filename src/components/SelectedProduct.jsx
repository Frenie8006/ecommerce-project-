import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./SelectedProduct.module.scss";

import Spinner from "./Spinner";
import { useProducts } from "../../contexts/ProductsContext";
import { useAuth } from "../../contexts/FakeAuthContext";

function SelectedProduct() {
  const { id } = useParams(); // Get the id from the URL parameters
  const {
    getProduct,
    selectedProduct,
    isLoadingProduct,
    addToCart,
    products,
    purchaseSelectedProduct,
    productQuantity,
  } = useProducts();
  const { user, purchase } = useAuth();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // Derive state
  const productStock = products[id - 1]?.stock; // Get the stock of the selected product

  useEffect(
    function () {
      getProduct(id); // Fetch the product details using the id
      setQuantity(1);
    },
    [id, setQuantity, getProduct]
  );

  function incrementQuantity() {
    if (quantity < productStock)
      setQuantity((prevQuantity) => prevQuantity + 1); // Increment quantity
  }

  function decrementQuantity() {
    if (quantity > 1) setQuantity((prevQuantity) => prevQuantity - 1); // Decrement quantity
  }

  function handleCartCheckout() {
    if (!user) return;

    purchaseSelectedProduct(quantity);
    setQuantity(1);

    if (user.balance >= selectedProduct.price * quantity && productStock > 0) {
      purchase(selectedProduct.price * quantity);

      alert(
        `You have successfully purchased ${quantity} ${
          selectedProduct.title
        } for $${selectedProduct.price.toFixed(2)}`
      );
    } else if (productStock === 0) {
      alert("This product is out of stock.");
    } else {
      alert(
        `You have insufficient balance to complete the purchase. Your balance is $${user.balance.toFixed(
          2
        )} and the total cost is $${selectedProduct.price.toFixed(2)}`
      );
    }
  }

  function handleChange(e) {
    const value = Number(e.target.value);

    if (value > productStock) {
      setQuantity(productStock);
    } else if (value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  }

  function handleAddToCart() {
    const cartItem = {
      cartItemId: `${selectedProduct.id}-${Date.now()}`, // Unique cart item id
      productId: selectedProduct.id, // Keep reference to product id
      title: selectedProduct.title,
      price: selectedProduct.price * quantity,
      image: selectedProduct.images[0],
      quantity: quantity,
    };

    if (Number(productStock) === 0) {
      alert("This product is out of stock.");
      return;
    }

    addToCart(cartItem);
    navigate("/products/cart");
  }

  useEffect(() => {
    productQuantity(quantity);
  }, [quantity, productQuantity]);

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
          <small>{productStock} stocks left</small>
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
            <button onClick={handleCartCheckout}>Buy it Now</button>
          </div>
        </>
      ) : (
        <h1>❌ Product not found</h1>
      )}
    </div>
  );
}

export default SelectedProduct;
