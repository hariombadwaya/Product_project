import { useState } from "react";
import API from "../api/axios";

function AddProduct() {
  const [form, setForm] = useState({
    metaTitle:"",
    name:"",
    slug:"",
    image:"",
    price:"",
    discountedPrice:"",
    description:""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/products/create", form);
    alert("Product Added");
  };

  return (
    <div className="flex justify-center mt-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow w-96 space-y-3">
        <input placeholder="Meta Title" className="input" onChange={e=>setForm({...form,metaTitle:e.target.value})}/>
        <input placeholder="Name" className="input" onChange={e=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Slug" className="input" onChange={e=>setForm({...form,slug:e.target.value})}/>
        <input placeholder="Image URL" className="input" onChange={e=>setForm({...form,image:e.target.value})}/>
        <input placeholder="Price" className="input" onChange={e=>setForm({...form,price:e.target.value})}/>
        <input placeholder="Discounted Price" className="input" onChange={e=>setForm({...form,discountedPrice:e.target.value})}/>
        <textarea placeholder="Description" className="input" onChange={e=>setForm({...form,description:e.target.value})}/>
        <button className="bg-blue-600 text-white p-2 w-full">Add</button>
      </form>
    </div>
  );
}

export default AddProduct;