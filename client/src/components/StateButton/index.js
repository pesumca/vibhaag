import React from "react";
import { Button, Popover, PopoverBody } from "reactstrap";
import classnames from 'classnames'

class StateButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
        this.state = {
            status: "default",
            message: "",
            messageShow: false

        };
    }


    handleOnClick() {

        this.setState({
            status: "processing"
        }, () => {
            this.props.onClick()
                .then(res => {
                    this.setState({
                        status: "success",
                        message: res
                    })
                }).catch(err => {
                    this.setState({
                        status: "fail",
                        message: err
                    })
                }).finally(() => {
                    this.setState({
                        messageShow: true
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                messageShow: false,
                                status: "default"
                            });
                        }, 3000)
                    })
                })
        });
    }
    render() {
        return (
            <span>
                <Button
                    id={this.props.id}
                    className={`btn-multiple-state  ${this.props.className}  ${classnames(
                        {   "show-spinner": this.state.status === "processing", 
                            "show-success": this.state.status === "success", 
                            "show-fail": this.state.status === "fail" }
                    )}`}
                    color={this.props.color}
                    onClick={this.handleOnClick}
                    disabled={this.state.status != "default"}
                >
                    <Popover placement="top" isOpen={this.state.messageShow} target={this.props.id} >
                        <PopoverBody>{this.state.message}</PopoverBody>
                    </Popover>
                    <span className="spinner d-inline-block">
                        <span className="bounce1"></span>
                        <span className="bounce2"></span>
                        <span className="bounce3"></span>
                    </span>
                    <span className="icon success">
                        <i className="simple-icon-check"></i>
                    </span>
                    <span className="icon fail">
                        <i className="simple-icon-exclamation"></i>
                    </span>
                    <span className="label">{this.props.children}</span>
                </Button>
            </span >
        );
    }
}


export default StateButton;