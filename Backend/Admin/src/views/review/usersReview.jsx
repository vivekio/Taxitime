import React from 'react';
import { useEffect, useState } from 'react';
import { Row, Col, OverlayTrigger, Button, Form } from 'react-bootstrap';
// import { Row, Col, Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card/MainCard';
import DataTable from 'react-data-table-component';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';



const BasicButton = () => {
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
        const response = await fetch(`http://localhost:8000/api/users/getuserReview?page=${page}&limit=${size}`);
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
  //   fetch('http://localhost:8000/api/users/getuserReview')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setlistusers(data.result);
  //       console.log(data);
  //     });
  // }, []);

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
      name: 'id',
      selector: (row) => row.id,
      sortable: true
    },
    {
      name: 'Request ID',
      selector: (row) => row.request_id,
      sortable: true
    },
    {
      name: 'User Name',
      selector: (row) => row.user_name,
      sortable: true
    },
    {
      name: 'Provider Name',
      selector: (row) => row.provider_name,
      sortable: true
    },
    {
      name: 'rating',
      selector: (row) => row.user_rating,
      sortable: true
    },
    {
      name: 'Date & Time',
      selector: (row) => row.created_at,
      sortable: true
    },
    {
        name: 'Comments',
        selector: (row) => row.user_comment,
        sortable: true
      },
  ];

  // 📌 Export to CSV
  const exportToCSV = () => {
    const csvData = listusers.map((row) => ({
      ID: row.id,
      request_id: row.request_id,
      user_name: row.user_name,
      provider_name: row.provider_name,
      user_rating: row.user_rating,
      user_comment: row.user_comment
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
    const tableColumn = ['ID', 'request_id', 'user_name', 'provider_name', 'user_rating', 'user_comment'];
    const tableRows = listusers.map((row) => [row.id, row.request_id , row.user_name, row.provider_name, row.user_rating, row.user_comment]);

    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save('DataTable_Export.pdf');
  };

  return (
    <React.Fragment>
      <Row className="btn-page">
        <Col>
        <Card title="USERS REVIEW">
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
                    <Button onClick={() => navigate('/review/providerReview')} className="btn-dark">
                    PROVIDER REVIEW
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

export default BasicButton;