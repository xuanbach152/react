import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-2xl">
                🧋
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                SummerTea
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Thương hiệu trà sữa hàng đầu với hương vị tuyệt vời và dịch vụ
              chất lượng cao. Mang đến cho bạn những trải nghiệm thưởng thức
              tuyệt vời nhất.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/ha.nguyen.180779"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-emerald-400">
              Liên kết nhanh
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Trang chủ" },
                { to: "/menu", label: "Menu" },
                { to: "/about", label: "Về chúng tôi" },
                { to: "/contact", label: "Liên hệ" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-emerald-400">
              Thông tin liên hệ
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-emerald-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  123 Đường ABC, Quận XYZ, TP.HCM
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-emerald-400 flex-shrink-0" />
                <a
                  href="tel:0865409578"
                  className="text-gray-300 hover:text-emerald-400 transition-colors text-sm"
                >
                  0865409578
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-emerald-400 flex-shrink-0" />
                <a
                  href="mailto:info@summertea.vn"
                  className="text-gray-300 hover:text-emerald-400 transition-colors text-sm"
                >
                  info@summertea.vn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 SummerTea. Tất cả quyền được bảo lưu.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1 mt-4 md:mt-0">
            Được xây dựng với <FaHeart className="text-red-500" /> tại Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
