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

import "./ParentEdit.scss";
import { Link, useHistory } from "react-router-dom";
import { addDriver } from "../../../store/actions/driverAction";
import { connect } from "react-redux";
import { editParent } from "../../../store/actions/parentAction";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import MyGoogleMap from "../../../common/components/LocationPicker/MyGoogleMap";
import "../../../common/components/LocationPicker/LocationPicker.css";

const ParentEdit = (props) => {
  const { parents, editParent, parentId, schoolId, setEmptyParent } = props;
  const history = useHistory();
  var currentParent = parents.filter((parent) => {
    return parent._id === parentId;
  });

  const [parent, setParent] = useState({});
  const [locationModal, setLocationModal] = useState(false);

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

  const [oldEmail, setOldEmail] = useState("");

  useEffect(() => {
    // currentParent = parents.filter((parent) => {
    //   return parent._id === parentId;
    // });

    console.log(Object.keys(currentParent[0].location).length);
    if (currentParent[0].location.address != "") {
      setLocation({
        address: currentParent[0].location.address,
        latitude: currentParent[0].location.latitude,
        longitude: currentParent[0].location.longitude,
      });
    }

    setParent(currentParent[0]);

    setName({
      value: currentParent[0].name,
    });
    setContact({
      value: currentParent[0].contact,
    });
    setEmail({
      value: currentParent[0].email,
    });
    setOldEmail(currentParent[0].email);
    return () => {};
  }, []);

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
      ...loc,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const parentData = {
      id: parentId,
      parent: {
        name: name.value,
        email: email.value.toLowerCase(),
        contact: contact.value,
        location: { ...location },
        //////// registered flag commented - will set registered to false if parent's email changes
        // registered: parent.registered
        //   ? oldEmail === email.value.toLowerCase()
        //   : false,
      },
    };

    console.log(parentData.parent.registered);

    editParent(
      parentData,
      () => {
        // setTimeout(() => {
        history.push("/parentManagement/list");
        // }, 2000)
      },
      () => setLoading(false)
    );
    setEmptyParent();
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
                    <div className="title">Edit Parent Details</div>
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
                          placeholder="Access Key Name"
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
                          placeholder="Access Key"
                          maxLength="20"
                        />
                        <FormFeedback>Name cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>

                    
                  </Row>
                  <Link className="close-button" to="/parentManagement/list">
                    <Button color="secondary" className="mr-2 mt-1">
                      Cancel
                    </Button>
                  </Link>
                  <Button color="primary" className="mt-1" disabled={loading}>
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
    parentId: ownProps.match.params.id,
    parents: state.parent.parent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editParent: (parentData, navigate, stopLoader) =>
      dispatch(editParent(parentData, navigate, stopLoader)),
    setEmptyParent: () => dispatch({ type: "SET_EMPTY_PARENT", payload: [] }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParentEdit);
