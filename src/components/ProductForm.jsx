import { useState, useEffect } from "react";
import {
  createProduct,
  uploadImage,
  getProduct,
  updateProduct,
} from "../api/product.js";
import {
  FaImage,
  FaTag,
  FaDollarSign,
  FaFileAlt,
  FaCheck,
  FaTimes,
  FaCloudUploadAlt,
} from "react-icons/fa";

export default function ProductForm({ id }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category_name, setCategory_name] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Determine if this is edit mode or add mode
  const isEditMode = Boolean(id);

  const categories = [
    {
      value: "Trà sữa",
      label: "🧋 Trà sữa",
      color: "from-amber-500 to-orange-500",
    },
    {
      value: "Trà hoa quả",
      label: "🍑 Trà hoa quả",
      color: "from-red-500 to-pink-500",
    },
    {
      value: "Nước ép",
      label: "🥤 Nước ép",
      color: "from-green-500 to-emerald-500",
    },
    { value: "Mỳ", label: "🍜 Mỳ", color: "from-yellow-500 to-amber-500" },
    { value: "Soda", label: "🥤 Soda", color: "from-blue-500 to-cyan-500" },
    { value: "Đá xay", label: "🧊 Đá xay", color: "from-cyan-500 to-blue-500" },
    {
      value: "Sữa chua lắc",
      label: "🥛 Sữa chua lắc",
      color: "from-purple-500 to-pink-500",
    },
    {
      value: "Đồ ăn vặt",
      label: "🍿 Đồ ăn vặt",
      color: "from-orange-500 to-red-500",
    },
    {
      value: "Đồ chiên rán",
      label: "🍟 Đồ chiên rán",
      color: "from-red-500 to-orange-500",
    },
  ];

  const getproduct = async (id) => {
    setLoading(true);
    try {
      const product = await getProduct(id);
      setName(product.name || "");
      setPrice(product.price || 0);
      setPreview(product.image || "");
      setDescription(product.description || "");
      setCategory_name(product.category_name || "");
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getproduct(id);
    }
  }, [id]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setImage(file);
        const url = URL.createObjectURL(file);
        setPreview(url);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const product = {
        name,
        price: Number(price),
        description,
        category_name,
      };
      let result;

      if (id) {
        result = await updateProduct(product, id);
        if (image) {
          await uploadImage(id, image);
        }
        alert("Cập nhật sản phẩm thành công!");
      } else {
        result = await createProduct(product);
        if (image && result && result.id) {
          await uploadImage(result.id, image);
        }
        alert("Thêm sản phẩm thành công!");
        // Reset form
        setName("");
        setPrice(0);
        setImage(null);
        setDescription("");
        setCategory_name("");
        setPreview("");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(id ? "Lỗi cập nhật sản phẩm" : "Lỗi tạo sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center pt-28">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-emerald-600 font-semibold text-lg">
            Đang tải thông tin sản phẩm...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4 pt-10">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header - Dynamic color based on mode */}
          <div
            className={`${
              isEditMode
                ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                : "bg-gradient-to-r from-green-500 to-emerald-500"
            } p-8 text-white`}
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4">
                {isEditMode ? "✏️" : "🍹"}
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {isEditMode ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
              </h2>
              <p
                className={`${
                  isEditMode ? "text-yellow-100" : "text-emerald-100"
                }`}
              >
                {isEditMode
                  ? "Cập nhật thông tin sản phẩm"
                  : "Tạo sản phẩm mới cho menu"}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Product Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FaTag
                      className={`${
                        isEditMode ? "text-yellow-500" : "text-emerald-500"
                      }`}
                    />
                    Tên sản phẩm
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 ${
                      isEditMode
                        ? "focus:ring-yellow-500 focus:border-yellow-500"
                        : "focus:ring-emerald-500 focus:border-emerald-500"
                    } transition-colors bg-white/50 backdrop-blur-sm`}
                    placeholder="Nhập tên sản phẩm..."
                  />
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FaDollarSign className="text-green-500" />
                    Giá bán (VNĐ)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    min="0"
                    step="1000"
                    className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 ${
                      isEditMode
                        ? "focus:ring-yellow-500 focus:border-yellow-500"
                        : "focus:ring-emerald-500 focus:border-emerald-500"
                    } transition-colors bg-white/50 backdrop-blur-sm`}
                    placeholder="0"
                  />
                  <p className="text-sm text-gray-500">
                    Giá hiển thị:{" "}
                    <span
                      className={`font-semibold ${
                        isEditMode ? "text-yellow-600" : "text-emerald-600"
                      }`}
                    >
                      {Number(price).toLocaleString()}₫
                    </span>
                  </p>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FaTag className="text-purple-500" />
                    Danh mục sản phẩm
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setCategory_name(cat.value)}
                        className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                          category_name === cat.value
                            ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-lg scale-105`
                            : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FaFileAlt className="text-blue-500" />
                    Mô tả sản phẩm
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 ${
                      isEditMode
                        ? "focus:ring-yellow-500 focus:border-yellow-500"
                        : "focus:ring-emerald-500 focus:border-emerald-500"
                    } transition-colors bg-white/50 backdrop-blur-sm resize-none`}
                    placeholder="Mô tả chi tiết về sản phẩm..."
                  />
                </div>
              </div>

              {/* Right Column - Image Upload */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FaImage className="text-pink-500" />
                    Hình ảnh sản phẩm
                  </label>

                  {/* Drag & Drop Zone */}
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
                      dragActive
                        ? `${
                            isEditMode
                              ? "border-yellow-500 bg-yellow-50"
                              : "border-emerald-500 bg-emerald-50"
                          }`
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setImage(file);
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setPreview(url);
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />

                    {preview ? (
                      <div className="space-y-4">
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-full h-64 object-cover rounded-xl shadow-lg"
                        />
                        <div className="flex items-center justify-center gap-2 text-green-600">
                          <FaCheck />
                          <span className="text-sm font-medium">
                            Đã chọn ảnh
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setImage(null);
                            setPreview("");
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors mx-auto"
                        >
                          <FaTimes />
                          Xóa ảnh
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                          <FaCloudUploadAlt className="text-3xl text-gray-400" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-700 mb-2">
                            Kéo thả ảnh vào đây
                          </p>
                          <p className="text-sm text-gray-500 mb-4">
                            hoặc click để chọn file
                          </p>
                          <div
                            className={`inline-flex items-center gap-2 px-4 py-2 ${
                              isEditMode
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-emerald-100 text-emerald-600"
                            } rounded-lg text-sm font-medium`}
                          >
                            <FaImage />
                            Chọn ảnh
                          </div>
                        </div>
                        <p className="text-xs text-gray-400">
                          Hỗ trợ: JPG, PNG, GIF (tối đa 5MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Preview Card */}
                {name && (
                  <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Xem trước sản phẩm
                    </h3>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                      <div className="h-32 bg-gray-100 flex items-center justify-center">
                        {preview ? (
                          <img
                            src={preview}
                            alt={name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <FaImage className="text-2xl text-gray-400" />
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-800">
                          {name || "Tên sản phẩm"}
                        </h4>
                        <p className="text-sm text-gray-500 mb-2">
                          {category_name || "Danh mục"}
                        </p>
                        <div
                          className={`${
                            isEditMode ? "text-yellow-600" : "text-emerald-600"
                          } font-bold`}
                        >
                          {Number(price).toLocaleString()}₫
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading || !name || !price || !category_name}
                className={`w-full ${
                  isEditMode
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
                    : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                } disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {isEditMode ? "Đang cập nhật..." : "Đang tạo sản phẩm..."}
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <FaCheck />
                    {isEditMode ? "Cập nhật sản phẩm" : "Tạo sản phẩm"}
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
