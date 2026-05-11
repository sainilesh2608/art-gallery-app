import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";
import Navbar from "../../Components/Navbar/Navbar";

export default function MyOrders() {
  const navigate = useNavigate();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h1>My Orders</h1>
        <p>Your orders will appear here once you make a purchase.</p>
        {/* Orders will be displayed here after API integration */}
      </div>
    </>
  );
}
