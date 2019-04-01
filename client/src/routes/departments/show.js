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
          <Colxx xxs="12">
            <h1>{this.state.department.name}</h1>

            <BreadcrumbItems match={this.props.match} />

            <Separator className="mb-5" />
            <Colxx xxs="12" className="mb-3">

              <Card>
                <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                  <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                    <NavLink
                      to={`${this.props.location.pathname}/users`}
                      className="w-40 w-sm-100"
                    >
                      <p className="list-item-heading mb-1 truncate">

                      </p>
                    </NavLink>
                  </div>
                </div>
              </Card>
            </Colxx>

          </Colxx>
        </Row>
        <Row />
      </Fragment>
    );
  }
}
