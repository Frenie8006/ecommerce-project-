import { useEffect } from "react";

export default function App() {
  fetch("https://furniture-api.fly.dev/api/v1/products?limit=10&offset=0")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error fetching data:", error));

  return <h1>hello world</h1>;
}
