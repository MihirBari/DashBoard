import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import API_BASE_URL from '../../config';
import { MdEdit, MdDelete  } from "react-icons/md";

const CustomerDetails = ({ customer }) => {

  const {
    creditor_name,
    product_id,
    amount_sold,
    Product_sold,
    amount_condition,
    returned,
  } = customer;

 
  const handleDeleteClick = () => {
    const idToDelete = product_id;
  
    console.log('Deleting user with ID:', idToDelete);
  
    axios.delete(`${API_BASE_URL}/api/dealer/del`, { params: { id: idToDelete } })
      .then(response => {
        console.log('Delete successful:', response.data);
        // window.location.reload();
        toast.success("Deleted Successfully");
      })
      .catch(error => {
        console.error('Error deleting:', error);
      });
  }

  const handleEditClick = (row) => {
    console.log('Edit clicked for:', row);
};

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Name : {creditor_name}</h2>
        <p className="text-gray-600 mb-2">Product Id : {product_id}</p>
        <p className="text-gray-800 font-semibold mb-2">Amount Sold : ₹ {amount_sold}</p>
        <p className="text-gray-800 font-semibold mb-2">Total Product Sold : ₹ {Product_sold}</p>
        <p className="text-gray-600 mb-2">Amount Condition : {amount_condition}</p>
        <p className="text-gray-600 mb-2">Returned : {returned}</p>
        <MdEdit onClick={() => handleEditClick()}>Edit</MdEdit>
        <MdDelete onClick={() => handleDeleteClick()}>Delete</MdDelete>
      </div>
    </div>
  );
};

export default CustomerDetails;