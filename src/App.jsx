import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";

export default function App() {
  useEffect(function () {
    fetch("https://dummyjson.com/products?limit=30&skip=0")
      .then((res) => res.json())
      .then((data) => console.log(data.products))
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
