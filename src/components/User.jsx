import { useEffect, useState } from "react";
import { useProducts } from "../../contexts/ProductsContext";
import styles from "./User.module.scss";
import { useAuth } from "../../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

function User() {
  const { setSearchProduct } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  function handleChange(e) {
    const value = e.target.value;

    setSearchProduct(value);
    setSearchQuery(value);
  }

  // Persist searchQuery in localStorage
  useEffect(() => {
    const savedQuery = localStorage.getItem("searchQuery");
    if (savedQuery) {
      setSearchQuery(savedQuery);
      setSearchProduct(savedQuery);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  return (
    <header className={styles.user}>
      <div>
        <label htmlFor="search">
          <ion-icon name="search-outline"></ion-icon>
        </label>
        <input
          id="search"
          type="text"
          onChange={(e) => handleChange(e)}
          value={searchQuery}
          placeholder="Search products by keyword"
        />
      </div>
      <hr />
      <div>
        <img src={user.avatar} alt={user.name} title={user.name} />
        <p>
          <span>Balance:</span> ${user.balance.toFixed(2)}
        </p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}

export default User;
