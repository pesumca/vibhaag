import React, { Fragment } from "react";
import { UncontrolledTooltip, Button } from "reactstrap";
import { injectIntl } from 'react-intl';

class SectionFeedback extends React.Component {

    constructor(props) {
        super(props);
        this.state = { message: "", showButtons: true }
    }

    componentDidMount() {
        this.setState({ message: this.props.intl.messages["lp.feedback.default"] });
    }

    render() {
        const { messages } = this.props.intl;
        return (
            <Fragment>
                <p>{this.state.message}</p>
                <Button className="m-1 p-1" style={{visibility: this.state.showButtons ? "visible": "hidden"}} color="link" id="nay" onClick={() => {
                    this.setState({ message: messages["lp.feedback.dislike"], showButtons: false });
                }}>
                    <i className="simple-icon-dislike"></i>
                </Button>

                <Button className="m-1 p-1" style={{visibility: this.state.showButtons ? "visible": "hidden"}} color="link" id="yay" onClick={() => {
                    this.setState({ message: messages["lp.feedback.like"], showButtons: false });
                }}>
                    <i className="simple-icon-like"></i>
                </Button>

                <UncontrolledTooltip placement="top" target="nay">
                    {messages["lp.feedback.nay"]}
                </UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target="yay">
                    {messages["lp.feedback.yay"]}
                </UncontrolledTooltip>
            </Fragment>
        );
    }
}
export default injectIntl(SectionFeedback)
