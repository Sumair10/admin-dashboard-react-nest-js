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
  deletestudent,
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
    // fetchstudent,
    student,
    deletestudent,
    setEmptystudent,
    loader,
    removestudent,
    deletestudentCount,
  } = props;

  const history = useHistory();

  const [studentArray, setstudentArray] = useState([]);
  const [studentArrayReport, setstudentArrayReport] = useState([]);
  const forceUpdate = useState()[1].bind(null, {});
  const [localstudent, setlocalstudent] = useState([]);
  const [loading, setLoading] = useState(true);

  const [studentID, setstudentID] = useState("");
  const [searchstudent, setSearchstudent] = useState([]);
  const [initial, setInitial] = useState(true);
  const [modal, setModal] = useState(false);
  const [files, setFiles] = useState([]);

  const { data: student1, isPending, error } = useFetch(
    "http://localhost:3002/students?accessKey=12345"
  );
  console.log(student1);

  const searchHandler = (e) => {
    const { value } = e.target;
    setstudentID(value);
    const filteredArray = studentArray.filter((item) => {
      return (
        item.studentNo.substring(0, value.length).toLowerCase() ===
        value.toLowerCase()
      );
    });
    setSearchstudent(filteredArray);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(loader);
    }, 1000);
  }, [loader]);

  const columns = [
    {
      dataField: "studentID",
      text: "ID",
      sort: true,
    },
    {
      dataField: "studentName",
      text: "Video Name",
      sort: true,
    },
    {
      dataField: "studentClasses",
      text: "Class",
      sort: true,
    },

    {
      dataField: "studentLink",
      text: "Link",
      sort: true,
    },

    {
      dataField: "actions",
      isDummyField: true,
      align: "center",
      text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <div className="text-center">
            <button
              className="icon-button"
              onClick={() => {
                showstudent(row);
              }}
            >
              <i className="lnr-eye" />
            </button>
            <button
              className="icon-button"
              onClick={() => {
                editButton(row);
              }}
            >
              <i className="lnr-pencil" />
            </button>
            <DeleteModal
              className="delete-modal"
              name={`Bus No. ${row.busNo}`}
              deleteFunction={() => {
                deleteButton(row);
              }}
            />
          </div>
        );
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ];

  //   useEffect(() => {
  //     console.log("golden video updated", student);
  //     setlocalstudent(student);
  //     structureData();
  //     // }
  //     if (initial) {
  //       onStart();
  //       setInitial(false);
  //     }
  //   }, [student]);

  //   const onStart = () => {
  //     fetchBuses({ id: schoolId });
  //   };

  const editButton = (row) => {
    history.push(`/studentManagement/edit/${row._id}`);
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
  const [value, setValue] = useState();
  const deleteButton = (id) => {
    fetch("http://localhost:3002/students/" + id + "?accessKey=12345", {
      method: "DELETE",
    });

    // history.push(`/StudentsManagement/list`);
    // window.location.reload(`/studentManagement/list`);
    // setValue({})
    history.push(`/studentManagement/list`);

  };

  useEffect(() => {
   
  }, [deleteButton])
  const showstudent = (row) => {
    //console.log("show -->", row._id)
    history.push(`/studentManagement/student/${row._id}`);
  };

  const dataToShow = studentID ? searchstudent : studentArray;


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
            <Link className="router-link" to="/StudentsManagement/add">
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
                Add Student
              </Button>
            </Link>
          </div>
          <div style={{ width: dataToShow.length > 0 ? 240 : 0 }}>
            {/* <Search
            value={studentNo}
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
      ) : (
        <div>
          <table class="table table-striped ">
            <thead>
              <tr className="text-center justify-content-between">
                {/* <th scope="col">ID</th> */}
                <th scope="col">Student Name</th>
                {/* <th scope="col">Class</th>
                <th scope="col">Link</th> */}
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {student1 &&
                student1.map((students) => (
                  <tr class="data justify-content-between">
                    {/* <th scope="row">{students._id}</th> */}
                    <td>{students.student_name}</td>

                    <td>
                      <i
                        onClick={() => {
                          editButton();
                        }}
                        className="lnr-pencil"
                        style={{ fontSize: "16px", margin: "10px" }}
                      />
                      {/* <i className="lnr-trash" /> */}
                      <DeleteModal
                        className="delete-modal"
                        name={`Golden Video ${students._id}`}
                        deleteFunction={() => {
                          deleteButton(students._id);
                        }}
                        // link="#/studentManagement/list"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

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
