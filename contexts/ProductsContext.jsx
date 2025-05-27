import { createContext, useContext, useReducer } from "react";

const ProductsContext = createContext();

const initialState = {
  products: [],
  selectedProduct: {},
  isLoading: false,
  isLoadingProducts: false,
  isLoadingProduct: false,
  error: "",
  carts: [],
  searchQuery: "",
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

    case "carts/loaded":
      return { ...state, carts: action.payload };

    case "cart/deleted":
      return {
        ...state,
        carts: state.carts.filter((cart) => cart.cartItemId !== action.payload),
      };

    case "searchProduct/set":
      return { ...state, searchQuery: action.payload };

    case "clearCart": {
      // Sum quantities for each productId in the cart
      const cartQuantities = state.carts.reduce((acc, cart) => {
        acc[cart.productId] = (acc[cart.productId] || 0) + cart.quantity;
        return acc;
      }, {});

      return {
        ...state,
        products: state.products.map((product) => {
          const totalCartQuantity = cartQuantities[product.id] || 0;
          if (totalCartQuantity > 0) {
            return {
              ...product,
              stock: product.stock - totalCartQuantity,
            };
          }
          return product;
        }),
        carts: [],
      };
    }

    case "product/purchased": {
      const { productId, quantity } = action.payload;

      const updatedProducts = state.products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            stock: Math.max(0, product.stock - quantity),
          };
        }
        return product;
      });

      return {
        ...state,
        products: updatedProducts,
      };
    }

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
      carts,
      searchQuery,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  async function fetchProducts(limit = null) {
    // if (products.length > 0) return; // If products are already loaded, do nothing

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

  function addToCart(cartItem) {
    dispatch({ type: "carts/loaded", payload: [...carts, cartItem] });
  }

  function deleteCart(id) {
    dispatch({ type: "cart/deleted", payload: id });
  }

  function setSearchProduct(searchQuery) {
    dispatch({ type: "searchProduct/set", payload: searchQuery });
  }

  function deleteAllCarts() {
    dispatch({ type: "clearCart" });
  }

  function purchaseSelectedProduct(quantity) {
    dispatch({
      type: "product/purchased",
      payload: { productId: selectedProduct.id, quantity },
    });
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
        addToCart,
        deleteCart,
        carts,
        setSearchProduct,
        searchQuery,
        deleteAllCarts,
        purchaseSelectedProduct,
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
