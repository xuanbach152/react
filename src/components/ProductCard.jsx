import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

function ProductCard({ img, name, price, id, description, category_name }) {
  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <>
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-emerald-200 hover:-translate-y-2">
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={img || "/default.png"}
            alt={name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => setLiked(!liked)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                liked
                  ? "bg-red-500 text-white"
                  : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
              }`}
            >
              <FaHeart className="text-sm" />
            </button>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {category_name}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-sm" />
            ))}
            <span className="text-gray-500 text-sm ml-1">(4.8)</span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description || "Sản phẩm chất lượng cao với hương vị tuyệt vời"}
          </p>

          {/* Price and Action */}
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {price?.toLocaleString()}₫
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Xem
              </button>
              <Link
                to={`/product/detail/${id}`}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl flex items-center gap-1"
              >
                <FaShoppingCart className="text-xs" />
                Đặt
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors z-10"
              >
                ×
              </button>

              {/* Image */}
              <div className="relative h-80 overflow-hidden rounded-t-3xl">
                <img
                  src={img || "/default.png"}
                  alt={name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="mb-4">
                  <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {category_name}
                  </span>
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-gray-600">(4.8/5 - 128 đánh giá)</span>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {description ||
                    "Sản phẩm chất lượng cao với hương vị tuyệt vời, được pha chế từ những nguyên liệu tươi ngon nhất."}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {price?.toLocaleString()}₫
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setLiked(!liked)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                        liked
                          ? "bg-red-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white"
                      }`}
                    >
                      <FaHeart />
                    </button>
                  </div>
                </div>

                <Link
                  to={`/product/detail/${id}`}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <FaShoppingCart />
                  Đặt hàng ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;
