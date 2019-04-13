import React, { Component, Fragment } from "react";
import { injectIntl } from 'react-intl';
import {
  Row,
  Card,
  Button,
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
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
    this.createDepartment = this.createDepartment.bind(this);

    this.state = {
      apiUrl: "http://localhost:3000/" + "departments",
      visible: true,
      isLoading: false
    };
  }

  componentWillMount() {

  }

  createDepartment() {

  }

  handleDepartmentChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  componentDidMount() {
    console.log("APIURL: " + this.state.apiUrl);

    axios.get(this.state.apiUrl)
      .then((response) => {
        console.log("Response: " + JSON.stringify(response.data));
        this.setState({
          departments: response.data
        }, () => {
          console.log(this.state.departments);
        })
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Department: " + this.state.departments);

    this.dataListRender();
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
                    <IntlMessages id="menu.departments" />
                  </h1>

                  <BreadcrumbItems match={this.props.match} />
                </div>
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            <Row>
              {this.state.items.map(department => {
                return (
                  <Colxx xxs="12" key={department._id} className="mb-3">

                    <Card
                      className={classnames("d-flex flex-row", {
                      })}
                    >
                      <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                          <NavLink
                            to={`${this.props.location.pathname}/${department._id}`}
                            className="w-30 w-sm-100"
                          >
                            <p className="list-item-heading mb-1 truncate">
                              {department.name}
                            </p>
                          </NavLink>
                          <p className="mb-1 text-muted text-small w-15 w-sm-100">
                            {department.createdAt}
                          </p>
                          <div className="w-sm-100">
                            <NavLink
                              to={`${this.props.location.pathname}/${department._id}`}
                              className="w-30 w-sm-100"
                            >
                              <Button color="primary">
                                View
                            </Button>
                            </NavLink>
                          </div>
                          <div className="w-sm-100">
                            <Button color="secondary">
                              Edit
                            </Button>
                          </div>
                          <div className="w-sm-100">
                            <Button color="danger">
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