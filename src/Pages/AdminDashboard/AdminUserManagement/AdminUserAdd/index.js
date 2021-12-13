import React, { Fragment, useEffect, useState } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";

// import "./adminUserAdd.scss";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
// import { addadminUser } from "../../../../store/actions/adminUserAction";
// import { fetchUnassignedDrivers } from "../../../store/actions/driverAction";
// import { actionTypes } from "../../../../store/common/types";
// import Multiselect from "multiselect-react-dropdown";

function AdminUserAdd(props) {
 
  const accessKey=12345
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [adminUserArray, setadminUserArray] = useState([]);
  const [ClassesArray, setClassesArray] = useState([]);
  const [adminUserID, setadminUserID] = useState({
    value: "",
  });

  const [adminUser_name, setAdminUserName] = useState("");
  const [isPending, setIsPending] = useState(false);

  // const handleadminUserIDChange = (e) => {
  //   e.preventDefault();
  //   setadminUserID({
  //     ...adminUserID,
  //     value: e.target.value,
  //   });
  // };
  // const handleadminUserNameChange = (e) => {
  //   e.preventDefault();
  //   setadminUserName({
  //     ...adminUserName,
  //     value: e.target.value,
  //   });
  // };
  // const handleadminUserURLChange = (e) => {
  //   e.preventDefault();
  //   setadminUserURL({
  //     ...adminUserURL,
  //     value: e.target.value,
  //   });
  // // };

  // const handleadminUserClassesChange = (e) => {
  //   e.preventDefault();
  //   setadminUserClasses({
  //     ...adminUserClasses,
  //     value: e.target.value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const adminUserData = {
  //     adminUserID: adminUserID.value,
  //     adminUserName: adminUserName.value,
  //     adminUserClasses: adminUserClasses.value,
  //     adminUserURL: adminUserURL.value,
  //     deleted: false,
  //   };
  //   console.log("adminUserData", adminUserData);
  //   history.push("/adminUserManagement/list");
  //   // addadminUser(
  //   //   adminUserData,
  //   //   () => {
  //   //     history.push("/adminUserManagement/list");
  //   //     increaseadminUserCount();
  //   //   },
  //   //   () => setLoading(false)
  //   // );
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const adminUser = {accessKey, adminUser_name };

    setIsPending(true);
    console.log(adminUser)
    fetch("http://localhost:3002/adminUsers", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(adminUser),
    }).then(() => {
      console.log("data added successful");
      setIsPending(false);
      history.push("/AdminUserManagement/list");
    });
  };

  return (
    <Fragment>
      <ReactCSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Row>
          <Col md="12">
            <Card className="main-card mb-3">
              <CardBody>
                <div className="card-header-info">
                  <div className="info">
                    <div className="title">Add User Admin</div>
                  </div>
                  <div className="action">
                    <Link className="close-button" to="/busManagement/list">
                      <i className="lnr-cross-circle"> </i>
                    </Link>
                  </div>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label for="adminUserName">Admin User Name</Label>
                        <Input
                          name="adminUserName"
                          id="adminUserName"
                          value={adminUser_name}
                          onChange={(e) => setAdminUserName(e.target.value)}
                          placeholder="Enter Admin Name"
                          required
                          maxLength="20"
                        />
                        <FormFeedback>Admin User Name cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>

               
                  </Row>
                  <Link
                    className="close-button"
                    to="/adminUserManagement/list"
                  >
                    <Button color="secondary" className="mr-2 mt-1">
                      Cancel
                    </Button>
                  </Link>
                  <Button color="primary" className="mt-1" disabled={loading}>
                    Add
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
}

export default AdminUserAdd;
