import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function UpdateProduct() {
  const { id } = useParams();

  const [form, setForm] = useState({
    metaTitle: "",
    name: "",
    slug: "",
    image: "",
    price: "",
    discountedPrice: "",
    description: ""
  });

  useEffect(() => {
    API.get("/products/getproduct").then(res => {
      const product = res.data.find(p => p._id === id);
      if (product) setForm(product);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.put(`/products/update/${id}`, form);
    alert("Updated successfully");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Update Product
        </h2>

        <input
          className="border p-2 w-full rounded"
          placeholder="Meta Title"
          value={form.metaTitle}
          onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Discounted Price"
          value={form.discountedPrice}
          onChange={(e) => setForm({ ...form, discountedPrice: e.target.value })}
        />

        <textarea
          className="border p-2 w-full rounded"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default UpdateProduct;