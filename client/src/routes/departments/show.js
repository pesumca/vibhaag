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
                    this.toggleTab("1");
                  }}
                  to="#"
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
                  to="#"
                >
                  <IntlMessages id="departments.subjects" />
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeFirstTab}>
              <TabPane tabId="1">
                <Row>
                  <Colxx xxs="12" lg="4" className="mb-4">
                    <Card className="mb-4">
                      <div className="position-absolute card-top-buttons">
                        <Button outline color={"white"} className="icon-button">
                          <i className="simple-icon-pencil" />
                        </Button>
                      </div>
                      <img
                        src="/assets/img/detail.jpg"
                        alt="Detail"
                        className="card-img-top"
                      />

                      <CardBody>
                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="layouts.description" />
                        </p>
                        <p className="mb-3">
                          It’s all about simplicity…Less is more. Chocolate Cake
                          exclusively brings you the classic chocolate cake.
                          This cake is the one you always dream of-moist cake
                          and creamy chocolate frosting.
                          <br />
                          <br /> This cake proudly serves itself for a family
                          gathering, a dinner party, a birthday celebration, a
                          baby christening, and a gift to someone special or
                          simply to have on hand on the cake stand at home
                          served with an ice cold glass of milk!
                        </p>

                        <p className="text-muted text-small mb-2">
                        <IntlMessages id="layouts.rating" />
                        </p>
                        <div className="mb-3">
                          <Rating total={5} rating={5} interactive={false} />
                        </div>

                        <p className="text-muted text-small mb-2">
                        <IntlMessages id="layouts.price" />
                        </p>
                        <p className="mb-3">$8,14</p>
                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="layouts.ingredients" />
                        </p>
                        <div className="mb-3">
                          <p className="d-sm-inline-block mb-1">
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Flour
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Chocolate
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Caster Sugar
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Baking Powder
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Milk
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Eggs
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Vegetable Oil
                            </Badge>
                          </p>
                        </div>

                        <p className="text-muted text-small mb-2">
                        <IntlMessages id="layouts.is-vegan" />
                        </p>
                        <p>No</p>
                      </CardBody>
                    </Card>

                    <Card className="mb-4">
                      <CardBody className="d-flex justify-content-between align-items-center">
                        <CardSubtitle className="mb-0">
                          <IntlMessages id="layouts.order-status" />
                        </CardSubtitle>
                        <div className="progress-bar-circle">
                          <CircularProgressbar
                            strokeWidth={4}
                            percentage={85}
                            text={"85%"}
                          />
                        </div>
                      </CardBody>
                    </Card>

                    <Card className="mb-4">
                      <CardBody className="d-flex justify-content-between align-items-center">
                        <CardSubtitle className="mb-0">
                          <IntlMessages id="layouts.bake-progress" />
                        </CardSubtitle>
                        <div className="progress-bar-circle">
                          <CircularProgressbar
                            strokeWidth={4}
                            percentage={40}
                            text={"40%"}
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </Colxx>

                  <Colxx xxs="12" lg="8">
                    <Row>
                      <Colxx xxs="6" className="mb-4">
                        <Card className="dashboard-small-chart">
                          <CardBody>
                            <SmallLineChart {...smallChartData1} />
                          </CardBody>
                        </Card>
                      </Colxx>
                      <Colxx xxs="6" className="mb-4">
                        <Card className="dashboard-small-chart">
                          <CardBody>
                            <SmallLineChart {...smallChartData2} />
                          </CardBody>
                        </Card>
                      </Colxx>
                      <Colxx xxs="6" className="mb-4">
                        <Card className="dashboard-small-chart">
                          <CardBody>
                            <SmallLineChart {...smallChartData3} />
                          </CardBody>
                        </Card>
                      </Colxx>
                      <Colxx xxs="6" className="mb-4">
                        <Card className="dashboard-small-chart">
                          <CardBody>
                            <SmallLineChart {...smallChartData4} />
                          </CardBody>
                        </Card>
                      </Colxx>
                    </Row>

                    <Card className="mb-4">
                      <CardBody>
                        <CardTitle>
                        <IntlMessages id="layouts.popularity" />
                        </CardTitle>
                        <div className="chart-container">
                          <LineShadow {...areaChartConfig} />
                        </div>
                      </CardBody>
                    </Card>

                    <Card className="mb-4">
                      <CardBody>
                        <CardTitle>
                        <IntlMessages id="layouts.comments" />
                        </CardTitle>
                        <div className="d-flex flex-row mb-3 pb-3 border-bottom">
                          <NavLink to="#">
                            <img
                              alt="Profile"
                              src="/assets/img/profile-pic-l.jpg"
                              className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                            />
                          </NavLink>
                          <div className="pl-3 pr-2">
                            <NavLink to="#">
                              <p className="font-weight-medium mb-0">
                                Very tasty, thank you.{" "}
                              </p>
                              <p className="text-muted mb-1 text-small">
                                Mayra Sibley | 17.09.2018 - 04:45
                              </p>
                              <div className="form-group mb-0">
                                <Rating
                                  total={5}
                                  rating={5}
                                  interactive={false}
                                />
                              </div>
                            </NavLink>
                          </div>
                        </div>

                        <div className="d-flex flex-row mb-3 pb-3 border-bottom">
                          <NavLink to="#">
                            <img
                              alt="Profile"
                              src="/assets/img/profile-pic-l-4.jpg"
                              className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                            />
                          </NavLink>
                          <div className="pl-3 pr-2">
                            <NavLink to="#">
                              <p className="font-weight-medium mb-0">
                                This cake was delightful to eat. Please keep
                                them coming.
                              </p>
                              <p className="text-muted mb-1 text-small">
                                Barbera Castiglia | 15.08.2018 - 01:18
                              </p>
                              <div className="form-group mb-0">
                                <Rating
                                  total={5}
                                  rating={5}
                                  interactive={false}
                                />
                              </div>
                            </NavLink>
                          </div>
                        </div>

                        <div className="d-flex flex-row mb-3 pb-3 border-bottom">
                          <NavLink to="#">
                            <img
                              alt="Profile"
                              src="/assets/img/profile-pic-l-2.jpg"
                              className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                            />
                          </NavLink>
                          <div className="pl-3 pr-2">
                            <NavLink to="#">
                              <p className="font-weight-medium mb-0">
                                Your cake is bad and you should feel bad.
                              </p>
                              <p className="text-muted mb-1 text-small">
                                Bao Hathaway | 26.07.2018 - 11:14
                              </p>
                              <div className="form-group mb-0">
                                <Rating
                                  total={5}
                                  rating={2}
                                  interactive={false}
                                />
                              </div>
                            </NavLink>
                          </div>
                        </div>

                        <div className="d-flex flex-row mb-3 pb-3 border-bottom">
                          <NavLink to="#">
                            <img
                              alt="Profile"
                              src="/assets/img/profile-pic-l-3.jpg"
                              className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                            />
                          </NavLink>
                          <div className="pl-3 pr-2">
                            <NavLink to="#">
                              <p className="font-weight-medium mb-0">
                                Very original recipe!
                              </p>
                              <p className="text-muted mb-1 text-small">
                                Lenna Majeed | 17.06.2018 - 09:20
                              </p>
                              <div className="form-group mb-0">
                                <Rating
                                  total={5}
                                  rating={5}
                                  interactive={false}
                                />
                              </div>
                            </NavLink>
                          </div>
                        </div>

                        <div className="d-flex flex-row">
                          <NavLink to="#">
                            <img
                              alt="Profile"
                              src="/assets/img/profile-pic-l-7.jpg"
                              className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                            />
                          </NavLink>
                          <div className="pl-3 pr-2">
                            <NavLink to="#">
                              <p className="font-weight-medium mb-0">
                                Nah, did not like it much.
                              </p>
                              <p className="text-muted mb-1 text-small">
                                Brynn Bragg | 12.04.2018 - 12:45
                              </p>
                              <div className="form-group mb-0">
                                <Rating
                                  total={5}
                                  rating={3}
                                  interactive={false}
                                />
                              </div>
                            </NavLink>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Colxx>

                    <Card className="d-flex flex-row mb-3">
                      <div className="d-flex flex-grow-1 min-width-zero">
                        <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                          <NavLink
                            to="#"
                            className="list-item-heading mb-1 truncate w-40 w-xs-100"
                          >
                            Marty Otte
                          </NavLink>
                          <p className="mb-1 text-muted text-small w-15 w-xs-100">
                            Kansas City, USA
                          </p>
                          <p className="mb-1 text-muted text-small w-15 w-xs-100">
                            02.04.2018
                          </p>

                          <div className="w-15 w-xs-100 text-right">
                            <Badge color="secondary" pill>
                              ON HOLD
                            </Badge>
                          </div>
                        </CardBody>
                      </div>
                    </Card>

                    <Card className="d-flex flex-row mb-3">
                      <div className="d-flex flex-grow-1 min-width-zero">
                        <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                          <NavLink
                            to="#"
                            className="list-item-heading mb-1 truncate w-40 w-xs-100"
                          >
                          Linn Ronning
                          </NavLink>
                          <p className="mb-1 text-muted text-small w-15 w-xs-100">
                          Toronto, Canada
                          </p>
                          <p className="mb-1 text-muted text-small w-15 w-xs-100">
                          01.04.2018
                          </p>

                          <div className="w-15 w-xs-100 text-right">
                            <Badge color="primary" pill>
                            PROCESSED
                            </Badge>
                          </div>
                        </CardBody>
                      </div>
                    </Card>

                    <Card className="d-flex flex-row mb-3">
                      <div className="d-flex flex-grow-1 min-width-zero">
                        <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                          <NavLink
                            to="#"
                            className="list-item-heading mb-1 truncate w-40 w-xs-100"
                          >
                          Rasheeda Vaquera
                          </NavLink>
                          <p className="mb-1 text-muted text-small w-15 w-xs-100">
                          Kühndorf, Germany
                          </p>
                          <p className="mb-1 text-muted text-small w-15 w-xs-100">
                          25.03.2018
                          </p>

                          <div className="w-15 w-xs-100 text-right">
                            <Badge color="primary" pill>
                            PROCESSED
                            </Badge>
                          </div>
                        </CardBody>
                      </div>
                    </Card>

                    <Card className="d-flex flex-row mb-3">
                      <div className="d-flex flex-grow-1 min-width-zero">
                        <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                          <NavLink
                            to="#"
                            className="list-item-heading mb-1 truncate w-40 w-xs-100"
                          >
                          Esperanza Lodge
                          </NavLink>
                          <p className="mb-1 text-muted text-small w-15 w-xs-100">
                          Montluçon, France
                          </p>
                          <p className="mb-1 text-muted text-small w-15 w-xs-100">
                          20.03.2018
                          </p>

                          <div className="w-15 w-xs-100 text-right">
                            <Badge color="primary" pill>
                            PROCESSED
                            </Badge>
                          </div>
                        </CardBody>
                      </div>
                    </Card>

                    <Card className="d-flex flex-row mb-4">
                      <div className="d-flex flex-grow-1 min-width-zero">
                        <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                          <NavLink
                            to="#"
                            className="list-item-heading mb-1 truncate w-40 w-xs-100"
                          >
                          Ken Ballweg
                          </NavLink>
                          <p className="mb-1 text-muted text-small w-15 w-xs-100">
                          Birmingham, UK
                          </p>
                          <p className="mb-1 text-muted text-small w-15 w-xs-100">
                          17.02.2018
                          </p>

                          <div className="w-15 w-xs-100 text-right">
                            <Badge color="secondary" pill>
                            ON HOLD
                            </Badge>
                          </div>
                        </CardBody>
                      </div>
                    </Card>

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
