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

const ProviderStatement = () => {
  const navigate = useNavigate();
  const [provider, setprovider] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [pageSize, setPageSize] = useState(10);
const fetchUsers = async (page = 1, size = pageSize) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/providersatement?page=${page}&limit=${size}`);
      const data = await response.json();

      setprovider(data.rides);
      setTotalRows(data.totalrides); // Set total users count from API response
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

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredData = provider.filter((user) =>
      Object.values(user).some((field) => field && field.toString().toLowerCase().includes(value))
    );
    setFilteredUsers(filteredData);
  };
  const columns = [
    {
      name: 'Provider Name',
      selector: (row) => row.provider_name,
      sortable: true
    },
    {
      name: 'Number',
      selector: (row) => row.mobile,
      sortable: true
    },
    {
      name: 'status',
      selector: (row) => row.status,
      sortable: true
    },
    {
      name: 'total rides',
      selector: (row) => row.total_rides,
      sortable: true
    },
    {
      name: 'Total Earning',
      selector: (row) => (row.Total_earnings ? row.Total_earnings : 0),
      sortable: true
    },
    {
      name: 'Commission',
      selector: (row) => (row.total_Commission ? row.total_Commission : 0),
      sortable: true
    },
    {
      name: 'Joined at',
      selector: (row) => (row.created_at ? row.created_at : '-'),
      sortable: true
    },
    {
      name: 'Details',
      cell: (row) => (
        <div className="d-flex justify-content-start align-items-center">
          <button
            className="btn btn-warning btn-sm me-2 p-2  btn-dark"
            onClick={() => navigate(`/Statement/ProviderRidestatement/${row.provider_id}`)}
          >
            View by Ride
          </button>
        </div>
      )
    }
  ];

  // 📌 Export to CSV
  const exportToCSV = () => {
    const csvData = provider.map((row) => ({
      ID: row.id,
      provider_name: row.provider_name,
      status: row.status,
      total_rides: row.total_rides,
      Total_earnings: row.Total_earnings,
      mobile: row.mobile
    }));

    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'DataTable_Export.csv');
  };

  // 📌 Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(provider);
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
    const tableRows = provider.map((row) => [row.id, row.first_name, row.last_name, row.email, row.mobile]);

    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save('DataTable_Export.pdf');
  };

  return (
    <React.Fragment>
      <Row className="btn-page">
        <Col>
          <Card title="Provider statement">
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
                    <Button onClick={() => navigate('/Statement/OverallStatement')} className="btn-dark">
                      OVERALL STATEMENT
                    </Button>
                  </div>
                </div>
                <DataTable
                 className="table thead-dark"
                 columns={columns}
                 data={searchTerm ? filteredUsers : provider}
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

export default ProviderStatement;
