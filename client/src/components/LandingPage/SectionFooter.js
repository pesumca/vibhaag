import React, { Fragment } from "react";
import { Row, Container, Collapse, Button } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";
import { NavLink } from "react-router-dom";
export default class SectionHero extends React.Component {
    constructor(props) {
        super(props);

        this.toggleAccordion = this.toggleAccordion.bind(this);
        this.state = {
            accordion: [false, false, false, false]
        };
    }

    toggleAccordion(tab) {
        const prevState = this.state.accordion;
        const state = prevState.map((x, index) => (tab === index ? !x : false));
        this.setState({
            accordion: state
        });
    }

    componentDidMount() {
        this.onResizeLandingPage()
        window.addEventListener("resize", this.onResizeLandingPage, true);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onResizeLandingPage, true);
    }

    onResizeLandingPage() {
        var rowOffestFooter = document.querySelector(".footer-row").offsetLeft;
        document.querySelector(".landing-page .section.footer").style.backgroundPositionX=(window.outerWidth - rowOffestFooter - 1668) + "px";
    }


    render() {
        return (
            <Fragment>
                <Container>
                    <Row className="footer-row">
                        <Colxx xxs="12" className="text-right">
                            <NavLink className="btn btn-circle btn-outline-semi-light footer-circle-button " to="#" onClick={(event) => {
                                this.props.onClick("home", event);
                            }}><i className="simple-icon-arrow-up"></i></NavLink>
                        </Colxx>
                        <Colxx xxs="12" className="text-center footer-content">
                            <NavLink to="/multipage-home">
                                <img className="footer-logo" alt="footer logo" src="/assets/img/landing-page/logo-footer.svg" />
                            </NavLink>
                        </Colxx>
                    </Row>

                    <Row>

                        <Colxx xxs={{ size: 12, offset: 0 }} xs="6" sm="3" lg={{ size: 2, offset: 2 }} className="footer-menu mb-5">
                            <div className="d-flex flex-column align-items-center">
                                <a className="d-inline-block d-xs-none collapse-button mb-1"
                                    onClick={() => this.toggleAccordion(0)}
                                    aria-expanded={this.state.accordion[0]}><IntlMessages id="lp.footer.menu-1" /> <i className="simple-icon-arrow-down"></i>
                                </a>

                                <Collapse tag="ul" isOpen={this.state.accordion[0]} className="list-unstyled footer-menu d-xs-block mb-0">
                                    <li className="d-none d-xs-inline-block">
                                        <p><IntlMessages id="lp.footer.menu-1" /></p>
                                    </li>
                                    <li>
                                        <NavLink to="/about">
                                            <IntlMessages id="lp.footer.menu-1-1" />
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/blog">
                                            <IntlMessages id="lp.footer.menu-1-2" />
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/careers">
                                            <IntlMessages id="lp.footer.menu-1-3" />
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/contact">
                                            <IntlMessages id="lp.footer.menu-1-4" />
                                        </NavLink>
                                    </li>
                                </Collapse>
                            </div>
                        </Colxx>

                        <Colxx xxs={{ size: 12, offset: 0 }} xs="6" sm="3" lg={{ size: 2 }} className="footer-menu mb-5">
                            <div className="d-flex flex-column align-items-center">

                                <a className="d-inline-block d-xs-none collapse-button mb-1"
                                    onClick={() => this.toggleAccordion(1)}
                                    aria-expanded={this.state.accordion[1]}><IntlMessages id="lp.footer.menu-2" /> <i className="simple-icon-arrow-down"></i>
                                </a>

                                <Collapse tag="ul" isOpen={this.state.accordion[1]} className="list-unstyled footer-menu  d-xs-block mb-0" >
                                    <li className="d-none d-xs-inline-block">
                                        <p><IntlMessages id="lp.footer.menu-2" /></p>
                                    </li>
                                    <li>
                                        <NavLink to="/features">
                                            <IntlMessages id="lp.footer.menu-2-1" />
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/prices">
                                            <IntlMessages id="lp.footer.menu-2-2" />
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/docs-details">
                                            <IntlMessages id="lp.footer.menu-2-3" />
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/docs-details">
                                            <IntlMessages id="lp.footer.menu-2-4" />
                                        </NavLink>
                                    </li>
                                </Collapse>
                            </div>
                        </Colxx>

                        <Colxx xxs={{ size: 12, offset: 0 }} xs="6" sm="3" lg={{ size: 2 }} className="footer-menu mb-5">
                            <div className="d-flex flex-column align-items-center">

                                <a className="d-inline-block d-xs-none collapse-button mb-1"
                                    onClick={() => this.toggleAccordion(2)}
                                    aria-expanded={this.state.accordion[2]}><IntlMessages id="lp.footer.menu-3" /> <i className="simple-icon-arrow-down"></i>
                                </a>

                                <Collapse tag="ul" isOpen={this.state.accordion[2]} className="list-unstyled footer-menu  d-xs-block mb-0">
                                    <li className="d-none d-xs-inline-block">
                                        <p><IntlMessages id="lp.footer.menu-3" /></p>
                                    </li>
                                    <li>
                                        <NavLink to="/contact">
                                            <IntlMessages id="lp.footer.menu-3-1" />
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/docs-details">
                                            <IntlMessages id="lp.footer.menu-3-2" />
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/docs">
                                            <IntlMessages id="lp.footer.menu-3-3" />
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/videos">
                                            <IntlMessages id="lp.footer.menu-3-4" />
                                        </NavLink>
                                    </li>
                                </Collapse>
                            </div>
                        </Colxx>

                        <Colxx xxs={{ size: 12, offset: 0 }} xs="6" sm="3" lg={{ size: 2 }} className="footer-menu mb-5">
                            <div className="d-flex flex-column align-items-center">

                                <a className="d-inline-block d-xs-none collapse-button mb-1"
                                    onClick={() => this.toggleAccordion(3)}
                                    aria-expanded={this.state.accordion[3]}><IntlMessages id="lp.footer.menu-4" /> <i className="simple-icon-arrow-down"></i>
                                </a>

                                <Collapse tag="ul" isOpen={this.state.accordion[3]} className="list-unstyled footer-menu collapse d-xs-block mb-0" >
                                    <li className="d-none d-xs-inline-block">
                                        <p><IntlMessages id="lp.footer.menu-4" /></p>
                                    </li>
                                    <li>
                                        <NavLink to="/content">
                                            <IntlMessages id="lp.footer.menu-4-1" />
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/content">
                                            <IntlMessages id="lp.footer.menu-4-2" />
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/content">
                                            <IntlMessages id="lp.footer.menu-4-3" />
                                        </NavLink>
                                    </li>
                                </Collapse>
                            </div>
                        </Colxx>

                    </Row>
                </Container>
                
                <div className="separator mt-5"></div>

                <Container className="copyright pt-5 pb-5">
                    <Row>
                        <div className="col-6">
                            <p className="mb-0"><IntlMessages id="lp.footer.copyright" /></p>
                        </div>
                        <div className="col-6 text-right social-icons">
                            <ul className="list-unstyled list-inline">
                                <li className="list-inline-item">
                                    <a href="#"><i className="simple-icon-social-facebook"></i></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#"><i className="simple-icon-social-twitter"></i></a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#"><i className="simple-icon-social-instagram"></i></a>
                                </li>
                            </ul>
                        </div>
                    </Row>

                </Container>

            </Fragment>
        );
    }
}
