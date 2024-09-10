import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Orders from "./pages/Orders/orders.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import RedirectIfLoggedIn from "./components/ProtectedRoute/RedirectLogin.jsx";
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
