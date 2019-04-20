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
      visible: true,
      isLoading: false,
      modal: false,
      batch: ""
    };
  }

  handleBatchChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  batchSelected = (id) => {
    this.setState({
      batch: id
    });
  }

  deleteBatch = () => {
    axios.delete(this.state.apiUrl + "/" + this.state.batch)
      .then((response) => {
        this.props.history.push("/");
        console.log(response);

      })
      .catch(function (error) {
        console.log(error);
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

  dataListRender() {
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
                    <IntlMessages id="menu.batches" />
                  </h1>

                  <div className="float-sm-right">
                    <NavLink
                      to={`${this.props.location.pathname}/new`}
                      className="w-30 w-sm-100"
                    >
                      <Button color="primary">
                        Add New
                      </Button>
                    </NavLink>
                  </div>

                  <BreadcrumbItems match={this.props.match} />
                </div>

                <Separator className="mb-5" />
              </Colxx>
            </Row>

            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>
                <IntlMessages id="batches.modal-title" />
              </ModalHeader>
              <ModalBody>
                Please note that this opeartion cannot be reversed
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={this.deleteBatch}>
                  Delete
                </Button>{" "}
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>

            <Row>
              {this.state.items.batches.map(batch => {
                return (
                  <Colxx xxs="12" key={batch._id} className="mb-3">

                    <Card
                      className={classnames("d-flex flex-row", {
                      })}
                    >
                      <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                          <NavLink
                            to={`${this.props.location.pathname}/${batch._id}`}
                            className="w-30 w-sm-100"
                          >
                            <p className="list-item-heading mb-1 truncate">
                              {batch.name}
                            </p>
                          </NavLink>
                          <p className="mb-1 text-muted text-small w-15 w-sm-100">
                            {batch.createdAt}
                          </p>
                          <div className="w-sm-100">
                            <NavLink
                              to={`${this.props.location.pathname}/${batch._id}`}
                              className="w-30 w-sm-100"
                            >
                              <Button color="info">
                                View
                            </Button>
                            </NavLink>
                          </div>
                          <div className="w-sm-100">
                            <NavLink
                              to={`${this.props.location.pathname}/${batch._id}/edit`}
                              className="w-30 w-sm-100"
                            >
                              <Button color="secondary">
                                Edit
                            </Button>
                            </NavLink>
                          </div>
                          <div className="w-sm-100">
                            <Button color="danger"
                              onClick={() => { this.toggle(); this.batchSelected(batch._id) }}
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