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

import { Colxx } from "Components/CustomBootstrap";
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


  componentDidMount(){
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
          <Colxx xxs="12">
            <h1>{this.state.department.name}</h1>
            <div className="float-sm-right mb-2">
              <UncontrolledDropdown>
                <DropdownToggle
                  caret
                  color="primary"
                  size="lg"
                  outline
                  className="top-right-button top-right-button-single"
                >
                  <IntlMessages id="layouts.actions" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>
                  <IntlMessages id="layouts.header" />
                  </DropdownItem>
                  <DropdownItem disabled>
                  <IntlMessages id="layouts.delete" />
                  </DropdownItem>
                  <DropdownItem>
                  <NavLink
                    to={`${this.props.location.pathname}/edit`}
                    className="w-40 w-sm-100"
                  >
                    <p className="list-item-heading mb-1 truncate">
                      <IntlMessages id="departments.edit" />
                    </p>
                  </NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>

            <BreadcrumbItems match={this.props.match} />

            <Nav tabs className="separator-tabs ml-0 mb-5">
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeFirstTab === "1",
                    "nav-link": true
                  })}
                  onClick={() => {
                    this.toggleTab("1");{`${this.props.location.pathname}`}
                  }}
                  to={`${this.props.location.pathname}`}
                >
                  <IntlMessages id="departments.details" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeFirstTab === "2",
                    "nav-link": true
                  })}
                  onClick={() => {
                    this.toggleTab("2");
                  }}
                  to={`${this.props.location.pathname}/users`}
                >
                  <IntlMessages id="departments.faculty" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeFirstTab === "3",
                    "nav-link": true
                  })}
                  onClick={() => {
                    this.toggleTab("3");
                  }}
                  to={`${this.props.location.pathname}/semesters`}
                >
                  <IntlMessages id="departments.semesters" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeFirstTab === "4",
                    "nav-link": true
                  })}
                  onClick={() => {
                    this.toggleTab("4");
                  }}
                  to={`${this.props.location.pathname}/subjects`}
                >
                  <IntlMessages id="departments.subjects" />
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeFirstTab}>
              <TabPane tabId="1">
              <Row>
                  <Colxx>

                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Colxx>

                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Colxx>

                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId="4">
                <Row>
                  <Colxx>

                  </Colxx>
                </Row>
              </TabPane>
            </TabContent>
          </Colxx>
        </Row>
        <Row />
      </Fragment>
    );
  }
}
