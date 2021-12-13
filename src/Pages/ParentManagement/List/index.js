import React, { Fragment, useState, useEffect } from "react";
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
  Modal,
  ModalBody,
  ListGroupItem,
  ListGroup,
  CardHeader,
  Collapse,
} from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import Dropzone from "react-dropzone";
import xlsxParser from "xlsx-parse-json";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { Loader as Load } from "react-loaders";
import ToolkitProvider, {
  Search as NewSearch,
} from "react-bootstrap-table2-toolkit";

import PageTitle from "../../../Layout/AppMain/PageTitle";
import ActionCenter from "../../../Layout/ActionCenter/ActionCenter";
import { Count, Search, Filter } from "../../../Layout/ActionCenter";
import "./List.scss";
import { Link, useHistory } from "react-router-dom";
import {
  fetchParents,
  deleteParent,
  revokeRegisteration,
  addMultipleParents,
} from "../../../store/actions/parentAction";
import { connect } from "react-redux";
import more from "../../../assets/utils/images/more.png";
import DeleteModal from "../../../common/components/DeleteModal";
import "xlsx";
import { ExportCSV } from "../../../common/components/ExportCSV/ExportCSV";
import PdfReportGenerator from "../../../common/components/PdfReportGenerator/PdfReportGenerator";

const { SearchBar } = NewSearch;
const fileDownload = require("js-file-download");
const template = [
  "Name(required)",
  "Email(required)",
  "Phone Number(required)",
];

