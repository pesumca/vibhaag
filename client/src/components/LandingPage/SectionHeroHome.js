import React from "react";
import { NavLink } from "react-router-dom";
import { Row } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";

export default class SectionHeroHome extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.onResizeLandingPage()
    window.addEventListener("resize", this.onResizeLandingPage, true);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResizeLandingPage, true);
  }

  onResizeLandingPage() {
    var rowOffestHome = document.querySelector(".home-row").offsetLeft;
    document.querySelector(".landing-page .section.home").style.backgroundPositionX=rowOffestHome - 252 + "px";
  }
 
  render() {
    return (
      <Row className="home-row">
        <Colxx xxs="12" className="d-block d-md-none">
          <img
            alt="mobile hero"
            className="mobile-hero"
            src="/assets/img/landing-page/home-hero-mobile.png"
          />
        </Colxx>

        <Colxx xxs="12" xl="4" lg="5" md="6">
          <div className="home-text">
            <div className="display-1">
              <IntlMessages id="lp.hero.line-1" />
              <br />
              <IntlMessages id="lp.hero.line-2" />
            </div>
            <p className="white mb-5">
              <IntlMessages id="lp.hero.detail-line-1" />
              <br />
              <br />
              <IntlMessages id="lp.hero.detail-line-2" />
              <br />
              <br />
              <IntlMessages id="lp.hero.detail-line-3" />
            </p>
            <NavLink
              to="/auth-register"
              className="btn btn-outline-semi-light btn-xl"
            >
              <IntlMessages id="lp.hero.register" />
            </NavLink>
          </div>
        </Colxx>

        <Colxx
          xxs="12"
          xl={{ size: 7, offset: 1 }}
          md="6"
          lg="7"
          className="d-none d-md-block"
        >
          <img alt="hero" src="/assets/img/landing-page/home-hero.png" />
        </Colxx>
      </Row>
    );
  }
}
