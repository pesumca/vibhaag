import React, { Component, Fragment } from "react";
import { injectIntl } from 'react-intl';
import {
  Alert,
  UncontrolledAlert,
  Row,
  Card,
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonDropdown,
  UncontrolledDropdown,
  Collapse,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  CardBody,
  CardSubtitle,
  CardImg,
  Label,
  CardText,
  Badge
} from "reactstrap";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";
import classnames from "classnames";

import IntlMessages from "Util/IntlMessages";
import { Colxx, Separator } from "Components/CustomBootstrap";
import { BreadcrumbItems } from "Components/BreadcrumbContainer";
import { NotificationManager } from "Components/ReactNotifications";

import Pagination from "Components/List/Pagination";
import mouseTrap from "react-mousetrap";
import axios from 'axios';

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
function collect(props) {
  return { data: props.data };
}


class DataListLayout extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleDisplayOptions = this.toggleDisplayOptions.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.dataListRender = this.dataListRender.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getIndex = this.getIndex.bind(this);
    this.onContextMenuClick = this.onContextMenuClick.bind(this);
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
    this.createDepartment = this.createDepartment.bind(this);
    this.onDismiss = this.onDismiss.bind(this);

    this.state = {
      displayMode: "list",
      apiUrl: "http://localhost:3000/" + "departments",
      pageSizes: [10, 20, 30, 50, 100],
      selectedPageSize: 10,
      categories: [
        { label: 'Engineering', value: 'Engineering', key: 0 },
        { label: 'Management', value: 'Management', key: 1 },
        { label: 'Computer Applications', value: 'Computer Applications', key: 2 },
      ],
      orderOptions: [
        { column: "name", label: "Name" },
        { column: "code", label: "Code" },
      ],
      selectedOrderOption: { column: "name", label: "Name" },
      dropdownSplitOpen: false,
      modalOpen: false,
      modal: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      items: [],
      selectedItems: [],
      lastChecked: null,
      displayOptionsIsOpen: false,
      visible: true,
      isLoading: false
    };
  }
  componentWillMount() {
    this.props.bindShortcut(["ctrl+a", "command+a"], () =>
      this.handleChangeSelectAll(false)
    );
    this.props.bindShortcut(["ctrl+d", "command+d"], () => {
      this.setState({
        selectedItems: []
      });
      return false;
    });
  }

  // Function to create a department
  createDepartment() {
    this.toggleModal();
    axios.post(`${this.state.apiUrl}`, {
      name: this.state.departmentName,
      departmentCode: this.state.departmentCode
    })
      .then(res => {
        this.setState(prevState => ({
          items: [...prevState.items, res.data]
        }));
        console.log(res.data);
      });
  }

  handleDepartmentChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  createNotification = (type, className) => {
    let cName = className || "";
    return () => {
      switch (type) {
        case "primary":
          NotificationManager.primary(
            "This is a notification!",
            "Primary Notification",
            3000,
            null,
            null,
            cName
          );
          break;
        case "secondary":
          NotificationManager.secondary(
            "This is a notification!",
            "Secondary Notification",
            3000,
            null,
            null,
            cName
          );
          break;
        case "info":
          NotificationManager.info("Info message", "", 3000, null, null, cName);
          break;
        case "success":
          NotificationManager.success(
            "Succesfully",
            "Item Deleted",
            3000,
            null,
            null,
            cName
          );
          break;
        case "warning":
          NotificationManager.warning(
            "Warning message",
            "Close after 3000ms",
            3000,
            null,
            null,
            cName
          );
          break;
        case "error":
          NotificationManager.error(
            "Error message",
            "Click me!",
            5000,
            () => {
              alert("callback");
            },
            null,
            cName
          );
          break;
        default:
          NotificationManager.info("Info message");
          break;
      }
    };
  };

  onDismiss() {
    this.setState({ visible: false });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }
  toggleDisplayOptions() {
    this.setState({ displayOptionsIsOpen: !this.state.displayOptionsIsOpen });
  }
  toggleSplit() {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen
    }));
  }
  changeOrderBy(column) {
    this.setState(
      {
        selectedOrderOption: this.state.orderOptions.find(
          x => x.column === column
        )
      },
      () => this.dataListRender()
    );
  }
  changePageSize(size) {
    this.setState(
      {
        selectedPageSize: size,
        currentPage: 1
      },
      () => this.dataListRender()
    );
  }
  changeDisplayMode(mode) {
    this.setState({
      displayMode: mode
    });
    return false;
  }
  onChangePage(page) {
    this.setState(
      {
        currentPage: page
      },
      () => this.dataListRender()
    );
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.setState(
        {
          search: e.target.value.toLowerCase()
        },
        () => this.dataListRender()
      );
    }
  }

  handleCheckChange(event, id) {
    if (
      event.target.tagName == "A" ||
      (event.target.parentElement &&
        event.target.parentElement.tagName == "A")
    ) {
      return true;
    }
    if (this.state.lastChecked == null) {
      this.setState({
        lastChecked: id
      });
    }

    let selectedItems = this.state.selectedItems;
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }
    this.setState({
      selectedItems
    });

    if (event.shiftKey) {
      var items = this.state.items;
      var start = this.getIndex(id, items, "id");
      var end = this.getIndex(this.state.lastChecked, items, "id");
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...items.map(item => {
          return item._id;
        })
      );
      selectedItems = Array.from(new Set(selectedItems));
      this.setState({
        selectedItems
      });
    }
    document.activeElement.blur();
  }

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }
  handleChangeSelectAll(isToggle) {
    if (this.state.selectedItems.length >= this.state.items.length) {
      if (isToggle) {
        this.setState({
          selectedItems: []
        });
      }
    } else {
      this.setState({
        selectedItems: this.state.items.map(x => x._id)
      });
    }
    document.activeElement.blur();
    return false;
  }

  componentDidMount() {
    console.log("APIURL: " + this.state.apiUrl);

    axios.get(this.state.apiUrl)
      .then((response) => {
        console.log("Response: " + JSON.stringify(response.data));
        this.setState({
          department: response.data
        }, () => {
          console.log(this.state.department);
        })
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Department: " + this.state.department);

    this.dataListRender();
  }

  dataListRender() {
    const { selectedPageSize, currentPage, selectedOrderOption, search } = this.state;
    axios.get(`${this.state.apiUrl}`)
      .then(res => {
        console.log(res.data);
        return res.data
      }).then(data => {
        this.setState({
          // totalPage: data.totalPage,
          items: data,
          // totalItemCount : data.totalItem,
          isLoading: true
        });
      })
  }

  onContextMenuClick = (e, data, target) => {

    console.log("onContextMenuClick - selected items", this.state.selectedItems)
    console.log(this.state.selectedItems);
    console.log(JSON.stringify(this.state.items));

    let dele;

    this.state.selectedItems.forEach(dep => {
      axios.delete(`${this.state.apiUrl}/${dep}`)
        .then(res => {
          dele = this.state.items.find(ele => { return ele !== res.data._id });
          console.log("res.data :" + JSON.stringify(res.data));
          console.log("dele: " + JSON.stringify(dele));
          this.setState({
            items: [dele],
            selectedItems: [],
            modal: false
          });

          // this.createNotification("success", "filled");
          console.log(res.data);
        }).catch(err => {
          console.log(err);
        })
    });

  };

  onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!this.state.selectedItems.includes(clickedProductId)) {
      this.setState({
        selectedItems: [clickedProductId]
      });
    }

    return true;
  };

  render() {
    const startIndex = (this.state.currentPage - 1) * this.state.selectedPageSize
    const endIndex = (this.state.currentPage) * this.state.selectedPageSize
    const { messages } = this.props.intl;
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
                    <IntlMessages id="menu.departments" />
                  </h1>

                  <div className="float-sm-right">
                    <Button
                      color="primary"
                      size="lg"
                      className="top-right-button"
                      onClick={this.toggleModal}
                    >
                      <IntlMessages id="layouts.add-new" />
                    </Button>
                    {"  "}

                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                      <ModalHeader toggle={this.toggle}>
                        <IntlMessages id="departments.modal-title" />
                      </ModalHeader>
                      <ModalBody>
                        Please note that this opeartion cannot be reversed
                    </ModalBody>
                      <ModalFooter>
                        <Button color="danger" onClick={this.onContextMenuClick}>
                          Delete
                      </Button>{" "}
                        <Button color="secondary" onClick={this.toggle}>
                          Cancel
                      </Button>
                      </ModalFooter>
                    </Modal>

                    <Modal
                      isOpen={this.state.modalOpen}
                      toggle={this.toggleModal}
                      wrapClassName="modal-right"
                      backdrop="static"
                    >
                      <ModalHeader toggle={this.toggleModal}>
                        <IntlMessages id="layouts.add-new-modal-title" />
                      </ModalHeader>
                      <ModalBody>
                        <Label>
                          <IntlMessages id="layouts.department-name" />
                        </Label>
                        <Input name="departmentName" id="department-name" value={this.state.value} onChange={this.handleDepartmentChange} />
                        <Label className="mt-4">
                          <IntlMessages id="layouts.department-code" />
                        </Label>
                        <Input name="departmentCode" id="department-code" value={this.state.value} onChange={this.handleDepartmentChange} />
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="secondary"
                          outline
                          onClick={this.toggleModal}
                        >
                          <IntlMessages id="layouts.cancel" />
                        </Button>
                        <Button color="primary" onClick={this.createDepartment}>
                          <IntlMessages id="layouts.submit" />
                        </Button>{" "}
                      </ModalFooter>
                    </Modal>
                    <ButtonDropdown
                      isOpen={this.state.dropdownSplitOpen}
                      toggle={this.toggleSplit}
                    >
                      <div className="btn btn-primary pl-4 pr-0 check-button">
                        <Label
                          for="checkAll"
                          className="custom-control custom-checkbox mb-0 d-inline-block"
                        >
                          <Input
                            className="custom-control-input"
                            type="checkbox"
                            id="checkAll"
                            checked={
                              this.state.selectedItems.length >=
                              this.state.items.length
                            }
                            onClick={() => this.handleChangeSelectAll(true)}
                          />
                          <span
                            className={`custom-control-label ${
                              this.state.selectedItems.length > 0 &&
                                this.state.selectedItems.length <
                                this.state.items.length
                                ? "indeterminate"
                                : ""
                              }`}
                          />
                        </Label>
                      </div>
                      <DropdownToggle
                        caret
                        color="primary"
                        className="dropdown-toggle-split pl-2 pr-2"
                      />
                      <DropdownMenu right>
                        <DropdownItem>
                          <IntlMessages id="layouts.delete" />
                        </DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                  </div>

                  <BreadcrumbItems match={this.props.match} />
                </div>

                <div className="mb-2">
                  <Button
                    color="empty"
                    className="pt-0 pl-0 d-inline-block d-md-none"
                    onClick={this.toggleDisplayOptions}
                  >
                    <IntlMessages id="layouts.display-options" />{" "}
                    <i className="simple-icon-arrow-down align-middle" />
                  </Button>
                </div>
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            <Row>
              {this.state.items.map(department => {
                if (this.state.displayMode === "imagelist") {
                  return (
                    <Colxx
                      sm="6"
                      lg="4"
                      xl="3"
                      className="mb-3"
                      key={department._id}
                    >
                      <ContextMenuTrigger
                        id="menu_id"
                        data={department._id}
                        collect={collect}
                      >
                        <Card
                          onClick={event =>
                            this.handleCheckChange(event, department._id)
                          }
                          className={classnames({
                            active: this.state.selectedItems.includes(
                              department._id
                            )
                          })}
                        >
                          <div className="position-relative">
                            <NavLink
                              to={`${this.props.location.pathname}/${department._id}`}
                              className="w-40 w-sm-100"
                            >
                              <CardImg
                                top
                                alt={department.name}
                              />
                            </NavLink>
                            <Badge
                              pill
                              className="position-absolute badge-top-left"
                            >
                            </Badge>
                          </div>
                          <CardBody>
                            <Row>
                              <Colxx xxs="2">
                                <CustomInput
                                  className="itemCheck mb-0"
                                  type="checkbox"
                                  id={`check_` + `${department._id}`}
                                  checked={this.state.selectedItems.includes(
                                    department._id
                                  )}
                                  onChange={() => { }}
                                  label=""
                                />
                              </Colxx>
                              <Colxx xxs="10" className="mb-3">
                                <CardSubtitle>{department.name}</CardSubtitle>
                                <CardText className="text-muted text-small mb-0 font-weight-light">
                                  {department.createdAt}
                                </CardText>
                              </Colxx>
                            </Row>
                          </CardBody>
                        </Card>
                      </ContextMenuTrigger>
                    </Colxx>
                  );
                } else if (this.state.displayMode === "thumblist") {
                  return (
                    <Colxx xxs="12" key={department._id} className="mb-3">
                      <ContextMenuTrigger
                        id="menu_id"
                        data={department._id}
                        collect={collect}
                      >
                        <Card
                          onClick={event =>
                            this.handleCheckChange(event, department._id)
                          }
                          className={classnames("d-flex flex-row", {
                            active: this.state.selectedItems.includes(
                              department._id
                            )
                          })}
                        >
                          <NavLink
                            to={`${this.props.location.pathname}/${department._id}`}
                            className="d-flex"
                          >
                            <img
                              alt={department.title}
                              className="list-thumbnail responsive border-0"
                            />
                          </NavLink>
                          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                              <NavLink
                                to={`${this.props.location.pathname}/${department._id}`}
                                className="w-40 w-sm-100"
                              >
                                <p className="list-item-heading mb-1 truncate">
                                  {department.name}
                                </p>
                              </NavLink>
                              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                              </p>
                              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                {department.createdAt}
                              </p>
                              <div className="w-15 w-sm-100">
                              </div>
                            </div>
                            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                              <CustomInput
                                className="itemCheck mb-0"
                                type="checkbox"
                                id={`check_` + `${department._id}`}
                                checked={this.state.selectedItems.includes(
                                  department._id
                                )}
                                onChange={() => { }}
                                label=""
                              />
                            </div>
                          </div>
                        </Card>
                      </ContextMenuTrigger>
                    </Colxx>
                  );
                } else {
                  return (
                    <Colxx xxs="12" key={department._id} className="mb-3">
                      <ContextMenuTrigger
                        id="menu_id"
                        data={department._id}
                        collect={collect}
                      >
                        <Card
                          onClick={event =>
                            this.handleCheckChange(event, department._id)
                          }
                          className={classnames("d-flex flex-row", {
                            active: this.state.selectedItems.includes(
                              department._id
                            )
                          })}
                        >
                          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                              <NavLink
                                to={`${this.props.location.pathname}/${department._id}`}
                                className="w-40 w-sm-100"
                              >
                                <p className="list-item-heading mb-1 truncate">
                                  {department.name}
                                </p>
                              </NavLink>
                              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                {/* {department.category} */}
                              </p>
                              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                {department.createdAt}
                              </p>
                              <div className="w-15 w-sm-100">
                                {/* <Badge color={department.statusColor} pill>
                                  {department.departmentCode}
                                </Badge> */}
                              </div>
                            </div>
                            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                              <CustomInput
                                className="itemCheck mb-0"
                                type="checkbox"
                                id={`check_` + `${department._id}`}
                                checked={this.state.selectedItems.includes(
                                  department._id
                                )}
                                onChange={() => { }}
                                label=""
                              />
                            </div>
                          </div>
                        </Card>
                      </ContextMenuTrigger>
                    </Colxx>
                  );
                }
              })}
              <Pagination
                currentPage={this.state.currentPage}
                totalPage={this.state.totalPage}
                onChangePage={i => this.onChangePage(i)}
              />
            </Row>
          </div>

          <ContextMenu
            id="menu_id"
            onShow={e => this.onContextMenu(e, e.detail.data)}
          >
            <MenuItem
              onClick={this.toggle}
              data={{ action: "delete" }}
            >
              <i className="simple-icon-trash" /> <span>Delete</span>
            </MenuItem>
          </ContextMenu>
        </Fragment>
    );
  }
}
export default injectIntl(mouseTrap(DataListLayout))