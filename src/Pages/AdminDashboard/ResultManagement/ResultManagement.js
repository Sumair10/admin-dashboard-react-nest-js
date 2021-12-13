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
// import resultAdd from "./resultAdd/index";
// import BusEdit from "./BusEdit";
// import useFetch from "./useFetch";





function ResultManagement({match}) {

//   const { data: result, isPending, error } = useFetch(
//     "http://localhost:8000/result"
//   )
//   console.log(result)
  
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
            // results={result}
            
          />
          {/* <Route exact path={`${match.url}/add`} component={resultAdd} /> */}
          {/*<Route exact path={`${match.url}/edit/:id`} component={BusEdit} />
        <Route exact path={`${match.url}/bus/:id`} component={BusDetails} /> */}
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  </Fragment>
  )
}

export default ResultManagement

