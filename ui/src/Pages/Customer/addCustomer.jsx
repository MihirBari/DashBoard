import React, { useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import API_BASE_URL from "../../config";
import axios from "axios";

const AddUser = () => {
  const initialInputs = {
    creditor_name: "",
    email: "",
    product_id: "",
    amount_sold: "",
    Product_sold:"",
    amount_condition:"",
    returned:""
  };

  const [inputs, setInputs] = useState(initialInputs);
  const [err, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send data to backend
      const response = await axios.post(
        `${API_BASE_URL}/api/dealer/addCustomer`,
        inputs
      );
      setInputs(initialInputs);
      window.location.reload();
      toast.success("User created successfully");
    } catch (err) {
      console.error(err);
      setError(err.response);
      toast.error("Failed to create user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Add Customer
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="creditor_name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="name"
                  name="creditor_name"
                  required
                  onChange={handleChange}
                  placeholder="Enter Customer Name"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="product_id"
                className="block text-sm font-medium text-gray-700"
              >
                Product ID
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="product_id"
                  required
                  onChange={handleChange}
                  placeholder="Product ID"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="amount_sold"
                className="block text-sm font-medium text-gray-700"
              >
                Amount Sold
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="amount_sold"
                  required
                  onChange={handleChange}
                  placeholder="Enter Amount Sold"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="Product_sold"
                className="block text-sm font-medium text-gray-700"
              >
                Total Product Sold
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="Product_sold"
                  required
                  onChange={handleChange}
                  placeholder="Enter Amount Sold"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="amount_condition"
                className="block text-sm font-medium text-gray-700"
              >
                Amount Condition
              </label>
              <div className="mt-1 relative">
                <select
                  name="amount_condition"
                  required
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled selected>
                    Select an option
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="returned"
                className="block text-sm font-medium text-gray-700"
              >
                Returned
              </label>
              <div className="mt-1 relative">
                <select
                  name="returned"
                  required
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled selected>
                    Select an option
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handleSubmit}
                className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Create
              </button>
              <Link to="/Customer">
                <button className="group relative w-[100px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  Back
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
