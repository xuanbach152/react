import { useState } from "react";
import ProductList from "../components/ProductList.jsx";

const categories = ["Tất cả", "Trà sữa", "Đồ ăn vặt", "Đồ uống khác"];

export default function Menu() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  return (
    <div className="pt-28 pb-16 px-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
        Menu SummerTea
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-full px-5 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border font-semibold transition ${
                selectedCategory === cat
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-green-700 border-green-400 hover:bg-green-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <ProductList search={search} category={selectedCategory} />
    </div>
  );
}
