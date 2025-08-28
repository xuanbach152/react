import React, { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../api/product";
import { useNavigate } from "react-router-dom";

function ProductEdit() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
    navigate(`/product/edit/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto mt-32">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Danh sách sản phẩm</h2>
      <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-100 to-blue-200">
              <th className="p-3 border text-center">Ảnh</th>
              <th className="p-3 border text-center">Tên</th>
              <th className="p-3 border text-center">Giá</th>
              <th className="p-3 border text-center">Mô tả</th>
              <th className="p-3 border text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-blue-50 transition-colors duration-150"
              >
                <td className="p-3 border text-center">
                  <img
                    src={product.image || "/default.png"}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg mx-auto border"
                  />
                </td>
                <td className="p-3 border text-center font-semibold">{product.name}</td>
                <td className="p-3 border text-center text-green-600 font-bold">
                  {product.price.toLocaleString()}₫
                </td>
                <td className="p-3 border text-center">{product.description}</td>
                <td className="p-3 border text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="bg-yellow-400 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-500 transition-colors"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-colors"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductEdit;