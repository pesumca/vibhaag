import React, { Fragment } from "react";
import { Row } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";

export default class SectionFeatures extends React.Component {
    render() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs={{ size: "12", offset: 0 }} lg={{ size: 8, offset: 2 }} className="text-center">
                        <h1><IntlMessages id="lp.featuressection.title"/></h1>
                        <p>
                            <IntlMessages id="lp.featuressection.detail"/>
                        </p>
                    </Colxx>
                </Row>

                <Row className="feature-row">
                    <Colxx xxs="12" md="6" lg="5" className="d-flex align-items-center">
                        <div className="d-flex">
                            <div className="feature-text-container">
                                <h2><IntlMessages id="lp.featuressection.title-1"/></h2>
                                <p>
                                    <IntlMessages id="lp.featuressection.detail-1-1"/><br/><br/>
                                    <IntlMessages id="lp.featuressection.detail-1-2"/><br/><br/>
                                    <IntlMessages id="lp.featuressection.detail-1-3"/>
                                </p>
                            </div>
                        </div>
                    </Colxx>
                    <Colxx xxs="12" md={{ size: "6", offset: 0 }} lg={{ size: "6", offset: 1 }} className="position-relative">
                        <img alt="feature" className="feature-image-right feature-image-charts position-relative" src="/assets/img/landing-page/feature.png" />
                    </Colxx>
                </Row>

                <Row className="featur1e-row">
                    <Colxx xxs={{ size: 12, order: 2 }} md={{ size: 6, order: 1 }} lg="6">
                        <img alt="feature" className="feature-image-left feature-image-charts" src="/assets/img/landing-page/feature-2.png" />
                    </Colxx>
                    <Colxx xxs={{ size: 12, order: 1 }} md={{ size: 6, offset: 0, order: 2 }} lg={{ size: 5, offset: 1 }} className="d-flex align-items-center">
                        <div className="d-flex">
                            <div className="feature-text-container">
                                <h2><IntlMessages id="lp.featuressection.title-2"/></h2>
                                <p>
                                    <IntlMessages id="lp.featuressection.detail-2-1"/><br/><br/>
                                    <IntlMessages id="lp.featuressection.detail-2-2"/><br/><br/>
                                    <IntlMessages id="lp.featuressection.detail-2-3"/>
                                </p>
                            </div>
                        </div>
                    </Colxx>
                </Row>

                <Row className="feature-row">
                    <Colxx xxs="12" md="6" lg="5" className="d-flex align-items-center">
                        <div className="d-flex">
                            <div className="feature-text-container">
                                <h2><IntlMessages id="lp.featuressection.title-3"/></h2>
                                <p>
                                    <IntlMessages id="lp.featuressection.detail-3-1"/><br/><br/>
                                    <IntlMessages id="lp.featuressection.detail-3-2"/><br/><br/>
                                    <IntlMessages id="lp.featuressection.detail-3-3"/>
                                 </p>
                            </div>
                        </div>
                    </Colxx>
                    <Colxx xxs="12" md={{ size: "6", offset: 0 }} lg={{ size: "6", offset: 1 }} className="position-relative">
                        <img alt="feature" className="feature-image-right feature-image-charts position-relative" src="/assets/img/landing-page/feature-3.png" />
                    </Colxx>
                </Row>
            </Fragment>
        );
    }
}














