import { Link } from "react-router-dom";

function Header() {
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
        </nav>
      </div>
    </header>
  );
}

export default Header;
