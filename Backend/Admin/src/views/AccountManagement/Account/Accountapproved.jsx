import React from 'react';
import { useEffect, useState } from 'react';
import { Row, Col, OverlayTrigger, Button, Form } from 'react-bootstrap';
// import { Row, Col, Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/Card/MainCard';
import DataTable from 'react-data-table-component';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { toast , ToastContainer } from 'react-toastify';


const bankAccountapproved = () => {
  const navigate = useNavigate();
  const [listaccounts, setlistaccounts] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [pageSize, setPageSize] = useState(10);
 const fetchUsers = async (page = 1, size = pageSize) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/AccountApprovedlist?page=${page}&limit=${size}`);
      const data = await response.json();

      setlistaccounts(data.account);
      setTotalRows(data.totalaccount); // Set total users count from API response
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, pageSize);
  }, [currentPage, pageSize]); // Re-fetch when pageSize changes

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Add handler for page size change
  const handlePerRowsChange = (newPerPage, page) => {
    setPageSize(newPerPage);
    setCurrentPage(page);
  };
  useEffect(() => {
    fetch('http://localhost:8000/api/users/AccountApprovedlist')
      .then((response) => response.json())
      .then((data) => {
        setlistusers(data);
        console.log(data);
      });
  }, []);

  const HandleEditbtn = async (userid) => {
    navigate(`/account/accounatEdit/${userid}`);
  };
  const handleDelete = async (id) => {
    console.log(id);

    try {
      const response = await fetch(`http://localhost:8000/api/users/deleteaccount/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        toast.success('Deleted Successfully!');
        setlistaccounts(listaccounts.filter((user) => user.id !== id));
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (!value) {
      setFilteredUsers([]); // Reset filtered data when search is cleared
    }
    const filteredData = listaccounts.filter((user) =>
      Object.values(user).some((field) => field && field.toString().toLowerCase().includes(value))
    );
    setFilteredUsers(filteredData);
  };
  const columns = [
    {
      name: ' id',
      selector: (row) => row.id,
      sortable: true
    },
    {
      name: ' Account Name',
      selector: (row) => row.account_name,
      sortable: true
    },
    {
      name: 'Bank Name',
      selector: (row) => row.bank_name,
      sortable: true
    },
    {
      name: 'Account Number',
      selector: (row) => row.account_number,
      sortable: true
    },
    {
      name: 'Types',
      selector: (row) => row.type,
      sortable: true
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="d-flex justify-content-start align-items-center">
          <button className="btn btn-warning btn-sm me-2 p-2  btn-dark" onClick={() => HandleEditbtn(row.id)}>
            <i className="bi bi-pencil-square"></i>
            Edit
          </button>
          <button className="btn btn-danger btn-sm me-2 p-2 btn-danger" style={{ backgroundColor: '#dc3545', borderColor: '#dc3545', color: '#fff' }} onClick={() => handleDelete(row.id)}>
            <i className="bi bi-trash-fill"></i>
            Delete
          </button>
        </div>
      )
    }
  ];

  // 📌 Export to CSV
  const exportToCSV = () => {
      const csvData = listaccounts.map((row) => ({
        ID: row.id,
        account_name: row.account_name,
        bank_name: row.bank_name,
        account_number: row.account_number,
        type: row.type ,
        status: row.status
      }));
  
      const ws = XLSX.utils.json_to_sheet(csvData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Data');
      XLSX.writeFile(wb, 'DataTable_Export.csv');
    };
  
    // 📌 Export to Excel
    const exportToExcel = () => {
      const ws = XLSX.utils.json_to_sheet(listaccounts);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(dataBlob, 'DataTable_Export.xlsx');
    };
  
    // 📌 Export to PDF
    const exportToPDF = () => {
      const doc = new jsPDF();
      doc.text('Data Table Export', 20, 10);
      const tableColumn = ['ID', 'account_name name', 'bank_name name', 'account_number', 'type' , 'status'];
      const tableRows = listaccounts.map((row) => [row.id, row.account_name, row.bank_name, row.account_number, row.type , row.status]);
  
      doc.autoTable({ head: [tableColumn], body: tableRows });
      doc.save('DataTable_Export.pdf');
    };

  return (
    <React.Fragment>
    <ToastContainer/>
      <Row className="btn-page">
        <Col>
          <Card title=" BANK APPROVED ACCOUNTS">
            <OverlayTrigger>
              <>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <Button onClick={exportToCSV} className="btn-dark me-2">
                      Export CSV
                    </Button>
                    <Button onClick={exportToExcel} className="btn-dark me-2">
                      Export Excel
                    </Button>
                    <Button onClick={exportToPDF} className="btn-dark me-2">
                      Export PDF
                    </Button>
                  </div>
                  <div className="d-flex">
                    <Form.Control type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} className="w-50 me-2" />
                    <Button onClick={() => navigate('/account/accountlist')} className="btn-dark">
                    WAITING ACCOUNT
                    </Button>
                  </div>
                </div>
                <DataTable
                      className="table thead-dark"
                      columns={columns}
                      data={searchTerm ? filteredUsers : listaccounts}
                      pagination
                      paginationServer
                      paginationTotalRows={totalRows}
                      paginationPerPage={pageSize}
                      onChangePage={handlePageChange}
                      onChangeRowsPerPage={handlePerRowsChange}
                      highlightOnHover
                      striped
                      responsive
                ></DataTable>
              </>
            </OverlayTrigger>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default bankAccountapproved;
