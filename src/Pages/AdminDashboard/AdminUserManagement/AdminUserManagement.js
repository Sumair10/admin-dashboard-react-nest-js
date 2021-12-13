import React, { Fragment } from "react";
import { Route } from "react-router-dom";
// Tables

import List from "./List";

// Layout

import AppHeader from "../../../Layout/AppHeader";
import AppSidebar from "../../../Layout/AppSidebar";

// Theme Options

import ThemeOptions from "../../../Layout/ThemeOptions";
// import BusDetails from "./BusDetails";
import adminUserAdd from "./AdminUserAdd/index";
// import BusEdit from "./BusEdit";
import useFetch from "../GoldenVideoManagement/useFetch";





function AdminUserManagement({match}) {

  const { data: adminUser, isPending, error } = useFetch(
    "http://localhost:8003/adminUser"
  )
  console.log(adminUser)
  
  return (
  
       <Fragment>
    <ThemeOptions />
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <Route
            
            path={`${match.url}/list`}
            component={List}
            adminUsers={adminUser}
            
          />
          <Route exact path={`${match.url}/add`} component={adminUserAdd} />
          {/*<Route exact path={`${match.url}/edit/:id`} component={BusEdit} />
        <Route exact path={`${match.url}/bus/:id`} component={BusDetails} /> */}
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  </Fragment>
  )
}

export default AdminUserManagement

