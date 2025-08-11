import { useState } from "react";
import { createProduct, uploadImage } from "../api/product.js";

export default function CreateProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category_name, setCategory_name] = useState("");
  const [image, setImage] = useState(null);

  const categories = [
    "Trà Sữa",
    "Trà hoa quả",
    "Nước ép",
    "Mỳ",
    "Soda",
    "Đá xay",
    "Sữa chua lắc",
    "Đồ ăn vặt",
    "Đồ chiên rán",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const product = { name, price, description, category_name };
      const createdProduct = await createProduct(product);

      if (image && createdProduct && createdProduct.id) {
        await uploadImage(createdProduct.id, image);
        alert("Product created successfully with image!");
      } else {
        alert("Product created successfully (no image)");
      }

      setName("");
      setPrice(0);
      setImage(null);
      setDescription("No description");
      setCategory_name("");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error creating product");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-orange-600">
          🍹 Thêm Sản Phẩm
        </h2>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Tên sản phẩm
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            placeholder="Nhập tên sản phẩm"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Giá (VNĐ)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            placeholder="Nhập giá"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Mô tả
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            placeholder="Nhập mô tả"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Loại sản phẩm
          </label>
          <select
            value={category_name}
            onChange={(e) => setCategory_name(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
          >
            <option value="">-- Chọn loại sản phẩm --</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Ảnh sản phẩm
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
        >
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
}
