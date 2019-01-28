import React, { Fragment } from "react";
import { Row, Card, CardBody } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";
import ReactSiemaCarousel from "Components/ReactSiema/ReactSiemaCarousel";
import { NavLink } from "react-router-dom";

export default class SectionNumbers extends React.Component {
    render() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs={{ size: "12", offset: 0 }} lg={{ size: 8, offset: 2 }} className="text-center">
                        <h1><IntlMessages id="lp.numbers.title" /></h1>
                        <p>
                            <IntlMessages id="lp.numbers.detail" />
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
                                        <div>
                                            <i className="iconsmind-Conference large-icon"></i>
                                            <h5 className="mb-3"><IntlMessages id="lp.numbers.title-1" /></h5>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                            <div className="pr-3 pl-3">
                                <Card>
                                    <CardBody className="text-center">
                                        <div>
                                            <i className="iconsmind-Money-Bag large-icon"></i>
                                            <h5 className="mb-3"><IntlMessages id="lp.numbers.title-2" /></h5>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                            <div className="pr-3 pl-3">
                                <Card>
                                    <CardBody className="text-center">
                                        <div>
                                            <i className="iconsmind-MaleFemale large-icon"></i>
                                            <h5 className="mb-3"><IntlMessages id="lp.numbers.title-3" /></h5>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                            <div className="pr-3 pl-3">
                                <Card>
                                    <CardBody className="text-center">
                                        <div>
                                            <i className="iconsmind-Dog large-icon"></i>
                                            <h5 className="mb-3"><IntlMessages id="lp.numbers.title-4" /></h5>
                                        </div>
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