const List = (props) => {
  const {
    schoolId,
    fetchParents,
    parents,
    deleteParent,
    revokeRegisteration,
    addMultipleParents,
    loader,
    setEmptyParent,
    removeParent,
  } = props;
  const [parentArray, setparentArray] = useState([]);
  const [parentArrayReport, setparentArrayReport] = useState([]);
  const forceUpdate = useState()[1].bind(null, {});
  const [localParents, setlocalParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [parent, setParent] = useState("");
  const [searchParent, setSearchParent] = useState([]);
  const [initial, setInitial] = useState(true);
  const [modal, setModal] = useState(false);
  const [files, setFiles] = useState([]);

  // const schoolPaymentStatusCheck = props.schoolPaymentStatus.subscriptionId
  //   ? true
  //   : false;

  const schoolPaymentStatusCheck = true;

  const searchHandler = (e) => {
    const { value } = e.target;
    setParent(value);
    const filteredArray = parentArray.filter((item) => {
      console.log("item in search -->", item);
      return (
        item.name.substring(0, value.length).toLowerCase() ===
        value.toLowerCase()
      );
    });
    setSearchParent(filteredArray);
  };

  // useEffect(() => {
  //   return () => {
  //     console.log("setting parents to empty");
  //     setEmptyParent();
  //   };
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(loader);
    }, 1000);
  }, [loader]);

  const defaultSorted = [
    {
      dataField: "name",
      order: "asc",
    },
  ];

  const parentColumns = [
    {
      dataField: "name",
      text: "Access Key Name",
      sort: true,
      // filter: textFilter()
    },
    {
      dataField: "name",
      text: "Access Key",
      sort: true,
      // filter: textFilter()
    },

    {
      dataField: "actions",
      isDummyField: true,
      text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <div className="text-center">
            {/* <button className="icon-button" onClick={() => { showChildren(row) }}>
              <i className="lnr-eye" />
            </button> */}
            <button
              className="icon-button"
              onClick={() => {
                editButton(row);
              }}
            >
              <i className="lnr-pencil" />
            </button>
            {/* <button className="icon-button" onClick={() => { deleteButton(row) }}>
              <i className="lnr-trash" />
            </button> */}
            <DeleteModal
              className="delete-modal"
              name={row.name}
              isParent={true}
              deleteFunction={() => {
                deleteButton(row);
              }}
            />
          </div>
        );
      },
    },
  ];

  const history = useHistory();

  useEffect(() => {
    console.log("parents =>", parents);
  }, [parents]);

  useEffect(() => {
    // if (!localParents.length && localParents.length !== parents.length) {
    setlocalParents(parents);
    structureData();
    // }
    if (initial) {
      onStart();
      setInitial(false);
    }
    return () => {};
  }, [parents, structureData]);

  const onStart = () => {
    fetchParents({ id: schoolId });
  };

  const structureData = () => {
    let i = 0;
    const remappedParent = parents.map((parent) => {
      i++;
      return {
        id: i,
        name: parent.name,
        email: parent.email,
        contact: parent.contact,
        childrenCount: parent.childrenCount,
        registered: parent.registered,
        _id: parent._id,
      };
    });

    const remappedParentReport = parents.map((parent) => {
      return {
        Name: parent.name ? parent.name : "---",
        Email: parent.email ? parent.email : "---",
        Contact: parent.contact ? parent.contact : "---",
        Address: parent.location.address ? parent.location.address : "---",
      };
    });

    console.log("remappedParent", remappedParent);
    console.log("remappedParentReport", remappedParentReport);
    setparentArray(remappedParent);
    setparentArrayReport(remappedParentReport);
  };

  const editButton = (row) => {
    // //console.log("edit -->", row._id)
    history.push(`/parentManagement/edit/${row._id}`);
  };

  const toggle = () => {
    console.log("Hello World");
    setModal(!modal);
  };

  const onDrop = (files) => {
    console.log("dropped files", files);
    setFiles(files);
    // this.setState({ files });
  };

  const onCancel = () => {
    // this.setState({
    //   files: []
    // });
    setFiles([]);
  };

  const handleUpload = async () => {
    let parentsData = [];
    const formattedParent = [];
    await xlsxParser.onFileSelection(files[0]).then((data) => {
      console.log("xlsxParser data", data);
      parentsData = data;
    });
    console.log("parentsData.Sheet1", parentsData);
    for (const parent of parentsData.in) {
      if (
        parent["Name(required)"] &&
        parent["Email(required)"] &&
        parent["Phone Number(required)"]
      ) {
        formattedParent.push({
          schoolId,
          name: parent["Name(required)"],
          email: parent["Email(required)"],
          contact: parent["Phone Number(required)"],
          deleted: false,
          registered: false,
          location: {
            address: "",
            latitude: 0,
            longitude: 0,
          },
        });
      }
    }

    console.log("formattedParent", formattedParent);

    addMultipleParents(formattedParent);
    toggle();
    //console.log(formattedParent)
  };

  const filesList = files.map((file) => (
    <ListGroupItem style={{ overflow: "hidden" }} key={file.name}>
      {file.name} - {file.size} bytes
    </ListGroupItem>
  ));

  const deleteButton = (row) => {
    // //console.log("delete -->", row._id);
    // const newParent = parentArray;
    // newParent.splice(
    //   newParent.findIndex((elem) => {
    //     return elem._id === row._id;
    //   }),
    //   1
    // );

    //console.log(newParent)
    // setparentArray(newParent);
    deleteParent({ id: row._id, email: row.email }, () =>
      removeParent(row._id)
    );
    // forceUpdate();
  };

  const revokeRegisterationButton = (row) => {
    //console.log("revoke registeration -->", row._id);
    revokeRegisteration({ id: row._id });
  };

  const sendLinkButton = (row) => {
    //console.log("send link -->", row._id)
  };

  const showChildren = (row) => {
    //console.log("show -->", row._id);
    history.push(`/parentManagement/children/${row._id}`);
  };

  const dataToShow = parent ? searchParent : parentArray;

  return (
    <Fragment>
      <ActionCenter>
        <div>
          <Count count={loading ? "0" : dataToShow.length} />
        </div>
        {/* <div>
                    <Filter title="Filter By" />
                </div> */}
        <div>
          {/* <AddButton /> */}
          <div style={{ display: "flex", flexDirection: "row" }}>
            
            
            <Link className="router-link" to="/parentManagement/add">
              <Button
                style={{ padding: "0.5rem" }}
                className="mr-2 btn-icon action-btn"
                color="primary"
                disabled={!schoolPaymentStatusCheck}
                
              >
                <i
                  className="pe-7s-plus btn-icon-wrapper mr-2"
                  style={{ fontSize: 17, fontWeight: "600" }}
                >
                  {" "}
                </i>
                Add Settings
              </Button>
            </Link>
          </div>
          <div style={{ width: dataToShow.length > 0 ? 240 : 0 }}>
           
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
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                {loading ? (
                  <div style={{ textAlign: "center" }}>
                    <Load type="ball-pulse" />
                  </div>
                ) : dataToShow.length > 0 ? (
                  <div className="table-responsive table-parent">
                  
                    <ToolkitProvider
                      bootstrap4
                      keyField="_id"
                      data={dataToShow}
                      columns={parentColumns}
                      filter={filterFactory()}
                      defaultSorted={defaultSorted}
                      search
                    >
                      {(props) => (
                        <div>
                          {/* <h3>Input something at below input field:</h3> */}
                          <SearchBar {...props.searchProps} />
                          {/* <hr /> */}
                          <BootstrapTable {...props.baseProps} />
                        </div>
                      )}
                    </ToolkitProvider>
                  </div>
                ) : (
                  <div className="no-content">No Parents Present</div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ReactCSSTransitionGroup>
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalBody>
          <div className="card-header-info">
            <div className="info">
              <div className="title">Add Multiple Parents</div>
              <div className="info-items">
                <div className="item">
                  Note: Upload an excel sheet consisting or following columns in
                  sequence. Or{" "}
                  <a
                    style={{ color: "#5667D8", cursor: "pointer" }}
                    onClick={() => {
                      fileDownload(template, "template.csv");
                    }}
                  >
                    download this templete
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Col md="8">
              <div className="dropzone-wrapper dropzone-wrapper-lg">
                <Dropzone onDrop={onDrop} onFileDialogCancel={onCancel}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="dropzone-content">
                        <p>
                          Upload an excel file which contains the data of
                          Parents
                        </p>
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
            </Col>
            <Col md="4">
              <b className="mb-2 d-block">Dropped Files</b>
              <ListGroup>{filesList}</ListGroup>
            </Col>
            <Col size="12" className="text-center">
              <Button
                disabled={!filesList.length}
                color="primary"
                className="mt-4"
                onClick={handleUpload}
              >
                Upload
              </Button>
            </Col>
          </Row>
          <div className="modal-close">
            <button className="close-button" onClick={toggle}>
              <i className="lnr-cross-circle"> </i>
            </button>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    auth: state.auth,
    schoolPaymentStatus: state.auth.user.result.userExist,
    schoolId: state.auth.user.result.userExist._id,
    parents: state.parent.parent,
    loader: state.parent.parent_loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchParents: (schoolId) => dispatch(fetchParents(schoolId)),
    deleteParent: (parentId, removeParent) =>
      dispatch(deleteParent(parentId, removeParent)),
    revokeRegisteration: (parentId) => dispatch(revokeRegisteration(parentId)),
    setEmptyParent: () => dispatch({ type: "SET_EMPTY_PARENT", payload: [] }),
    removeParent: (parentId) =>
      dispatch({ type: "REMOVE_PARENT", payload: parentId }),
    addMultipleParents: (parents) => dispatch(addMultipleParents(parents)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
