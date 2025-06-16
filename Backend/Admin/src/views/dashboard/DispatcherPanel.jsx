import React, { useState, useEffect } from 'react';
// import Card1 from '../../components/Card/MainCard';
import Card1 from '../../components/Card/MainCard';
import { Row, Col, Card, OverlayTrigger } from 'react-bootstrap';
import Marker from '../maps/google-maps/Marker';
import DataTable from 'react-data-table-component';

const dispatcherpanel = () => {
  const [listproviders, setlistproviders] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [pageSize, setPageSize] = useState(10);
  const fetchUsers = async (page = 1, size = pageSize) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/onlineprovider?page=${page}&limit=${size}`);
      const data = await response.json();
      console.log(data)
      setlistproviders(data.count);
  // Set total users count from API response
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  useEffect(() => {
    fetchUsers(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handlePerRowsChange = (newPerPage, page) => {
    setPageSize(newPerPage);
    setCurrentPage(page);
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
      name: 'full Name',
      selector: (row) => row.first_name + ' ' + row.last_name,
      sortable: true
    },
   
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true
    },
    {
      name: 'mobile',
      selector: (row) => row.mobile,
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
    }
  ];
  return (
    <React.Fragment>
      <Row className="btn-page">
        <Col>
          <Card1 title="DISPATCHER PANEL">
            <OverlayTrigger>
              <>
                <Row>
                  <Col xl={12}>
                    <Card>
                      <Card.Header>
                        <Card.Title as="h5">PROVIDERS </Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Marker />
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col xl={12}>
                    <Card>
                      <Card.Header>
                        <Card.Title as="h5">LIST ONLINE PROVIDERS</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <DataTable
                          className="table thead-dark"
                          columns={columns}
                          data={searchTerm ? filteredUsers : listproviders}
                          pagination
                          paginationServer
                   
                          paginationPerPage={pageSize}
                          onChangePage={handlePageChange}
                          onChangeRowsPerPage={handlePerRowsChange}
                          highlightOnHover
                          striped
                          responsive
                        ></DataTable>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </>
            </OverlayTrigger>
          </Card1>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default dispatcherpanel;
