import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Testimonial from "./pages/Testimonial";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(function () {
    fetch("https://dummyjson.com/products?limit=8&skip=0")
      .then((res) => res.json())
      .then((data) => setItems(data.products))
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage items={items} />} />
        <Route path="product" element={<Product />} />
        <Route path="testimonial" element={<Testimonial />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
