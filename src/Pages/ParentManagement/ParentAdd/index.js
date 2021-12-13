import React, { Fragment, useEffect, useState } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
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
} from "reactstrap";

import "./ParentAdd.scss";
import { Link, useHistory } from "react-router-dom";
import { addDriver } from "../../../store/actions/driverAction";
import { connect } from "react-redux";
import { addParent } from "../../../store/actions/parentAction";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import MyGoogleMap from "../../../common/components/LocationPicker/MyGoogleMap";
import "../../../common/components/LocationPicker/LocationPicker.css";

const ParentAdd = (props) => {
  const { parents, addParent, parentId, schoolId, setEmptyParent } = props;
  const history = useHistory();
  let currentParent = [];
  let parent = {};

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState({
    value: "",
  });
  const [contact, setContact] = useState({
    value: "",
  });
  const [email, setEmail] = useState({
    value: "",
  });
  const [location, setLocation] = useState({
    address: "",
    latitude: 0,
    longitude: 0,
  });

  // useEffect(() => {

  //   currentParent = parents.filter(parent => {
  //     return parent._id === parentId
  //   })

  //   parent = currentParent[0];

  //   setName({
  //     value: parent.name,
  //   });
  //   setContact({
  //     value: parent.contact,
  //   });
  //   setEmail({
  //     value: parent.email,
  //   });
  //   return () => {

  //   }
  // }, [])

  const handleNameChange = (e) => {
    e.preventDefault();
    setName({
      ...name,
      value: e.target.value,
    });
  };
  const handleContactChange = (e) => {
    // e.preventDefault();
    setContact({
      ...contact,
      value: e,
    });
  };
  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail({
      ...email,
      value: e.target.value,
    });
  };

  const handleLocationChange = (loc) => {
    setLocation({
      ...location,
      ...loc
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const parentData = {
      schoolId: schoolId,
      deleted: false,
      registered: false,
      name: name.value,
      email: email.value.toLowerCase(),
      contact: contact.value,
      deleted: false,
      location: { ...location }
    };
    addParent(
      parentData,
      () => {
        // setTimeout(() => {
        history.push("/parentManagement/list");
        // }, 2000)
      },
      () => setLoading(false)
    );
    setEmptyParent();
    // setTimeout(() => {
    //   history.push("/parentManagement/list");

    // }, 2000)
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
                    <div className="title">Add Parent Details</div>
                  </div>
                  <div className="action">
                    <Link className="close-button" to="/parentManagement/list">
                      <i className="lnr-cross-circle"> </i>
                    </Link>
                  </div>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label for="name">Access Key Name</Label>
                        <Input
                          name="name"
                          id="name"
                          value={name.value}
                          onChange={handleNameChange}
                          required
                          placeholder="Enter Access Key Name"
                          maxLength="20"
                        />
                        <FormFeedback>Name cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <Label for="name">Access Key</Label>
                        <Input
                          name="name"
                          id="name"
                          value={name.value}
                          onChange={handleNameChange}
                          required
                          placeholder="Enter Access Key"
                          maxLength="20"
                        />
                        <FormFeedback>Name cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>
                   
                 
                   
                  </Row>
                  <Link className='close-button' to='/parentManagement/list'>
                    <Button color='secondary' className='mr-2 mt-1'>
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

const mapStateToProps = (state, ownProps) => {
  return {
    schoolId: state.auth.user.result.userExist._id,
    parentId: ownProps.match.params.id,
    parents: state.parent.parent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addParent: (parentData, navigate, stopLoader) =>
      dispatch(addParent(parentData, navigate, stopLoader)),
    setEmptyParent: () => dispatch({ type: "SET_EMPTY_PARENT", payload: [] }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParentAdd);
