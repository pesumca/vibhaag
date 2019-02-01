import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Row, Card, CardBody } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";

export default class SectionPricingTable extends React.Component {

    render() {
        return (
            <Fragment>

                <Row>
                    <Colxx xxs={{ size: "12", offset: 0 }} lg={{ size: 8, offset: 2 }} className="text-center">
                        <h1><IntlMessages id="lp.pricetable.title" /></h1>
                        <p>
                            <IntlMessages id="lp.pricetable.detail" />
                        </p>
                    </Colxx>
                </Row>

                <Row className="row-eq-height price-container mt-5">
                    <Colxx md="12" lg="4" className="mb-4 price-item">
                        <Card>
                            <CardBody className="pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column">
                                <div className="price-top-part">
                                    <i className="iconsmind-Male large-icon"></i>
                                    <h5 className="mb-0 font-weight-semibold color-theme-1 mb-4"> <IntlMessages id="lp.pricetable.title-1" /></h5>
                                    <p className="text-large mb-2 text-default">$11</p>
                                    <p className="text-muted text-small"> <IntlMessages id="lp.pricetable.detail-1" /></p>
                                </div>
                                <div className="pl-3 pr-3 pt-3 pb-0 d-flex price-feature-list flex-column flex-grow-1">
                                    <ul className="list-unstyled">
                                        <li>
                                            <p className="mb-0 "><IntlMessages id="lp.pricetable.feature-1-1" /></p>
                                        </li>
                                        <li>
                                            <p className="mb-0 "><IntlMessages id="lp.pricetable.feature-1-2" /></p>
                                        </li>
                                        <li>
                                            <p className="mb-0 "><IntlMessages id="lp.pricetable.feature-1-3" /></p>
                                        </li>
                                        <li>
                                            <p className="mb-0 "><IntlMessages id="lp.pricetable.feature-1-4" /></p>
                                        </li>
                                    </ul>
                                    <div>
                                        <NavLink to="/auth-login" className="btn btn-link btn-empty btn-lg">
                                            <IntlMessages id="lp.pricetable.purchase" /> <i className="simple-icon-arrow-right"></i>
                                        </NavLink>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Colxx>

                    <Colxx md="12" lg="4" className="mb-4 price-item">
                        <Card>
                            <CardBody className="pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column">
                                <div className="price-top-part">
                                    <i className="iconsmind-MaleFemale large-icon"></i>
                                    <h5 className="mb-0 font-weight-semibold color-theme-1 mb-4"><IntlMessages id="lp.pricetable.title-2" /></h5>
                                    <p className="text-large mb-2 text-default">$17</p>
                                    <p className="text-muted text-small"><IntlMessages id="lp.pricetable.detail-2" /></p>
                                </div>
                                <div className="pl-3 pr-3 pt-3 pb-0 d-flex price-feature-list flex-column flex-grow-1">
                                    <ul className="list-unstyled">
                                        <li>
                                            <p className="mb-0 "><IntlMessages id="lp.pricetable.feature-2-1" /></p>
                                        </li>
                                        <li>
                                            <p className="mb-0 "><IntlMessages id="lp.pricetable.feature-2-2" /></p>
                                        </li>
                                        <li>
                                            <p className="mb-0 "><IntlMessages id="lp.pricetable.feature-2-3" /></p>
                                        </li>
                                        <li>
                                            <p className="mb-0 "><IntlMessages id="lp.pricetable.feature-2-4" /></p>
                                        </li>
                                        <li>
                                            <p className="mb-0 "><IntlMessages id="lp.pricetable.feature-2-5" /></p>
                                        </li>
                                        <li>
                                            <p className="mb-0 "><IntlMessages id="lp.pricetable.feature-2-6" /></p>
                                        </li>
                                    </ul>
                                    <div>
                                        <NavLink to="/auth-login" className="btn btn-link btn-empty btn-lg">
                                            <IntlMessages id="lp.pricetable.purchase" /> <i className="simple-icon-arrow-right"></i>
                                        </NavLink>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Colxx>

                    <Colxx md="12" lg="4" className="mb-4 price-item">
                        <Card>
                            <CardBody className="pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column">
                                <div className="price-top-part">
                                    <i className="iconsmind-MaleFemale large-icon"></i>
                                    <h5 className="mb-0 font-weight-semibold color-theme-1 mb-4"><IntlMessages id="lp.pricetable.title-3" /></h5>
                                    <p className="text-large mb-2 text-default">$19</p>
                                    <p className="text-muted text-small"><IntlMessages id="lp.pricetable.detail-3" /></p>
                                </div>
                                <div className="pl-3 pr-3 pt-3 pb-0 d-flex price-feature-list flex-column flex-grow-1">
                                    <ul className="list-unstyled">
                                        <li>
                                            <p className="mb-0 "><IntlMessages id="lp.pricetable.feature-3-1" /></p>
                                        </li>
                                        <li>
                                            <p className="mb-0 "><IntlMessages id="lp.pricetable.feature-3-2" /></p>
                                        </li>
                                        <li>
                                            <p className="mb-0 "><IntlMessages id="lp.pricetable.feature-3-3" /></p>
                                        </li>
                                        <li>
                                            <p className="mb-0 "><IntlMessages id="lp.pricetable.feature-3-4" /></p>
                                        </li>
                                        <li>
                                            <p className="mb-0 "><IntlMessages id="lp.pricetable.feature-3-5" /></p>
                                        </li>
                                        <li>
                                            <p className="mb-0 "><IntlMessages id="lp.pricetable.feature-3-6" /></p>
                                        </li>
                                        <li>
                                            <p className="mb-0 "><IntlMessages id="lp.pricetable.feature-3-7" /></p>
                                        </li>
                                    </ul>
                                    <div>
                                        <NavLink to="/auth-login" className="btn btn-link btn-empty btn-lg">
                                            <IntlMessages id="lp.pricetable.purchase" /> <i className="simple-icon-arrow-right"></i>
                                        </NavLink>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Colxx>

                </Row>

            </Fragment>
        );
    }
}

