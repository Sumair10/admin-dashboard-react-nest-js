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

// import "./GoldenVideoAdd.scss";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { connect } from "react-redux";
// import { addGoldenVideo } from "../../../../store/actions/goldenVideoAction";
// import { fetchUnassignedDrivers } from "../../../store/actions/driverAction";
// import { actionTypes } from "../../../../store/common/types";
// import Multiselect from "multiselect-react-dropdown";
import useFetch from "../useFetch";
function GoldenVideoEdit(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [goldenVideoArray, setgoldenVideoArray] = useState([]);
  const [ClassesArray, setClassesArray] = useState([]);
  const [goldenVideoID, setGoldenVideoID] = useState({
    value: "",
  });
  const [video_name, setGoldenVideoName] = useState("");
  const [video_class, setGoldenVideoClasses] = useState("");
  const [video, setGoldenVideoURL] = useState("");
  const [isPending, setIsPending] = useState(false);
  //   const location = useLocation();
  //   const id =location.state.detail
  //   console.log(id)
  const { id } = useParams();
  console.log(id);

  const { data: goldenVideo2 } = useFetch(
    "http://localhost:3002/goldenVideos/"+id+"?accessKey=12345"
  );
  useEffect(() => {
    if (goldenVideo2) {
      setGoldenVideoName(goldenVideo2.video_name);
      setGoldenVideoClasses(goldenVideo2.video_class);
    }
    console.log(goldenVideo2)
    // console.log(goldenVideo2.video_name)
  }, [goldenVideo2]);

  // console.log(goldenVideo2.video_name);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const goldenVideo = { video_name, video_class, video };

    setIsPending(true);

    fetch("http://localhost:3002/goldenVideos/"+id+"?accessKey=12345", {
      method: "PATCH",
      headers: { "content-Type": " application/json" },
      body: JSON.stringify(goldenVideo),
    }).then(() => {
      console.log("data edit successful");
      setIsPending(false);
      history.push("/goldenVideoManagement/list");
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
          {goldenVideo2 && 

            <Card className="main-card mb-3">
              {goldenVideo2 && (
                <CardBody>
                  <div className="card-header-info">
                    <div className="info">
                      <div className="title">Edit Golden Video</div>
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
                          <Label for="goldenVideoName">Video Name</Label>
                          <Input
                            type="text"
                            name="goldenVideoName"
                            id="goldenVideoName"
                            defaultValue={video_name}
                            onChange={(e) => setGoldenVideoName(e.target.value)}
                            placeholder="Enter Video Name"
                            required
                            maxLength="20"
                          />
                          <FormFeedback>
                            Video Name cannot be empty
                          </FormFeedback>
                        </FormGroup>
                      </Col>

                      <Col md="12">
                        <FormGroup>
                          <Label for="goldenVideoClasses">Class</Label>
                          <Input
                            type="select"
                            name="goldenVideoClasses"
                            id="goldenVideoClasses"
                            onChange={(e) =>
                              setGoldenVideoClasses(e.target.value)
                            }
                            defaultValue={video_class}
                          >
                            <option selected  value={video_class}>
                              {video_class}
                            </option>
                            <option value="Pop">Pop</option>
                            <option value="Traditional">Traditional</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      {/* 
                    <Col md="12">
                      <FormGroup>
                        <Label for="insurance"> Video URL</Label>

                        <input
                          type="file"
                          class="form-control"
                          id="goldenVideoURL"
                          defaultValue={goldenVideoURL}
                          onChange={(e) => setGoldenVideoURL(e.target.value)}
                          required
                        />
                        <FormFeedback>Video URL cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col> */}
                    </Row>
                    <Link
                      className="close-button"
                      to="/goldenVideoManagement/list"
                    >
                      <Button color="secondary" className="mr-2 mt-1">
                        Cancel
                      </Button>
                    </Link>
                    <Button color="primary" className="mt-1" disabled={loading}>
                      Update
                    </Button>
                  </Form>
                </CardBody>
              )}
            </Card>
          }
          </Col>
        </Row>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
}

export default GoldenVideoEdit;
