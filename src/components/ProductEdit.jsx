import React, { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../api/product";

function ProductEdit({ onEdit }) {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (id) => {
    onEdit(id);
  };

  const filterproduct = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl mb-8 text-center font-bold text-gray-800">
        Danh sách sản phẩm
      </h2>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
      </div>
      <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
        <table className="w-full text-sm text-gray-700">
          <thead>
            <tr className="bg-blue-200 text-gray-800 text-base font-semibold ">
              <th className="p-4 text-center">Ảnh</th>
              <th className="p-4 text-center">Tên</th>
              <th className="p-4 text-center">Giá</th>
              <th className="p-4 text-center">Mô tả</th>
              <th className="p-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filterproduct.map((product, idx) => (
              <tr
                key={product.id}
                className={`transition-all border-2 border-gray-300 duration-200 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-100"
                } hover:scale-[1.01] hover:shadow-md`}
              >
                <td className="p-4 text-center">
                  <img
                    src={product.image || "/default.png"}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg border mx-auto shadow-sm"
                  />
                </td>
                <td className="p-4 text-center font-semibold text-gray-800">
                  {product.name}
                </td>
                <td className="p-4 text-center text-green-600 font-bold">
                  {product.price.toLocaleString()}₫
                </td>
                <td className="p-4 text-center text-gray-600 max-w-xs">
                  {product.description}
                </td>
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-900 transition"
                    >
                      ✏️ Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-900 transition"
                    >
                      🗑️ Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filterproduct.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  Không tìm thấy sản phẩm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductEdit;
