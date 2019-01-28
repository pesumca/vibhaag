import React, { Fragment } from "react";
import { Row, Button } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";

export default class SectionCareerHerd extends React.Component {
    render() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs={{ size: "12", offset: 0 }} lg={{ size: 8, offset: 2 }} className="text-center">
                        <h1><IntlMessages id="lp.careers-herd.title" /></h1>
                        <p>
                            <IntlMessages id="lp.careers-herd.detail" />
                        </p>

                        <Button color="primary" onClick={(event) => {
                            this.props.onClick("openPositions", event);
                        }}>
                            Open Positions
                        </Button>

                    </Colxx>
                </Row>
                <Row className="mt-5">
                    <Colxx xxs="12" xl="4" lg="6" md="6" className="mb-5">
                        <img alt="careers" className="img-fluid" src="/assets/img/landing-page/careers-1.jpg" />
                    </Colxx>
                    <Colxx xxs="12" xl="4" lg="6" sm="6" className="mb-5">
                        <img alt="careers" className="img-fluid" src="/assets/img/landing-page/careers-2.jpg" />
                    </Colxx>
                    <Colxx xxs="12" xl="4" lg="4" sm="6" className="mb-5">
                        <img alt="careers" className="img-fluid" src="/assets/img/landing-page/careers-3.jpg" />
                    </Colxx>
                    <Colxx xxs="12" xl="3" lg="4" sm="6" className="mb-5">
                        <img alt="careers" className="img-fluid" src="/assets/img/landing-page/careers-4.jpg" />
                    </Colxx>
                    <Colxx xxs="12" xl="3" lg="4" sm="6" className="mb-5">
                        <img alt="careers" className="img-fluid" src="/assets/img/landing-page/careers-5.jpg" />
                    </Colxx>
                    <Colxx xxs="12" xl="3" lg="6" md="6" className="mb-5">
                        <img alt="careers" className="img-fluid" src="/assets/img/landing-page/careers-6.jpg" />
                    </Colxx>
                    <Colxx xxs="12" xl="3" lg="6" md="6" className="mb-5 d-none d-lg-block">
                        <img alt="careers" className="img-fluid" src="/assets/img/landing-page/careers-7.jpg" />
                    </Colxx>
                </Row>
            </Fragment>
        );
    }
}

