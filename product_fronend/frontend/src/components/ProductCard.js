import { Link } from "react-router-dom";
import API from "../api/axios";

function ProductCard({ product, refresh }) {

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const res = await API.delete(`/products/delete/${product._id}`);
      alert(res.data.msg);
      refresh();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden p-3">

      <img
        src={product.image || "https://via.placeholder.com/150"}
        alt="product"
        className="h-44 w-full object-cover rounded"
      />

      <div className="mt-3">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-500 text-sm">{product.metaTitle}</p>

        <div className="mt-2">
          <span className="text-green-600 font-bold">
            ₹{product.discountedPrice}
          </span>
          <span className="text-gray-400 line-through ml-2">
            ₹{product.price}
          </span>
        </div>

        {/*  Only show if logged in */}
        {isLoggedIn && (
          <div className="flex justify-between mt-4">
            <Link
              to={`/update/${product._id}`}
              className="bg-blue-500 px-3 py-1 text-white rounded hover:bg-blue-600"
            >
              Edit
            </Link>

            <button
              onClick={handleDelete}
              className="bg-red-500 px-3 py-1 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;