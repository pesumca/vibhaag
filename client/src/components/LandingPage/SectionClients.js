import React from "react";
import { Row } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";
import ReactSiemaCarousel from "Components/ReactSiema/ReactSiemaCarousel";

export default class SectionClients extends React.Component {
    render() {
        return (
            <Row>
                <Colxx xxs={{ size: "12", offset: 0 }} lg={{ size: 8, offset: 2 }} className="text-center">
                    <h1><IntlMessages id="lp.clients.title" /></h1>
                    <p>
                        <IntlMessages id="lp.clients.detail" />
                    </p>
                </Colxx>
                <Colxx xxs="12" className="p-0 review-carousel">

                    <ReactSiemaCarousel
                        perPage={{
                            0: 1,
                            576: 2,
                            768: 3,
                            992: 5,
                            1440: 6
                        }}
                        controls={false}
                        loop={false}>
                        <div className="pr-3 pl-3 text-center">
                            <img alt="client" className="img-fluid" src="/assets/img/landing-page/client-1.png" />
                        </div>
                        <div className="pr-3 pl-3 text-center">
                            <img alt="client" className="img-fluid" src="/assets/img/landing-page/client-2.png" />
                        </div>
                        <div className="pr-3 pl-3 text-center">
                            <img alt="client" className="img-fluid" src="/assets/img/landing-page/client-3.png" />
                        </div>
                        <div className="pr-3 pl-3 text-center">
                            <img alt="client" className="img-fluid" src="/assets/img/landing-page/client-4.png" />
                        </div>
                        <div className="pr-3 pl-3 text-center">
                            <img alt="client" className="img-fluid" src="/assets/img/landing-page/client-5.png" />
                        </div>
                        <div className="pr-3 pl-3 text-center">
                            <img alt="client" className="img-fluid" src="/assets/img/landing-page/client-2.png" />
                        </div>
                    </ReactSiemaCarousel>
                </Colxx>
            </Row>
        );
    }
}
