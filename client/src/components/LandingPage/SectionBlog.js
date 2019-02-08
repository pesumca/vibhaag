import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Row, Card, CardBody } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import { injectIntl} from 'react-intl';
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

class SectionBlog extends React.Component {

    render() {
        const {messages} = this.props.intl;
        return (
            <Fragment>
                <Row>
                    <Colxx xxs={{ size: "12", offset: 0 }} lg={{ size: 8, offset: 2 }} className="text-center">
                        <h1><IntlMessages id="lp.blogsection.title" /></h1>
                        <p>
                            <IntlMessages id="lp.blogsection.detail" />
                        </p>
                    </Colxx>
                </Row>

                <Row className="mt-5">
                    <Colxx xxs="12" lg="6" className="mb-4">
                        <Card className="flex-row mb-5 listing-card-container">
                            <div className="w-40 position-relative">
                                <NavLink to="/blog-detail">
                                    <img className="card-img-left" src="/assets/img/landing-page/blog-thumb-1.jpg" alt="Card cap" />
                                </NavLink>
                            </div>

                            <div className="w-60 d-flex align-items-center">
                                <CardBody>
                                    <NavLink to="/blog-detail">
                                        <h3 className="mb-4 listing-heading">
                                            <ResponsiveEllipsis
                                                text={messages["lp.blogsection.title-1"]} 
                                                maxLine='2'
                                                ellipsis='...'
                                                trimRight
                                                basedOn='letters' />
                                        </h3>
                                    </NavLink>
                                    <div className="listing-desc">
                                        <ResponsiveEllipsis
                                            text={messages["lp.blogsection.detail-1"]} 
                                            maxLine='3'
                                            ellipsis='...'
                                            trimRight
                                            basedOn='letters' />
                                    </div>
                                    <footer>
                                        <p className="text-muted text-small mb-0 font-weight-light">21.12.2018</p>
                                    </footer>
                                </CardBody>
                            </div>
                        </Card>
                    </Colxx>

                    <Colxx xxs="12" lg="6" className="mb-4">
                        <Card className="flex-row mb-5 listing-card-container">
                            <div className="w-40 position-relative">
                                <NavLink to="/blog-detail" className="video-play-icon">
                                    <span></span>
                                </NavLink>
                                <img className="card-img-left" src="/assets/img/landing-page/blog-thumb-2.jpg" alt="Card cap" />
                            </div>

                            <div className="w-60 d-flex align-items-center">
                                <CardBody>
                                    <NavLink to="/blog-detail">
                                        <h3 className="mb-4 listing-heading">
                                            <ResponsiveEllipsis
                                                text={messages["lp.blogsection.title-2"]} 
                                                maxLine='2'
                                                ellipsis='...'
                                                trimRight
                                                basedOn='letters' />
                                        </h3>
                                    </NavLink>
                                    <div className="listing-desc ellipsis">
                                        <ResponsiveEllipsis
                                            text={messages["lp.blogsection.detail-2"]} 
                                            maxLine='3'
                                            ellipsis='...'
                                            trimRight
                                            basedOn='letters' />
                                    </div>
                                    <footer>
                                        <p className="text-muted text-small mb-0 font-weight-light">18.12.2018</p>
                                    </footer>
                                </CardBody>
                            </div>
                        </Card>
                    </Colxx>

                    <Colxx xxs="12" lg="6" className="mb-4">
                        <Card className="flex-row mb-5 listing-card-container">
                            <div className="w-40 position-relative">
                                <NavLink to="/blog-detail">
                                    <img className="card-img-left" src="/assets/img/landing-page/blog-thumb-3.jpg" alt="Card cap" />
                                </NavLink>
                            </div>

                            <div className="w-60 d-flex align-items-center">
                                <CardBody>
                                    <NavLink to="/blog-detail">
                                        <h3 className="mb-4 listing-heading">
                                            <ResponsiveEllipsis
                                                text={messages["lp.blogsection.title-3"]}
                                                maxLine='2'
                                                ellipsis='...'
                                                trimRight
                                                basedOn='letters' />
                                        </h3>
                                    </NavLink>
                                    <div className="listing-desc">
                                        <ResponsiveEllipsis
                                            text={messages["lp.blogsection.detail-3"]} 
                                            maxLine='3'
                                            ellipsis='...'
                                            trimRight
                                            basedOn='letters' />
                                    </div>
                                    <footer>
                                        <p className="text-muted text-small mb-0 font-weight-light">04.12.2018</p>
                                    </footer>
                                </CardBody>
                            </div>
                        </Card>
                    </Colxx>

                    <Colxx xxs="12" lg="6" className="mb-4">
                        <Card className="flex-row mb-5 listing-card-container">
                            <div className="w-40 position-relative">
                                <NavLink to="/blog-detail">
                                    <img className="card-img-left" src="/assets/img/landing-page/blog-thumb-4.jpg" alt="Card cap" />
                                </NavLink>
                            </div>

                            <div className="w-60 d-flex align-items-center">
                                <CardBody>
                                    <NavLink to="/blog-detail">
                                        <h3 className="mb-4 listing-heading ellipsis">
                                            <ResponsiveEllipsis
                                                text={messages["lp.blogsection.title-4"]}
                                                maxLine='2'
                                                ellipsis='...'
                                                trimRight
                                                basedOn='letters' />
                                        </h3>
                                    </NavLink>
                                    <div className="listing-desc ellipsis">
                                        <ResponsiveEllipsis
                                            text={messages["lp.blogsection.detail-4"]}
                                            maxLine='3'
                                            ellipsis='...'
                                            trimRight
                                            basedOn='letters' />
                                    </div>
                                    <footer>
                                        <p className="text-muted text-small mb-0 font-weight-light">27.11.2018</p>
                                    </footer>
                                </CardBody>
                            </div>
                        </Card>
                    </Colxx>
                </Row>

            </Fragment>
        );
    }
}

export default injectIntl(SectionBlog)
