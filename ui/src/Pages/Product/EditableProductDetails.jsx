import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EditableProductDetails = ({ product, onSave }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSizeChange = (label, newQuantity) => {
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [label.toLowerCase()]: newQuantity,
    }));
  };

  const handleSave = () => {
    onSave(editedProduct);
  };

  const {
    product_name,
    Description,
    s,
    m,
    l,
    xl,
    xxl,
    xxxl,
    xxxxl,
    xxxxxl,
    xxxxxxl,
    product_price,
    Cost_price,
    product_type,

  } = editedProduct;

  const sizes = [
    { label: 'S', quantity: s },
    { label: 'M', quantity: m },
    { label: 'L', quantity: l },
    { label: 'XL', quantity: xl },
    { label: 'XXL', quantity: xxl },
    { label: 'XXXL', quantity: xxxl },
    { label: 'XXXXL', quantity: xxxxl },
    { label: 'XXXXXL', quantity: xxxxxl },
    { label: 'XXXXXXL', quantity: xxxxxxl },
  ];

  return (
    <div className="flex justify-center items-center mt-8 ">
  <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
   

    <label htmlFor="product_name" className="text-gray-600 block mt-4">Product Name:</label>
    <input
      type="text"
      name="product_name"
      value={product_name}
      onChange={handleChange}
      className="text-xl font-semibold mb-2 border border-gray-300 rounded-md px-2 py-1"
    />

    <label htmlFor="Description" className="text-gray-600 block mt-4">Description:</label>
    <textarea
      name="Description"
      value={Description}
      onChange={handleChange}
      className="text-gray-600 mb-2 border border-gray-300 rounded-md px-2 py-1"
    ></textarea>

    <label htmlFor="product_price" className="text-gray-600 block mt-4">Product Price:</label>
    <input
      type="text"
      name="product_price"
      value={product_price}
      onChange={handleChange}
      className="text-gray-800 font-semibold mb-2 border border-gray-300 rounded-md px-2 py-1"
    />

<label htmlFor="Cost_price" className="text-gray-600 block mt-4">Cost Price:</label>
    <input
      type="text"
      name="Cost_price"
      value={Cost_price}
      onChange={handleChange}
      className="text-gray-800 font-semibold mb-2 border border-gray-300 rounded-md px-2 py-1"
    />

    <label htmlFor="product_type" className="text-gray-600 block mt-4">Product Type:</label>
    <input
      type="text"
      name="product_type"
      value={product_type}
      onChange={handleChange}
      className="text-gray-600 mb-2 border border-gray-300 rounded-md px-2 py-1"
    />

        <div className="flex items-center flex-wrap space-x-2 mt-4 ">
          <p className="text-gray-600 mr-2">Sizes:</p>
          {sizes.map((size) => (
            <div key={size.label} className="flex items-center space-x-1 mb-2">
              <span className="border border-gray-300 px-2 py-1 rounded-md text-gray-600">
                {size.label}
              </span>
              <input
                type="number"
                value={size.quantity}
                onChange={(e) => handleSizeChange(size.label, e.target.value)}
                className="border border-gray-300 px-2 py-1 rounded-md"
              />
            </div>
          ))}
        </div>
           
       <div  className="flex justify-between items-center mt-4" >
        <button onClick={handleSave} className="bg-blue-500 text-white mt-4 p-2 rounded-md">
          Save
        </button>

        <Link  to="/product">
        <button   className="bg-blue-500 text-white mt-4 p-2 rounded-md">
          Back
        </button>
        </Link> 
       </div>
       
      </div>
    </div>
  );
};

export default EditableProductDetails;
