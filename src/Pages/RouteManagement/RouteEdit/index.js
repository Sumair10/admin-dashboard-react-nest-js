import React, { Fragment, useEffect, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';

import './RouteEdit.scss';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { addRoute, editRoute } from '../../../store/actions/routeAction';
import { fetchStudents } from "../../../store/actions/studentAction";

const RouteEdit = (props) => {
  const {
    schoolId,
    routeId,
    editRoute,
    routes,
    setEmptyRoute,
    students, 
    fetchStudents
  } = props;
  console.log('EDIT ROUTE', props);
  const history = useHistory();
  let currentRoute = [];
  let route = {};

  const [loading, setLoading] = useState(false);

  const [routeName, setRouteName] = useState({
    value: "",
  });
  // const [from, setFrom] = useState({
  //   value: '',
  // });
  // const [to, setTo] = useState({
  //   value: '',
  // });

  const [routeType, setRouteType] = useState({
    value: "",
  });

  const [stops, setStops] = useState([
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
  ];

  useEffect(() => {
    console.log("Stops",stops)
  },[stops])

  useEffect(() => {
    fetchStudents({ id: schoolId });
    currentRoute = routes.filter((route) => {
      return route._id === routeId;
    });

    route = currentRoute[0];
    console.log("route",route)

    setRouteName({
      value: route.routeName,
    });

    setRouteType({
      value: route.routeType
    })

    setStops([...route.stops])
    // setFrom({
    //   value: route.from,
    // });
    // setTo({
    //   value: route.to,
    // });
  }, []);

  const handleStopsChange = (e, index) => {
    e.preventDefault();
    const { name, value } = e.target;
    const listOfPickUpStops = [...stops];
    listOfPickUpStops[index][name] = value;
    setStops(listOfPickUpStops);
  };

  const handleAddStop = () => {
    setStops([...stops, { student: "", time: "" }]);
  };

  const handleRemoveStop = (index) => {
    const list = [...stops];
    list.splice(index, 1);
    setStops(list);
  };


  const handleRouteNameChange = (e) => {
    e.preventDefault();
    setRouteName({
      ...routeName,
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


      const RouteData = {
        id: routeId,
       route:{
        routeName: routeName.value,
        stops: stops,
        routeType:routeType.value,
        // from: from.value,
        // to: to.value,
        deleted: false,
       }
      };

      console.log("pick up route data===", RouteData);

    editRoute(
      RouteData,
      () => {
        // setTimeout(() => {
        history.push('/routeManagement/list');
        // }, 2000)
      },
      () => setLoading(false)
    );

    // console.log('DRIVER DATA INDEX', routeData);
    setEmptyRoute();
  };

  return (
    <Fragment>
      <ReactCSSTransitionGroup
        component='div'
        transitionName='TabsAnimation'
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Row>
          <Col md='12'>
            <Card className='main-card mb-3'>
              <CardBody>
              <Row>
                  <Col md="9">
                    <div className="card-header-info">
                      <div className="info">
                        <div className="title">Edit Student Details</div>
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
                      <Col md="12">
                        <Row>
                          <Col md="12">
                            
                            <FormGroup>
                              <Label
                                for="routeName"
                                className="customTitle"
                              >
                                Student Name
                              </Label>
                              <Input
                                type="text"
                                name="routeName"
                                id="routeName"
                                value={routeName.value}
                                onChange={handleRouteNameChange}
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
                    

                  </Row>
                  <Link className='close-button' to='/routeManagement/list'>
                    <Button color='secondary' className='mr-2 mt-4'>
                      Cancel
                    </Button>
                  </Link>
                  <Button color='primary' className='mt-4' disabled={loading}>
                    Edit
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

const mapStateToProps = (state, ownProps) => {
  return {
    schoolId: state.auth.user.result.userExist._id,
    routeId: ownProps.match.params.id,
    routes: state.route.route,
    students: state.student.student,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: (schoolId) => dispatch(fetchStudents(schoolId)),
    editRoute: (routeData, navigate, stopLoader) =>
      dispatch(editRoute(routeData, navigate, stopLoader)),
    setEmptyRoute: () => dispatch({ type: 'SET_EMPTY_ROUTE', payload: [] }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteEdit);
