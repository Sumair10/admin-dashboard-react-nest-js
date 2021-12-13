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

// import "./settingAdd.scss";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
// import { addsetting } from "../../../../store/actions/settingAction";
// import { fetchUnassignedDrivers } from "../../../store/actions/driverAction";
// import { actionTypes } from "../../../../store/common/types";
// import Multiselect from "multiselect-react-dropdown";

function settingAdd(props) {
 

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [settingArray, setsettingArray] = useState([]);
  const [ClassesArray, setClassesArray] = useState([]);
  const [settingID, setsettingID] = useState({
    value: "",
  });

  const [settingAccessKeyName, setSettingAccessKeyName] = useState("");
  const [settingAccessKeyValue, setSettingAccessKeyValue] = useState("");
  
  const [isPending, setIsPending] = useState(false);

  // const handlesettingIDChange = (e) => {
  //   e.preventDefault();
  //   setsettingID({
  //     ...settingID,
  //     value: e.target.value,
  //   });
  // };
  // const handlesettingNameChange = (e) => {
  //   e.preventDefault();
  //   setsettingName({
  //     ...settingName,
  //     value: e.target.value,
  //   });
  // };
  // const handlesettingURLChange = (e) => {
  //   e.preventDefault();
  //   setsettingURL({
  //     ...settingURL,
  //     value: e.target.value,
  //   });
  // // };

  // const handlesettingClassesChange = (e) => {
  //   e.preventDefault();
  //   setsettingClasses({
  //     ...settingClasses,
  //     value: e.target.value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const settingData = {
  //     settingID: settingID.value,
  //     settingName: settingName.value,
  //     settingClasses: settingClasses.value,
  //     settingURL: settingURL.value,
  //     deleted: false,
  //   };
  //   console.log("settingData", settingData);
  //   history.push("/settingManagement/list");
  //   // addsetting(
  //   //   settingData,
  //   //   () => {
  //   //     history.push("/settingManagement/list");
  //   //     increasesettingCount();
  //   //   },
  //   //   () => setLoading(false)
  //   // );
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const setting = { settingAccessKeyName, settingAccessKeyValue };

    setIsPending(true);

    fetch("http://localhost:8004/setting", {
      method: "POST",
      headers: { "content-Type": " application/json" },
      body: JSON.stringify(setting),
    }).then(() => {
      console.log("data added successful");
      setIsPending(false);
      history.push("/SettingsManagement/list");
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
                    <div className="title">Add Settings</div>
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
                        <Label for="settingName">Access Key Name</Label>
                        <Input
                          name="settingName"
                          id="settingName"
                          value={settingAccessKeyName}
                          onChange={(e) => setSettingAccessKeyName(e.target.value)}
                          placeholder="Enter Access Key Name"
                          required
                          maxLength="20"
                        />
                        <FormFeedback>Access Key Name cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <Label for="settingName">Access Key Value</Label>
                        <Input
                          name="settingName"
                          id="settingName"
                          value={settingAccessKeyValue}
                          onChange={(e) => setSettingAccessKeyValue(e.target.value)}
                          placeholder="Enter Access Key Value"
                          required
                          maxLength="20"
                        />
                        <FormFeedback>Access Key Value cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>

                    
                  </Row>
                  <Link
                    className="close-button"
                    to="/settingManagement/list"
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

export default settingAdd;
