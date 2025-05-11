import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Testimonial from "./pages/Testimonial";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import ViewProduct from "./components/ViewProduct";
import { ProductsProvider } from "../contexts/ProductsContext";
import SelectedProduct from "./components/SelectedProduct";

export default function App() {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="products" element={<Product />}>
            <Route index element={<Navigate to="view-product" replace />} />
            <Route path="view-product" element={<ViewProduct />} />
            <Route path=":id" element={<SelectedProduct />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="testimonial" element={<Testimonial />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ProductsProvider>
    </BrowserRouter>
  );
}
