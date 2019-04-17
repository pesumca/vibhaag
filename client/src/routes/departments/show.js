import React, { Component, Fragment } from "react";
import axios from 'axios';
import IntlMessages from "Util/IntlMessages";
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
  Badge,
  CardSubtitle,
  CardTitle
} from "reactstrap";

import Rating from "Components/Rating";
import { SmallLineChart } from "Components/Charts";
import {
  smallChartData1,
  smallChartData2,
  smallChartData3,
  smallChartData4
} from "Constants/chartConfig";

import { LineShadow } from "Components/Charts";
import { areaChartConfig } from "Constants/chartConfig";

import { NavLink } from "react-router-dom";
import CircularProgressbar from "react-circular-progressbar";

import { Colxx, Separator } from "Components/CustomBootstrap";
import { BreadcrumbItems } from "Components/BreadcrumbContainer";

import classnames from "classnames";

export default class DepartmentShow extends Component {
  constructor(props) {
    super(props);

    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      activeFirstTab: "1",
      apiUrl: "http://localhost:3000/" + "departments" + "/" + this.props.match.params.id,
      department: []
    };

    console.log(this.props);
    // console.log("Params: " + JSON.stringify(this.props.match.params.id));
  }


  componentDidMount() {
    console.log("APIURL: " + this.state.apiUrl);

    axios.get(this.state.apiUrl)
      .then((response) => {
        console.log("Resposne: " + JSON.stringify(response.data));
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
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab
      });
    }
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx lg="12" md="12" xl="12">
              <h1>
                The department of {`${this.state.department.name}`}
              </h1>
              <Row>
              <Colxx lg="12" xl="12" className="mb-12">
                <Card className="progress-banner">
                  <CardBody className="justify-content-between d-flex flex-row align-items-center">
                    <div>
                      <div>
                        <i className="iconsmind-Male mr-2 text-white align-text-bottom d-inline-block" />
                        <p className="lead text-white">
                          <NavLink
                            to={`${this.props.location.pathname}/users`}
                            className=""
                          >
                            <span className="text-white">
                              Faculty
                            </span>
                          </NavLink>
                        </p>
                        <p className="text-small text-white">
                          All the faculty of this department
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Colxx>

              <Colxx lg="12" xl="12" className="mb-12">
                <Card className="progress-banner">
                  <CardBody className="justify-content-between d-flex flex-row align-items-center">
                    <div>
                      <div>
                        <i className="iconsmind-Male mr-2 text-white align-text-bottom d-inline-block" />
                        <p className="lead text-white">
                          <NavLink
                            to={`${this.props.location.pathname}/batches`}
                            className=""
                          >
                            <span className="text-white">
                              Batches
                            </span>
                          </NavLink>
                        </p>
                        <p className="text-small text-white">
                          All the batches of this department
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Colxx>

              <Colxx lg="12" xl="12" className="mb-12">
                <Card className="progress-banner">
                  <CardBody className="justify-content-between d-flex flex-row align-items-center">
                    <div>
                      <div>
                        <i className="iconsmind-Male mr-2 text-white align-text-bottom d-inline-block" />
                        <p className="lead text-white">
                          <NavLink
                            to={`${this.props.location.pathname}/subjects`}
                            className=""
                          >
                            <span className="text-white">
                              Subjects
                            </span>
                          </NavLink>
                        </p>
                        <p className="text-small text-white">
                          All the subjects of this department
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Colxx>
            </Row>
          </Colxx>

        </Row>
      </Fragment>
    );
  }
}