import React from "react";
import {

  Button,
  Popover,
  PopoverBody,
  Tooltip
} from "reactstrap";

export class PopoverItem extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return (
      <span>
        <Button
          className="mr-1 mb-2"
          color="secondary"
          id={"Popover-" + this.props.id}
          onClick={this.toggle}
        >
          {this.props.item.text}
        </Button>
        <Popover
          placement={this.props.item.placement}
          isOpen={this.state.popoverOpen}
          target={"Popover-" + this.props.id}
          toggle={this.toggle}
        >
          <PopoverBody>{this.props.item.body}</PopoverBody>
        </Popover>
      </span>
    );
  }
}

export class TooltipItem extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    return (
      <span>
        <Button
          className="mr-1 mb-2"
          color="secondary"
          id={"Tooltip-" + this.props.id}
        >
          {this.props.item.text}
        </Button>
        <Tooltip
          placement={this.props.item.placement}
          isOpen={this.state.tooltipOpen}
          target={"Tooltip-" + this.props.id}
          toggle={this.toggle}
        >
          {this.props.item.body}
        </Tooltip>
      </span>
    );
  }
}
