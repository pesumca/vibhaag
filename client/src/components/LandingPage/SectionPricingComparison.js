import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Row, Card, CardBody } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";

export default class SectionPricingComparison extends React.Component {

    render() {
        return (
            <Fragment>

                <Row>
                    <Colxx xxs={{ size: "12", offset: 0 }} lg={{ size: 8, offset: 2 }} className="text-center">
                        <h1><IntlMessages id="lp.pricecomparison.title" /></h1>
                        <p>
                            <IntlMessages id="lp.pricecomparison.detail" />
                        </p>
                    </Colxx>
                </Row>


                <Row className="feature-row">
                    <Colxx xxs={{ size: "12" }} className="d-none d-md-block">
                        <Card className="d-flex flex-row mb-3 table-heading">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                    <p className="list-item-heading mb-0  w-40 w-xs-100"></p>
                                    <p className="mb-0 text-primary w-20 w-xs-100 text-center"><IntlMessages id="lp.pricetable.title-1" /></p>
                                    <p className="mb-0 text-primary w-20 w-xs-100 text-center"><IntlMessages id="lp.pricetable.title-2" /></p>
                                    <p className="mb-0 text-primary w-20 w-xs-100 text-center"><IntlMessages id="lp.pricetable.title-3" /></p>
                                </CardBody>
                            </div>
                        </Card>

                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                    <p className="list-item-heading mb-0  w-40 w-xs-100">
                                        <IntlMessages id="lp.pricetable.feature-3-3" />
                                    </p>
                                    <p className="mb-0 text-primary w-20 w-xs-100 text-center">
                                        <i className="simple-icon-check"></i>
                                    </p>
                                    <p className="mb-0 text-primary w-20 w-xs-100 text-center">
                                        <i className="simple-icon-check"></i>
                                    </p>
                                    <p className="mb-0 text-primary w-20 w-xs-100 text-center">
                                        <i className="simple-icon-check"></i>
                                    </p>
                                </CardBody>
                            </div>
                        </Card>

                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                    <p className="list-item-heading mb-0  w-40 w-xs-100">
                                        <IntlMessages id="lp.pricetable.feature-3-6" />
                                    </p>
                                    <p className="mb-0 text-primary w-20 w-xs-100 text-center">

                                    </p>
                                    <p className="mb-0 text-primary w-20 w-xs-100 text-center">
                                        <i className="simple-icon-check"></i>
                                    </p>
                                    <p className="mb-0 text-primary w-20 w-xs-100 text-center">
                                        <i className="simple-icon-check"></i>
                                    </p>
                                </CardBody>
                            </div>
                        </Card>

                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                    <p className="list-item-heading mb-0  w-40 w-xs-100">
                                        <IntlMessages id="lp.pricetable.feature-2-1" />
                                    </p>
                                    <p className="mb-0 text-primary w-20 w-xs-100 text-center">

                                    </p>
                                    <p className="mb-0 text-primary w-20 w-xs-100 text-center">
                                        <i className="simple-icon-check"></i>
                                    </p>
                                    <p className="mb-0 text-primary w-20 w-xs-100 text-center">
                                    </p>
                                </CardBody>
                            </div>
                        </Card>

                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                    <p className="list-item-heading mb-0  w-40 w-xs-100">
                                        <IntlMessages id="lp.pricetable.feature-3-1" />
                                    </p>
                                    <p className="mb-0 text-primary w-20 w-xs-100 text-center">

                                    </p>
                                    <p className="mb-0 text-primary w-20 w-xs-100 text-center">

                                    </p>
                                    <p className="mb-0 text-primary w-20 w-xs-100 text-center">
                                        <i className="simple-icon-check"></i>
                                    </p>
                                </CardBody>
                            </div>
                        </Card>

                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                    <p className="list-item-heading mb-0  w-40 w-xs-100">
                                        <IntlMessages id="lp.pricetable.feature-3-7" />
                                    </p>
                                    <p className="mb-0 text-primary w-20 w-xs-100 text-center">

                                    </p>
                                    <p className="mb-0 text-primary w-20 w-xs-100 text-center">
                                    </p>
                                    <p className="mb-0 text-primary w-20 w-xs-100 text-center">
                                        <i className="simple-icon-check"></i>
                                    </p>
                                </CardBody>
                            </div>
                        </Card>

                    </Colxx>

                    <Colxx xxs={{ size: "12" }} className="d-block d-md-none">

                        <Card className="d-flex flex-row mb-3 table-heading">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="pl-0 pb-0">
                                    <p className="list-item-heading mb-0 text-primary">
                                        <IntlMessages id="lp.pricetable.feature-3-3" />
                                    </p>
                                </CardBody>
                            </div>
                        </Card>

                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-row">
                                    <p className="list-item-heading mb-0  w-70">
                                        <IntlMessages id="lp.pricetable.title-1" />
                                    </p>
                                    <p className="text-primary text-right mb-0 w-30 text-one">
                                        <i className="simple-icon-check"></i>
                                    </p>
                                </CardBody>
                            </div>
                        </Card>

                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-row">
                                    <p className="list-item-heading mb-0  w-70">
                                        <IntlMessages id="lp.pricetable.title-2" />
                                    </p>
                                    <p className="text-primary text-right mb-0 w-30 text-one">
                                        <i className="simple-icon-check"></i>
                                    </p>
                                </CardBody>
                            </div>
                        </Card>
                        
                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-row">
                                    <p className="list-item-heading mb-0  w-70">
                                        <IntlMessages id="lp.pricetable.title-3" />
                                    </p>
                                    <p className="text-primary text-right mb-0 w-30 text-one">
                                        <i className="simple-icon-check"></i>
                                    </p>
                                </CardBody>
                            </div>
                        </Card>


                        <Card className="d-flex flex-row mb-3 table-heading">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="pl-0 pb-0">
                                    <p className="list-item-heading mb-0 text-primary">
                                        <IntlMessages id="lp.pricetable.feature-3-6" />
                                    </p>
                                </CardBody>
                            </div>
                        </Card>

                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-row">
                                    <p className="list-item-heading mb-0  w-70">
                                        <IntlMessages id="lp.pricetable.title-1" />
                                    </p>
                                </CardBody>
                            </div>
                        </Card>
                        
                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-row">
                                    <p className="list-item-heading mb-0  w-70">
                                        <IntlMessages id="lp.pricetable.title-2" />
                                    </p>
                                    <p className="text-primary text-right mb-0 w-30 text-one">
                                        <i className="simple-icon-check"></i>
                                    </p>
                                </CardBody>
                            </div>
                        </Card>
                        
                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-row">
                                    <p className="list-item-heading mb-0  w-70">
                                        <IntlMessages id="lp.pricetable.title-3" />
                                    </p>
                                    <p className="text-primary text-right mb-0 w-30 text-one">
                                        <i className="simple-icon-check"></i>
                                    </p>
                                </CardBody>
                            </div>
                        </Card>


                        <Card className="d-flex flex-row mb-3 table-heading">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="pl-0 pb-0">
                                    <p className="list-item-heading mb-0 text-primary">
                                        <IntlMessages id="lp.pricetable.feature-2-1" />
                                    </p>
                                </CardBody>
                            </div>
                        </Card>

                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-row">
                                    <p className="list-item-heading mb-0  w-70">
                                        <IntlMessages id="lp.pricetable.title-1" />
                                    </p>
                                </CardBody>
                            </div>
                        </Card>

                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-row">
                                    <p className="list-item-heading mb-0  w-70">
                                        <IntlMessages id="lp.pricetable.title-2" />
                                    </p>
                                    <p className="text-primary text-right mb-0 w-30 text-one">
                                        <i className="simple-icon-check"></i>
                                    </p>
                                </CardBody>
                            </div>
                        </Card>
                        
                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-row">
                                    <p className="list-item-heading mb-0  w-70">
                                        <IntlMessages id="lp.pricetable.title-3" />
                                    </p>
                                </CardBody>
                            </div>
                        </Card>


                        <Card className="d-flex flex-row mb-3 table-heading">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="pl-0 pb-0">
                                    <p className="list-item-heading mb-0 text-primary">
                                        <IntlMessages id="lp.pricetable.feature-3-1" />
                                    </p>
                                </CardBody>
                            </div>
                        </Card>

                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-row">
                                    <p className="list-item-heading mb-0  w-70">
                                        <IntlMessages id="lp.pricetable.title-1" />
                                    </p>
                                </CardBody>
                            </div>
                        </Card>

                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-row">
                                    <p className="list-item-heading mb-0  w-70">
                                        <IntlMessages id="lp.pricetable.title-2" />
                                    </p>
                                </CardBody>
                            </div>
                        </Card>
                        
                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-row">
                                    <p className="list-item-heading mb-0  w-70">
                                        <IntlMessages id="lp.pricetable.title-3" />
                                    </p>
                                    <p className="text-primary text-right mb-0 w-30 text-one">
                                        <i className="simple-icon-check"></i>
                                    </p>
                                </CardBody>
                            </div>
                        </Card>


                        <Card className="d-flex flex-row mb-3 table-heading">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="pl-0 pb-0">
                                    <p className="list-item-heading mb-0 text-primary">
                                        <IntlMessages id="lp.pricetable.feature-3-7" />
                                    </p>
                                </CardBody>
                            </div>
                        </Card>

                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-row">
                                    <p className="list-item-heading mb-0  w-70">
                                        <IntlMessages id="lp.pricetable.title-1" />
                                    </p>
                                </CardBody>
                            </div>
                        </Card>

                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-row">
                                    <p className="list-item-heading mb-0  w-70">
                                        <IntlMessages id="lp.pricetable.title-2" />
                                    </p>
                                </CardBody>
                            </div>
                        </Card>


                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-row">
                                    <p className="list-item-heading mb-0  w-70">
                                        <IntlMessages id="lp.pricetable.title-3" />
                                    </p>
                                    <p className="text-primary text-right mb-0 w-30 text-one">
                                        <i className="simple-icon-check"></i>
                                    </p>
                                </CardBody>
                            </div>
                        </Card>

                    </Colxx>
                </Row>
            </Fragment>
        );
    }
}

