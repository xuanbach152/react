import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { logout, verifyLogin } from "../api/auth.js";
import {
  FaUser,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggin, setIsLoggin] = useState(false);
  const [useName, setUserName] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const checkLogin = async () => {
    try {
      const data = await verifyLogin();
      setIsLoggin(true);
      setUserName(data.username);
    } catch  {
      setIsLoggin(false);
      setUserName(null);
    }
  };

  useEffect(() => {
    checkLogin();
  }, [location]);

  const handleLogout = async () => {
    try {
      await logout();
      setUserName(null);
      setIsLoggin(false);
      setDropdownOpen(false);
      setMobileMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
            🧋
          </div>
          <span className="font-bold text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            SummerTea
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { to: "/", label: "Trang chủ" },
            { to: "/menu", label: "Menu" },
            { to: "/contact", label: "Liên hệ" },
            { to: "/admin", label: "Quản trị" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200 group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          {isLoggin ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <FaUser className="text-sm" />
                <span className="hidden sm:inline">{useName}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <p className="font-semibold text-gray-800">{useName}</p>
                    <p className="text-sm text-gray-500">Tài khoản của bạn</p>
                  </div>
                  <div className="py-2">
                    {[
                      {
                        to: "/user",
                        icon: FaUser,
                        label: "Thông tin cá nhân",
                        color: "text-blue-600",
                      },
                      {
                        to: "/cart",
                        icon: FaShoppingCart,
                        label: "Giỏ hàng",
                        color: "text-green-600",
                      },
                      {
                        to: "/user",
                        icon: FaCog,
                        label: "Cài đặt",
                        color: "text-gray-600",
                      },
                    ].map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <item.icon className={`${item.color}`} />
                        <span className="text-gray-700">{item.label}</span>
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-red-50 text-red-600 transition-colors"
                    >
                      <FaSignOutAlt />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Đăng ký
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-emerald-600"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50">
          <nav className="container mx-auto px-6 py-4 space-y-3">
            {[
              { to: "/", label: "Trang chủ" },
              { to: "/menu", label: "Menu" },
              { to: "/contact", label: "Liên hệ" },
              { to: "/admin", label: "Quản trị" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
