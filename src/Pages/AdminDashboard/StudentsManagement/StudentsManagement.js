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
import StudentsAdd from "./StudentsAdd/index";
// import BusEdit from "./BusEdit";
import useFetch from "../GoldenVideoManagement/useFetch";

function studentManagement({ match }) {
  const { data: student, isPending, error } = useFetch(
    "http://localhost:8002/student"
  );
  console.log(student);

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
              student={student}
            />
            <Route exact path={`${match.url}/add`} component={StudentsAdd} />
            {/*<Route exact path={`${match.url}/edit/:id`} component={BusEdit} />
        <Route exact path={`${match.url}/bus/:id`} component={BusDetails} /> */}
          </div>
          {/* <AppFooter /> */}
        </div>
      </div>
    </Fragment>
  );
}

export default studentManagement;
