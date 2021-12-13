import React, { Fragment, useEffect, useState } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Modal,
  ModalBody,
  ListGroupItem,
  ListGroup,
} from "reactstrap";
import { Loader as Load } from "react-loaders";

import BootstrapTable from "react-bootstrap-table-next";
import Dropzone from "react-dropzone";
import xlsxParser from "xlsx-parse-json";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, {
  Search as NewSearch,
} from "react-bootstrap-table2-toolkit";

import PageTitle from "../../../../Layout/AppMain/PageTitle";
import ActionCenter from "../../../../Layout/ActionCenter/ActionCenter";
import { Count, Search } from "../../../../Layout/ActionCenter";
import "./List.scss";
import { Link, useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  //   fetchBuses,
  deleteGoldenVideo,
} from "../../../../store/actions/busAction";
import more from "../../../../assets/utils/images/more.png";
import DeleteModal from "./../../../../common/components/DeleteModal";
import { actionTypes } from "../../../../store/common/types";
import useFetch from "../useFetch";

const { SearchBar } = NewSearch;
// const { id } = useParams();
// console.log(id)
const template = [
  "Golden Video Name(required)",
  "Golden Video Type(required)",
  "Golden Video URL(required)",
];

function List(props) {
  const {
    // fetchGoldenVideo,
    goldenVideo,
    deleteGoldenVideo,
    setEmptyGoldenVideo,
    loader,
    removeGoldenVideo,
    deleteGoldenVideoCount,
  } = props;

  const history = useHistory();

  const [goldenVideoArray, setGoldenVideoArray] = useState([]);
  const [goldenVideoArrayReport, setGoldenVideoArrayReport] = useState([]);
  const forceUpdate = useState()[1].bind(null, {});
  const [localGoldenVideo, setlocalGoldenVideo] = useState([]);
  const [loading, setLoading] = useState(true);

  const [goldenVideoID, setGoldenVideoID] = useState("");
  const [searchGoldenVideo, setSearchGoldenVideo] = useState([]);
  const [initial, setInitial] = useState(true);
  const [modal, setModal] = useState(false);
  const [files, setFiles] = useState([]);

  const { data: goldenVideo1, isPending, error } = useFetch(
    "http://localhost:3002/goldenVideos?accessKey=12345"
  );
  console.log(goldenVideo1);

  const searchHandler = (e) => {
    const { value } = e.target;
    setGoldenVideoID(value);
    const filteredArray = goldenVideoArray.filter((item) => {
      return (
        item.goldenVideoNo.substring(0, value.length).toLowerCase() ===
        value.toLowerCase()
      );
    });
    setSearchGoldenVideo(filteredArray);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(loader);
    }, 1000);
  }, [loader]);

  // const columns = [
  //   {
  //     dataField: "goldenVideoID",
  //     text: "ID",
  //     sort: true,
  //   },
  //   {
  //     dataField: "goldenVideoName",
  //     text: "Video Name",
  //     sort: true,
  //   },
  //   {
  //     dataField: "goldenVideoClasses",
  //     text: "Class",
  //     sort: true,
  //   },

  //   {
  //     dataField: "goldenVideoLink",
  //     text: "Link",
  //     sort: true,
  //   },

  //   {
  //     dataField: "actions",
  //     isDummyField: true,
  //     align: "center",
  //     text: "Actions",
  //     formatter: (cellContent, row) => {
  //       return (
  //         <div className="text-center">
  //           <button
  //             className="icon-button"
  //             onClick={() => {
  //               showGoldenVideo(row);
  //             }}
  //           >
  //             <i className="lnr-eye" />
  //           </button>
  //           <button
  //             className="icon-button"
  //             onClick={() => {
  //               editButton(row);
  //             }}
  //           >
  //             <i className="lnr-pencil" />
  //           </button>
  //           <DeleteModal
  //             className="delete-modal"
  //             name={`Bus No. ${row.busNo}`}
  //             deleteFunction={() => {
  //               deleteButton(row);
  //             }}
  //           />
  //         </div>
  //       );
  //     },
  //   },
  // ];

  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ];

  //   useEffect(() => {
  //     console.log("golden video updated", goldenVideo);
  //     setlocalGoldenVideo(goldenVideo);
  //     structureData();
  //     // }
  //     if (initial) {
  //       onStart();
  //       setInitial(false);
  //     }
  //   }, [goldenVideo]);

  //   const onStart = () => {
  //     fetchBuses({ id: schoolId });
  //   };

  // const editButton = (id) => {
  //   history.push({
  //     pathname: `/goldenVideoManagement/edit/${id}`,
  //     state: { detail: goldenVideo1.filter((video) => id === video.id)[0] },
  //   });
  // };

  const toggle = () => {
    console.log("Hello World");
    setModal(!modal);
  };
  const onCancel = () => {
    // this.setState({
    //   files: []
    // });
    setFiles([]);
  };

  const deleteButton = (id) => {
    fetch("http://localhost:3002/goldenVideos/" + id + "?accessKey=12345", {
      method: "DELETE",
    }).then(() => {
      history.push("/goldenVideoManagement/list");
    });
  };

  const showGoldenVideo = (row) => {
    //console.log("show -->", row._id)
    history.push(`/goldenVideoManagement/goldenVideo/${row._id}`);
  };

  const dataToShow = goldenVideoID ? searchGoldenVideo : goldenVideoArray;

  
  return (
    <Fragment>
      <ActionCenter>
        {" "}
        <div>
          <Count count={loading ? "0" : dataToShow.length} />
        </div>
        <div>
          {/* <AddButton /> */}
          <div>
            <Link className="router-link" to="/goldenVideoManagement/add">
              <Button
                style={{ padding: "0.5rem" }}
                className="mr-2 btn-icon action-btn"
                color="primary"
              >
                {" "}
                <i
                  className="pe-7s-plus btn-icon-wrapper mr-2"
                  style={{ fontSize: 17, fontWeight: "600" }}
                >
                  {" "}
                </i>
                Add Golden Videos
              </Button>
            </Link>
          </div>
          <div style={{ width: dataToShow.length > 0 ? 240 : 0 }}>
            {/* <Search
            value={goldenVideoNo}
            onChange={searchHandler}
            placeholder="Search Golden Video"
          /> */}
          </div>
        </div>
      </ActionCenter>
      <ReactCSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <Load type="ball-pulse" />
          </div>
        ) : (
          <div>
            <table class="table table-striped ">
              <thead>
                <tr className="text-center">
                  {/* <th scope="col">ID</th> */}
                  <th scope="col">Video Name</th>
                  <th scope="col">Class</th>
                  <th scope="col">Link</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {goldenVideo1 &&
                  goldenVideo1.map((goldenVideos) => (
                    <tr class="data">
                      {/* <th scope="row">{goldenVideos._id}</th> */}
                      <td>{goldenVideos.video_name}</td>
                      <td>{goldenVideos.video_class}</td>
                      <td>{goldenVideos.video}</td>
                      <td>
                        <i
                          className="lnr-eye"
                          style={{ fontSize: "16px", margin: "10px" }}
                        />
                        <Link to= {`/goldenVideoManagement/edit/${goldenVideos._id}`}>
                        <i
                          className="lnr-pencil"
                          style={{ fontSize: "16px", margin: "10px" }}
                        />
                        </Link>
                        <DeleteModal
                          className="delete-modal"
                          name={`Golden Video ${goldenVideos.id}`}
                          deleteFunction={() => {
                            deleteButton(goldenVideos._id);
                          }}
                          // link="#/goldenVideoManagement/list"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </ReactCSSTransitionGroup>
      {/* <ReactCSSTransitionGroup
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
                {loader || loading ? (
                  <div style={{ textAlign: "center" }}>
                    <Load type="ball-pulse" />
                  </div>
                ) :
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Class</th>
                        <th scope="col">Link</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>Otto</td>
                        <td>
                        <i className="lnr-eye" />
                        <i className="lnr-pencil" />
                        <i className="lnr-trash" />
                        </td>
                      </tr>
                      
                    </tbody>
                  </table>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ReactCSSTransitionGroup> */}
    </Fragment>
  );
}

export default List;
