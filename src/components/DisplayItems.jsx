import { useEffect } from "react";
import { useProducts } from "../../contexts/ProductsContext";
import styles from "./DisplayItems.module.scss";

import Item from "./Item";
import Spinner from "./Spinner";

const MAX_ITEMS = 25; // Maximum number of items to display

function DisplayItems() {
  const { fetchProducts, products, isLoadingProducts, searchQuery } =
    useProducts();

  const filtertedProducts = searchQuery
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  useEffect(
    function () {
      fetchProducts(MAX_ITEMS);
    },
    [fetchProducts]
  );

  return (
    <div className={styles.displayItems}>
      {isLoadingProducts ? (
        <Spinner />
      ) : (
        <ul>
          {filtertedProducts.map((item) => (
            <Item item={item} key={item.id} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default DisplayItems;
