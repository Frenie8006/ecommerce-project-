import styles from "./Product.module.scss";

import DisplayItems from "../components/DisplayItems";
import SideBar from "../components/SideBar";
import User from "../components/User";

function Product() {
  return (
    <>
      <div className={styles.productContainer}>
        <User />
        <SideBar />
        <DisplayItems />
      </div>
    </>
  );
}

export default Product;
