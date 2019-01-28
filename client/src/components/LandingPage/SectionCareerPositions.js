import React, { Fragment } from "react";
import { Row, Card, CardBody, Badge } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";
import { NavLink } from "react-router-dom";

export default class SectionCareerPositions extends React.Component {
    render() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs={{ size: "12", offset: 0 }} lg={{ size: 8, offset: 2 }} className="text-center">
                        <h1><IntlMessages id="lp.careers-positions.title" /></h1>
                        <p>
                            <IntlMessages id="lp.careers-positions.detail" />
                        </p>
                    </Colxx>
                </Row>
                <Row className="mt-5">
                    <Colxx xxs="12">
                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                    <NavLink to="#" className="list-item-heading mb-1 w-60 w-xs-100"><IntlMessages id="lp.careers-positions.title-1" /></NavLink>
                                    <p className="mb-1 text-muted text-small w-15 w-xs-100"><IntlMessages id="lp.careers-positions.location-1" /></p>
                                    <div className="w-20 w-xs-100 align-self-center d-flex justify-content-start justify-content-md-end">
                                        <Badge color="secondary" pill><IntlMessages id="lp.careers-positions.tag-1" /></Badge>
                                    </div>
                                </CardBody>
                            </div>
                        </Card>

                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                    <NavLink to="#" className="list-item-heading mb-1 w-60 w-xs-100"><IntlMessages id="lp.careers-positions.title-2" /></NavLink>
                                    <p className="mb-1 text-muted text-small w-15 w-xs-100"><IntlMessages id="lp.careers-positions.location-2" /></p>
                                    <div className="w-20 w-xs-100 align-self-center d-flex justify-content-start justify-content-md-end">
                                        <Badge color="secondary" pill><IntlMessages id="lp.careers-positions.tag-2" /></Badge>
                                    </div>
                                </CardBody>
                            </div>
                        </Card>

                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                    <NavLink to="#" className="list-item-heading mb-1 w-60 w-xs-100"><IntlMessages id="lp.careers-positions.title-3" /></NavLink>
                                    <p className="mb-1 text-muted text-small w-15 w-xs-100"><IntlMessages id="lp.careers-positions.location-3" /></p>
                                    <div className="w-20 w-xs-100 align-self-center d-flex justify-content-start justify-content-md-end">
                                        <Badge color="primary" pill><IntlMessages id="lp.careers-positions.tag-3" /></Badge>
                                    </div>
                                </CardBody>
                            </div>
                        </Card>


                        <Card className="d-flex flex-row mb-3">
                            <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                    <NavLink to="#" className="list-item-heading mb-1 w-60 w-xs-100"><IntlMessages id="lp.careers-positions.title-4" /></NavLink>
                                    <p className="mb-1 text-muted text-small w-15 w-xs-100"><IntlMessages id="lp.careers-positions.location-4" /></p>
                                    <div className="w-20 w-xs-100 align-self-center d-flex justify-content-start justify-content-md-end">
                                        <Badge color="primary" pill><IntlMessages id="lp.careers-positions.tag-4" /></Badge>
                                    </div>
                                </CardBody>
                            </div>
                        </Card>
                    </Colxx>
                </Row>
            </Fragment>
        );
    }
}

