import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Orders from "./pages/Orders/orders.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import RedirectIfLoggedIn from "./components/ProtectedRoute/RedirectLogin.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Products from "./pages/Products/Products.jsx";
import Bestsellers from "./pages/Bestsellers/Bestsellers.jsx";
import About from "./pages/About/About.jsx";
import Faq from "./pages/FAQs/Faq.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./pages/Profile/Profile.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Load your Stripe publishable key
const stripePromise = loadStripe(
  "pk_test_51Q1q4SFmbbTFKsyca0hP63QP5BqI11CDSwD9SyhuTBjYBzKo8lbgRYzCQjFF8thg9gUDQaLr6pX8phU9giTQl3x100ZzFDzqkd",
);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <ToastContainer />
          <Elements stripe={stripePromise}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={
                  <RedirectIfLoggedIn redirectTo="/">
                    <Login />
                  </RedirectIfLoggedIn>
                }
              />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/bestsellers" element={<Bestsellers />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Elements>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
