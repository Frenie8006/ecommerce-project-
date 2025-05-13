import styles from "./ViewProduct.module.scss";

function ViewProduct({ children }) {
  return (
    <div className={styles.viewProduct}>
      <h1>{children}</h1>
    </div>
  );
}

export default ViewProduct;
