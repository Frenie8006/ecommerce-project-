import NavBar from "../components/NavBar";
import styles from "./Login.module.scss";

function Login() {
  return (
    <main className="main-container">
      <NavBar />

      <form className={styles.form}>
        <figure>
          <img src="../public/undraw_store.svg" alt="photo" />
        </figure>

        <div className={styles.form__inputForm}>
          <h2>Login in to your account</h2>

          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
        </div>
      </form>
    </main>
  );
}

export default Login;
