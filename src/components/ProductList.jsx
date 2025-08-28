import { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import { getAllProducts } from "../api/product.js";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetch();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          img={product.image}
          name={product.name}
          price={product.price}
          description={product.description}
          category_name={product.category_name}
          id={product.id}
        />
      ))}
    </div>
  );
}

export default ProductList;
