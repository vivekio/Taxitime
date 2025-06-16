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
import { saveAs } from 'file-saver';

const ListServiceTypes = () => {
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
      const response = await fetch(`http://localhost:8000/api/users/getServiceTypes?page=${page}&limit=${size}`);
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

  // useEffect(() => {
  //   fetch('http://localhost:8000/api/users/getServiceTypes')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setlistusers(data);
  //       console.log(data);
  //     });
  // }, []);

  const HandleEditbtn = async (userid) => {
    navigate(`/ServiceTypes/UpdateServiceTypes/${userid}`);
  };
  const handleDelete = async (id) => {
    console.log(id);

    try {
      const response = await fetch(`http://localhost:8000/api/users/deleteServiceTypes/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setlistusers(listusers.filter((user) => user.id !== id));
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
      name: 'service name',
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: 'provider name',
      selector: (row) => row.provider_name,
      sortable: true
    },
    {
      name: 'capacity',
      selector: (row) => row.capacity,
      sortable: true
    },
    {
      name: 'Base Price',
      selector: (row) => row.fixed,
      sortable: true
    },
    {
      name: 'base distance',
      selector: (row) => row.distance,
      sortable: true
    },
    {
      name: 'distance price',
      selector: (row) => row.price,
      sortable: true
    },
    {
      name: 'Time price',
      selector: (row) => row.minute,
      sortable: true
    },
    {
      name: 'price calculator',
      selector: (row) => row.calculator,
      sortable: true
    },
    {
      name: 'Image',
      cell: (row) =>
        row.image ? (
          <img src={`http://localhost:8000/uploads/${row.image}`} alt={row.name} className="img-thumbnail" width="100" />
        ) : (
          'No Image'
        )
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="d-flex justify-content-start align-items-center">
          <button className="btn btn-warning btn-sm me-2 p-2  btn-dark" onClick={() => HandleEditbtn(row.id)}>
            <i className="bi bi-pencil-square"></i>
            Edit
          </button>
          <button className="btn btn-danger btn-sm me-2 p-2 btn-danger" onClick={() => handleDelete(row.id)}>
            <i className="bi bi-trash-fill"></i>
            Delete
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
          <Card title="SERVICE TYPES">
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
                    <Button
                      onClick={() => navigate('/ServiceTypes/AddNewServiceTypes')}
                      className="btn btn-dark px-4 py-2 text-nowrap"
                      style={{ whiteSpace: 'nowrap', minWidth: '220px' }}
                    >
                    ADD NEW SERVICE
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
                ></DataTable>
              </>
            </OverlayTrigger>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ListServiceTypes;
