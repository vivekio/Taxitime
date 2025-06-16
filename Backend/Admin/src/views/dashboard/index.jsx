import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Row, Col, Card, OverlayTrigger } from 'react-bootstrap';
import Card1 from '../../components/Card/MainCard';
import '@mantine/charts/styles.css';
import { PieChart, AreaChart } from '@mantine/charts';

const DashDefault = () => {
  const [listusers, setlistusers] = useState('');
  const [listprovider, setlistprovider] = useState('');
  const [userscount, setUserscount] = useState(0);
  const [revenue, setrevenue] = useState(0);
  const [getMonthrides, setgetMonthrides] = useState([]);
  const [Dispatchercount, setDispatcherscount] = useState(0);
  const [Providerscount, setProviderscount] = useState(0);
  const [Fleetscount, setFleetscount] = useState(0);
  const dashSalesData = [
    { title: 'Users', amount: `${userscount}`, icon: 'icon-arrow-up text-c-green  ', value: 50, class: 'progress-c-theme' },
    { title: 'Dispatchers', amount: `${Dispatchercount}`, icon: 'icon-arrow-down text-c-red', value: 36, class: 'progress-c-theme2' },
    { title: 'Providers', amount: `${Providerscount}`, icon: 'icon-arrow-up text-c-green', value: 70, color: 'progress-c-theme' },
    { title: ' Fleets ', amount: `${Fleetscount}`, icon: 'icon-arrow-up text-c-green', value: 70, color: 'progress-c-theme' }
  ];
  const data1 = [
    { name: 'TOTAL REVANUE', value: revenue.total_sum, color: '#4c6ef5' },
    { name: 'COMPANY REVANUE', value: revenue.commission_sum, color: '#fcc419' },
    { name: 'TAX', value: revenue.tax_sum, color: '#20c997' }
    // { name: 'PROVIDER ', value: revenue.provider_commission_sum, color: 'gray.6' }
  ];
  const data2 = getMonthrides.map((item) => ({
    date: item.month,
    completed_rides: item.completed_rides,
    cancelled_rides: item.cancelled_rides,}));
   
  useEffect(() => {
    fetch('http://localhost:8000/api/users/countuser')
      .then((response) => response.json())
      .then((data) => {
        setUserscount(data.count);
        console.log(data.count);
      });
  }, []);
  useEffect(() => {
    fetch('http://localhost:8000/api/users/countDispatchers')
      .then((response) => response.json())
      .then((data) => {
        setDispatcherscount(data.count);
        console.log(data.count);
      });
  }, []);
  useEffect(() => {
    fetch('http://localhost:8000/api/users/countFleets')
      .then((response) => response.json())
      .then((data) => {
        setFleetscount(data.count);
        console.log(data.count);
      });
  }, []);
  useEffect(() => {
    fetch('http://localhost:8000/api/users/countproviders')
      .then((response) => response.json())
      .then((data) => {
        setProviderscount(data.count);
        console.log(data.count);
      });
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/getNewUsers`);
      const data = await response.json();

      // console.log(data);
      setlistusers(data.count);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const fetchprovider = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/getNewprovider`);
      const data = await response.json();

      // console.log(data);
      setlistprovider(data.count);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const fetchrevenue = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/getNewrevenue`);
      const data = await response.json();

      // console.log(data);
      console.log('this is data', data.count[0]);
      setrevenue(data.count[0]);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const getmonthrides = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/getmonthrides`);
      const data = await response.json();

      // console.log(data);
      console.log('this is data', data.count[0]);
      setgetMonthrides(data.count);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchprovider();
    fetchrevenue();
    getmonthrides();
  }, []);
  const columns1 = [
    {
      name: ' id',
      selector: (row) => row.user_id,
      sortable: true
    },
    {
      name: ' full Name',
      selector: (row) => row.first_name + ' ' + row.last_name,
      sortable: true
    },
    {
      name: 'Total Request',
      selector: (row) => row.total_request,
      sortable: true
    }
  ];
  const columns2 = [
    {
      name: ' id',
      selector: (row) => row.provider_id,
      sortable: true
    },
    {
      name: ' full Name',
      selector: (row) => row.first_name + ' ' + row.last_name,
      sortable: true
    },
    {
      name: 'Total Request',
      selector: (row) => row.total_request,
      sortable: true
    }
  ];
  return (
    <React.Fragment>
      <Row>
        {dashSalesData.map((data, index) => {
          return (
            <Col key={index} xl={4} xxl={3}>
              <Card>
                <Card.Body>
                  <h6 className="mb-4">{data.title}</h6>
                  <div className="row d-flex align-items-center">
                    <div className="col-9">
                      <h3 className="f-w-300 d-flex align-items-center m-b-0">
                        <i className={`feather ${data.icon} f-30 m-r-5`} />{' '}
                        <svg
                          style={{ marginRight: '5px', marginBottom: '2px' }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-person"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                        </svg>
                        {data.amount}
                      </h3>
                    </div>
                    <div className="col-3 text-end">
                      <p className="m-b-0">{data.value}%</p>
                    </div>
                  </div>
                  <div className="progress m-t-30" style={{ height: '7px' }}>
                    <div
                      className={`progress-bar ${data.class}`}
                      role="progressbar"
                      style={{ width: `${data.value}%` }}
                      aria-valuenow={data.value}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row className="btn-page">
        <Col xl={6} xxl={6}>
          <Card1 title="TOP USERS">
            <OverlayTrigger>
              <>
                <DataTable columns={columns1} data={listusers} responsive />
              </>
            </OverlayTrigger>
          </Card1>
        </Col>
        <Col xl={6} xxl={6}>
          <Card1 title="TOP PROVIDER">
            <OverlayTrigger>
              <>
                <DataTable columns={columns2} data={listprovider} responsive />
              </>
            </OverlayTrigger>
          </Card1>
        </Col>
      </Row>
      <Row className="btn-page">
        <Col xl={6} xxl={6}>
          <Card1 title="TOTAL REVENUE">
            <OverlayTrigger>
              <>
                <div className="d-flex justify-content-start align-items-center gap-4">
                  <div>
                    {data1.map((item, index) => (
                      <div key={index} className="d-flex align-items-center mb-2">
                        <div
                          style={{
                            width: '16px',
                            height: '16px',
                            backgroundColor: item.color,
                            borderRadius: '50%',
                            marginRight: '8px'
                          }}
                        ></div>
                        <span>
                          {item.name} - {item.value}₹
                        </span>
                      </div>
                    ))}
                  </div>
                  <PieChart data={data1} withTooltip />
                </div>
              </>
            </OverlayTrigger>
          </Card1>
        </Col>
        <Col xl={6} xxl={6}>
        <Card1 title="RIDES COMPLETED VS CANCELLED">
            <OverlayTrigger>
              <>
                {' '}
                <AreaChart
                  h={300}
                  data={data2}
                  dataKey="date"
                  series={[
                    { name: 'completed_rides', color: 'green' },
                    { name: 'cancelled_rides', color: 'red' },
                  ]}
                  curveType="natural"
                  tickLine="none"
                  gridAxis="none"
                  withDots={false}
                />
              </>
            </OverlayTrigger>
          </Card1>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;
