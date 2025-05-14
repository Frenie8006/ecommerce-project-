import { useEffect } from "react";
import { useProducts } from "../../contexts/ProductsContext";
import styles from "./DisplayItems.module.scss";

import Item from "./Item";
import Spinner from "./Spinner";

const MAX_ITEMS = 25; // Maximum number of items to display

function DisplayItems() {
  const { fetchProducts, products, isLoadingProducts } = useProducts();

  useEffect(function () {
    fetchProducts(MAX_ITEMS);
  }, []);

  return (
    <div className={styles.displayItems}>
      {isLoadingProducts ? (
        <Spinner />
      ) : (
        <ul>
          {products.map((item) => (
            <Item item={item} key={item.id} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default DisplayItems;
