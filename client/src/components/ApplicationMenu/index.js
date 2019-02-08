import React from "react";
import ReactDOM from 'react-dom';
import { NavLink } from "reactstrap";
export default class ApplicationMenu extends React.Component {
  constructor(...params) {
    super(...params);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false
    };
  }

  handleDocumentClick(e) {
    const container = ReactDOM.findDOMNode(this);
    if ((container.contains(e.target) || container === e.target)) {
      return;
    }

    this.toggle(e);
  }

  toggle(e) {
    e.preventDefault();
    const isOpen = this.state.isOpen;
    if (!isOpen) {
        this.addEvents();
    } else {
        this.removeEvents();
    }
    this.setState({
        isOpen: !isOpen
    })
}

  componentWillUnmount() {
      this.removeEvents();
  }

  addEvents() {
    ['click', 'touchstart'].forEach(event =>
      document.addEventListener(event, this.handleDocumentClick, true)
    );
  }

  removeEvents() {
    ['click', 'touchstart'].forEach(event =>
      document.removeEventListener(event, this.handleDocumentClick, true)
    );
  }

  render() {
    return (
      <div className={`app-menu ${this.state.isOpen ? 'shown' : ''}`}>
        {this.props.children}

        <NavLink
          className="app-menu-button d-inline-block d-xl-none"
          onClick={this.toggle}
        >
          <i className="simple-icon-refresh" />
        </NavLink>
      </div>
    );
  }
}
