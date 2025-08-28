import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import ProductForm from "./components/ProductForm";
import ProductEdit from "./components/ProductEdit";
import UserPage from "./pages/UserPage";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/product/create" element={<ProductForm />} />
        <Route path="/product/edit/:id" element={<ProductForm />} />
        <Route path="/product/list" element={<ProductEdit />} />
        <Route path="/user" element={<UserPage/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
