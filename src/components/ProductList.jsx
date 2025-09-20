import { useEffect, useState, useMemo } from "react";
import ProductCard from "./ProductCard.jsx";
import { getAllProducts } from "../api/product.js";
import { FaFilter, FaGrid3X3, FaList, FaSearch } from "react-icons/fa";

function ProductList({ search = "", category = "Tất cả" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("name"); // name, price, newest
  const [priceRange, setPriceRange] = useState("all"); // all, under50k, 50k-100k, over100k

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getAllProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(searchLower) ||
          p.category_name?.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by category
    if (category && category !== "Tất cả") {
      filtered = filtered.filter((p) => p.category_name === category);
    }

    // Filter by price range
    if (priceRange !== "all") {
      filtered = filtered.filter((p) => {
        const price = p.price || 0;
        switch (priceRange) {
          case "under50k":
            return price < 50000;
          case "50k-100k":
            return price >= 50000 && price <= 100000;
          case "over100k":
            return price > 100000;
          default:
            return true;
        }
      });
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return (a.price || 0) - (b.price || 0);
        case "price-desc":
          return (b.price || 0) - (a.price || 0);
        case "name":
          return (a.name || "").localeCompare(b.name || "");
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, search, category, priceRange, sortBy]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-emerald-600 font-semibold text-lg">
            Đang tải sản phẩm...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters & Controls */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/20">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Left side filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Lọc:</span>
            </div>

            {/* Price Range Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            >
              <option value="all">Tất cả giá</option>
              <option value="under50k">Dưới 50k</option>
              <option value="50k-100k">50k - 100k</option>
              <option value="over100k">Trên 100k</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            >
              <option value="name">Tên A-Z</option>
              <option value="price">Giá thấp đến cao</option>
              <option value="price-desc">Giá cao đến thấp</option>
            </select>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {filteredProducts.length} sản phẩm
            </span>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid"
                    ? "bg-white text-emerald-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <FaGrid3X3 className="text-sm" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list"
                    ? "bg-white text-emerald-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <FaList className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Display */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaSearch className="text-3xl text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Không tìm thấy sản phẩm
          </h3>
          <p className="text-gray-600 mb-6">
            Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
          </p>
          <button
            onClick={() => {
              setPriceRange("all");
              setSortBy("name");
            }}
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Xóa bộ lọc
          </button>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              img={product.image}
              name={product.name}
              price={product.price}
              description={product.description}
              category_name={product.category_name}
              id={product.id}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}

      {/* Load More Button (if needed) */}
      {filteredProducts.length > 0 && (
        <div className="text-center pt-8">
          <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl">
            Xem thêm sản phẩm
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
