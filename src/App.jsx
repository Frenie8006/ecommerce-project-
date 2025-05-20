import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Testimonial from "./pages/Testimonial";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import ViewProduct from "./components/ViewProduct";
import SelectedProduct from "./components/SelectedProduct";
import Cart from "./components/Cart";
import { ProductsProvider } from "../contexts/ProductsContext";
import { AuthProvider } from "../contexts/FakeAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>
          <Routes>
            <Route index element={<Homepage />} />
            <Route
              path="products"
              element={
                <ProtectedRoute>
                  <Product />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="view-product" replace />} />
              <Route
                path="view-product"
                element={
                  <ViewProduct>
                    👋 Discover and purchase the finest products available
                  </ViewProduct>
                }
              />
              <Route path=":id" element={<SelectedProduct />} />
              <Route path="cart" element={<Cart />} />
            </Route>
            <Route path="testimonial" element={<Testimonial />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
