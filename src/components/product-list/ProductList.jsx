import "./ProductList.css";
import React, { useEffect, useState } from "react";

export default function ProductList() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    // Fetch and set the productList here!
  }, []);

  if (productList.length === 0) {
    return <div>Loading...</div>;
  } else {
    return <div className="ProductList">Display your products here</div>;
  }
}
