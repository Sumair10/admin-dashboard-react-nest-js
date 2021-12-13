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
import GoldenVideoAdd from "./GoldenVideoAdd/index";
import GoldenVideoEdit from "./GoldenVideoEdit/index"
// import BusEdit from "./BusEdit";
import useFetch from "./useFetch";





function GoldenVideoManagement({match}) {

  const { data: goldenVideo, isPending, error } = useFetch(
    "http://localhost:8000/goldenVideo"
  )
  console.log(goldenVideo)
  
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
            goldenVideos={goldenVideo}
            
          />
          <Route exact path={`${match.url}/add`} component={GoldenVideoAdd} />
          <Route exact path={`${match.url}/edit/:id`} component={GoldenVideoEdit} />
      {/*  <Route exact path={`${match.url}/bus/:id`} component={BusDetails} /> */}
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  </Fragment>
  )
}

export default GoldenVideoManagement

