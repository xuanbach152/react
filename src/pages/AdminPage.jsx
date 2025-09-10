import { Link } from "react-router-dom";
import { useState } from "react";
import ProductEdit from "../components/ProductEdit";
import ProductForm from "../components/ProductForm";
export default function AdminPage() {
  const [active, setActive] = useState("1");
  const [editId, setEditId] = useState(null);
  const handleEditProduct = (id) => {
    setEditId(id);
    setActive("5");
  };
  return (
    <div className="min-h-screen flex bg-gray-300 m-30 rounded-2xl">
      <aside className="w-64 bg-gray-600 text-gray-100 flex flex-col rounded-2xl">
        <div className="p-8 text-4xl font-bold items-center text-center border-b border-gray-700 ">
          Admin
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => {
              setActive("1");
              setEditId(null);
            }}
            className="flex items-center gap-3 px-4 py-2 rounded-lg font-semibold hover:bg-gray-800"
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              setActive("3");
              setEditId(null);
            }}
            className="flex items-center gap-3 px-4 py-2 rounded-lg font-semibold hover:bg-gray-800"
          >
            Options
          </button>
          <button
            onClick={() => {
              setActive("4");
              setEditId(null);
            }}
            className="flex items-center gap-3 px-4 py-2 rounded-lg font-semibold hover:bg-gray-800"
          >
            Users
          </button>
          <button
            onClick={() => {
              setActive("2");
              setEditId(null);
            }}
            className="flex items-center gap-3 px-4 py-2 rounded-lg font-semibold hover:bg-gray-800"
          >
            Products
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        {active === "1" && (
          <div>
            {" "}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-sm font-semibold text-gray-500">
                  Total Users
                </h3>
                <p className="text-2xl font-bold text-gray-800 mt-2">1,234</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-sm font-semibold text-gray-500">
                  Active Products
                </h3>
                <p className="text-2xl font-bold text-gray-800 mt-2">567</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-sm font-semibold text-gray-500">Revenue</h3>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  $12,345
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-sm font-semibold text-gray-500">
                  Pending Orders
                </h3>
                <p className="text-2xl font-bold text-red-600 mt-2">45</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                User Management
              </h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Role</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3">John Doe</td>
                    <td className="p-3">john@example.com</td>
                    <td className="p-3">Admin</td>
                    <td className="p-3 text-center">
                      <button className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 mr-2">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">Jane Smith</td>
                    <td className="p-3">jane@example.com</td>
                    <td className="p-3">User</td>
                    <td className="p-3 text-center">
                      <button className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 mr-2">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {active === "2" && (
          <div>
            <button
              onClick={() => setActive("5")}
              className="ml-230 mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition"
            >
              + Thêm sản phẩm
            </button>
            <ProductEdit onEdit={handleEditProduct} />
          </div>
        )}
        {active === "5" && (
          <div>
            <button
              onClick={() => {
                setActive("2");
                setEditId(null);
              }}
              className="mb-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-300 transition"
            >
              ← Quay lại
            </button>
            <ProductForm id={editId} />
          </div>
        )}
      </main>
    </div>
  );
}
