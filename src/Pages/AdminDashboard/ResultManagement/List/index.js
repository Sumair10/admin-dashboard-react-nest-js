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
import { Link, useHistory , useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  //   fetchBuses,
  deleteresult,
} from "../../../../store/actions/busAction";
import more from "../../../../assets/utils/images/more.png";
import DeleteModal from "./../../../../common/components/DeleteModal";
import { actionTypes } from "../../../../store/common/types";
// import useFetch from "../useFetch";

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
    // fetchresult,
    result,
    deleteresult,
    setEmptyresult,
    loader,
    removeresult,
    deleteresultCount,
  } = props;

  const history = useHistory();

  const [resultArray, setresultArray] = useState([]);
  const [resultArrayReport, setresultArrayReport] = useState([]);
  const forceUpdate = useState()[1].bind(null, {});
  const [localresult, setlocalresult] = useState([]);
  const [loading, setLoading] = useState(true);

  const [resultID, setresultID] = useState("");
  const [searchresult, setSearchresult] = useState([]);
  const [initial, setInitial] = useState(true);
  const [modal, setModal] = useState(false);
  const [files, setFiles] = useState([]);

//   const { data: result1, isPending, error } = useFetch(
//     "http://localhost:8000/result"
//   );
//   console.log(result1);

  const searchHandler = (e) => {
    const { value } = e.target;
    setresultID(value);
    const filteredArray = resultArray.filter((item) => {
      return (
        item.resultNo.substring(0, value.length).toLowerCase() ===
        value.toLowerCase()
      );
    });
    setSearchresult(filteredArray);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(loader);
    }, 1000);
  }, [loader]);

//   const columns = [
//     {
//       dataField: "resultID",
//       text: "ID",
//       sort: true,
//     },
//     {
//       dataField: "resultName",
//       text: "Video Name",
//       sort: true,
//     },
//     {
//       dataField: "resultClasses",
//       text: "Class",
//       sort: true,
//     },

//     {
//       dataField: "resultLink",
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
//                 showresult(row);
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
  //     console.log("golden video updated", result);
  //     setlocalresult(result);
  //     structureData();
  //     // }
  //     if (initial) {
  //       onStart();
  //       setInitial(false);
  //     }
  //   }, [result]);

  //   const onStart = () => {
  //     fetchBuses({ id: schoolId });
  //   };

  const editButton = (row) => {
    history.push(`/resultManagement/edit/${row._id}`);
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
    // fetch("http://localhost:8000/result/" + id , {
    //   method : "DELETE"
    // })
    
    // .then(()=>{
    //   history.push("/ResultManagement/list")
    //  })
     
  
    
  };

  const showresult = (row) => {
    //console.log("show -->", row._id)
    history.push(`/resultManagement/result/${row._id}`);
  };

  const dataToShow = resultID ? searchresult : resultArray;

  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((json) => console.log(json));

  return (
    <Fragment>
      <ActionCenter>
        {" "}
       
        <div>
          {/* <AddButton /> */}
          <div>
     
          </div>
          <div style={{ width: dataToShow.length > 0 ? 240 : 0 }}>
            {/* <Search
            value={resultNo}
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
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Student Name</th>
                <th scope="col">User ID</th>
                <th scope="col">Dance ID</th>
                <th scope="col">Similarity Score</th>
                <th scope="col">Result URL</th>
                <th scope="col">Points Names</th>
                <th scope="col">Input Points</th>
                <th scope="col">Golden Points</th>
                <th scope="col">AI Comments</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {result &&
                result.map((results) => (
                  <tr class="data">
                    <th scope="row">{results.id}</th>
                    <td>{results.resultName}</td>
                    <td>{results.resultClasses}</td>
                    <td>{results.resultURL}</td>
                    <td>
                    <DeleteModal
              className="delete-modal"
              name={`Golden Video ${results.id}`}
              deleteFunction={() => {
                deleteButton(results.id );
              }}
              // link="#/resultManagement/list"
            />
                      <i className="lnr-eye" />
                      <i className="lnr-pencil" />
                      <i className="lnr-trash" />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      }
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
