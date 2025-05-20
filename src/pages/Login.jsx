import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/FakeAuthContext";
import styles from "./Login.module.scss";

import NavBar from "../components/NavBar";

function Login() {
  const [email, setEmail] = useState("seonitabatucan57@gmail.com");
  const [password, setPassword] = useState("eatmynut135");

  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/products", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className="main-container">
      <NavBar />

      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Login in to your account</h2>

        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button>Login</button>
      </form>
    </main>
  );
}

export default Login;
