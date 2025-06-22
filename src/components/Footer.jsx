import styles from "./Footer.module.scss";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.footer__features}>
        <li>Secure Payments</li>
        <li>Authentic Products</li>
        <li>Easy Returns</li>
        <li>Fast Shipping</li>
      </ul>

      <div className={styles.footer__main}>
        <div className={styles.footer__main__countries}>
          <div>
            <div>
              <h3>Asia</h3>
              <h3>−</h3>
              <p>Philippines</p>
              <p>|</p>
              <p>Okinawa Japan</p>
              <p>|</p>
              <p>Hong Kong</p>
            </div>
            <div>
              <h3>U.S.</h3>
              <h3>−</h3>
              <p>Austrilia</p>
              <p>|</p>
              <p>Boston</p>
              <p>|</p>
              <p>Chicago</p>
              <p>|</p>
              <p>Los Angeles</p>
              <p>|</p>
              <p>Miami</p>
              <p>|</p>
              <p>New York</p>
              <p>Wahsington D.C</p>
            </div>
            <div>
              <h3>Europe</h3>
              <h3>−</h3>
              <p>London</p>
              <p>|</p>
              <p>Russian</p>
              <p>|</p>
              <p>German</p>
              <p>|</p>
              <p>Paris</p>
            </div>
          </div>

          <Logo color="#fff" />
        </div>

        <div className={styles.footer__main__links}>
          <ul>
            <li>
              <a
                href="https://x.com/passpsych?lang=bg"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow us on Twitter"
              >
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>
            <li>
              <a
                href="https://react.dev/"
                target="blank"
                rel="noopener noreferrer"
                title="React"
              >
                <ion-icon name="logo-react"></ion-icon>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Frenie8006"
                target="blank"
                rel="noopener noreferrer"
                title="Follow us on GitHub"
              >
                <ion-icon name="logo-github"></ion-icon>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/frenieDev.io"
                target="blank"
                rel="noopener noreferrer"
                title="Follow us on Facebook"
              >
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>
          </ul>

          <p>
            &copy; {new Date().getFullYear()} VeraShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
