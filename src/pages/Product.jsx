import styles from "./Product.module.scss";

import DisplayItems from "../components/DisplayItems";
import SideBar from "../components/SideBar";

function Product() {
  return (
    <>
      <div className={styles.productContainer}>
        <SideBar />
        <DisplayItems />
      </div>
    </>
  );
}

export default Product;
