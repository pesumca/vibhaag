import React, { Component } from "react";
import { injectIntl} from 'react-intl';

import {
  Nav,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input
} from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import PerfectScrollbar from "react-perfect-scrollbar";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
  changeLocale
} from "Redux/actions";

import notifications from "Data/topnav.notifications.json";

import { menuHiddenBreakpoint,searchPath,localeOptions } from "Constants/defaultValues";


class TopNav extends Component {
  constructor(props) {
    super(props);
    this.menuButtonClick = this.menuButtonClick.bind(this);
    this.mobileMenuButtonClick = this.mobileMenuButtonClick.bind(this);
    this.search = this.search.bind(this);
    this.handleChangeLocale = this.handleChangeLocale.bind(this);
    this.handleDocumentClickSearch = this.handleDocumentClickSearch.bind(this);
    this.addEventsSearch = this.addEventsSearch.bind(this);
    this.removeEventsSearch = this.removeEventsSearch.bind(this);

    this.state = {
      isInFullScreen: false,
      searchKeyword: ""
    };
  }
  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };
  
  handleChangeLocale = locale => {
    this.props.changeLocale(locale);
  };

  handleSearchIconClick = e => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains("search")) {
        if (e.target.parentElement.classList.contains("search")) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains("search")
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains("mobile-view")) {
        this.search();
        elem.classList.remove("mobile-view");
        this.removeEventsSearch();
      } else {
        elem.classList.add("mobile-view");
        this.addEventsSearch();
      }
    } else {
      this.search();
    }
  };
  addEventsSearch() {
    document.addEventListener("click", this.handleDocumentClickSearch, true);
  }
  removeEventsSearch() {
    document.removeEventListener("click", this.handleDocumentClickSearch, true);
  }

  handleDocumentClickSearch(e) {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("navbar") ||
        e.target.classList.contains("simple-icon-magnifier"))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains("simple-icon-magnifier")) {
        this.search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains("search")
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector(".mobile-view");
      if (input && input.classList) input.classList.remove("mobile-view");
      this.removeEventsSearch();
      this.setState({
        searchKeyword: ""
      });
    }
  }

  handleSearchInputChange(e) {
    this.setState({
      searchKeyword: e.target.value
    });
  }
  handleSearchInputKeyPress(e) {
    if (e.key === 'Enter') {
      this.search() 
    }
  }
  
  search() {
    this.props.history.push(searchPath+"/"+this.state.searchKeyword)
    this.setState({
      searchKeyword: ""
    });
  }
  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    this.setState({
      isInFullScreen: !isInFullScreen
    });
  };

  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  menuButtonClick(e, menuClickCount, containerClassnames) {
    e.preventDefault();

    setTimeout(() => {
      var event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 350);
    this.props.setContainerClassnames(++menuClickCount, containerClassnames);
  }
  mobileMenuButtonClick(e, containerClassnames) {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  }

  render() {
    const { containerClassnames, menuClickCount } = this.props;
    const {messages} = this.props.intl;

    return (
      <nav className="navbar fixed-top">
        <NavLink
          to="#"
          className="menu-button d-none d-md-block"
          onClick={e =>
            this.menuButtonClick(e, menuClickCount, containerClassnames)
          }
        >
          <svg
            className="main"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 9 17"
          >
            <rect x="0.48" y="0.5" width="7" height="1" />
            <rect x="0.48" y="7.5" width="7" height="1" />
            <rect x="0.48" y="15.5" width="7" height="1" />
          </svg>
          <svg
            className="sub"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 17"
          >
            <rect x="1.56" y="0.5" width="16" height="1" />
            <rect x="1.56" y="7.5" width="16" height="1" />
            <rect x="1.56" y="15.5" width="16" height="1" />
          </svg>
        </NavLink>
        <NavLink
          to="#"
          className="menu-button-mobile d-xs-block d-sm-block d-md-none"
          onClick={e => this.mobileMenuButtonClick(e, containerClassnames)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 17">
            <rect x="0.5" y="0.5" width="25" height="1" />
            <rect x="0.5" y="7.5" width="25" height="1" />
            <rect x="0.5" y="15.5" width="25" height="1" />
          </svg>
        </NavLink>

    <div className="search" >
          <Input
            name="searchKeyword"
            id="searchKeyword"
            placeholder={messages["menu.search"]}
            value={this.state.searchKeyword}
            onChange={e => this.handleSearchInputChange(e)}
            onKeyPress ={e=> this.handleSearchInputKeyPress(e)}
          />
          <span className="search-icon" onClick={e => this.handleSearchIconClick(e)}>
            <i className="simple-icon-magnifier" />
          </span>
        </div>

 <div className="d-inline-block">
          <UncontrolledDropdown className="ml-2">
            <DropdownToggle
              caret
              color="light"
              size="sm"
              className="language-button"
            >
              <span className="name">{this.props.locale.toUpperCase()}</span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
            {
              localeOptions.map((l)=>{
                return(
                  <DropdownItem onClick={() => this.handleChangeLocale(l.id)} key={l.id}>
                  {l.name}
                </DropdownItem>
                )
              })
            }
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>

        
        <a className="navbar-logo" href="/">
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </a>

        <div className="ml-auto">
          <div className="header-icons d-inline-block align-middle">
            <div className="position-relative d-none d-sm-inline-block">
              <UncontrolledDropdown className="dropdown-menu-right">
                <DropdownToggle className="header-icon" color="empty">
                  <i className="simple-icon-grid" />
                </DropdownToggle>
                <DropdownMenu
                  className="position-absolute mt-3"
                  right
                  id="iconMenuDropdown"
                >
                  <NavLink to="#" className="icon-menu-item">
                    <i className="iconsmind-Air-Balloon d-block" />{" "}
                    <IntlMessages id="menu.gogo" />
                  </NavLink>
                  <NavLink to="#" className="icon-menu-item">
                    <i className="iconsmind-Pantone d-block" />{" "}
                    <IntlMessages id="menu.ui" />
                  </NavLink>
                  <NavLink to="#" className="icon-menu-item">
                    <i className="iconsmind-Bar-Chart d-block" />{" "}
                    <IntlMessages id="menu.charts" />
                  </NavLink>
                  <NavLink to="#" className="icon-menu-item">
                    <i className="iconsmind-Speach-BubbleDialog d-block" />{" "}
                    <IntlMessages id="menu.chat" />
                  </NavLink>
                  <NavLink to="#" className="icon-menu-item">
                    <i className="iconsmind-Formula d-block" />{" "}
                    <IntlMessages id="menu.survey" />
                  </NavLink>
                  <NavLink to="#" className="icon-menu-item">
                    <i className="iconsmind-Check d-block" />{" "}
                    <IntlMessages id="menu.todo" />
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>

            <div className="position-relative d-inline-block">
              <UncontrolledDropdown className="dropdown-menu-right">
                <DropdownToggle
                  className="header-icon notificationButton"
                  color="empty"
                >
                  <i className="simple-icon-bell" />
                </DropdownToggle>
                <DropdownMenu
                  className="position-absolute mt-3 scroll"
                  right
                  id="notificationDropdown"
                >
                  <PerfectScrollbar
                    option={{ suppressScrollX: true, wheelPropagation: false }}
                  >
                    {notifications.data.map((n, index) => {
                      return (
                        <div
                          key={index}
                          className="d-flex flex-row mb-3 pb-3 border-bottom"
                        >
                          <a href="/app">
                            <img
                              src={n.image}
                              alt="Notification"
                              className="img-thumbnail list-thumbnail xsmall border-0 rounded-circle"
                            />
                          </a>
                          <div className="pl-3 pr-2">
                            <a href="/app">
                              <p className="font-weight-medium mb-1">
                                {n.message}
                              </p>
                              <p className="text-muted mb-0 text-small">
                                {n.date}
                              </p>
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </PerfectScrollbar>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>

            <button
              className="header-icon btn btn-empty d-none d-sm-inline-block"
              type="button"
              id="fullScreenButton"
              onClick={this.toggleFullScreen}
            >
              {this.state.isInFullScreen ? (
                <i className="simple-icon-size-actual d-block" />
              ) : (
                <i className="simple-icon-size-fullscreen d-block" />
              )}
            </button>
          </div>
          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="empty">
                <span className="name mr-1">Sarah Kortney</span>
                <span>
                  <img alt="Profile" src="/assets/img/profile-pic-l.jpg" />
                </span>
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
                <DropdownItem>Account</DropdownItem>
                <DropdownItem>Features</DropdownItem>
                <DropdownItem>History</DropdownItem>
                <DropdownItem>Support</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => this.handleLogout()}>
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount } = menu;
  const { locale } = settings;

  return { containerClassnames, menuClickCount,locale };
};
export default injectIntl(connect(
  mapStateToProps,
  { setContainerClassnames, clickOnMobileMenu, logoutUser,changeLocale }
)(TopNav));
