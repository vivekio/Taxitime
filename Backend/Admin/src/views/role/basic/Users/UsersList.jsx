import React from 'react';
import { useEffect, useState } from 'react';
import { Row, Col, OverlayTrigger, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Card from '../../../../components/Card/MainCard';
import DataTable from 'react-data-table-component';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ListUsers = () => {
  const navigate = useNavigate();
  const [listusers, setlistusers] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Fetch Users with Pagination
  const fetchUsers = async (page = 1, size = pageSize) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/listusers?page=${page}&limit=${size}`);
      const data = await response.json();

      setlistusers(data.users);
      setTotalRows(data.totalUsers); // Set total users count from API response
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

  const HandleEditbtn = async (userid) => {
    navigate(`/basic/UserUpdate/${userid}`);
  };
  const handleDelete = async (id) => {
    console.log(id);

    try {
      const response = await fetch(`http://localhost:8000/api/users/deleteusers/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchUsers(currentPage, pageSize); // Refresh data after delete
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
      return;
    }
    const filteredData = listusers.filter((user) =>
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
      name: ' First Name',
      selector: (row) => row.first_name,
      sortable: true
    },
    {
      name: 'Last Name',
      selector: (row) => row.last_name,
      sortable: true
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true
    },
    {
      name: 'Mobile',
      selector: (row) => row.mobile,
      sortable: true
    },
    {
      name: 'Wallet Amount ',
      selector: (row) => row.wallet_balance,
      sortable: true
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="d-flex flex-wrap justify-content-start align-items-center gap-2">
          <button className="btn btn-warning btn-sm p-2 btn-dark d-flex align-items-center" onClick={() => HandleEditbtn(row.id)}>
            <i className="bi bi-pencil-square me-1"></i> Edit
          </button>
          <button
            className="btn btn-sm p-2 d-flex align-items-center"
            style={{ backgroundColor: '#dc3545', borderColor: '#dc3545', color: '#fff' }}
            onClick={() => handleDelete(row.id)}
          >
            <i className="bi bi-trash-fill me-1"></i> Delete
          </button>
        </div>
      )
    }
  ];

  // 📌 Export to CSV
  const exportToCSV = () => {
    const csvData = listusers.map((row) => ({
      ID: row.id,
      FirstName: row.first_name,
      LastName: row.last_name,
      Email: row.email,
      mobile: row.mobile
    }));

    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'DataTable_Export.csv');
  };

  // 📌 Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(listusers);
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
    const tableColumn = ['ID', 'first name', 'last name', 'Email', 'mobile'];
    const tableRows = listusers.map((row) => [row.id, row.first_name, row.last_name, row.email, row.mobile]);

    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save('DataTable_Export.pdf');
  };

  return (
    <React.Fragment>
      <Row className="btn-page">
        <Col>
          <Card title="USERS">
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
                    <Button onClick={() => navigate('/basic/addNewUser')} className="btn-dark">
                      Add New User
                    </Button>
                  </div>
                </div>
                <DataTable
                  className="table thead-dark"
                  columns={columns}
                  data={searchTerm ? filteredUsers : listusers}
                  pagination
                  paginationServer
                  paginationTotalRows={totalRows}
                  paginationPerPage={pageSize}
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handlePerRowsChange}
                  highlightOnHover
                  striped
                  responsive
                />
              </>
            </OverlayTrigger>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ListUsers ;
