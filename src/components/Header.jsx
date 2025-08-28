import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { logout, verifyLogin } from "../api/auth.js";
import { FaUser, FaPlusCircle, FaListUl, FaSignOutAlt } from "react-icons/fa";
function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggin, setIsLoggin] = useState(false);
  const [useName, setUserName] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const checkLogin = async () => {
    try {
      const data = await verifyLogin();
      setIsLoggin(true);
      setUserName(data.username);
    } catch (error) {
      console.log(error);
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
      await checkLogin();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-green-600 to-blue-500 text-white shadow h-22 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="font-bold text-4xl flex items-center gap-2">
          <span role="img" aria-label="logo">
            🧋
          </span>
          SummerTea
        </Link>
        <nav className="flex gap-6 font-medium text-lg">
          <Link to="/" className="hover:text-yellow-200">
            Trang chủ
          </Link>
          <Link to="/menu" className="hover:text-yellow-200">
            Menu
          </Link>
          <Link to="/contact" className="hover:text-yellow-200">
            Liên hệ
          </Link>

          {isLoggin ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="hover:text-yellow-200"
              >
                👋 {useName}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-4 bg-white text-black rounded-xl shadow-2xl border border-gray-200 w-75 animate-fade-in z-50">
                  <div className="flex flex-col py-2">
                    <Link
                      to="/user"
                      className="flex items-center gap-2 px-5 py-3 hover:bg-green-100 transition-colors duration-150"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaUser className="text-green-600"></FaUser>
                      Tài khoản
                    </Link>
                    <Link
                      to="/product/create"
                      className="flex items-center gap-2 px-5 py-3 hover:bg-green-100 transition-colors duration-150"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaPlusCircle className="text-green-600"></FaPlusCircle>
                      Tạo sản phẩm
                    </Link>
                        <Link
                      to="/product/list"
                      className="flex items-center gap-2 px-5 py-3 hover:bg-green-100 transition-colors duration-150"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaListUl className="text-green-600"></FaListUl>
                      Danh sách sản phẩm
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 px-5 py-3 hover:bg-red-100 text-red-600 transition-colors duration-150"
                    >
                      <FaSignOutAlt></FaSignOutAlt>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="hover:text-yellow-200">
              Đăng nhập
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
