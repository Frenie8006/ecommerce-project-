import { useEffect } from "react";
import { useProducts } from "../../contexts/ProductsContext";
import styles from "./DisplayItems.module.scss";

import Item from "./Item";
import Spinner from "./Spinner";

const MAX_ITEMS = 250; // Maximum number of items to display

function DisplayItems() {
  const { fetchProducts, products, isLoadingProducts, searchQuery } =
    useProducts();

  const filtertedProducts = searchQuery
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  // It's not appropriate to use useMemo or memo for side effects like fetching data.
  // useEffect is the correct hook for performing side effects such as API calls.
  // To persist products across page switches, store them in context (which you already do with ProductsContext).
  // When you navigate away and return, the context will retain the products unless the context provider is unmounted.
  useEffect(function () {
    fetchProducts(MAX_ITEMS);
  }, []);

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
