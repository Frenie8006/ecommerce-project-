import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "../contexts/FakeAuthContext";
import { ProductsProvider } from "../contexts/ProductsContext";
import { TestimonialsProvider } from "../contexts/TestimonialsContext";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const Testimonial = lazy(() => import("./pages/Testimonial"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

import ViewProduct from "./components/ViewProduct";
import SelectedProduct from "./components/SelectedProduct";
import Cart from "./components/Cart";
import SpinnerFullPage from "./components/SpinnerFullPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>
          <TestimonialsProvider>
            <Suspense fallback={<SpinnerFullPage />}>
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
                  <Route
                    index
                    element={<Navigate to="view-product" replace />}
                  />
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
            </Suspense>
          </TestimonialsProvider>
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
