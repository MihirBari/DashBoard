import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./orders.css"
import DataTable from 'react-data-table-component';
import API_BASE_URL from "../../config";
import { MdEdit, MdDelete  } from "react-icons/md";
import ExportTable from '../ExportTable';
import { toast } from 'react-toastify';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [exportModalIsOpen, setExportModalIsOpen] = useState(false);
  

    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/dealer/showDealer`);
          setUsers(response.data);
          console.log(response.data);
        } catch (err) {
          console.error("Error fetching orders:", err);
        }
      };
  
      fetchOrders();
    }, []);
  
    const handleEditClick = (row) => {
      console.log("Edit clicked for:", row);
      // Add your edit logic here
    };
  
    const handleDeleteClick = (userId) => {
      const idToDelete = userId.id; 
      console.log('Deleting user with ID:', idToDelete);
    
      axios.delete(`${API_BASE_URL}/api/dealer/delete`, { data: { id: idToDelete } })
        .then(response => {
          console.log('Delete successful:', response.data);
          toast.success("Deleted Successfully");
          window.location.reload();
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
            selector: (row) => row.debitor_name,
            sortable: true,
        },
        {
            name: 'Date',
            selector: (row) => row.debitor_Date,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: (row) => row.debitor_Amount,
            sortable: true,
        },
        {
            name: 'Paid By',
            selector: (row) => row.debitor_paid_by,
            sortable: true,
        },
        {
            name: 'Total Product',
            selector: (row) => row.total_product,
            sortable: true,
        },
        {
            name: 'Other Cost',
            selector: (row) => row.other_cost,
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
                style={{margin:"20px"}}
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