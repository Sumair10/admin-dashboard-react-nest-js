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

// import "./studentAdd.scss";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
// import { addstudent } from "../../../../store/actions/studentAction";
// import { fetchUnassignedDrivers } from "../../../store/actions/driverAction";
// import { actionTypes } from "../../../../store/common/types";
// import Multiselect from "multiselect-react-dropdown";

function StudentsAdd(props) {
 

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [studentArray, setstudentArray] = useState([]);
  const [ClassesArray, setClassesArray] = useState([]);
  const [studentID, setstudentID] = useState({
    value: "",
  });

  const [studentName, setstudentName] = useState("");
  const [isPending, setIsPending] = useState(false);

  // const handlestudentIDChange = (e) => {
  //   e.preventDefault();
  //   setstudentID({
  //     ...studentID,
  //     value: e.target.value,
  //   });
  // };
  // const handlestudentNameChange = (e) => {
  //   e.preventDefault();
  //   setstudentName({
  //     ...studentName,
  //     value: e.target.value,
  //   });
  // };
  // const handlestudentURLChange = (e) => {
  //   e.preventDefault();
  //   setstudentURL({
  //     ...studentURL,
  //     value: e.target.value,
  //   });
  // // };

  // const handlestudentClassesChange = (e) => {
  //   e.preventDefault();
  //   setstudentClasses({
  //     ...studentClasses,
  //     value: e.target.value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const studentData = {
  //     studentID: studentID.value,
  //     studentName: studentName.value,
  //     studentClasses: studentClasses.value,
  //     studentURL: studentURL.value,
  //     deleted: false,
  //   };
  //   console.log("studentData", studentData);
  //   history.push("/studentManagement/list");
  //   // addstudent(
  //   //   studentData,
  //   //   () => {
  //   //     history.push("/studentManagement/list");
  //   //     increasestudentCount();
  //   //   },
  //   //   () => setLoading(false)
  //   // );
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const student = { studentName};

    setIsPending(true);

    fetch("http://localhost:8002/student", {
      method: "POST",
      headers: { "content-Type": " application/json" },
      body: JSON.stringify(student),
    }).then(() => {
      console.log("data added successful");
      setIsPending(false);
      history.push("/StudentsManagement/list");
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
                    <div className="title">Add Student</div>
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
                        <Label for="studentName">Student Name</Label>
                        <Input
                          name="studentName"
                          id="studentName"
                          value={studentName}
                          onChange={(e) => setstudentName(e.target.value)}
                          placeholder="Enter Video Name"
                          required
                          maxLength="20"
                        />
                        <FormFeedback>Student Name cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>

          
                  
                  </Row>
                  <Link
                    className="close-button"
                    to="/StudentsManagement/list"
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

export default StudentsAdd;
