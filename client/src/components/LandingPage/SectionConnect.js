import React, { Fragment } from "react";
import { Row, Button, Card, CardBody } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";
import ReactSiemaCarousel from "Components/ReactSiema/ReactSiemaCarousel";
import { NavLink } from "react-router-dom";

export default class SectionConnect extends React.Component {
    render() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs={{ size: "12", offset: 0 }} lg={{ size: 8, offset: 2 }} className="text-center">
                        <h1><IntlMessages id="lp.connect.title" /></h1>
                        <p>
                            <IntlMessages id="lp.connect.detail" />
                        </p>
                    </Colxx>
                </Row>

                <Row className="mt-5">
                    <Colxx xxs="12" className="pl-0 pr-0 mb-5 home-carousel">
                        <ReactSiemaCarousel
                            perPage={{
                                0: 1,
                                768: 2,
                                1200: 3,
                                1440: 4
                            }}
                            controls={false}
                            loop={false}>
                            <div className="pr-3 pl-3">
                                <Card>
                                    <CardBody className="text-center">
                                        <div className="mb-4">
                                            <i className="iconsmind-Speach-Bubble large-icon"></i>
                                            <h5 className="mb-0 font-weight-semibold"><IntlMessages id="lp.connect.title-1" /></h5>
                                        </div>
                                        <NavLink className="btn btn-link font-weight-semibold" to="/features"><IntlMessages id="lp.connect.button-1" /></NavLink>
                                    </CardBody>
                                </Card>
                            </div>
                            <div className="pr-3 pl-3">
                                <Card>
                                    <CardBody className="text-center">
                                        <div className="mb-4">
                                            <i className="iconsmind-Conference large-icon"></i>
                                            <h5 className="mb-0 font-weight-semibold"><IntlMessages id="lp.connect.title-2" /></h5>
                                        </div>
                                        <NavLink className="btn btn-link font-weight-semibold" to="/features"><IntlMessages id="lp.connect.button-2" /></NavLink>
                                    </CardBody>
                                </Card>
                            </div>
                            <div className="pr-3 pl-3">
                                <Card>
                                    <CardBody className="text-center">
                                        <div className="mb-4">
                                            <i className="iconsmind-Play-Music large-icon"></i>
                                            <h5 className="mb-0 font-weight-semibold"><IntlMessages id="lp.connect.title-3" /></h5>
                                        </div>
                                        <NavLink className="btn btn-link font-weight-semibold" to="/features"><IntlMessages id="lp.connect.button-3" /></NavLink>
                                    </CardBody>
                                </Card>
                            </div>

                            <div className="pr-3 pl-3">
                                <Card>
                                    <CardBody className="text-center">
                                        <div className="mb-4">
                                            <i className="iconsmind-Folder-WithDocument large-icon"></i>
                                            <h5 className="mb-0 font-weight-semibold"><IntlMessages id="lp.connect.title-4" /></h5>
                                        </div>
                                        <NavLink className="btn btn-link font-weight-semibold" to="/features"><IntlMessages id="lp.connect.button-4" /></NavLink>
                                    </CardBody>
                                </Card>
                            </div>
                        </ReactSiemaCarousel>
                    </Colxx>
                </Row>

            </Fragment>
        );
    }
}
