import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./orders.css"
import DataTable from 'react-data-table-component';
import API_BASE_URL from "../../config";
import { MdEdit, MdDelete  } from "react-icons/md";
import ExportTable from '../ExportTable';
import { toast } from 'react-toastify';

const Users = () => {
    const [users, setUser] = useState([]);
    const [exportModalIsOpen, setExportModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/dealer/showCustomer`);
                setUser(response.data);
                console.log(response.data);
            } catch (err) {
                console.error('Error fetching orders:', err);
            }
        };

        fetchOrders();
    }, []);

    const handleEditClick = (row) => {
        console.log('Edit clicked for:', row);
    };

    const handleDeleteClick = (userId) => {
        const idToDelete = userId.id; 
        console.log('Deleting user with ID:', idToDelete);
      
        axios.delete(`${API_BASE_URL}/api/dealer/del`, { data: { id: idToDelete } })
          .then(response => {
            console.log('Delete successful:', response.data);
            window.location.reload();
            toast.success("Deleted Successfully");
          })
          .catch(error => {
            console.error('Error deleting:', error);
          });
      };


    const handleExportClick = () => {
        setExportModalIsOpen(true);
      };
    

    const columns = [
        {
            name: 'Sr. No',
            selector: (_, index) => index + 1,
            sortable: false,
            width: '80px',
        },
        {
            name: 'Name',
            selector: (row) => row.creditor_name,
            sortable: true,
        },
        {
            name: 'Product id',
            selector: (row) => row.product_id,
            sortable: true,
        },
        {
            name: 'Amount Sold',
            selector: (row) => row.amount_sold,
            sortable: true,
        },
        {
            name: 'Amount Condition',
            selector: (row) => row.amount_condition,
            sortable: true,
        },
        {
            name: 'Returned',
            selector: (row) => row.returned,
            sortable: true,
        },
        {
            name: 'Edit',
            cell: (row) => (
                <MdEdit onClick={() => handleEditClick(row)}>Edit</MdEdit>
            ),
            button: true,
        },
        {
            name: 'Delete',
            cell: (row) => (
                <MdDelete onClick={() => handleDeleteClick(row)}>Delete</MdDelete>
            ),
            button: true,
        },
    ];

    return (
        <div className="order">
        <DataTable
          className="dataTable"
          columns={columns}
          data={users}
          fixedHeader
          fixedHeaderScrollHeight="450px"
          striped
          pagination
          highlightOnHover
          paginationPerPage={10} // Adjust the number of rows per page
          paginationRowsPerPageOptions={[10, 20, 30]}
          paginationComponentOptions={{
            rowsPerPageText: "Rows per page:",
            rangeSeparatorText: "of",
            noRowsPerPage: false,
            selectAllRowsItem: false,
          }}
          subHeader
          subHeaderComponent={
            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleExportClick}
              >
                Export
              </button>
  
              <ExportTable
                data={users}
                isOpen={exportModalIsOpen}
                onRequestClose={() => setExportModalIsOpen(false)}
              />
            </div>
          }
        />
      </div>
    );
};


export default Users;