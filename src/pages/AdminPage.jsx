import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaPlus,
  FaUser,
  FaBoxOpen,
  FaChartBar,
  FaDollarSign,
  FaShoppingCart,
  FaUsers,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";
import { getAllProducts, deleteProduct } from "../api/product.js";
import { getAllUsers, deleteUser } from "../api/user.js";
import ProductForm from "../components/ProductForm.jsx";

export default function AdminPage() {
  const [active, setActive] = useState("dashboard");
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  // Sample stats data
  const stats = [
    {
      label: "Tổng doanh thu",
      value: "125,000",
      icon: FaDollarSign,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Đơn hàng",
      value: "1,234",
      icon: FaShoppingCart,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Khách hàng",
      value: users.length.toString(),
      icon: FaUsers,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Sản phẩm",
      value: products.length.toString(),
      icon: FaBoxOpen,
      color: "from-orange-500 to-red-500",
    },
  ];

  const fetchProducts = async () => {
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

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.category_name?.toLowerCase().includes(q) ||
        String(p.id) === q
    );
  }, [products, query]);

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.username?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        String(u.id) === q
    );
  }, [users, query]);

  // Product handlers
  const handleEditProduct = (id) => {
    setEditingProductId(id);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((p) => p.id !== id));
        alert("Xóa sản phẩm thành công!");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Lỗi khi xóa sản phẩm!");
      }
    }
  };

  const handleAddProduct = () => {
    setEditingProductId(null);
    setShowProductForm(true);
  };

  const handleCloseProductForm = () => {
    setShowProductForm(false);
    setEditingProductId(null);
    fetchProducts(); // Refresh products list
  };

  // User handlers
  const handleDeleteUser = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      try {
        await deleteUser(id);
        setUsers(users.filter((u) => u.id !== id));
        alert("Xóa người dùng thành công!");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Lỗi khi xóa người dùng!");
      }
    }
  };

  // Show ProductForm if needed
  if (showProductForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-28">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-6">
            <button
              onClick={handleCloseProductForm}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              ← Quay lại
            </button>
          </div>
          <ProductForm id={editingProductId} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-28">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Admin Panel
                </h2>
              </div>

              <nav className="p-4 space-y-2">
                {[
                  { key: "dashboard", label: "Dashboard", icon: FaChartBar },
                  { key: "products", label: "Sản phẩm", icon: FaBoxOpen },
                  { key: "users", label: "Người dùng", icon: FaUsers },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActive(item.key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      active === item.key
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    <item.icon />
                    {item.label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
              {/* Dashboard */}
              {active === "dashboard" && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                      Dashboard
                    </h1>
                    <p className="text-gray-600">
                      Tổng quan về hoạt động kinh doanh
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-600 text-sm font-medium">
                              {stat.label}
                            </p>
                            <p className="text-2xl font-bold text-gray-800 mt-1">
                              {stat.value}
                            </p>
                          </div>
                          <div
                            className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white`}
                          >
                            <stat.icon />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      Hoạt động gần đây
                    </h2>
                    <div className="space-y-4">
                      {[
                        {
                          action: "Đơn hàng mới",
                          detail: "#12345 - Trà sữa truyền thống",
                          time: "5 phút trước",
                          color: "text-green-600",
                        },
                        {
                          action: "Khách hàng mới",
                          detail: "Nguyễn Văn A đã đăng ký",
                          time: "15 phút trước",
                          color: "text-blue-600",
                        },
                        {
                          action: "Sản phẩm cập nhật",
                          detail: "Trà đào cam sả",
                          time: "1 giờ trước",
                          color: "text-orange-600",
                        },
                      ].map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className={`font-semibold ${activity.color}`}>
                              {activity.action}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {activity.detail}
                            </p>
                          </div>
                          <span className="text-gray-500 text-sm">
                            {activity.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Products */}
              {active === "products" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-800">
                        Quản lý sản phẩm
                      </h1>
                      <p className="text-gray-600">
                        Quản lý danh sách sản phẩm của bạn
                      </p>
                    </div>
                    <button
                      onClick={handleAddProduct}
                      className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <FaPlus />
                      Thêm sản phẩm
                    </button>
                  </div>

                  {/* Search */}
                  <div className="relative max-w-md">
                    <input
                      type="text"
                      placeholder="Tìm kiếm sản phẩm..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>

                  {/* Products Grid */}
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                        <span className="text-emerald-600 font-semibold">
                          Đang tải...
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden"
                        >
                          <div className="h-48 bg-gray-100 overflow-hidden">
                            <img
                              src={product.image || "/default.png"}
                              alt={product.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-gray-800 mb-2">
                              {product.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                              {product.category_name}
                            </p>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-emerald-600 font-bold">
                                {product.price?.toLocaleString()}₫
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditProduct(product.id)}
                                className="flex items-center gap-1 px-3 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-800 transition-colors flex-1 justify-center"
                              >
                                <FaEdit className="text-xs" />
                                Sửa
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-800 transition-colors flex-1 justify-center"
                              >
                                <FaTrash className="text-xs" />
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {filteredProducts.length === 0 && !loading && (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaBoxOpen className="text-3xl text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Không tìm thấy sản phẩm
                      </h3>
                      <p className="text-gray-600">
                        Thử thay đổi từ khóa tìm kiếm
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Users */}
              {active === "users" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-800">
                        Quản lý người dùng
                      </h1>
                      <p className="text-gray-600">
                        Danh sách tất cả người dùng trong hệ thống
                      </p>
                    </div>
                  </div>

                  {/* Search Users */}
                  <div className="relative max-w-md">
                    <input
                      type="text"
                      placeholder="Tìm kiếm người dùng..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                      <h2 className="text-lg font-semibold text-gray-800">
                        Danh sách người dùng ({filteredUsers.length})
                      </h2>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Người dùng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Hành động
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                                    {user.username?.charAt(0)?.toUpperCase() ||
                                      "U"}
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {user.username || "Không có tên"}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {user.email || "Không có email"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                #{user.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex gap-2">
                                  <button className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors">
                                    <FaEdit className="text-xs" />
                                    Sửa
                                  </button>
                                  <button
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                  >
                                    <FaTrash className="text-xs" />
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

                  {filteredUsers.length === 0 && !loading && (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaUsers className="text-3xl text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Không tìm thấy người dùng
                      </h3>
                      <p className="text-gray-600">
                        Thử thay đổi từ khóa tìm kiếm
                      </p>
                    </div>
                  )}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
