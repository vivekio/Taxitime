const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/app/dashboard/default'
        },
        {
          id: 'dispatcherpanel',
          title: 'Dispatcher Panel',
          type: 'item',
          icon: 'feather icon-home',
          url: '/dashboard/DispatcherPanel'
        }
      ]
    },
    {
      id: 'roles',
      title: 'ROLES',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'users',
          title: 'Users',
          type: 'collapse',
          icon: 'bi bi-people-fill',
          children: [
            {
              id: 'listusers',
              title: 'List Users',
              type: 'item',
              url: '/basic/UsersList'
            },
            {
              id: 'addusers',
              title: 'Add Users',
              type: 'item',
              url: '/basic/addNewUser'
            }
          ]
        },
        {
          id: 'provider',
          title: 'Provider',
          type: 'collapse',
          icon: 'bi bi-person-lines-fill',
          children: [
            {
              id: 'listprovider',
              title: 'List Provider',
              type: 'item',
              url: '/basic/ProviderList'
            },
            {
              id: 'addprovider',
              title: 'Add Provider',
              type: 'item',
              url: '/basic/AddNewProvider'
            }
          ]
        },
        {
          id: 'dispatcher',
          title: 'Dispatcher',
          type: 'collapse',
          icon: 'bi bi-headset',
          children: [
            {
              id: 'listdispatcher',
              title: 'List Dispatcher',
              type: 'item',
              url: '/basic/DispatchersList'
            },
            {
              id: 'adddispatcher',
              title: 'Add Dispatcher',
              type: 'item',
              url: '/basic/AddNewDispatcher'
            }
          ]
        },
        {
          id: 'fleetowners',
          title: 'Fleet Owners',
          type: 'collapse',
          icon: 'bi bi-person-gear',
          children: [
            {
              id: 'listfleetowners',
              title: 'List Fleet Owners',
              type: 'item',
              url: '/basic/Fleetownerslist'
            },
            {
              id: 'addfleetowners',
              title: 'Add New Fleet Owners',
              type: 'item',
              url: '/basic/AddNewFleetowner'
            }
          ]
        },
        {
          id: 'accountmanager',
          title: 'Account Manager',
          type: 'collapse',
          icon: 'bi bi-person-badge',
          children: [
            {
              id: 'listaccountmanager',
              title: 'List Account Manager',
              type: 'item',
              url: '/basic/AccountManagerlist'
            },
            {
              id: 'addaccountmanager',
              title: 'Add New Account Manager',
              type: 'item',
              url: '/basic/AddNewAccountManager'
            }
          ]
        }
      ]
    },
    {
      id: 'accountmanagement',
      title: 'Account Management',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 'account-accountmanagement',
          title: 'Account',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'listaccount-accountmanagement',
              title: 'New Account',
              type: 'item',
              url: '/account/accountlist'
            },
            {
              id: 'addaccount-accountmanagement',
              title: 'Approved Account ',
              type: 'item',
              url: '/account/accounapproved'
            }
          ]
        },
        {
          id: 'withdrawal',
          title: 'Withdrawal',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'withdrawalrequests',
              title: 'Withdrawal requests',
              type: 'item',
              url: '/account/Withdrawrequests'
            },
            {
              id: 'approvedrequests',
              title: 'Approved requests',
              type: 'item',
              url: '/account/withdrawapproved'
            },
            {
              id: 'disapprovedrequests',
              title: 'Disapproved requests',
              type: 'item',
              url: '/account/withdrawdisapproved'
            }
          ]
        },
        {
          id: 'statemnts',
          title: 'Statements',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'overallridestatements',
              title: 'Overall Ride Statements',
              type: 'item',
              url: '/Statement/OverallStatement'
            },
            {
              id: 'providersatements',
              title: 'Provider Statements ',
              type: 'item',
              url: '/Statement/ProviderStatement'
            },
            {
              id: 'dailystatements',
              title: 'Daily Statements',
              type: 'item',
              url: '/Statement/DailyStatement'
            },
            {
              id: 'monthlystatements',
              title: 'Monthly Statements',
              type: 'item',
              url: '/Statement/monthlyStatement'
            },
            {
              id: 'yearlystatements',
              title: 'Yearly Statements',
              type: 'item',
              url: '/Statement/YearlySatement'
            }
          ]
        }
      ]
    },
    // {
    //   id: 'accountssettlement',
    //   title: 'ACCOUNTS SETTLEMENT ',
    //   type: 'group',
    //   icon: 'icon-charts',
    //   children: [
    //     {
    //       id: 'account-accountssettlement',
    //       title: 'Account',
    //       type: 'collapse',
    //       icon: 'feather icon-pie-chart',
    //       children: [
    //         {
    //           id: 'listaccount-accountssettlement',
    //           title: 'New Account',
    //           type: 'item',
    //           url: '/basic/button'
    //         },
    //         {
    //           id: 'addaccount-accountssettlement',
    //           title: 'Approved Account ',
    //           type: 'item',
    //           url: '/basic/badges'
    //         }
    //       ]
    //     },
    //     {
    //       id: 'withdrawal-accountssettlement',
    //       title: 'Withdrawal',
    //       type: 'collapse',
    //       icon: 'feather icon-box',
    //       children: [
    //         {
    //           id: 'withdrawalrequests-accountssettlement',
    //           title: 'Withdrawal requests',
    //           type: 'item',
    //           url: '/basic/button'
    //         },
    //         {
    //           id: 'approvedrequests-accountssettlement',
    //           title: 'Approved requests',
    //           type: 'item',
    //           url: '/basic/badges'
    //         },
    //         {
    //           id: 'disapprovedrequests-accountssettlement',
    //           title: 'Disapproved requests',
    //           type: 'item',
    //           url: '/basic/badges'
    //         }
    //       ]
    //     }
    //   ]
    // },
    {
      id: 'reviews',
      title: 'REVIEWS',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'userreviews',
          title: 'User Reviews',
          type: 'item',
          icon: 'feather icon-map',
          url: '/review/usersReview'
        },
        {
          id: 'providerreviews',
          title: 'Provider Reviews',
          type: 'item',
          icon: 'feather icon-map',
          url: '/review/providerReview'
        }
      ]
    },
    {
      id: 'map',
      title: 'Map',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'maps',
          title: 'Maps',
          type: 'item',
          icon: 'feather icon-map',
          url: '/maps/google-map'
        }
      ]
    },
    {
      id: 'history',
      title: 'HISTORY',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'requesthistory',
          title: 'Request History',
          type: 'item',
          icon: 'feather icon-map',
          url: '/Histroy/RequestHistory'
        },
        {
          id: 'scheduledrideshistory',
          title: 'Scheduled Rides',
          type: 'item',
          icon: 'feather icon-map',
          url: '/Histroy/ScheduleHistory'
        },
        // {
        //   id: 'promocodeusagehistory',
        //   title: 'Promocode Usage',
        //   type: 'item',
        //   icon: 'feather icon-map',
        //   url: '/sample-page'
        // }
      ]
    },
    {
      id: 'general',
      title: 'GENERAL',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'servicetypes',
          title: 'Service Types',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'listservicetypes',
              title: 'List Service Types',
              type: 'item',
              url: '/ServiceTypes/ListServiceTypes'
            },
            {
              id: 'addservicetypes',
              title: 'Add New Service Types',
              type: 'item',
              url: '/ServiceTypes/AddNewServiceTypes'
            }
          ]
        },
        {
          id: 'documents',
          title: 'Documunets',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'listdocuments',
              title: 'List Documents',
              type: 'item',
              url: '/Documents/listDocuments'
            },
            {
              id: 'adddocuments',
              title: 'Add New Documents',
              type: 'item',
              url: '/Documents/AddnNewDcouments'
            }
          ]
        },
        {
          id: 'promocodes',
          title: 'Promocodes',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'listpromocodes',
              title: 'List Promocodes',
              type: 'item',
              url: '/PromoCodes/listPromocodes'
            },
            {
              id: 'addupromocodes',
              title: 'Add New Promocodes',
              type: 'item',
              url: '/PromoCodes/AddNewPromocodes'
            }
          ]
        }
      ]
    },
    {
      id: 'paymentdetails',
      title: 'Payment Details',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'paymenthistory',
          title: 'Payment History',
          type: 'item',
          icon: 'feather icon-map',
          url: '/sample-page'
        },
        {
          id: 'paymentsettings',
          title: 'Payment Settings',
          type: 'item',
          icon: 'feather icon-map',
          url: '/sample-page'
        }
      ]
    },
    {
      id: 'allsettings',
      title: 'ALL SETTINGS',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'allsitesettings',
          title: 'settings',
          type: 'collapse',
          icon: 'feather icon-map',
          children: [
            {
              id: 'sitesettings',
              title: 'Site Settings',
              type: 'item',
              url: '/Setting/SiteSetting'
            },
            {
              id: 'accountsettings',
              title: 'Account Settings',
              type: 'item',
              url: '/Setting/AccountSetting'
            },{
              id: 'changepassword',
              title: 'Change Password',
              type: 'item',
              url: '/Setting/ChangePassword'
            },{
              id: 'logout',
              title: 'Logout',
              type: 'button',
              url: '/logout'
            }
          ]
        }
      ]
    },
    {
      id: 'other',
      title: 'OTHER',
      type: 'group',
      icon: 'icon-pages',
      children: [
       
        {
          id: 'privacypolicy',
          title: 'Privacy Policy',
          type: 'item',
          url: '/sample-page',
          classes: 'nav-item',
          icon: 'feather icon-sidebar'
        },
        {
          id: 'translations',
          title: 'Transalations',
          type: 'item',
          icon: 'feather icon-book',
          classes: 'nav-item',
          url: '/sample-page'
        }
      ]
    }
  ]
};

export default menuItems;
