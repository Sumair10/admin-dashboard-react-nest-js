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
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  FormText,
} from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import PageTitle from "../../../Layout/AppMain/PageTitle";
import ActionCenter from "../../../Layout/ActionCenter/ActionCenter";
import { Count, Search } from "../../../Layout/ActionCenter";
import "./StudentEdit.scss";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import UploadBulk from "../UploadBulkModal/UploadBulk";
import { addStudent, editStudent } from "../../../store/actions/studentAction";
import { connect } from "react-redux";
import { fetchParents } from "../../../store/actions/parentAction";
import MyGoogleMap from "../../../common/components/LocationPicker/MyGoogleMap";
import "../../../common/components/LocationPicker/LocationPicker.css";
import Multiselect from "multiselect-react-dropdown";
// import * as utils from './../../../common/utils'

const StudentEdit = (props) => {
  const { schoolId, editStudent, buses, studentId, students, parents } = props;
  const history = useHistory();

  const currentStudent = students.filter((student) => {
    return student._id === studentId;
  });

  const student = currentStudent[0];

  const [loading, setLoading] = useState(false);
  const [locationModal, setLocationModal] = useState(false);


  // student details
  var [SelectedGuardians,setSelectedGuardians] =useState([])
  const [studentss, setStudent] = useState({});
  const [name, setName] = useState({
    value: "",
  });
  const [rollNo, setRollNo] = useState({
    value: "",
  });
  const [date, setDate] = useState({
    value: "",
  });
  const [grade, setGrade] = useState({
    value: "",
  });
  const [street, setStreet] = useState({
    value: "",
  });
  const [town, setTown] = useState({
    value: "",
  });
  const [address, setAddress] = useState({
    value: "",
  });
  const [parentId, setParentId] = useState({
    value: "",
  });
  const [regNo, setRegNo] = useState({
    value: '',
  });
  const [location, setLocation] = useState({
    address: "",
    latitude: 0,
    longitude: 0,
  });


  //student medical record
  const [bloodGroup, setBloodGroup] = useState({
    value: '',
  });
  const [insuranceId, setInsuranceId] = useState({
    value: '',
  });
  const [medicalInstructions, setMedicalInstructions] = useState({
    value: '',
  });

  useEffect(() => {
    props.fetchParents({ id: schoolId });
    if(student.location)
    console.log(Object.keys(student.location).length);
    if (student.location && student.location.address != "") {
      setLocation({
        address: student.location.address,
        latitude: student.location.latitude,
        longitude: student.location.longitude,
      });
    }

    if (student) {
      if(student && student.dob)
      {
        const dobUpdate = student.dob.replace(/\//g, "-");
        const dobDate = dobUpdate.split("-");
        setDate({ value: new Date(dobDate[2], dobDate[1] - 1, dobDate[0]) });
      }
      setStudent(student);
      console.log("student", student);
      setName({ value: student.name });
      setRollNo({ value: student.studentId });
      setGrade({ value: student.class });
      setStreet({ value: student.street });
      setTown({ value: student.town });
      setAddress({ value: student.address });
      setBloodGroup({ value: student.bloodGroup ? student.bloodGroup : '' }) 
      setInsuranceId({ value: student.insuranceId ? student.insuranceId : '' })
      setMedicalInstructions({ value: student.medicalInstructions ? student.medicalInstructions : '' })
      setRegNo({ value: student.registrationNo });
      setParentId({ value: student.parentId ? student.parentId._id : null });
      setSelectedGuardians([...student.guardians])
    }
  }, [student]);

  useEffect(() => {
   console.log("SelectedGuardians",SelectedGuardians)
  }, [SelectedGuardians])

  // details handle methods
  
  const handlemultiSelector = (e) => {
    setSelectedGuardians(e)
    console.log("e array",e)
    // SelectedGuardians = e.map((item) => item._id)
    console.log("SelectedGuardians",SelectedGuardians)
  }
  const handleNameChange = (e) => {
    e.preventDefault();
    setName({
      ...name,
      value: e.target.value,
    });
  };
  const handleRollNoChange = (e) => {
    e.preventDefault();
    setRollNo({
      ...rollNo,
      value: e.target.value,
    });
  };
  const handleDateChange = (date) => {
    setDate({
      value: date,
    });
  };
  const handleGradeChange = (e) => {
    e.preventDefault();
    setGrade({
      ...grade,
      value: e.target.value,
    });
  };
  const handleStreetChange = (e) => {
    e.preventDefault();
    setStreet({
      ...street,
      value: e.target.value,
    });
  };
  const handleTownChange = (e) => {
    e.preventDefault();
    setTown({
      ...town,
      value: e.target.value,
    });
  };
  const handleAddressChange = (e) => {
    e.preventDefault();
    setAddress({
      ...street,
      value: e.target.value,
    });
  };

  const handleParentIdChange = (e) => {
    e.preventDefault();
    setParentId({
      ...parentId,
      value: e.target.value,
    });
  };

  const handleRegNoChange = (e) => {
    e.preventDefault();
    setRegNo({
      ...regNo,
      value: e.target.value,
    });
  };

  const handleLocationChange = (loc) => {
    setLocation({
      ...location,
      ...loc,
    });
  };

  // const handleBusChange = (e) => {
  //   e.preventDefault();
  //   setBusId({
  //     value: e.target.value,
  //   });
  // };

   // medical record handle methods
   const handleBloodGroupChange = (e) => {
    e.preventDefault();
    setBloodGroup({
      ...bloodGroup,
      value: e.target.value,
    });
  };
  const handleInsuranceIdChange = (e) => {
    e.preventDefault();
    setInsuranceId({
      ...insuranceId,
      value: e.target.value,
    });
  };
  const handleMedicalInstructionsChange = (e) => {
    e.preventDefault();
    setMedicalInstructions({
      ...medicalInstructions,
      value: e.target.value,
    });
  };


  // submitting student form
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const studentData = {
      id: studentId,
      student: {
        schoolId: schoolId,
        name: name.value,
        studentId: rollNo.value,
        dob: date.value && `${date.value.getDate()}-${date.value.getMonth() +
          1}-${date.value.getFullYear()}`,
        class: grade.value,
        street: street.value,
        town: town.value,
        address: address.value,
        parentId: parentId.value,
        pictures: studentss.pictures,
        registrationNo: regNo.value,
        busId: studentss.busId ? studentss.busId : null,
        deleted: false,
        bloodGroup: bloodGroup.value,
        insuranceId:insuranceId.value,
        medicalInstructions:medicalInstructions.value,
        location: { ...location },
        guardians: SelectedGuardians
      },
    };

    console.log("student data", studentData);

    editStudent(
      studentData,
      () => {
        history.push("/studentManagement/list");
      },
      () => setLoading(false)
    );
  };

  const bloodGroups = [
    {
      name: 'AB+',
      value: 'AB+',
    },
    {
      name: 'AB-',
      value: 'AB-',
    },
    {
      name: 'A+',
      value: 'A+',
    },
    {
      name: 'B+',
      value: 'B+',
    },
    {
      name: 'O+',
      value: 'O+',
    },
    {
      name: 'A-',
      value: 'A-',
    },
    {
      name: 'B-',
      value: 'B-',
    },
    {
      name: 'O-',
      value: 'O-',
    },
  ]



  const classes = [
    {
      name: 'KG1',
      value: 'KG1',
    },
    {
      name: 'KG2',
      value: 'KG2',
    },
    {
      name: 'I',
      value: 1,
    },
    {
      name: 'II',
      value: 2,
    },
    {
      name: 'III',
      value: 3,
    },
    {
      name: 'IV',
      value: 4,
    },
    {
      name: 'V',
      value: 5,
    },
    {
      name: 'VI',
      value: 6,
    },
    {
      name: 'VII',
      value: 7,
    },
    {
      name: 'VIII',
      value: 8,
    },
    {
      name: 'IX',
      value: 9,
    },
    {
      name: 'X',
      value: 10,
    },
  ];
  console.log("students -->", student);
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
                    <div className="title">Edit Admin Details</div>
                  </div>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label for="name">Admin Name</Label>
                        <Input
                          name="name"
                          id="name"
                          placeholder="Enter Admin Name"
                          value={name.value}
                          onChange={handleNameChange}
                          required
                          maxLength="20"
                        />
                      </FormGroup>
                    </Col>
                    
                   
                  
              

                 
                  </Row>
                  <Link
                    className="close-button"
                    to="/studentManagement/list"
                    disabled={loading}
                  >
                    <Button
                      color="secondary"
                      className="mr-2 mt-1"
                      disabled={loading}
                    >
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
    studentId: ownProps.match.params.id,
    students: state.student.student,
    buses: state.bus.bus,
    parents: state.parent.parent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editStudent: (studentData, navigate, stopLoader) =>
      dispatch(editStudent(studentData, navigate, stopLoader)),
    fetchParents: (schoolId) => dispatch(fetchParents(schoolId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentEdit);
