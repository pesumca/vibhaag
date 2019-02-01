import React, { Fragment } from "react";
import { Row, Card, CardBody } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";

export default class SectionTimeline extends React.Component {
    render() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs={{ size: "12", offset: 0 }} lg={{ size: 8, offset: 2 }} className="text-center">
                        <h1><IntlMessages id="lp.timeline.title" /></h1>
                        <p>
                            <IntlMessages id="lp.timeline.detail" />
                        </p>
                    </Colxx>
                </Row>

                <Row className="mt-5">
                    <ul className="timeline">
                        <li>
                            <div className="timeline-badge"><IntlMessages id="lp.timeline.year-1" /></div>
                            <Card className="timeline-panel">
                                <CardBody>
                                    <h3><IntlMessages id="lp.timeline.title-1" /></h3>
                                    <p className="text-muted text-small mb-5"><IntlMessages id="lp.timeline.subtitle-1" /></p>
                                    <p><IntlMessages id="lp.timeline.detail-1" /></p>
                                </CardBody>
                            </Card>
                        </li>

                        <li className="timeline-inverted">
                            <div className="timeline-badge"><IntlMessages id="lp.timeline.year-2" /></div>
                            <Card className="timeline-panel">
                                <CardBody>
                                    <h3><IntlMessages id="lp.timeline.title-2" /></h3>
                                    <p className="text-muted text-small mb-5"><IntlMessages id="lp.timeline.subtitle-2" /></p>
                                    <p><IntlMessages id="lp.timeline.detail-2" /></p>
                                </CardBody>
                            </Card>
                        </li>

                        <li>
                            <div className="timeline-badge"><IntlMessages id="lp.timeline.year-3" /></div>
                            <Card className="timeline-panel">
                                <CardBody>
                                    <h3><IntlMessages id="lp.timeline.title-3" /></h3>
                                    <p className="text-muted text-small mb-5"><IntlMessages id="lp.timeline.subtitle-3" /></p>
                                    <p><IntlMessages id="lp.timeline.detail-3" /></p>
                                </CardBody>
                            </Card>
                        </li>

                        <li className="timeline-inverted">
                            <div className="timeline-badge"><IntlMessages id="lp.timeline.year-4" /></div>
                            <Card className="timeline-panel">
                                <CardBody>
                                    <h3><IntlMessages id="lp.timeline.title-4" /></h3>
                                    <p className="text-muted text-small mb-5"><IntlMessages id="lp.timeline.subtitle-4" /></p>
                                    <p><IntlMessages id="lp.timeline.detail-4" /></p>
                                </CardBody>
                            </Card>
                        </li>

                        
                        <li className="mb-0">
                            <div className="timeline-badge"><IntlMessages id="lp.timeline.year-5" /></div>
                            <Card className="timeline-panel">
                                <CardBody>
                                    <h3><IntlMessages id="lp.timeline.title-5" /></h3>
                                    <p className="text-muted text-small mb-5"><IntlMessages id="lp.timeline.subtitle-5" /></p>
                                    <p><IntlMessages id="lp.timeline.detail-5" /></p>
                                </CardBody>
                            </Card>
                        </li>
                    </ul>
                </Row>
            </Fragment>
        );
    }
}
