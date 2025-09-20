import { useState, useEffect } from "react";
import {
  FaUser,
  FaClipboardList,
  FaCog,
  FaEdit,
  FaCamera,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { getUser } from "../api/user.js";
import { getIdFromToken } from "../utils/decode.js";

const menu = [
  {
    key: "1",
    label: "Thông tin cá nhân",
    icon: <FaUser className="text-emerald-500" />,
    color: "from-emerald-100 to-emerald-50",
  },
  {
    key: "2",
    label: "Đơn hàng",
    icon: <FaClipboardList className="text-blue-500" />,
    color: "from-blue-100 to-blue-50",
  },
  {
    key: "3",
    label: "Cài đặt",
    icon: <FaCog className="text-purple-500" />,
    color: "from-purple-100 to-purple-50",
  },
];

export default function UserPage() {
  const [active, setActive] = useState("1");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const getInfor = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.warn("No token in localStorage");
        setUsername("");
        setEmail("");
        return;
      }

      const id = getIdFromToken(token);
      if (!id) {
        console.warn("Invalid id from token");
        setUsername("");
        setEmail("");
        return;
      }

      const data = await getUser(id);
      const user = data?.data ?? data;
      setUsername(user?.username ?? "");
      setEmail(user?.email ?? "");
    } catch (error) {
      console.error("Error fetching user info:", error);
      setUsername("");
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInfor();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 pt-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
          <span className="text-emerald-600 font-semibold">Đang tải...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pt-28 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Sidebar */}
            <aside className="lg:w-80 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200/50">
              {/* Profile Header */}
              <div className="p-8 text-center border-b border-gray-200/50">
                <div className="relative inline-block mb-6">
                  <img
                    src="/img/default-avatar-profile-icon-social-media-user-free-vector.jpg"
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white"
                  />
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white hover:bg-emerald-600 transition-colors shadow-lg">
                    <FaCamera className="text-xs" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {username || "Người dùng"}
                </h2>
                <p className="text-gray-500 text-sm">
                  {email || "email@example.com"}
                </p>
              </div>

              {/* Navigation */}
              <nav className="p-6">
                <div className="space-y-2">
                  {menu.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setActive(item.key)}
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        active === item.key
                          ? `bg-gradient-to-r ${item.color} text-gray-800 shadow-md scale-105`
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
              {active === "1" && (
                <div className="space-y-8">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800">
                      Thông tin cá nhân
                    </h1>
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                      <FaEdit className="text-sm" />
                      Chỉnh sửa
                    </button>
                  </div>

                  {/* Info Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-200/50">
                      <div className="flex items-center gap-3 mb-4">
                        <FaUser className="text-emerald-600 text-xl" />
                        <h3 className="font-semibold text-gray-800">
                          Tên đăng nhập
                        </h3>
                      </div>
                      <p className="text-gray-700 text-lg">
                        {username || "Chưa cập nhật"}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200/50">
                      <div className="flex items-center gap-3 mb-4">
                        <FaEnvelope className="text-blue-600 text-xl" />
                        <h3 className="font-semibold text-gray-800">Email</h3>
                      </div>
                      <p className="text-gray-700 text-lg">
                        {email || "Chưa cập nhật"}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200/50">
                      <div className="flex items-center gap-3 mb-4">
                        <FaPhone className="text-purple-600 text-xl" />
                        <h3 className="font-semibold text-gray-800">
                          Số điện thoại
                        </h3>
                      </div>
                      <p className="text-gray-700 text-lg">Chưa cập nhật</p>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-200/50">
                      <div className="flex items-center gap-3 mb-4">
                        <FaMapMarkerAlt className="text-orange-600 text-xl" />
                        <h3 className="font-semibold text-gray-800">Địa chỉ</h3>
                      </div>
                      <p className="text-gray-700 text-lg">Chưa cập nhật</p>
                    </div>
                  </div>
                </div>
              )}

              {active === "2" && (
                <div className="space-y-8">
                  <h1 className="text-3xl font-bold text-gray-800">
                    Đơn hàng của bạn
                  </h1>

                  {/* Order Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      {
                        label: "Tổng đơn",
                        value: "0",
                        color: "from-blue-500 to-blue-600",
                      },
                      {
                        label: "Đang xử lý",
                        value: "0",
                        color: "from-yellow-500 to-orange-500",
                      },
                      {
                        label: "Hoàn thành",
                        value: "0",
                        color: "from-green-500 to-emerald-500",
                      },
                      {
                        label: "Đã hủy",
                        value: "0",
                        color: "from-red-500 to-pink-500",
                      },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className={`bg-gradient-to-r ${stat.color} p-4 rounded-xl text-white`}
                      >
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm opacity-90">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Empty State */}
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaClipboardList className="text-3xl text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Chưa có đơn hàng nào
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Hãy khám phá menu và đặt hàng ngay!
                    </p>
                    <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                      Xem Menu
                    </button>
                  </div>
                </div>
              )}

              {active === "3" && (
                <div className="space-y-8">
                  <h1 className="text-3xl font-bold text-gray-800">
                    Cài đặt tài khoản
                  </h1>

                  {/* Settings Options */}
                  <div className="space-y-4">
                    {[
                      {
                        title: "Thông báo",
                        desc: "Quản lý thông báo từ ứng dụng",
                        toggle: true,
                      },
                      {
                        title: "Bảo mật",
                        desc: "Thay đổi mật khẩu và cài đặt bảo mật",
                        action: "Cập nhật",
                      },
                      {
                        title: "Ngôn ngữ",
                        desc: "Chọn ngôn ngữ hiển thị",
                        action: "Tiếng Việt",
                      },
                      {
                        title: "Chế độ tối",
                        desc: "Bật/tắt chế độ tối",
                        toggle: false,
                      },
                    ].map((setting, index) => (
                      <div
                        key={index}
                        className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {setting.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {setting.desc}
                            </p>
                          </div>
                          {setting.toggle !== undefined ? (
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                defaultChecked={setting.toggle}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            </label>
                          ) : (
                            <button className="px-4 py-2 text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors">
                              {setting.action}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
