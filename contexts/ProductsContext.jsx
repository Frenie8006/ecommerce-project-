import { createContext, useContext, useReducer } from "react";

const ProductsContext = createContext();

const initialState = {
  products: [],
  selectedProduct: {},
  isLoading: false,
  isLoadingProducts: false,
  isLoadingProduct: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "products/loaded":
      return { ...state, isLoadingProducts: false, products: action.payload };

    case "products/loading":
      return { ...state, isLoadingProducts: true };

    case "product/loaded":
      return {
        ...state,
        isLoadingProduct: false,
        selectedProduct: action.payload,
      };

    case "product/loading":
      return { ...state, isLoadingProduct: true };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type: " + action.type);
  }
}

function ProductsProvider({ children }) {
  const [
    {
      products,
      isLoading,
      error,
      selectedProduct,
      isLoadingProducts,
      isLoadingProduct,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  async function fetchProducts(limit = null) {
    if (products.length > 0) return; // If products are already loaded, do nothing

    dispatch({ type: "products/loading" });
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=0`
      );
      const data = await res.json();
      dispatch({ type: "products/loaded", payload: data.products });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading products...",
      });
    }
  }

  async function getProduct(id) {
    if (+id === selectedProduct.id) return; // If the product is already selected, do nothing

    dispatch({ type: "product/loading" });
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      dispatch({ type: "product/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading product...",
      });
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        isLoadingProducts,
        isLoadingProduct,
        error,
        fetchProducts,
        getProduct,
        selectedProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

function useProducts() {
  const context = useContext(ProductsContext);

  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }

  return context;
}

export { ProductsProvider, useProducts };
