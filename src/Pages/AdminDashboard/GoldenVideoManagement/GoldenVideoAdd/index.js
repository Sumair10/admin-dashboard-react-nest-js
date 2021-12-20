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

import "./GoldenVideoAdd.scss";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";

function GoldenVideoAdd(props) {
  const accessKey = 12345;
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

  // const handleGoldenVideoIDChange = (e) => {
  //   e.preventDefault();
  //   setGoldenVideoID({
  //     ...goldenVideoID,
  //     value: e.target.value,
  //   });
  // };
  // const handleGoldenVideoNameChange = (e) => {
  //   e.preventDefault();
  //   setGoldenVideoName({
  //     ...goldenVideoName,
  //     value: e.target.value,
  //   });
  // };
  // const handleGoldenVideoURLChange = (e) => {
  //   e.preventDefault();
  //   setGoldenVideoURL({
  //     ...goldenVideoURL,
  //     value: e.target.value,
  //   });
  // // };

  // const handleGoldenVideoClassesChange = (e) => {
  //   e.preventDefault();
  //   setGoldenVideoClasses({
  //     ...goldenVideoClasses,
  //     value: e.target.value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const goldenVideoData = {
  //     goldenVideoID: goldenVideoID.value,
  //     goldenVideoName: goldenVideoName.value,
  //     goldenVideoClasses: goldenVideoClasses.value,
  //     goldenVideoURL: goldenVideoURL.value,
  //     deleted: false,
  //   };
  //   console.log("goldenVideoData", goldenVideoData);
  //   history.push("/goldenVideoManagement/list");
  //   // addGoldenVideo(
  //   //   goldenVideoData,
  //   //   () => {
  //   //     history.push("/goldenVideoManagement/list");
  //   //     increaseGoldenVideoCount();
  //   //   },
  //   //   () => setLoading(false)
  //   // );
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const goldenVideo = { accessKey, video_name, video_class, video };
    console.log(goldenVideo);
    setIsPending(true);

    fetch("http://localhost:3002/goldenVideos", {
      method: "POST",
      headers: { "content-Type": " application/json" },
      body: JSON.stringify(goldenVideo),
    }).then(() => {
      console.log("data added successful");
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
                    <Col md="12">
                      <FormGroup>
                        <Label for="goldenVideoName">Video Name</Label>
                        <Input
                          name="goldenVideoName"
                          id="goldenVideoName"
                          value={video_name}
                          onChange={(e) => setGoldenVideoName(e.target.value)}
                          placeholder="Enter Video Name"
                          required
                          maxLength="20"
                        />
                        <FormFeedback>Video Name cannot be empty</FormFeedback>
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
                          value={video_class}
                        >
                          <option selected disabled value="">
                            Select Video Class
                          </option>
                          <option value="Pop">Pop</option>
                          <option value="Traditional">Traditional</option>
                        </Input>
                      </FormGroup>

                      {/* {nanny.value ? (
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
                        {/* <i className="lnr-cross btn-icon-wrapper"> </i>
                        <i className="lnr-cross-circle"> </i>
                      </span>
                    ) : null} */}
                    </Col>

                    {/* <Col md="12">
                      <FormGroup>
                        <Label for="insurance"> Video URL</Label>

                        <input
                          type="file"
                          class="form-control"
                          id="goldenVideoURL"
                          value={video}
                          onChange={(e) => setGoldenVideoURL(e.target.value)}
                          required
                        />
                        <FormFeedback>Video URL cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col> */}
                    <Col md="12">
                      <FormGroup>
                        <Label for="insurance"> Video URL</Label>

                        <Dropzone
                          onDrop={(acceptedFiles) => console.log(acceptedFiles)}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <section>
                              <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>
                                  Drag 'n' drop some files here, or click to
                                  select files
                                </p>
                              </div>
                            </section>
                          )}
                        </Dropzone>
                        <FormFeedback>Video URL cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>
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

export default GoldenVideoAdd;
