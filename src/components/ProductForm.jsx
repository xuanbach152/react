import { useState, useEffect } from "react";
import {
  createProduct,
  uploadImage,
  getProduct,
  updateProduct,
} from "../api/product.js";
import { useParams } from "react-router-dom";

export default function ProductForm() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category_name, setCategory_name] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const categories = [
    "Trà sữa",
    "Trà hoa quả",
    "Nước ép",
    "Mỳ",
    "Soda",
    "Đá xay",
    "Sữa chua lắc",
    "Đồ ăn vặt",
    "Đồ chiên rán",
  ];

  const getproduct = async (id) => {
    try {
      const product = await getProduct(id);
      setName(product.name || "");
      setPrice(product.price || 0);
      setImage(product.image || "");
      setDescription(product.description || "");
      setCategory_name(product.category_name || "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getproduct(id);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const product = { name, price, description, category_name };
      let result;
      if (id) {
        result = await updateProduct(product, id);
        if (image) {
          await uploadImage(id, image);
          alert("Cập nhật sản phẩm thành công!");
        }
      } else {
        result = await createProduct(product);

        if (image && result && result.id) {
          await uploadImage(result.id, image);
        }
        alert("Thêm thành công!");
        setName("");
        setPrice(0);
        setImage(null);
        setDescription("");
        setCategory_name("");
      }
    } catch (error) {
      console.error("Error :", error);
      alert(id ? "Lỗi cập nhật sản phẩm" : "Lỗi tạo sản phẩm");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center mt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg space-y-6 "
      >
        <h2 className="text-3xl font-bold text-center text-orange-600">
          {id ? "✏️ Sửa Sản Phẩm" : "🍹 Thêm Sản Phẩm"}
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
            onChange={(e) => {
              const file = e.target.files[0];
              setImage(file);
              if (file) {
                const url = URL.createObjectURL(file);
                setPreview(url);
              } else {
                setPreview("");
              }
            }}
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
          {preview ? (
            <img
              src={preview}
              alt="Chưa có ảnh"
              className="mt-3 w-40 h-40 object-cover rounded-xl shadow border-2 border-orange-200 mx-auto"
            />
          ):<img
              src={image}
              alt="Chưa có ảnh"
              className="mt-3 w-40 h-40 object-cover rounded-xl shadow border-2 border-orange-200 mx-auto"
            />}
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
        >
          {id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </button>
      </form>
    </div>
  );
}
