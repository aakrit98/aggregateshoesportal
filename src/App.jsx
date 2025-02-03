import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Login from "./components/login";
import Signup from "./components/signup";
import CartPage from "./components/CartPage";
import PostProduct from "./components/PostProduct";
import ProductPage from "./components/ProductPage"; // Product listing page
import ProductDetailPage from "./components/ProductDetailPage"; // Product detail page
import Navbar from "./components/Navbar"; // Navbar imported here
import Home from "./components/Home";
import ShoeList from "./components/ShoesList";
import MainPage from "./components/MainPage";
import CartContainer from "./components/CartContainer";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  return (
    <>
      {/* Main Layout will render the Navbar and any nested routes */}
      <Routes>
        {/* Main Layout route */}
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/shopcart" element={<CartPage />} /> */}
          <Route path="/shopcart" element={<ShoppingCart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/postproduct" element={<PostProduct />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/shoes" element={<ShoeList />} />
          <Route path="/cartpage" element={<MainPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
