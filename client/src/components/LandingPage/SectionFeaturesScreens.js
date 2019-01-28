import React, { Fragment } from "react";
import { Row, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";
import classnames from 'classnames';

export default class SectionOffer extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: 'survey'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


    render() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs={{ size: "12", offset: 0 }} lg={{ size: 8, offset: 2 }} className="text-center">
                        <h1><IntlMessages id="lp.screens.title" /></h1>
                        <p>
                            <IntlMessages id="lp.screens.detail" />
                        </p>
                    </Colxx>
                </Row>

                <Row className="screenshots mt-4">
                    <Colxx xxs="12" className="text-center mb-4">

                        <Nav tabs className="justify-content-center mb-4">
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === 'survey' })}
                                    onClick={() => { this.toggle('survey'); }}>
                                    <p><IntlMessages id="lp.screens.survey" /></p>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === 'chat' })}
                                    onClick={() => { this.toggle('chat'); }}>
                                    <p><IntlMessages id="lp.screens.chat" /></p>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === 'todo' })}
                                    onClick={() => { this.toggle('todo'); }}>
                                    <p><IntlMessages id="lp.screens.todo" /></p>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane className="justify-content-center" tabId="survey">
                                <img alt="app " className="app-image" src="/assets/img/landing-page/application-survey.jpg" />
                            </TabPane>

                            <TabPane className="justify-content-center" tabId="chat">
                                <img alt="app " className="app-image" src="/assets/img/landing-page/application-chat.jpg" />
                            </TabPane>

                            <TabPane className="justify-content-center" tabId="todo">
                                <img alt="app " className="app-image" src="/assets/img/landing-page/application-todo.jpg" />
                            </TabPane>

                        </TabContent>

                    </Colxx>
                </Row>
            </Fragment>

        );
    }
}
