import React from "react";
import { Row, Button } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";

export default class SectionOffer extends React.Component {
    render() {
        return (
            <Row>
                <Colxx xxs={{ size: "12", offset: 0 }} lg={{ size: 8, offset: 2 }} className="text-center">
                    <h1><IntlMessages id="lp.offer.title" /></h1>
                    <p>
                        <IntlMessages id="lp.offer.detail" />
                    </p>
                </Colxx>
                <Colxx xxs={{ size: "12", offset: 0 }}>
                    <div className="text-center mt-5">
                        <Button color="secondary" size="xl">
                            <IntlMessages id="lp.offer.button" />
                        </Button>
                    </div>
                </Colxx>
            </Row>
        );
    }
}
