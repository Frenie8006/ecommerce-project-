import { useNavigate } from "react-router-dom";
import styles from "./Homepage.module.scss";

import Item from "../components/Item.jsx";
import NavBar from "../components/NavBar.jsx";
import { useProducts } from "../../contexts/ProductsContext.jsx";
import { useAuth } from "../../contexts/FakeAuthContext.jsx";
import { useEffect } from "react";
import Spinner from "../components/Spinner.jsx";
import Footer from "../components/Footer.jsx";

const MAX_ITEMS = 8; // Maximum number of items to display

function Homepage() {
  const navigate = useNavigate();
  const { products, fetchProducts, isLoadingProducts } = useProducts();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProducts(MAX_ITEMS);
  }, []);

  function handleClick() {
    if (isAuthenticated) navigate("/products");
    else navigate("/login");
  }

  if (isLoadingProducts) return <Spinner />;

  return (
    <>
      <main>
        <section className={styles.homepage}>
          <NavBar />

          <section className={styles.homepage__hero}>
            <div>
              <h1>Discover Exceptional Products for Your Everyday Life</h1>
              <p>
                Explore unbeatable deals and uncover your next favorite item.
                Shop effortlessly across a variety of categories tailored to
                your needs.
              </p>
              <button onClick={handleClick}>Start Shopping</button>
            </div>

            <img src="../public/undraw.svg" alt="Happy Shoppers" />
          </section>

          <section className={styles.homepage__featured}>
            <p>Trusted by millions, including renowned brands like...</p>
            <div>
              <img
                src="../public/business-insider.png"
                alt="Business Insider"
              />
              <img src="../public/techcrunch.png" alt="TechCrunch" />
              <img
                src="../public/the-new-york-times.png"
                alt="The New York Times"
              />
              <img src="../public/usa-today.png" alt="USA Today" />
              <img src="../public/forbes.png" alt="Forbes" />
            </div>
          </section>
        </section>
        <section className={styles.homepage__about}>
          <h2>VeraShop - Trusted by Millions Around the Globe</h2>
          <p>Delivering quality and trust, one product at a time.</p>

          <ul>
            <li>
              <div>
                <img src="../public/undraw_certificate.svg" alt="Certificate" />
              </div>
              <h3>Reliability You Can Count On</h3>
              <p>
                We are celebrated for our dependable service and quality
                products.
              </p>
            </li>
            <li>
              <div>
                <img src="../public/undraw_map.svg" alt="Map" />
              </div>
              <h3>Nationwide Accessibility</h3>
              <p>
                Our services span across the country, bringing convenience to
                you.
              </p>
            </li>
            <li>
              <div>
                <img src="../public/undraw_phone.svg" alt="Phone" />
              </div>
              <h3>Seamless Mobile Experience</h3>
              <p>Enjoy shopping on the go with our intuitive mobile app.</p>
            </li>
            <li>
              <div>
                <img src="../public/undraw_shopping.svg" alt="Shopping" />
              </div>
              <h3>Uncompromised Quality</h3>
              <p>We prioritize excellence in every product we offer.</p>
            </li>
          </ul>
        </section>
        <section className={styles.homepage__categories}>
          <div className={styles.homepage__categories__header}>
            <div>
              <h2>Customer-Favorite Cosmetics</h2>
              <button onClick={() => navigate("/products")}>
                See all <span>&rarr;</span>
              </button>
            </div>
            <p>
              Explore a curated selection of our customers' most-loved products.
            </p>
          </div>
          <ul>
            {products.length > 0 &&
              products.map((item) => <Item item={item} key={item.id} />)}
          </ul>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Homepage;
