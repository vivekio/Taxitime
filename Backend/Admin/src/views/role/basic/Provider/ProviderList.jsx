import React, { useEffect, useState } from 'react';
import { Row, Col, OverlayTrigger, Dropdown, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Card from '../../../../components/Card/MainCard';
import DataTable from 'react-data-table-component';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ProviderList = () => {
  const navigate = useNavigate();
  const [listproviders, setlistproviders] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setPageSize] = useState(10);
 const fetchUsers = async (page = 1, size = pageSize) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/listproviders?page=${page}&limit=${size}`);
      const data = await response.json();
      setlistproviders(data.provider);
      setTotalRows(data.totalProviders); // Set total users count from API response
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

  const handleAllSet = (providerid) => {
    console.log(providerid);

    navigate(`/basic/ProviderService/${providerid}`);
  };
  const HandleEditbtn = async (userid) => {
    navigate(`/basic/ProviderUpdate/${userid}`);
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/deleteprovider/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setlistproviders(listproviders.filter((user) => user.id !== id));
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handlestausbtn = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/users/statusprovider/${id}`, {
        method: 'POST'
      });
      if (res.ok) {
        window.location.reload();
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
    const filteredData = listproviders.filter((user) =>
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
      name: '	Status',
      selector: (row) => row.status,
      sortable: true
    },
    {
      name: 'Image',
      cell: (row) =>
        row.avatar ? (
          <img src={`http://localhost:8000/uploads/${row.avatar}`} alt={row.name} className="img-thumbnail" width="100" />
        ) : (
          'No Image'
        )
    },
    {
      name: '	Online',
      cell: (row) => (
        <div className="d-flex flex-column gap-2">
          <Button className={`btn btn-sm ${row.service_status === 'active' ? 'btn-success' : 'btn-danger'}`}>
            {row.service_status === 'active' ? 'YES' : 'NO'}
          </Button>
        </div>
      ),
      sortable: true
    },
    {
      name: '	Documents / Service Type',
      cell: (row) => (
        <div className="d-flex justify-content-start align-items-center">
          <button className="btn btn-dark btn-sm" onClick={() => handleAllSet(row.id)}>
            <i className="bi bi-check2-circle me-1"></i> All Set
          </button>
        </div>
      )
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="d-flex flex-column gap-2">
          <Button
            onClick={() => handlestausbtn(row.id)}
            className={`btn btn-sm ${row.status === 'approved' ? 'btn-danger' : 'btn-success'}`}
          >
            {row.status === 'approved' ? 'Disable' : ' Enable'}
          </Button>

          <Dropdown>
            <Dropdown.Toggle variant="info" size="sm" className="btn btn-dark ">
              Action
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={() => HandleEditbtn(row.id)}>
                Edit
              </Dropdown.Item>
              <Dropdown.Item href="#" className="text-danger" onClick={() => handleDelete(row.id)}>
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

  // 📌 Export to CSV
  const exportToCSV = () => {
    const csvData = listproviders.map((row) => ({
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
    const ws = XLSX.utils.json_to_sheet(listproviders);
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
    const tableRows = listproviders.map((row) => [row.id, row.first_name, row.last_name, row.email, row.mobile]);

    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save('DataTable_Export.pdf');
  };

  return (
    <React.Fragment>
      <Row className="btn-page">
        <Col>
          <Card title="PROVIDERS">
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
                    <Button onClick={() => navigate('/basic/AddNewProvider')} className="btn-dark">
                      Add New Provider
                    </Button>
                  </div>
                </div>
                <DataTable
                  className="table thead-dark"
                  columns={columns}
                  data={searchTerm ? filteredUsers : listproviders}
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

export default ProviderList;
