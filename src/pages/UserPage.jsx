import { useState, useEffect } from "react";
import { FaUser, FaClipboardList, FaCog } from "react-icons/fa";
import { getUser } from "../api/user.js";
import { getIdFromToken } from "../utils/decode.js";
const menu = [
  {
    key: "1",
    label: "Thông tin cá nhân",
    icon: <FaUser className="text-green-500" />,
    color: "from-green-100 to-green-50",
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
    icon: <FaCog className="text-yellow-500" />,
    color: "from-yellow-100 to-yellow-50",
  },
];

export default function UserPage() {
  const [active, setActive] = useState("1");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const getInfor = async () => {
    try {
      const token = localStorage.getItem("access_token");
      console.log("getInfor token:", token);
      const id = getIdFromToken(token);
      console.log("decoded id:", id);
      const data = await getUser(id);
      setUsername(data.username);
      setEmail(data.email);
    } catch (error) {
      console.log(`Error : ${error}`);
      setUsername("");
      setEmail("");
    }
  };

  useEffect(() => {
    getInfor();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white-100 to-black-200 ">
      <div className="flex bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-6xl min-h-[650px]">
        <aside className="w-60 bg-gradient-to-b from-green-50 to-white flex flex-col items-center py-8">
          <img
            src=".\public\img\default-avatar-profile-icon-social-media-user-free-vector.jpg"
            alt="Avatar"
            className="w-16 h-16 rounded-full mb-6 object-cover shadow"
          />
          <nav className="flex flex-col gap-2 w-full px-4 text-1xl">
            {menu.map((item) => (
              <button
                key={item.key}
                onClick={() => setActive(item.key)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition
                  ${
                    active === item.key
                      ? "bg-gradient-to-r " +
                        item.color +
                        " text-green-700 shadow"
                      : "text-gray-700 hover:bg-green-50"
                  }
                `}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <main
          className={`flex-1 flex items-center justify-center bg-gradient-to-br transition-all duration-300
          rounded-r-3xl
          ${
            active === "1"
              ? "from-green-100 to-green-50"
              : active === "2"
              ? "from-blue-100 to-blue-50"
              : "from-yellow-100 to-yellow-50"
          }
        `}
        >
          {active === "1" && (
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold text-green-700 mb-2">
                {username}
              </h2>
              <p className="text-gray-600 mb-4">{email}</p>
            </div>
          )}
          {active === "2" && (
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold text-blue-700 mb-2">
                Đơn hàng của bạn
              </h2>
              <p className="text-gray-600 mb-4">Bạn chưa có đơn hàng nào.</p>
            </div>
          )}
          {active === "3" && (
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold text-yellow-700 mb-2">
                Cài đặt tài khoản
              </h2>
              <p className="text-gray-600 mb-4">
                Bạn có thể thay đổi thông tin tại đây.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
