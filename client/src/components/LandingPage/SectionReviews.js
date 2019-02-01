import React from "react";
import { Row, Card, CardBody } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";
import ReactSiemaCarousel from "Components/ReactSiema/ReactSiemaCarousel";
import Rating from "Components/Rating";
export default class SectionReviews extends React.Component {
    render() {
        return (
            <Row>
                <Colxx xxs={{ size: "12", offset: 0 }} lg={{ size: 8, offset: 2 }} className="text-center">
                    <h1><IntlMessages id="lp.reviews.title" /></h1>
                    <p>
                        <IntlMessages id="lp.reviews.detail" />
                    </p>
                </Colxx>
                <Colxx xxs="12" className="p-0 review-carousel">

                    <ReactSiemaCarousel
                        perPage={{
                            0: 1,
                            768: 2,
                            1200: 3,
                            1440: 4
                        }}
                        loop={false}>
                        <div className="pr-3 pl-3 d-flex">
                            <Card>
                                <CardBody className="text-center pt-5 pb-5">
                                    <div>
                                        <img alt="review profile" className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail mx-auto" src="/assets/img/profile-pic-l-7.jpg" />
                                        <h5 className="mb-0 font-weight-semibold color-theme-1 mb-3"><IntlMessages id="lp.reviews.review-name-1" /></h5>
                                        <Rating total={5} rating={5} interactive={false} />
                                        <p className="text-muted text-small"><IntlMessages id="lp.reviews.review-type-1" /></p>
                                    </div>
                                    <div className="pl-3 pr-3 pt-3 pb-0 flex-grow-1 d-flex align-items-center">
                                        <p className="mb-0 detail-text">
                                            <IntlMessages id="lp.reviews.review-detail-1" />
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>

                        <div className="pr-3 pl-3 d-flex">
                            <Card>
                                <CardBody className="text-center pt-5 pb-5">
                                    <div>
                                        <img alt="review profile" className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail mx-auto" src="/assets/img/profile-pic-l-11.jpg" />
                                        <h5 className="mb-0 font-weight-semibold color-theme-1 mb-3"><IntlMessages id="lp.reviews.review-name-2" /></h5>
                                        <Rating total={5} rating={5} interactive={false} />
                                        <p className="text-muted text-small"><IntlMessages id="lp.reviews.review-type-2" /></p>
                                    </div>
                                    <div className="pl-3 pr-3 pt-3 pb-0 flex-grow-1 d-flex align-items-center">
                                        <p className="mb-0 detail-text">
                                            <IntlMessages id="lp.reviews.review-detail-2" />
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>

                        <div className="pr-3 pl-3 d-flex">
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

                        <div className="pr-3 pl-3 d-flex">
                            <Card>
                                <CardBody className="text-center pt-5 pb-5">
                                    <div>
                                        <img alt="review profile" className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail mx-auto" src="/assets/img/profile-pic-l-8.jpg" />
                                        <h5 className="mb-0 font-weight-semibold color-theme-1 mb-3"><IntlMessages id="lp.reviews.review-name-4" /></h5>
                                        <Rating total={5} rating={5} interactive={false} />
                                        <p className="text-muted text-small"><IntlMessages id="lp.reviews.review-type-4" /></p>
                                    </div>
                                    <div className="pl-3 pr-3 pt-3 pb-0 flex-grow-1 d-flex align-items-center">
                                        <p className="mb-0 detail-text">
                                            <IntlMessages id="lp.reviews.review-detail-4" />
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="pr-3 pl-3 d-flex">
                            <Card>
                                <CardBody className="text-center pt-5 pb-5">
                                    <div>
                                        <img alt="review profile" className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail mx-auto" src="/assets/img/profile-pic-l-11.jpg" />
                                        <h5 className="mb-0 font-weight-semibold color-theme-1 mb-3"><IntlMessages id="lp.reviews.review-name-5" /></h5>
                                        <Rating total={5} rating={5} interactive={false} />
                                        <p className="text-muted text-small"><IntlMessages id="lp.reviews.review-type-5" /></p>
                                    </div>
                                    <div className="pl-3 pr-3 pt-3 pb-0 flex-grow-1 d-flex align-items-center">
                                        <p className="mb-0 detail-text">
                                            <IntlMessages id="lp.reviews.review-detail-5" />
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </ReactSiemaCarousel>
                </Colxx>
            </Row>
        );
    }
}
