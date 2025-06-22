import { useNavigate } from "react-router-dom";
import styles from "./Homepage.module.scss";

import Item from "../components/Item.jsx";
import NavBar from "../components/NavBar.jsx";
import { useProducts } from "../../contexts/ProductsContext.jsx";
import { useAuth } from "../../contexts/FakeAuthContext.jsx";
import { useEffect } from "react";
import Footer from "../components/Footer.jsx";
// import Spinner from "../components/Spinner.jsx";

import undraw from "../assets/undraw.svg";
import undrawCertificate from "../assets/undraw_certificate.svg";
import undrawMap from "../assets/undraw_map.svg";
import undrawPhone from "../assets/undraw_phone.svg";
import undrawShopping from "../assets/undraw_shopping.svg";
import businessInsider from "../assets/business-insider.png";
import techCrunch from "../assets/techcrunch.png";
import newYorkTimes from "../assets/the-new-york-times.png";
import usaToday from "../assets/usa-today.png";
import forbes from "../assets/forbes.png";

const MAX_ITEMS = 8; // Maximum number of items to display

function Homepage() {
  const navigate = useNavigate();
  const { products, fetchProducts } = useProducts();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProducts(MAX_ITEMS);
  }, [fetchProducts]);

  function handleClick() {
    if (isAuthenticated) navigate("/products");
    else navigate("/login");
  }

  // if (isLoadingProducts) return <Spinner />;

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

            <img src={undraw} alt="Happy Shoppers" />
          </section>

          <section className={styles.homepage__featured}>
            <p>Trusted by millions, including renowned brands like...</p>
            <div>
              <img src={businessInsider} alt="Business Insider" />
              <img src={techCrunch} alt="TechCrunch" />
              <img src={newYorkTimes} alt="The New York Times" />
              <img src={usaToday} alt="USA Today" />
              <img src={forbes} alt="Forbes" />
            </div>
          </section>
        </section>
        <section className={styles.homepage__about}>
          <h2>VeraShop - Trusted by Millions Around the Globe</h2>
          <p>Delivering quality and trust, one product at a time.</p>

          <ul>
            <li>
              <div>
                <img src={undrawCertificate} alt="Certificate" />
              </div>
              <h3>Reliability You Can Count On</h3>
              <p>
                We are celebrated for our dependable service and quality
                products.
              </p>
            </li>
            <li>
              <div>
                <img src={undrawMap} alt="Map" />
              </div>
              <h3>Nationwide Accessibility</h3>
              <p>
                Our services span across the country, bringing convenience to
                you.
              </p>
            </li>
            <li>
              <div>
                <img src={undrawPhone} alt="Phone" />
              </div>
              <h3>Seamless Mobile Experience</h3>
              <p>Enjoy shopping on the go with our intuitive mobile app.</p>
            </li>
            <li>
              <div>
                <img src={undrawShopping} alt="Shopping" />
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
