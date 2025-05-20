import { useReducer, createContext, useContext } from "react";

const AuthContext = createContext(undefined);

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };

    case "logout":
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

const FAKE_USER = {
  name: "Alex",
  password: "eatmynut135",
  email: "seonitabatucan57@gmail.com",
  avatar: "https://i.pravatar.cc/100?u=zz",
  balance: 5000,
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === null)
    throw new Error("useAuth was used outside an AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
