import React, { Fragment } from "react";
import { Card, CardBody } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import VideoPlayer from "Components/VideoPlayer"
import Rating from "Components/Rating";
import { NavLink } from "react-router-dom";

export default class SectionSidebar extends React.Component {
    render() {
        const videoJsOptions = {
            autoplay: false,
            controls: true,
            className: "video-js side-bar-video",
            poster: "/assets/img/landing-page/subpage-video-poster.jpg",
            sources: [{
                src: 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4',
                type: 'video/mp4'
            }]
        }

        return (
            <Fragment>
                <div className="side-bar-content">
                    <h2><IntlMessages id="lp.blogsection.title" /></h2>

                    <Card className="flex-row mb-4">
                        <div className="w-30 position-relative">
                            <img className="card-img-left" src="/assets/img/landing-page/blog-thumb-1.jpg" alt="Card cap" />
                            <span className="badge badge-pill badge-theme-1 position-absolute badge-top-left">NEW</span>
                        </div>
                        <div className="w-70 d-flex align-items-center">
                            <CardBody>
                                <NavLink to="/blog-detail">
                                    <h6 className="mb-0"><IntlMessages id="lp.blogsection.title-1" /></h6>
                                </NavLink>
                            </CardBody>
                        </div>
                    </Card>

                    <Card className="flex-row mb-4">
                        <div className="w-30 position-relative">
                            <img className="card-img-left" src="/assets/img/landing-page/blog-thumb-2.jpg" alt="Card cap" />
                            <span className="badge badge-pill badge-theme-2 position-absolute badge-top-left">UPDATE</span>
                        </div>
                        <div className="w-70 d-flex align-items-center">
                            <CardBody>
                                <NavLink to="/blog-detail">
                                    <h6 className="mb-0"><IntlMessages id="lp.blogsection.title-2" /></h6>
                                </NavLink>
                            </CardBody>
                        </div>
                    </Card>

                    <Card className="flex-row mb-4">
                        <div className="w-30 position-relative">
                            <img className="card-img-left" src="/assets/img/landing-page/blog-thumb-3.jpg" alt="Card cap" />
                        </div>
                        <div className="w-70 d-flex align-items-center">
                            <CardBody>
                                <NavLink to="/blog-detail">
                                    <h6 className="mb-0"><IntlMessages id="lp.blogsection.title-3" /></h6>
                                </NavLink>
                            </CardBody>
                        </div>
                    </Card>

                    <Card className="flex-row mb-4">
                        <div className="w-30 position-relative">
                            <img className="card-img-left" src="/assets/img/landing-page/blog-thumb-4.jpg" alt="Card cap" />
                        </div>
                        <div className="w-70 d-flex align-items-center">
                            <CardBody>
                                <NavLink to="/blog-detail">
                                    <h6 className="mb-0"><IntlMessages id="lp.blogsection.title-4" /></h6>
                                </NavLink>
                            </CardBody>
                        </div>
                    </Card>

                    <Card className="flex-row mb-4">
                        <div className="w-30 position-relative">
                            <img className="card-img-left" src="/assets/img/landing-page/blog-thumb-5.jpg" alt="Card cap" />
                        </div>
                        <div className="w-70 d-flex align-items-center">
                            <CardBody>
                                <NavLink to="/blog-detail">
                                    <h6 className="mb-0"><IntlMessages id="lp.blogsection.title-5" /></h6>
                                </NavLink>
                            </CardBody>
                        </div>
                    </Card>
                </div>

                <div className="side-bar-content">
                    <h2><IntlMessages id="lp.sidebar.tour-title"/></h2>
                    <Card>
                        <CardBody className="p-0">
                            <div className="position-relative">
                                <VideoPlayer {...videoJsOptions} />
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div>
                    <h2><IntlMessages id="lp.sidebar.review-title"/></h2>
                    <Card>
                        <CardBody className="text-center pt-5 pb-5">
                            <div>
                                <img alt="review profile" className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail mx-auto" src="/assets/img/profile-pic-l-2.jpg" />
                                <h5 className="mb-0 font-weight-semibold color-theme-1 mb-3"><IntlMessages id="lp.reviews.review-name-3" /></h5>
                                <Rating total={5} rating={5} interactive={false} />
                                <p className="text-muted text-small"><IntlMessages id="lp.reviews.review-type-3" /></p>
                            </div>
                            <div className="pl-3 pr-3 pt-3 pb-0 flex-grow-1 d-flex align-items-center">
                                <p className="mb-0 detail-text">
                                    <IntlMessages id="lp.reviews.review-detail-3" />
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </Fragment>
        );
    }
}
