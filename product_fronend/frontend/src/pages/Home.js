import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  //  FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products/getproduct");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">

      {/*  HEADER */}
      <div className="max-w-6xl mx-auto flex justify-between items-center p-6">

        <h2 className="text-2xl font-bold">All Products</h2>

        {/*  ADD BUTTON (only if logged in) */}
        {localStorage.getItem("isLoggedIn") === "true" && (
          <Link
            to="/add"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow"
          >
            + Add Product
          </Link>
        )}

      </div>

      {/* PRODUCTS GRID */}
      <div className="max-w-6xl mx-auto p-6">

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                refresh={fetchProducts}
              />
            ))}
          </div>
        ) : (
          <div className="text-center mt-20 text-gray-500 text-lg">
            No products found 
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;