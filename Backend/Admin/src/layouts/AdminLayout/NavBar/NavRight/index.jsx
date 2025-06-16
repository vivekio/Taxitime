import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Dropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavRight = () => {
  const navigate = useNavigate();
const [data , setData] = useState({
  name: '',
  email: '',
  picture: ''
});
console.log(data.picture)

  const handleLogoutBtn = () => {
    Cookies.remove('token');
    alert('logout');
    navigate('/login');
  };

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/users/getadmin', { withCredentials: true });
      setData({ ...res.data[0] ,
        picture: res.data[0]?.picture ? `http://localhost:8000/uploads/${res.data[0].picture}` : null
    })
      console.log(res.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

useEffect(() => {
  fetchData();
}, []);

  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto" id="navbar-right">
        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align={'end'} className="drp-user">
            <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
              <i className="icon feather icon-settings" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="profile-notification">
              <div className="pro-head">
                <img src={data.picture} className="img-radius" alt="User Profile" />
                <span>{data.name}</span>
                <button  className="dud-logout" 
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title="Logout"
                  onClick={handleLogoutBtn}
                >
                  <i className="feather icon-log-out" style={{ fontSize: "16px" }}/>
                </button>
              </div>
              <ListGroup as="ul" bsPrefix=" " variant="flush" className="pro-body">
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="/Setting/SiteSetting" className="dropdown-item">
                    <i className="feather icon-settings" /> Settings
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="/Setting/AccountSetting" className="dropdown-item">
                    <i className="feather icon-user" /> Profile
                  </Link>
                </ListGroup.Item>
                {/* <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-mail" /> My Messages
                  </Link>
                </ListGroup.Item> */}
                {/* <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-lock" /> Lock Screen
                  </Link>
                </ListGroup.Item> */}
              </ListGroup>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  );
};

export default NavRight;
