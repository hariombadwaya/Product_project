import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/axios";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(status === "true");
  }, []);

  const logout = async () => {
    try {
      await API.post("/auth/logout");
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      alert("Logged out");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-blue-600 text-white flex justify-between items-center px-6 py-4 shadow">

      <h2 className="font-bold text-xl">Product App</h2>

      <div className="space-x-4">

        <Link to="/">Home</Link>

        {isLoggedIn ? (
          <>
            <Link to="/add">Add Product</Link>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

      </div>
    </div>
  );
}

export default Navbar;