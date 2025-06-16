
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Container, Table } from 'react-bootstrap';
import Card from '../../components/Card/MainCard';
import axios from 'axios';

const BasicBadges = () => {
  const [settings, setSettings] = useState([]);
  const [updatedSettings, setUpdatedSettings] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/getsitesetting`);
        setSettings(response.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const keyMapping = {
    site_title: 'Website Name',
    site_logo: 'Website Logo',
    site_email_logo: 'Email Logo',
    site_icon: 'Website Icon',
    site_copyright: 'Copyright Content',
    sos_number: 'SOS Number',
    contact_number: 'Contact Number',
    map_key: 'Map Key',
    android_user_fcm_key: 'Android User FCM Key',
    android_user_driver_key: 'Android Driver FCM Key',
    contact_email: 'Contact Email',
    site_link: 'Website Link',
    contact_address: 'Contact Address',
    contact_city: 'Contact City',
    store_link_android: 'Android Store Link',
    store_link_ios: 'iOS Store Link',
    provider_select_timeout: 'Provider Accept Timeout',
    provider_search_radius: 'Provider Search Radius',
    social_login: 'Social Login',
    verification: 'Phone Verification In App',
    f_u_url: 'User App PlayStore Link',
    f_p_url: 'Driver App PlayStore Link',
    f_f_link: 'Facebook Link',
    f_i_link: 'Instagram Link',
    f_t_link: 'Twitter Link',
    f_l_link: 'Linkedin Link'
  };

  const keyOrder = [
    'site_title',
    'site_logo',
    'site_icon',
    'store_link_android',
    'store_link_ios',
    'provider_select_timeout',
    'provider_search_radius',
    'sos_number',
    'map_key',
    'android_user_fcm_key',
    'android_user_driver_key',
    'social_login',
    'verification'
  ];

  const keyOrdertoothersetting = [
    'site_copyright',
    'f_u_url',
    'f_p_url',
    'site_link',
    'f_f_link',
    'f_i_link',
    'f_t_link',
    'f_l_link',
    'contact_email',
    'contact_address',
    'contact_city',
    'contact_number'
  ];
  const keyOrdertofrontendsetting = Array.from({ length: 23 }, (_, i) => `f_text${i + 1}`);

  // Handle Input Change
  const handleInputChange = (id, value) => {
    setUpdatedSettings((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle Update Settings
  const handleUpdate = async () => {
    const dataToUpdate = Object.keys(updatedSettings).map((id) => ({
      id,
      value: updatedSettings[id]
    }));

    if (dataToUpdate.length === 0) {
      alert('No changes to update.');
      return;
    }

    try {
      await axios.post(`http://localhost:8000/api/users/updatesitesetting`,  dataToUpdate );
      alert('Settings updated successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  // Ensure settings are sorted by keyOrder
  const sortedSettings = keyOrder.map((key) => settings.find((setting) => setting.key === key)).filter(Boolean);
  const sortedotherSettings = keyOrdertoothersetting.map((key) => settings.find((setting) => setting.key === key)).filter(Boolean);
  const sortedfrontendSettings = keyOrdertofrontendsetting.map((key) => settings.find((setting) => setting.key === key)).filter(Boolean);
  return (
    <React.Fragment>
      <Row>
        <Col className="btn-page">
          <Card title="SITE SETTINGS">
            <Container className="mt-3">
              <Table borderless>
                <thead>
                  <tr>
                    <th style={{ width: '20px', borderTop: 'none', fontSize: '30px', fontWeight: 'normal', margin: '30px' }}>
                      Site Settings
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedSettings.map((setting) => (
                    <tr key={setting.id}>
                      <td style={{ borderTop: 'none', width: '250px', important: 'true' }}>{keyMapping[setting.key] || setting.key}</td>
                      <td style={{ borderTop: 'none' }}>
                        {setting.key.includes('logo') || setting.key.includes('icon') ? (
                          <div>
                            <img src={setting.value} alt={setting.key} height="40px" className="mb-2" />
                            <Form.Control type="file" />
                          </div>
                        ) : (
                          <Form.Control
                            type="text"
                            value={updatedSettings[setting.id] || setting.value}
                            onChange={(e) => handleInputChange(setting.id, e.target.value)}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Table borderless>
                <thead>
                  <tr>
                    <th style={{ width: '40px', borderTop: 'none', fontSize: '30px', fontWeight: 'normal', margin: '30px' }}>
                      Other Settings
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedotherSettings.map((setting) => (
                    <tr key={setting.id}>
                      <td style={{ borderTop: 'none', width: '250px', important: 'true' }}>{keyMapping[setting.key] || setting.key}</td>
                      <td style={{ borderTop: 'none' }}>
                        {setting.key.includes('logo') || setting.key.includes('icon') ? (
                          <div>
                            <img src={setting.value} alt={setting.key} height="40px" className="mb-2" />
                            <Form.Control type="file" />
                          </div>
                        ) : (
                          <Form.Control
                            type="text"
                            value={updatedSettings[setting.id] || setting.value}
                            onChange={(e) => handleInputChange(setting.id, e.target.value)}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Table borderless>
                <thead>
                  <tr>
                    <th style={{ width: '40px', borderTop: 'none', fontSize: '30px', fontWeight: 'normal', margin: '30px' }}>
                      Frontend Settings
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedfrontendSettings.map((setting) => (
                    <tr key={setting.id}>
                      {/* <td style={{ borderTop: 'none', width: '250px', important: 'true' }}>{keyMapping[setting.key] || setting.key}</td> */}
                      <td style={{ borderTop: 'none', width: '250px', important: 'true' }}> </td>
                      <td style={{ borderTop: 'none' }}>
                        {setting.key.includes('logo') || setting.key.includes('icon') ? (
                          <div>
                            <img src={setting.value} alt={setting.key} height="40px" className="mb-2" />
                            <Form.Control type="file" />
                          </div>
                        ) : (
                          <Form.Control
                            type="text"
                            value={updatedSettings[setting.id] || setting.value}
                            onChange={(e) => handleInputChange(setting.id, e.target.value)}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="d-flex justify-content-end">
                <Button variant="primary" onClick={handleUpdate}>
                  Update
                </Button>
              </div>
            </Container>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BasicBadges;
