import React from "react";
import { Row, Button, InputGroup, InputGroupAddon, Input } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";
import { injectIntl } from 'react-intl';

class SectionNewsletter extends React.Component {
    render() {
        const { messages } = this.props.intl;

        return (
            <Row>
                <Colxx xxs={{ size: "12", offset: 0 }} lg={{ size: 8, offset: 2 }} className="text-center">
                    <h1><IntlMessages id="lp.newsletter.title" /></h1>
                    <p>
                        <IntlMessages id="lp.newsletter.detail" />
                    </p>
                </Colxx>
                <Colxx xxs={{ size: "12", offset: 0 }} lg={{ size: 6, offset: 3 }} className="newsletter-input-container">
                    <InputGroup className="mb-3">
                        <Input placeholder={messages["lp.newsletter.placeholder"]} />
                        <InputGroupAddon addonType="append">
                            <Button color="secondary" size="xl"><IntlMessages id="lp.newsletter.button" /></Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Colxx>
            </Row>
        );
    }
}
export default injectIntl(SectionNewsletter)