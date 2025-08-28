import { useState } from "react";
import { Link } from "react-router-dom";

function ProductCard({ img, name, price, id, description, category_name }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-all duration-200 border border-gray-100 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <img
          src={img}
          alt={name}
          className="w-full h-56 object-cover rounded-t-xl border-b"
        />
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2 text-gray-800 text-center">
            {name}
          </h2>
          <div className="flex flex-col items-center gap-2 mb-3">
            <span className="text-green-600 font-bold text-xl">
              {price.toLocaleString()}₫
            </span>
          </div>
          <div className="flex justify-center gap-4">
            <Link
              to={`/product/detail/${id}`}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-full font-semibold transition w-auto text-center block shadow-lg text-lg"
            >
              Đặt ngay
            </Link>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/100 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-lg relative animate-scale-in">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold transition"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <div className="flex justify-center mb-6">
              <img
                src={img}
                alt={name}
                className="w-48 h-48 object-cover rounded-2xl shadow-lg border-4 border-green-200"
              />
            </div>

            <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-2">
              {name}
            </h2>
            <p className="text-green-600 font-bold text-2xl text-center mb-4">
              {price.toLocaleString()}₫
            </p>
            <p className="text-gray-600 text-center mb-2">Mô tả: {description}</p>
            <p className="text-blue-500 font-medium text-center mb-6">
              Loại hàng: {category_name}
            </p>

            <Link
              to={`/product/detail/${id}`}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-full font-semibold transition w-full text-center block shadow-lg text-lg"
            >
              Đặt ngay
            </Link>
          </div>

          <style>
            {`
        .animate-scale-in {
          animation: scaleIn 0.25s ease-out;
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}
          </style>
        </div>
      )}
    </>
  );
}

export default ProductCard;
