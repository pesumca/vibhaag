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
import Select from "react-select";
import classnames from "classnames";
import IntlMessages from "Util/IntlMessages";
import { Colxx, Separator } from "Components/CustomBootstrap";
import { BreadcrumbItems } from "Components/BreadcrumbContainer";
import CustomSelectInput from "Components/CustomSelectInput";
import mouseTrap from "react-mousetrap";
import axios from 'axios';

class DataListLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: "http://localhost:3000/" + "departments" + "/" + this.props.match.params.id,
      apiUrlForAllUsers: "http://localhost:3000/" + "users",
      visible: true,
      isLoading: false,
      modal: false,
      modalAddUsers: false,
      department: "",
      selectedOptions: [],
      selectData: [],
      users: [],
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

  deleteDepartment = () => {
    axios.delete(this.state.apiUrl + "/" + this.state.department)
      .then((response) => {
        this.props.history.push("/");
        console.log(response);

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addAllUsersToDepartment = () => {
    axios.put(this.state.apiUrl, {
      users: this.state.updateData,
    })
      .then((response) => {
        console.log(response);
        this.toggleAddUsers();

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChangeMulti = selectedOptions => {
    this.setState({ selectedOptions });

    updateData = []

    this.state.selectedOptions.map(id => {
      updateData.push(selectedOptions['key']);
    })

    this.setState({
      updateData: updateData
    });

    console.log(this.state.updateData);
  };

  componentWillMount() {

  }

  componentDidMount() {
    console.log("APIURL: " + this.state.apiUrl);
    this.dataListRender();
    // this.createSelectData();
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleAddUsers = () => {
    this.setState({
      modalAddUsers: !this.state.modalAddUsers
    });
  }

  dataListRender() {
    axios.get(`${this.state.apiUrl}`)
      .then(res => {
        console.log(res.data);
        return res.data
      }).then(data => {
        this.setState({
          items: data,
          isLoading: true
        });
        console.log("State: " + this.state.items);
      })

    axios.get(`${this.state.apiUrlForAllUsers}`)
      .then(res => {
        console.log(res.data);
        return res.data
      }).then(data => {
        this.setState({
          users: data,
          isLoading: true
        });

      })
  }

  createSelectData = () => {
    let options = [];

    this.state.users.map(user => {
      let tempDict = {}
      tempDict['label'] = user.name;
      tempDict['value'] = user.name;
      tempDict['key'] = user._id;
      options.push(tempDict);
    });

    this.setState({
      selectData: options,
    });

  }

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
                    {/* Faculty of the department of {this.state.items.name} */}
                  </h1>

                  <div className="float-sm-right">
                    <Button color="primary"
                      onClick={this.toggleAddUsers}>
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
                <Button color="danger" onClick={this.deleteDepartment}>
                  Delete
                </Button>{" "}
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modalAddUsers} toggle={this.modalAddUsers}>
              <ModalHeader toggle={this.toggleAddUsers}>
                <IntlMessages id="departments.modal-title" />
              </ModalHeader>
              <ModalBody>
                <Colxx xxs="12" md="6">
                  <label>
                    Add Users
                  </label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    isMulti
                    name="form-field-name"
                    value={this.state.selectedOptions}
                    onChange={this.handleChangeMulti}
                    options={this.state.selectData}
                  />
                </Colxx>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={this.addAllUsersToDepartment}>
                  Add Faculty
                </Button>{" "}
                <Button color="secondary" onClick={this.modalAddUsers}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>

            <Row>
              {this.state.items.users.map(department => {
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
                            <Button color="info">
                              View
                            </Button>
                          </div>
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