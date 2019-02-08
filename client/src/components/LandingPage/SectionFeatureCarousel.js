import React from "react";
import { NavLink } from "react-router-dom";
import { Row, Card, CardBody } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";
import ReactSiemaCarousel from "Components/ReactSiema/ReactSiemaCarousel";

export default class SectionFeatureCarousel extends React.Component {

    render() {
        return (
            <Row>
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
                                        <i className="iconsmind-Cupcake large-icon"></i>
                                        <h5 className="mb-0 font-weight-semibold"><IntlMessages id="lp.featurecarousel.title-1"/></h5>
                                    </div>
                                    <div>
                                        <p className="detail-text"><IntlMessages id="lp.featurecarousel.detail-1"/></p>
                                    </div>
                                    <NavLink className="btn btn-link font-weight-semibold" to="/features"><IntlMessages id="lp.featurecarousel.view"/></NavLink>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="pr-3 pl-3">
                            <Card>
                                <CardBody className="text-center">
                                    <div>
                                        <i className="iconsmind-Line-Chart2 large-icon"></i>
                                        <h5 className="mb-0 font-weight-semibold"><IntlMessages id="lp.featurecarousel.title-2"/></h5>
                                    </div>
                                    <div>
                                        <p className="detail-text"><IntlMessages id="lp.featurecarousel.detail-2"/></p>
                                    </div>
                                    <NavLink className="btn btn-link font-weight-semibold" to="/features"><IntlMessages id="lp.featurecarousel.view"/></NavLink>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="pr-3 pl-3">
                            <Card>
                                <CardBody className="text-center">
                                    <div>
                                        <i className="iconsmind-Three-ArrowFork large-icon"></i>
                                        <h5 className="mb-0 font-weight-semibold"><IntlMessages id="lp.featurecarousel.title-3"/></h5>
                                    </div>
                                    <div>
                                        <p className="detail-text"><IntlMessages id="lp.featurecarousel.detail-3"/></p>
                                    </div>
                                    <NavLink className="btn btn-link font-weight-semibold" to="/features"><IntlMessages id="lp.featurecarousel.view"/></NavLink>
                                </CardBody>
                            </Card>
                        </div>

                        <div className="pr-3 pl-3">
                            <Card>
                                <CardBody className="text-center">
                                    <div>
                                        <i className="iconsmind-Funny-Bicycle large-icon"></i>
                                        <h5 className="mb-0 font-weight-semibold"><IntlMessages id="lp.featurecarousel.title-4"/></h5>
                                    </div>
                                    <div>
                                        <p className="detail-text"><IntlMessages id="lp.featurecarousel.detail-4"/></p>
                                    </div>
                                    <NavLink className="btn btn-link font-weight-semibold" to="/features"><IntlMessages id="lp.featurecarousel.view"/></NavLink>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="pr-3 pl-3">
                            <Card>
                                <CardBody className="text-center">
                                    <div>
                                        <i className="iconsmind-Full-View large-icon"></i>
                                        <h5 className="mb-0 font-weight-semibold"><IntlMessages id="lp.featurecarousel.title-5"/></h5>
                                    </div>
                                    <div>
                                        <p className="detail-text"><IntlMessages id="lp.featurecarousel.detail-5"/></p>
                                    </div>
                                    <NavLink className="btn btn-link font-weight-semibold" to="/features"><IntlMessages id="lp.featurecarousel.view"/></NavLink>
                                </CardBody>
                            </Card>
                        </div>
                    </ReactSiemaCarousel>
                </Colxx>
            </Row>
        );
    }
}












