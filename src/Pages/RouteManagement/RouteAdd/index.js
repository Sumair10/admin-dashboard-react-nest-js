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

import "./RouteAdd.scss";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addRoute } from "../../../store/actions/routeAction";
import { fetchStudents } from "../../../store/actions/studentAction";

const RouteAdd = (props) => {
  const { addRoute, schoolId, students, fetchStudents } = props;
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [pickUprouteName, setPickUprouteName] = useState({
    value: "",
  });
  const [dropOffRouteName, setDropOffRouteName] = useState({
    value: "",
  });
  // const [from, setFrom] = useState({
  //   value: '',
  // });
  // const [to, setTo] = useState({
  //   value: '',
  // });
  const [routeType, setRouteType] = useState({
    value: "pickUp",
  });

  const [pickUpStops, setPickUpStops] = useState([
    {
      student: "",
      time: "",
    },
  ]);

  const [dropOffStops, setDropOffStops] = useState([
    {
      student: "",
      time: "",
    },
  ]);

  const routeTypes = [
    {
      name: "Pick Up",
      value: "pickUp",
    },
    {
      name: "Drop Off",
      value: "dropOff",
    },
    {
      name: "Both",
      value: "both",
    },
  ];

  useEffect(() => {
    fetchStudents({ id: schoolId });
  }, []);

  const handlePickUpStopsChange = (e, index) => {
    e.preventDefault();
    const { name, value } = e.target;
    const listOfPickUpStops = [...pickUpStops];
    listOfPickUpStops[index][name] = value;
    setPickUpStops(listOfPickUpStops);
  };

  const handleAddPickUpStop = () => {
    setPickUpStops([...pickUpStops, { student: "", time: "" }]);
  };

  const handleRemovePickUpStop = (index) => {
    const list = [...pickUpStops];
    list.splice(index, 1);
    setPickUpStops(list);
  };

  const handleDropOffStopsChange = (e, index) => {
    e.preventDefault();
    const { name, value } = e.target;
    const listOfStops = [...dropOffStops];
    listOfStops[index][name] = value;
    setDropOffStops(listOfStops);
  };

  const handleAddDropOffStop = () => {
    setDropOffStops([...dropOffStops, { student: "", time: "" }]);
  };

  const handleRemoveDropOffStop = (index) => {
    const list = [...dropOffStops];
    list.splice(index, 1);
    setDropOffStops(list);
  };

  const handlePickUpRouteNameChange = (e) => {
    e.preventDefault();
    setPickUprouteName({
      ...pickUprouteName,
      value: e.target.value,
    });
  };

  const handleDropOffRouteNameChange = (e) => {
    e.preventDefault();
    setDropOffRouteName({
      ...dropOffRouteName,
      value: e.target.value,
    });
  };
  // const handleFromChange = (e) => {
  //   e.preventDefault();
  //   setFrom({
  //     ...from,
  //     value: e.target.value,
  //   });
  // };
  // const handleToChange = (e) => {
  //   e.preventDefault();
  //   setTo({
  //     ...to,
  //     value: e.target.value,
  //   });
  // };

  const handleRouteType = (e) => {
    e.preventDefault();
    setRouteType({
      ...routeType,
      value: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (routeType.value == "pickUp" || routeType.value == "both") {
      const pickUpRouteData = {
        schoolId: schoolId,
        routeName: pickUprouteName.value,
        stops: pickUpStops,
        routeType: "Pick Up",
        // from: from.value,
        // to: to.value,
        deleted: false,
      };

      console.log("pick up route data===", pickUpRouteData);

      addRoute(
        pickUpRouteData,
        () => {
          // setTimeout(() => {
          history.push("/routeManagement/list");
          // }, 2000)
        },
        () => setLoading(false)
      );
    }

    if (routeType.value == "dropOff" || routeType.value == "both") {
      const dropOffRouteData = {
        schoolId: schoolId,
        routeName: dropOffRouteName.value,
        stops: dropOffStops,
        routeType: "Drop Off",
        // from: from.value,
        // to: to.value,
        deleted: false,
      };

      console.log("pick up route data===", dropOffRouteData);

      addRoute(
        dropOffRouteData,
        () => {
          // setTimeout(() => {
          history.push("/routeManagement/list");
          // }, 2000)
        },
        () => setLoading(false)
      );
    }
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
                <Row>
                  <Col md="9">
                    <div className="card-header-info">
                      <div className="info">
                        <div className="title">Add Student Details</div>
                      </div>
                      <div className="action">
                        <Link
                          className="close-button"
                          to="/routeManagement/list"
                        >
                          <i className="lnr-cross-circle"> </i>
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>

                <Form onSubmit={handleSubmit}>
                  <Row>
                    {(routeType.value == "pickUp" ||
                      routeType.value == "both") && (
                      <Col md="12">
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <Label
                                for="pickUprouteName"
                                className="customTitle"
                              >
                                Student Name
                              </Label>
                              <Input
                                type="text"
                                name="pickUprouteName"
                                id="pickUprouteName"
                                value={pickUprouteName.value}
                                onChange={handlePickUpRouteNameChange}
                                placeholder="Enter Student Name"
                                required
                                maxLength="20"
                              />
                              <FormFeedback>
                                Route Name cannot be empty
                              </FormFeedback>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                    )}
                  </Row>
                  <Link className="close-button" to="/routeManagement/list">
                    <Button color="secondary" className="mr-2 mt-4">
                      Cancel
                    </Button>
                  </Link>
                  <Button color="primary" className="mt-4" disabled={loading}>
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
};

const mapStateToProps = (state) => {
  return {
    schoolId: state.auth.user.result.userExist._id,
    students: state.student.student,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: (schoolId) => dispatch(fetchStudents(schoolId)),
    addRoute: (routeData, navigate, stopLoader) =>
      dispatch(addRoute(routeData, navigate, stopLoader)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteAdd);
