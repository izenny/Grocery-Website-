import React, { useState } from 'react'
// import Product from '../../Common/Products';
import { AddNewProductApi } from '../../ApiCall/AddProductApi';

const AddNewProduct = () => {
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // New state for image preview

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    setImagePreview(URL.createObjectURL(file)); // Set image preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("productname", productName);
      formData.append("productcode", productCode);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("image", productImage);

      await AddNewProductApi(formData);

      alert("Product successfully created!");
      setProductName("");
      setProductCode("");
      setDescription("");
      setCategory("");
      setPrice(0);
      setStock(0);
      setProductImage(null);
      setImagePreview(null); // Reset image preview
    } catch (error) {
      alert("Product not created!");
      console.log("Error adding product:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center m-4 h-full">
    <div className="max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold font-Merriweather text-center mb-6">
        Add Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700">Product Name</label>
            <input
              type="text"
              value={productName}
              className="w-2/3 p-2 border border-gray-300 rounded-md shadow-sm"
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700">Product Code</label>
            <input
              type="text"
              value={productCode}
              className="w-2/3 p-2 border border-gray-300 rounded-md shadow-sm"
              onChange={(e) => setProductCode(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700">Description</label>
            <input
              type="text"
              value={description}
              className="w-2/3 p-2 border border-gray-300 rounded-md shadow-sm"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700">Category</label>
            <select
              value={category}
              className="w-2/3 p-2 border border-gray-300 rounded-md shadow-sm"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegitables</option>
              <option value="Dairy & Eggs">Dairy & Eggs</option>
              <option value="Meat & Seafood">Meat & Seafood</option>
              <option value="Bakery & Bread">Bakery & Bread</option>
              <option value="Pantry Staples">Pantry Staples</option>
              <option value="Snacks & Beverages">Snacks & Beverages</option>
              <option value="Household Supplies">Household Supplies</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700">Price</label>
            <input
              type="number"
              value={price}
              className="w-2/3 p-2 border border-gray-300 rounded-md shadow-sm"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700">Stock</label>
            <input
              type="number"
              value={stock}
              className="w-2/3 p-2 border border-gray-300 rounded-md shadow-sm"
              onChange={(e) => setStock(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700">Product Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-2/3 text-sm p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full p-2 text-white bg-orange-500 rounded-md shadow hover:bg-orange-600"
        >
          Add Product
        </button>
      </form>
    </div>
    {/* <div className="mt-4">
      <Product
        productName={productName}
        productCode={productCode}
        description={description}
        category={category}
        price={price}
        stock={stock}
        image={imagePreview} // Use image preview URL
      />
    </div> */}
  </div>
  )
}

export default AddNewProduct