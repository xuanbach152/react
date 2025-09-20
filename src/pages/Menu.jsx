import { useState } from "react";
import ProductList from "../components/ProductList.jsx";
import { FaSearch, FaFilter } from "react-icons/fa";

const categories = [
  { id: "all", name: "Tất cả", color: "from-gray-500 to-gray-600" },
  { id: "tra-sua", name: "Trà sữa", color: "from-amber-500 to-orange-500" },
  { id: "do-an-vat", name: "Đồ ăn vặt", color: "from-red-500 to-pink-500" },
  {
    id: "do-uong-khac",
    name: "Đồ uống khác",
    color: "from-blue-500 to-indigo-500",
  },
];

export default function Menu() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="pt-28 pb-20 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Menu
            </span>
            <span className="text-gray-800"> SummerTea</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá menu đa dạng với hương vị tuyệt vời
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white/50"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3 flex-wrap">
              <FaFilter className="text-gray-500" />
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 border-2 ${
                    selectedCategory === cat.id
                      ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-lg scale-105`
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <ProductList
          search={search}
          category={
            selectedCategory === "all"
              ? "Tất cả"
              : categories.find((c) => c.id === selectedCategory)?.name
          }
        />
      </div>
    </div>
  );
}
