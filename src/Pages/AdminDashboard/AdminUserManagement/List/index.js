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
  deleteadminUser,
} from "../../../../store/actions/busAction";
import more from "../../../../assets/utils/images/more.png";
import DeleteModal from "./../../../../common/components/DeleteModal";
import { actionTypes } from "../../../../store/common/types";
import useFetch from "../../GoldenVideoManagement/useFetch";

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
    // fetchadminUser,
    adminUser,
    deleteadminUser,
    setEmptyadminUser,
    loader,
    removeadminUser,
    deleteadminUserCount,
  } = props;

  const history = useHistory();

  const [adminUserArray, setadminUserArray] = useState([]);
  const [adminUserArrayReport, setadminUserArrayReport] = useState([]);
  const forceUpdate = useState()[1].bind(null, {});
  const [localadminUser, setlocaladminUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const [adminUserID, setadminUserID] = useState("");
  const [searchadminUser, setSearchadminUser] = useState([]);
  const [initial, setInitial] = useState(true);
  const [modal, setModal] = useState(false);
  const [files, setFiles] = useState([]);

  const { data: adminUser1, isPending, error } = useFetch(
    "http://localhost:3002/adminUsers?accessKey=12345"
  );
  console.log(adminUser1);

  const searchHandler = (e) => {
    const { value } = e.target;
    setadminUserID(value);
    const filteredArray = adminUserArray.filter((item) => {
      return (
        item.adminUserNo.substring(0, value.length).toLowerCase() ===
        value.toLowerCase()
      );
    });
    setSearchadminUser(filteredArray);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(loader);
    }, 1000);
  }, [loader]);

  //   const columns = [
  //     {
  //       dataField: "adminUserID",
  //       text: "ID",
  //       sort: true,
  //     },
  //     {
  //       dataField: "adminUserName",
  //       text: "Video Name",
  //       sort: true,
  //     },
  //     {
  //       dataField: "adminUserClasses",
  //       text: "Class",
  //       sort: true,
  //     },

  //     {
  //       dataField: "adminUserLink",
  //       text: "Link",
  //       sort: true,
  //     },

  //     {
  //       dataField: "actions",
  //       isDummyField: true,
  //       align: "center",
  //       text: "Actions",
  //       formatter: (cellContent, row) => {
  //         return (
  //           <div className="text-center">
  //             <button
  //               className="icon-button"
  //               onClick={() => {
  //                 showadminUser(row);
  //               }}
  //             >
  //               <i className="lnr-eye" />
  //             </button>
  //             <button
  //               className="icon-button"
  //               onClick={() => {
  //                 editButton(row);
  //               }}
  //             >
  //               <i className="lnr-pencil" />
  //             </button>
  //             <DeleteModal
  //               className="delete-modal"
  //               name={`Bus No. ${row.busNo}`}
  //               deleteFunction={() => {
  //                 deleteButton(row);
  //               }}
  //             />
  //           </div>
  //         );
  //       },
  //     },
  //   ];

  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ];

  //   useEffect(() => {
  //     console.log("golden video updated", adminUser);
  //     setlocaladminUser(adminUser);
  //     structureData();
  //     // }
  //     if (initial) {
  //       onStart();
  //       setInitial(false);
  //     }
  //   }, [adminUser]);

  //   const onStart = () => {
  //     fetchBuses({ id: schoolId });
  //   };

  const editButton = (row) => {
    history.push(`/AdminUserManagement/edit/${row._id}`);
  };

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
    console.log(id)
    fetch("http://localhost:3002/adminUsers/"+id+"?accessKey=12345", {
      method: "DELETE",
    }).then(() => {
      history.push("/AdminUserManagement/list");
    });
  };

  const showadminUser = (row) => {
    //console.log("show -->", row._id)
    history.push(`/AdminUserManagement/adminUser/${row._id}`);
  };

  const dataToShow = adminUserID ? searchadminUser : adminUserArray;

  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((json) => console.log(json));

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
            <Link className="router-link" to="/adminUserManagement/add">
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
                Add User Admin
              </Button>
            </Link>
          </div>
          <div style={{ width: dataToShow.length > 0 ? 240 : 0 }}>
            {/* <Search
            value={adminUserNo}
            onChange={searchHandler}
            placeholder="Search Golden Video"
          /> */}
          </div>
        </div>
      </ActionCenter>
      {loading ? (
                        <div style={{ textAlign: "center" }}>
                          <Load type="ball-pulse" />
                        </div>
                      ) :
      <div>
        <table class="table table-striped">
          <thead>
            <tr className="text-center">
              {/* <th scope="col">ID</th> */}
              <th scope="col">Admin Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {adminUser1 &&
              adminUser1.map((adminUsers) => (
                <tr class="data">
                  {/* <th scope="row">{adminUsers._id}</th> */}
                  <td>{adminUsers.adminUser_name}</td>

                  <td>
                  <i
                      className="lnr-pencil"
                      style={{ fontSize: "16px", margin: "10px" }}
                    />
                    <DeleteModal
                      className="delete-modal"
                      name={`Golden Video ${adminUsers.id}`}
                      deleteFunction={() => {
                        deleteButton(adminUsers._id);
                      }}
                      // link="#/adminUserManagement/list"
                    />
                 
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>}

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
