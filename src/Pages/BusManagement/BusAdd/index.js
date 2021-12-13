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

import "./BusAdd.scss";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addBus } from "../../../store/actions/busAction";
import { fetchUnassignedDrivers } from "../../../store/actions/driverAction";
import { actionTypes } from "../../../store/common/types";
import Multiselect from "multiselect-react-dropdown";

const BusAdd = (props) => {
  const {
    fetchUnassignedDrivers,
    addBus,
    schoolId,
    drivers,
    increaseBusCount,
    routes,
  } = props;

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [driverArray, setdriverArray] = useState([]);
  const [nannyArray, setNannyArray] = useState([]);
  const [busNo, setBusNo] = useState({
    value: "",
  });
  const [seatingCapacity, setSeatingCapacity] = useState({
    value: "",
  });
  const [vinNo, setVinNo] = useState({
    value: "",
  });
  const [driver, setDriver] = useState({
    value: "",
  });
  const [nanny, setNanny] = useState({
    value: "",
  });

  // const [route, setRoute] = useState({
  //   value: "",
  // });

  const [make, setMake] = useState({
    value: "",
  });
  const [model, setModel] = useState({
    value: "",
  });
  const [licenseNo, setLicenseNo] = useState({
    value: "",
  });

  const [insuranceNo, setInsuranceNo] = useState({
    value: "",
  });
  useEffect(() => {
    fetchUnassignedDrivers({ id: schoolId }, () => {});
    return () => {};
  }, []);

  useEffect(() => {
    console.log("drivers list", drivers);
    structureData();
  }, [drivers]);

  const structureData = () => {
    const filteredDriversArray = drivers.filter((item) => {
      console.log("item in drivers array -->", item);
      return item.type == "driver";
    });
    console.log("drivers filter in bus add", filteredDriversArray);

    setdriverArray(filteredDriversArray);
    console.log("drivers array in bus add", driverArray);

    const filteredNannyArray = drivers.filter((item) => {
      console.log("item in drivers array -->", item);
      return item.type == "nanny";
    });
    console.log("Nanny filter in bus add", filteredNannyArray);

    setNannyArray(filteredNannyArray);
    console.log("nannies array in bus add", nannyArray);
  };
  // useEffect(() => {
  //   console.log("loading", loading)
  // }, [loading])

  var selectedRoutes = [];

  const handlemultiSelector = (e) => {
    console.log("e array", e);
    selectedRoutes = e.map((item) => item._id);
    console.log("selectedRoutes", selectedRoutes);
  };

  const handleBusNoChange = (e) => {
    e.preventDefault();
    setBusNo({
      ...busNo,
      value: e.target.value,
    });
  };
  const handleSeatingCapacityChange = (e) => {
    e.preventDefault();
    setSeatingCapacity({
      ...seatingCapacity,
      value: e.target.value,
    });
  };
  const handleVinNoChange = (e) => {
    e.preventDefault();
    setVinNo({
      ...vinNo,
      value: e.target.value,
    });
  };

  const handleLicNoChange = (e) => {
    e.preventDefault();
    setLicenseNo({
      ...licenseNo,
      value: e.target.value,
    });
  };
  const handleInsNoChange = (e) => {
    e.preventDefault();
    setInsuranceNo({
      ...insuranceNo,
      value: e.target.value,
    });
  };

  const handleDriverChange = (e) => {
    e.preventDefault();
    setDriver({
      value: e.target.value,
    });
  };

  const handleNannyChange = (e) => {
    e.preventDefault();
    setNanny({
      value: e.target.value,
    });
  };

  // const handleRouteChange = (e) => {
  //   e.preventDefault();
  //   setRoute({
  //     value: e.target.value,
  //   });
  // };

  const handleMakeChange = (e) => {
    e.preventDefault();
    setMake({
      ...make,
      value: e.target.value,
    });
  };
  const handleModelChange = (e) => {
    e.preventDefault();
    setModel({
      ...model,
      value: e.target.value,
    });
  };

  const maxLengthCheck = (object) => {
    console.log("INPUTY");
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const busData = {
      schoolId: schoolId,
      busNo: busNo.value,
      studentCapacity: seatingCapacity.value,
      vinNumber: vinNo.value,
      driverId: driver.value ? driver.value : null,
      nannyId: nanny.value ? nanny.value : null,
      deleted: false,
      currentStatus: driver.value || nanny.value ? true : false,
      studentsCount: 0,
      make: make.value,
      model: model.value,
      licenseNo: licenseNo.value,
      insuranceNo: insuranceNo.value,
      routes: selectedRoutes,
      currentlyAssignedDriver: driver.value ? true : false,
      currentlyAssignedNanny: nanny.value ? true : false,
    };
    console.log("busData", busData);
    addBus(
      busData,
      () => {
        history.push("/busManagement/list");
        increaseBusCount();
      },
      () => setLoading(false)
    );
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
                    <div className="title">Add Golden Video</div>
                  </div>
                  <div className="action">
                    <Link className="close-button" to="/busManagement/list">
                      <i className="lnr-cross-circle"> </i>
                    </Link>
                  </div>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Row>
                  <Col md='12'>
                      <FormGroup>
                        <Label for='busNo'>Lesson ID</Label>
                        <Input
                          name='busNo'
                          id='busNo'
                          value={busNo.value}
                          onChange={handleBusNoChange}
                          placeholder='Enter Lesson ID'
                          required
                          maxLength="20"
                        />
                        <FormFeedback>Bus Number cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <Label for="busNo">Lesson Name</Label>
                        <Input
                          name="busNo"
                          id="busNo"
                          value={model.value}
                          onChange={handleModelChange}
                          placeholder="Enter Lesson Name"
                          required
                          maxLength="20"
                        />
                        <FormFeedback>Bus Number cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>
              

                    <Col md="12">
                      <FormGroup>
                        <Label for="nanny">Class</Label>
                        <Input
                          type="select"
                          name="nanny"
                          id="nanny"
                          onChange={handleNannyChange}
                          value={nanny.value}
                        >
                          <option selected disabled value="">
                            Select Music Class
                          </option>
                          {nannyArray && nannyArray.length > 0 ? (
                            nannyArray.map((nanny) => {
                              return (
                                <option value={nanny._id} key={nanny._id}>
                                  {nanny.name}
                                </option>
                              );
                            })
                          ) : (
                            <option disabled> No Nannies Available </option>
                          )}
                        </Input>
                      </FormGroup>

                      {nanny.value ? (
                        <span
                          style={{
                            position: "absolute",
                            top: 38,
                            right: 38,
                          }}
                          className=""
                          color="secondary"
                          type="button"
                          onClick={() =>
                            setNanny({
                              value: "",
                            })
                          }
                        >
                          {/* <i className="lnr-cross btn-icon-wrapper"> </i> */}
                          <i className="lnr-cross-circle"> </i>
                        </span>
                      ) : null}
                    </Col>
              
                    <Col md="12">
                      <FormGroup>
                        <Label for="insurance"> Video URL</Label>
                       
                   
                        <input
                          type="file"
                          class="form-control"
                          id="customFile"
                        />
                        <FormFeedback>
                          Insurance Number cannot be empty
                        </FormFeedback>
                      </FormGroup>
                    </Col>

                   
                  </Row>
                  <Link className="close-button" to="/busManagement/list">
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
};

const mapStateToProps = (state) => {
  return {
    schoolId: state.auth.user.result.userExist._id,
    drivers: state.driver.unassignedDriver,
    routes: state.route.route,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBus: (busData, navigate, stopLoader) =>
      dispatch(addBus(busData, navigate, stopLoader)),
    fetchUnassignedDrivers: (schoolId, addDrivers) =>
      dispatch(fetchUnassignedDrivers(schoolId, addDrivers)),
    increaseBusCount: () => dispatch({ type: actionTypes.INCREASE_BUS_COUNT }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusAdd);
