import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardBody, CardTitle, Button, Jumbotron } from "reactstrap";

import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";

export default class extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <BreadcrumbContainer
              heading={<IntlMessages id="menu.second" />}
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        {
          /*Enjoy!*/
        }
      </Fragment>
    );
  }
}
