import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';
import Cookies from 'js-cookie';
import { BASE_URL } from './config/constant';

const isAuthenticated = () => {
  const token = Cookies.get('token'); 
console.log(token);
// Get token from cookies
  return token !== undefined; // If token exists, user is authenticated
};
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};
export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                {/* <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout> */}
                <Layout>
                  {route.protected ? (
                    <PrivateRoute>{route.routes ? renderRoutes(route.routes) : <Element />}</PrivateRoute>
                  ) : (
                    route.routes ? renderRoutes(route.routes) : <Element />
                  )}
                </Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/Login'))
  },{
    exact: 'true',
    path: '/logout',
    element: lazy(() => import('./views/Logout'))
  },
  {
    exact: 'true',  
    path: '/forgot-password',
    element: lazy(() => import('./views/auth/ForgotPassword'))
  },


  {
    path: '*',
    layout: AdminLayout,
    protected: true,
    routes: [
      {
        exact: 'true',
        path: '/app/dashboard/default',
        element: lazy(() => import('./views/dashboard')),
        protected: true 
      },
     {
        exact: 'true',
        path: '/dashboard/DispatcherPanel',
        element: lazy(() => import('./views/dashboard/DispatcherPanel')),
        protected: true 
      },
      {
        exact: 'true',
        path: '/basic/UsersList',
        element: lazy(() => import('./views/role/basic/Users/UsersList')), 
        protected: true 
      },
      {
        exact: 'true',
        path: '/basic/UserUpdate/:id',
        element: lazy(() => import('./views/role/basic/Users/UserUpdate')),  
      },
      {
        exact: 'true',
        path: '/basic/addNewUser',
        element: lazy(() => import('./views/role/basic/Users/AddNewUser'))
      },
      {
        exact: 'true',
        path: '/basic/ProviderList',
        element: lazy(() => import('./views/role/basic/Provider/ProviderList'))
      },
      {
        exact: 'true',
        path: '/basic/ProviderService/:id',
        element: lazy(() => import('./views/role/basic/Provider/ProviderService'))
      },
      {
        exact: 'true',
        path: '/basic/ProviderUpdate/:id',
        element: lazy(() => import('./views/role/basic/Provider/ProviderUpdate'))
      },
      {
        exact: 'true',
        path: '/basic/addNewProvider',
        element: lazy(() => import('./views/role/basic/Provider/AddNewProvider'))
      },
      {
        exact: 'true',
        path: '/basic/DispatchersList',
        element: lazy(() => import('./views/role/basic/Dispatcher/DispatchersList'))
      },
      {
        exact: 'true',
        path: '/basic/DispatcherUpdate/:id',
        element: lazy(() => import('./views/role/basic/Dispatcher/DispatchersUpdate'))
      },
      {
        exact: 'true',
        path: '/basic/AddNewDispatcher',
        element: lazy(() => import('./views/role/basic/Dispatcher/AddNewDispatcher'))
      },
      {
        exact: 'true',
        path: '/basic/Fleetownerslist',
        element: lazy(() => import('./views/role/basic/Fleetowner/Fleetownerslist'))
      },
      {
        exact: 'true',
        path: '/basic/FleetownersUpdate/:id',
        element: lazy(() => import('./views/role/basic/Fleetowner/FleetownersUpdate'))
      },
      {
        exact: 'true',
        path: '/basic/AddNewFleetowner',
        element: lazy(() => import('./views/role/basic/Fleetowner/AddNewFleetowner'))
      },
      {
        exact: 'true',
        path: '/basic/AccountManagerlist',
        element: lazy(() => import('./views/role/basic/AccountManager/AcoountManagerlist'))
      },
      {
        exact: 'true',
        path: '/basic/AccountManagerUpdate/:id',
        element: lazy(() => import('./views/role/basic/AccountManager/AcoountManagerUpdate'))
      },
      {
        exact: 'true',
        path: '/basic/AddNewAccountManager',
        element: lazy(() => import('./views/role/basic/AccountManager/AddNewAccountManager'))
      },
      {
        exact: 'true',
        path: '/account/accountlist',
        element: lazy(() => import('./views/AccountManagement/Account/Accountlis'))
      },
      {
        exact: 'true',
        path: '/account/accounapproved',
        element: lazy(() => import('./views/AccountManagement/Account/Accountapproved'))
      },
      {
        exact: 'true',
        path: '/account/accounatEdit/:id',
        element: lazy(() => import('./views/AccountManagement/Account/AccountEdit'))
      },
      {
        exact: 'true',
        path: '/account/Withdrawrequests',
        element: lazy(() => import('./views/AccountManagement/Withdraw/WithdrawRequest'))
      },
      {
        exact: 'true',
        path: '/account/withdrawapproved',
        element: lazy(() => import('./views/AccountManagement/Withdraw/WithdrawApproved'))
      },
      {
        exact: 'true',
        path: '/account/withdrawdisapproved',
        element: lazy(() => import('./views/AccountManagement/Withdraw/WithdrawDisapproved'))
      }, {
        exact: 'true',
        path: '/Statement/OverallStatement',
        element: lazy(() => import('./views/AccountManagement/Statement/OverallStatement'))
      }, {
        exact: 'true',
        path: '/Statement/ProviderStatement',
        element: lazy(() => import('./views/AccountManagement/Statement/ProviderStatement'))
      },{
        exact: 'true',
        path: '/Statement/DailyStatement',
        element: lazy(() => import('./views/AccountManagement/Statement/DailyStatement'))
      }, {
        exact: 'true',
        path: '/Statement/monthlyStatement',
        element: lazy(() => import('./views/AccountManagement/Statement/monthlyStatement'))
      }, {
        exact: 'true',
        path: '/Statement/YearlySatement',
        element: lazy(() => import('./views/AccountManagement/Statement/YearlySatement'))
      },{
        exact: 'true',
        path: '/Statement/ridedetiles/:id',
        element: lazy(() => import('./views/AccountManagement/Statement/ridesdetiles'))
      },
      {
        exact: 'true',
        path: '/Statement/ProviderRidestatement/:id',
        element: lazy(() => import('./views/AccountManagement/Statement/ProviderRidestatement'))
      },{
        exact: 'true',
        path: '/review/usersReview',
        element: lazy(() => import('./views/review/usersReview'))
      },{
        exact: 'true',
        path: '/review/providerReview',
        element: lazy(() => import('./views/review/providerReview'))
      },{
        exact: 'true',
        path: '/Histroy/RequestHistory',
        element: lazy(() => import('./views/Histroy/RequestHistory'))
      },{
        exact: 'true',
        path: '/Histroy/ScheduleHistory',
        element: lazy(() => import('./views/Histroy/ScheduleHistory'))
      },
      {
        exact: 'true',
        path: '/ServiceTypes/ListServiceTypes',
        element: lazy(() => import('./views/General/ServiceTypes/ListServiceTypes'))
      },{
        exact: 'true',
        path: '/ServiceTypes/AddNewServiceTypes',
        element: lazy(() => import('./views/General/ServiceTypes/AddNewServiceTypes'))
      },{
        exact: 'true',
        path: '/ServiceTypes/UpdateServiceTypes/:id',
        element: lazy(() => import('./views/General/ServiceTypes/UpdateServiceTypes'))
      },
      {
        exact: 'true',
        path: '/Documents/listDocuments',
        element: lazy(() => import('./views/General/Documents/listDocuments'))
      },{
        exact: 'true',
        path: '/Documents/AddnNewDcouments',
        element: lazy(() => import('./views/General/Documents/AddnNewDcouments'))
      },{
        exact: 'true',
        path: '/Documents/editDocuments/:id',
        element: lazy(() => import('./views/General/Documents/editDocuments'))
      }, {
        exact: 'true',
        path: '/PromoCodes/listPromocodes',
        element: lazy(() => import('./views/General/PromoCodes/listPromocodes'))
      },{
        exact: 'true',
        path: '/PromoCodes/AddNewPromocodes',
        element: lazy(() => import('./views/General/PromoCodes/AddNewPromocodes'))
      },{
        exact: 'true',
        path: '/PromoCodes/editPromocodes/:id',
        element: lazy(() => import('./views/General/PromoCodes/editPromocodes'))
      },{
        exact: 'true',
        path: '/Setting/SiteSetting',
        element: lazy(() => import('./views/Setting/SiteSetting'))
      },{
        exact: 'true',
        path: '/Setting/AccountSetting',
        element: lazy(() => import('./views/Setting/AccountSetting'))
      },{
        exact: 'true',
        path: '/Setting/ChangePassword',
        element: lazy(() => import('./views/Setting/ChangePassword'))
      },
      {
        exact: 'true',
        path: '/basic/breadcrumb-paging',
        element: lazy(() => import('./views/role/basic/BasicBreadcrumb'))
      },
      {
        exact: 'true',
        path: '/basic/collapse',
        element: lazy(() => import('./views/role/basic/BasicCollapse'))
      },
      {
        exact: 'true',
        path: '/basic/tabs-pills',
        element: lazy(() => import('./views/role/basic/BasicTabsPills'))
      },
      {
        exact: 'true',
        path: '/basic/typography',
        element: lazy(() => import('./views/role/basic/BasicTypography'))
      },
      {
        exact: 'true',
        path: '/forms/form-basic',
        element: lazy(() => import('./views/forms/FormsElements'))
      },
      {
        exact: 'true',
        path: '/charts/nvd3',
        element: lazy(() => import('./views/charts/nvd3-chart'))
      },
      {
        exact: 'true',
        path: '/maps/google-map',
        element: lazy(() => import('./views/maps/GoogleMaps'))
      },
      {
        exact: 'true',
        path: '/sample-page',
        element: lazy(() => import('./views/extra/SamplePage'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
