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
import settingAdd from "./SettingsAdd/index";
// import BusEdit from "./BusEdit";
import useFetch from "../GoldenVideoManagement/useFetch";





function SettingManagement({match}) {

  const { data: setting, isPending, error } = useFetch(
    "http://localhost:8004/setting"
  )
  console.log(setting)
  
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
            settings={setting}
            
          />
          <Route exact path={`${match.url}/add`} component={settingAdd} />
          {/*<Route exact path={`${match.url}/edit/:id`} component={BusEdit} />
        <Route exact path={`${match.url}/bus/:id`} component={BusDetails} /> */}
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  </Fragment>
  )
}

export default SettingManagement

