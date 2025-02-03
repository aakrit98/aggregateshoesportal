import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Page from "../components/Page";
import Navbar from "../components/Navbar";
import ProductPage from "../components/ProductPage";
import { useEffect } from "react";
import CartContainer from "../components/CartContainer";

import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { calculateTOtals, getCartItems } from "../features/cart/cartSlice";

const MainLayout = () => {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  const location = useLocation();

  // Scroll to the top when the location changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  useEffect(() => {
    dispatch(calculateTOtals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  // if (isLoading) {
  //   return (
  //     <div className="Loading">
  //       <h1>LOading.......</h1>
  //     </div>
  //   );
  // }

  return (
    <div className="p-8 flex flex-col min-h-screen">
      <Header />
      {isOpen && <Modal />}
      {/* <Navbar /> */}
      {/* <CartContainer /> */}
      <main className="flex-grow">
        <Outlet />{" "}
        {/* This will render the correct page (ProductPage, ProductDetailPage, etc.) */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
