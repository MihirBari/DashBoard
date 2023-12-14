import React, { useState, useEffect } from 'react';
import CustomerDetails from './customerDetails';
import axios from 'axios';
import API_BASE_URL from '../../config';

const ViewCustomer = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/dealer/showCustomer`);
        console.log('API Response:', response);
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center gap-4"> 
      {customers.map((customer, index) => (
        <CustomerDetails key={index} customer={customer} />
      ))}
    </div>
  );
};

export default ViewCustomer;