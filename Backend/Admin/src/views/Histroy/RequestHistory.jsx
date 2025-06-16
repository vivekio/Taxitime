import React from 'react';
import { useEffect, useState } from 'react';
import { Row, Col, OverlayTrigger, Card, Button, Form } from 'react-bootstrap';
// import { Row, Col, Button, OverlayTrigger, Tooltip, ButtonToolbar, Dropdown, DropdownButton, SplitButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Card1 from '../../components/Card/MainCard';
import DataTable from 'react-data-table-component';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';



const RequestHistory = () => {

  const navigate = useNavigate();
  const [listrides, setlistrides] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const fetchUsers = async (page = 1, size = pageSize) => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/getrequesthistory?page=${page}&limit=${size}`);
        const data = await response.json();
  
        setlistrides(data.rides);
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

  const statusColors = {
    SEARCHING: 'bg-primary text-white', // Blue
    CANCELLED: 'bg-danger text-white', // Red
    ACCEPTED: 'bg-info text-white', // Light Blue
    STARTED: 'bg-warning text-dark', // Yellow
    ARRIVED: 'bg-secondary text-white', // Grey
    PICKEDUP: 'bg-success text-white', // Green
    DROPPED: 'bg-dark text-white', // Black
    COMPLETED: 'bg-success text-white', // Green
    SCHEDULED: 'bg-primary text-white' // Blue
  };



  // useEffect(() => {
  //   fetch('http://localhost:8000/api/users/getrequesthistory')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setlistrides(data.result);
  //     });
  // }, []);

  const HandleEditbtn = async (id) => {
    navigate(`/Statement/ridedetiles/${id}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredData = listrides.filter((user) =>
      Object.values(user).some((field) => field && field.toString().toLowerCase().includes(value))
    );
    setFilteredUsers(filteredData);
  };
  const columns = [
    {
      name: 'Bookinf ID',
      selector: (row) => row.booking_id,
      sortable: true
    },
    {
      name: 'Status ',
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded d-inline-flex justify-content-center align-items-center fw-bold text-uppercase ${statusColors[row.status] || 'bg-light text-dark'}`}
          style={{ minWidth: '120px' }} // Ensures same width for all statuses
        >
          {row.status}
        </span>
      )
    },
    {
      name: 'Picked Up',
      selector: (row) => row.picked_up,
      sortable: true
    },
    {
      name: 'dropped',
      selector: (row) => row.dropped,
      sortable: true
    },
    {
      name: ' Dated On',
      selector: (row) => row.dated_on,
      sortable: true
    },
    {
      name: 'Commision',
      selector: (row) => row.commision,
      sortable: true
    },
    {
      name: 'Earned',
      selector: (row) => row.Earned,
      sortable: true
    },

    {
      name: 'Actions',
      cell: (row) => (
        <div className="d-flex justify-content-start align-items-center">
          <button className="btn btn-warning btn-sm me-2 p-2  btn-dark" onClick={() => HandleEditbtn(row.request_id)}>
            RIDES DETAILS
          </button>
        </div>
      )
    }
  ];

  // 📌 Export to CSV
  // 📌 Export to CSV
   const exportToCSV = () => {
     const csvData = listrides.map((row) => ({
       booking_id: row.booking_id,
       status: row.status,
       picked_up: row.picked_up,
       dropped: row.dropped,
       dated_on: row.dated_on,
       commision: row.commision,
       Earned: row.Earned
     }));
 
     const ws = XLSX.utils.json_to_sheet(csvData);
     const wb = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Data');
     XLSX.writeFile(wb, 'DataTable_Export.csv');
   };
 
   // 📌 Export to Excel
   const exportToExcel = () => {
     const ws = XLSX.utils.json_to_sheet(listrides);
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
     const tableColumn = ['ID', 'Status', 'Picked Up', 'Dropped', 'Dated On', 'Commision', 'Earned'];
     const tableRows = listrides.map((row) => [
       row.booking_id,
       row.status,
       row.picked_up,
       row.dropped,
       row.dated_on,
       row.commision,
       row.Earned
     ]);
 
     doc.autoTable({ head: [tableColumn], body: tableRows });
     doc.save('DataTable_Export.pdf');
   };
 

  return (
    <React.Fragment>

      <Row className="btn-page">
        <Col>
          <Card1 title="REQUEST HISTORY">
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
                    <Button onClick={() => navigate('/Histroy/ScheduleHistory')} className="btn-dark">
                      SCHEDULE HISTORY
                    </Button>
                  </div>
                </div>
                <DataTable
               className="table thead-dark"
               columns={columns}
               data={searchTerm ? filteredUsers : listrides}
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
          </Card1>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default RequestHistory;
