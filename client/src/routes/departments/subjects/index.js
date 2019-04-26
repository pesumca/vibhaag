import React, { Component, Fragment } from "react";
import { injectIntl } from 'react-intl';
import {
  Row,
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { NavLink } from "react-router-dom";
import classnames from "classnames";
import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";
import IntlMessages from "Util/IntlMessages";
import { Colxx, Separator } from "Components/CustomBootstrap";
import { BreadcrumbItems } from "Components/BreadcrumbContainer";
import mouseTrap from "react-mousetrap";
import axios from 'axios';

class DataListLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: "http://localhost:3000/" + "departments" + "/" + this.props.match.params.id,
      apiUrlForAllSubjects: "http://localhost:3000/" + "subjects",
      visible: true,
      isLoading: false,
      items: [],
      modal: false,
      modalAddSubjects: false,
      department: "",
      selectedOption: "",
      selectData: [],
      subjects: [],
      updateData: []
    };
  }

  handleDepartmentChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  departmentSelected = (id) => {
    this.setState({
      department: id
    });
  }

  componentWillMount() {

  }

  componentDidMount() {
    console.log("APIURL: " + this.state.apiUrl);
    this.dataListRender();
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleAddSubjects = () => {
    this.setState({
      modalAddSubjects: !this.state.modalAddSubjects
    });
  }

  createSelectData = () => {
    let options = [];
    console.log("Subjects: " + this.state.subjects)

    this.state.subjects.map(subject => {
      let tempDict = {}
      tempDict['label'] = subject.name;
      tempDict['value'] = subject.name;
      tempDict['key'] = subject._id;
      options.push(tempDict);
    });

    this.setState({
      selectData: options,
    });
  }

  dataListRender = () => {
    axios.get(`${this.state.apiUrl}`)
      .then(res => {
        console.log(res.data);
        return res.data
      }).then(data => {
        this.setState({
          items: data,
          isLoading: true
        });
        this.getAllSubjects();
      });
  }

  addOneSubjectToDepartment = () => {
    // selectedOption
    let currentSubjects = this.state.items.subjects;
    let allSubjects = this.state.subjects;

    let currentSubjectIDs = [];

    currentSubjects.map(subject => {
      currentSubjectIDs.push(subject._id);
    })

    currentSubjectIDs.push(this.state.selectedOption.key);
    currentSubjectIDs = [...new Set(currentSubjectIDs)]

    console.log(currentSubjectIDs);

    axios.put(this.state.apiUrl, {
      subjects: currentSubjectIDs
    })
      .then((response) => {
        console.log(response);

        let newItem = allSubjects.find(e => e._id == this.state.selectedOption.key);
        currentSubjects.push(newItem);

        let newItems = this.state.items;
        newItems["subjects"] = currentSubjects

        this.setState({
          items: newItems
        });

        this.toggleAddSubjects();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteSubjectFromDepartment = () => {
    // departmentSelected
    let currentSubjects = this.state.items.subjects;
    let allSubjects = this.state.subjects;

    let currentSubjectIDs = [];

    currentSubjects.map(subject => {
      currentSubjectIDs.push(subject._id);
    })

    currentSubjectIDs = currentSubjectIDs.filter(e => e != this.state.department);
    currentSubjectIDs = [...new Set(currentSubjectIDs)]

    console.log(currentSubjectIDs);

    axios.put(this.state.apiUrl, {
      subjects: currentSubjectIDs
    })
      .then((response) => {
        console.log(response);

        currentSubjects = currentSubjects.filter(e => e._id != this.state.department);
        let newItems = this.state.items;
        newItems["subjects"] = currentSubjects

        this.setState({
          items: newItems
        });

        this.toggle();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getAllSubjects = () => {
    axios.get(`${this.state.apiUrlForAllSubjects}`)
      .then(res => {
        console.log(res.data);
        return res.data
      }).then(data => {
        this.setState({
          subjects: data,
          isLoading: true
        });
        this.createSelectData();
      })
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(selectedOption);
  };

  render() {
    return (
      !this.state.isLoading ?
        <div className="loading"></div>
        :
        <Fragment>
          <div className="disable-text-selection">
            <Row>
              <Colxx xxs="12">
                <div className="mb-2">
                  <h1>
                    Subjects of the department of {this.state.items.name}
                  </h1>

                  <div className="float-sm-right">
                    <Button color="primary"
                      onClick={this.toggleAddSubjects}>
                      Add New
                    </Button>
                  </div>

                  <BreadcrumbItems match={this.props.match} />
                </div>

                <Separator className="mb-5" />
              </Colxx>
            </Row>

            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>
                <IntlMessages id="departments.modal-title" />
              </ModalHeader>
              <ModalBody>
                Please note that this opeartion cannot be reversed
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={this.deleteSubjectFromDepartment}>
                  Delete
                </Button>{" "}
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modalAddSubjects} toggle={this.modalAddSubjects}>
              <ModalHeader toggle={this.toggleAddSubjects}>
                <IntlMessages id="departments.modal-title" />
              </ModalHeader>
              <ModalBody>
                <Colxx xxs="12" md="6">
                  <label>
                    Add Subjects
                  </label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={this.state.selectedOption}
                    onChange={this.handleChange}
                    options={this.state.selectData}
                  />
                </Colxx>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.addOneSubjectToDepartment}>
                  Add Subject
                </Button>{" "}
                <Button color="secondary" onClick={this.toggleAddSubjects}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>

            <Row>
              {this.state.items.subjects.map(department => {
                return (
                  <Colxx xxs="12" key={department._id} className="mb-3">

                    <Card
                      className={classnames("d-flex flex-row", {
                      })}
                    >
                      <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                          <p className="list-item-heading mb-1 truncate">
                            {department.name}
                          </p>
                          <p className="mb-1 text-muted text-small w-15 w-sm-100">
                            {department.createdAt}
                          </p>
                          <div className="w-sm-100">
                            <Button color="danger"
                              onClick={() => { this.toggle(); this.departmentSelected(department._id) }}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>

                  </Colxx>
                );
              })}
            </Row>
          </div>

        </Fragment>
    );
  }
}
export default injectIntl(mouseTrap(DataListLayout))