import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from "react";

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
      return {
        ...state,
        carts: action.payload,
        // products: state.products.map((product) => {
        //   const cartItem = action.payload.find(
        //     (cart) => cart.productId === product.id
        //   );

        //   if (cartItem) {
        //     return {
        //       ...product,
        //       stock: Math.max(
        //         0,
        //         product.stock -
        //           action.payload.reduce((acc, cart) => {
        //             return cart.productId === product.id
        //               ? acc + cart.quantity
        //               : acc;
        //           }, 0)
        //       ),
        //     };
        //   } else {
        //     return product; // No cart item for this product, return unchanged
        //   }
        // }),
      };

    case "cart/deleted":
      return {
        ...state,
        carts: state.carts.filter((cart) => cart.cartItemId !== action.payload),
        products: state.products.map((product) => {
          const deletedCartItem = state.carts.find(
            (cart) => cart.cartItemId === action.payload
          );

          if (deletedCartItem && deletedCartItem.productId === product.id) {
            return {
              ...product,
              stock: product.stock + deletedCartItem.quantity,
            };
          }
          return product; // No change for this product
        }),
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

  const fetchProducts = useCallback(async function fetchProducts(limit = null) {
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
  }, []);

  const getProduct = useCallback(
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
    },
    [selectedProduct.id]
  );

  const addToCart = useCallback(
    function addToCart(cartItem) {
      dispatch({ type: "carts/loaded", payload: [...carts, cartItem] });
    },
    [carts]
  );

  function deleteCart(id) {
    dispatch({ type: "cart/deleted", payload: id });
  }

  function setSearchProduct(searchQuery) {
    dispatch({ type: "searchProduct/set", payload: searchQuery });
  }

  function deleteAllCarts() {
    dispatch({ type: "clearCart" });
  }

  const purchaseSelectedProduct = useCallback(
    function purchaseSelectedProduct(quantity) {
      dispatch({
        type: "product/purchased",
        payload: { productId: selectedProduct.id, quantity },
      });
    },
    [selectedProduct]
  );

  const value = useMemo(() => {
    return {
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
    };
  }, [
    addToCart,
    carts,
    error,
    fetchProducts,
    isLoading,
    isLoadingProducts,
    isLoadingProduct,
    purchaseSelectedProduct,
    searchQuery,
    selectedProduct,
    getProduct,
    products,
  ]);

  return (
    <ProductsContext.Provider value={value}>
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
