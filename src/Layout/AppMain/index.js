import { Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import ReactSpinners from "../../assets/components/react-spinners";
import Loader from "../../Pages/Loader/Loader";

// const Campaign = lazy(() => import("../../Pages/Campaign"));
const Dashboards = lazy(() => import("../../Pages/Dashboards"));
// const Orders = lazy(() => import("../../Pages/Orders"));
// const Arts = lazy(() => import("../../Pages/Arts"));
const UserPages = lazy(() => import("../../Pages/UserPages"));
// const PortraitOrders = lazy(() => import("../../Pages/PortraitOrders"));
// const Reserves = lazy(() => import("../../Pages/Reserves"));
// const ListSellOrders = lazy(() => import("../../Pages/ListSellOrders"));
// const Auction = lazy(() => import("../../Pages/Auction"));
// const Trades = lazy(() => import("../../Pages/Trades"));
// const Settings = lazy(() => import("../../Pages/Settings"));
const GoldenVideoManagement = lazy(() =>
  import(
    "../../Pages/AdminDashboard/GoldenVideoManagement/GoldenVideoManagement"
  )
);
const StudentsManagement = lazy(() =>
  import("../../Pages/AdminDashboard/StudentsManagement/StudentsManagement")
);
const ResultManagement = lazy(() =>
  import("../../Pages/AdminDashboard/ResultManagement/ResultManagement")
);
const AdminUserManagement = lazy(() =>
  import("../../Pages/AdminDashboard/AdminUserManagement/AdminUserManagement.js")
);
const SettingsManagement = lazy(() =>
  import("../../Pages/AdminDashboard/SettingsManagement/SettingsManagement")
);
const BusManagement = lazy(() =>
  import("../../Pages/BusManagement/BusManagement")
);
const RouteManagement = lazy(() =>
  import("../../Pages/RouteManagement/RouteManagement")
);
// const StudentManagement = lazy(() =>
//   import("../../Pages/StudentManagement/StudentManagement")
// );
const DriverManagement = lazy(() =>
  import("../../Pages/DriverManagement/DriverManagement")
);
const ParentManagement = lazy(() =>
  import("../../Pages/ParentManagement/ParentManagement")
);
const Chats = lazy(() => import("../../Pages/Chats/Chats"));
const AccountManagement = lazy(() =>
  import("../../Pages/AccountManagement/AccountManagement")
);

const AppMain = () => {
  const user = useSelector((state) => state.auth.user);

  return user.userIsLoggedIn ? (
    <Fragment>
    
      <Suspense fallback={<ReactSpinners />}>
        <Route path="/goldenVideoManagement" component={GoldenVideoManagement} />
      </Suspense>

      <Suspense fallback={<ReactSpinners />}>
        <Route path="/studentsManagement" component={StudentsManagement} />
      </Suspense>

      <Suspense fallback={<ReactSpinners />}>
        <Route path="/resultManagement" component={ResultManagement} />
      </Suspense>

      <Suspense fallback={<ReactSpinners />}>
        <Route path="/adminUserManagement" component={AdminUserManagement} />
      </Suspense>

      <Suspense fallback={<ReactSpinners />}>
        <Route path="/settingsManagement" component={SettingsManagement} />
      </Suspense>

      <Suspense fallback={<ReactSpinners />}>
        <Route path="/busManagement" component={BusManagement} />
      </Suspense>

      <Suspense fallback={<ReactSpinners />}>
        <Route path="/routeManagement" component={RouteManagement} />
      </Suspense>

      {/* <Suspense fallback={<ReactSpinners />}>
        <Route path="/studentManagement" component={StudentManagement} />
      </Suspense> */}

      <Suspense fallback={<ReactSpinners />}>
        <Route path="/driverManagement" component={DriverManagement} />
      </Suspense>

      <Suspense fallback={<ReactSpinners />}>
        <Route path="/parentManagement" component={ParentManagement} />
      </Suspense>

      <Suspense fallback={<ReactSpinners />}>
        <Route path="/chats" component={Chats} />
      </Suspense>

      <Suspense fallback={<ReactSpinners />}>
        <Route path="/accountManagement" component={AccountManagement} />
      </Suspense>

      <Suspense fallback={<ReactSpinners />}>
        <Route path="/dashboards" component={Dashboards} />
      </Suspense>

      <Route exact path="/loading" component={Loader} />

      <Route
        exact
        path="/"
        render={() => <Redirect to="/dashboards/analytics" />}
      />

      <ToastContainer />
    </Fragment>
  ) : (
    <Fragment>
      <Suspense fallback={<ReactSpinners />}>
        <Route path="/pages" component={UserPages} />
      </Suspense>

      <Route exact path="/" render={() => <Redirect to="/pages/login" />} />
    </Fragment>
  );
};

export default AppMain;
