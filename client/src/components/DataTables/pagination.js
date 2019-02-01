import React, { Component } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
const defaultButton = props => (
  <button type="button" {...props} className="-btn">
    {props.children}
  </button>
);

export default class DataTablePagination extends Component {
  constructor(props) {
    super();

    this.getSafePage = this.getSafePage.bind(this);
    this.changePage = this.changePage.bind(this);
    this.applyPage = this.applyPage.bind(this);
    this.pageClick = this.pageClick.bind(this);
    this.renderPages = this.renderPages.bind(this);

    this.state = {
      page: props.page
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ page: nextProps.page });
  }

  getSafePage(page) {
    if (Number.isNaN(page)) {
      page = this.props.page;
    }
    return Math.min(Math.max(page, 0), this.props.pages - 1);
  }

  changePage(page) {
    page = this.getSafePage(page);
    this.setState({ page });
    if (this.props.page !== page) {
      this.props.onPageChange(page);
    }
  }

  applyPage(e) {
    if (e) {
      e.preventDefault();
    }
    const page = this.state.page;
    this.changePage(page === "" ? this.props.page : page);
  }

  pageClick(pageIndex) {
    this.changePage(pageIndex);
  }

  renderPages() {
    let pageCount = this.props.pages;
    let pageButtons = [];
    for (let i = 0; i < pageCount; i++) {
      let active = this.state.page === i ? true : false;
      pageButtons.push(
        <PaginationItem key={i} active={active} className="vsdv">
          <PaginationLink 
          onClick={() => this.pageClick(i)}
          >{i + 1}</PaginationLink>
        </PaginationItem>
      );
    }
    return pageButtons;
  }

  render() {
    const {
      page,
      canPrevious,
      canNext,
    } = this.props;

    return (
      <Pagination size="sm" listClassName="justify-content-center" aria-label="Page navigation example">
        <PaginationItem className={`${!canPrevious&& "disabled"}`}>
          <PaginationLink
            className={"prev"}
            onClick={() => {
              if (!canPrevious) return;
              this.changePage(page - 1);
            }}
            disabled={!canPrevious}
          >
            <i className="simple-icon-arrow-left" />
          </PaginationLink>
        </PaginationItem>

        {this.renderPages()}
        <PaginationItem className={`${!canNext&& "disabled"}`}>
          <PaginationLink
            className="next"
            onClick={() => {
              if (!canNext) return;
              this.changePage(page + 1);
            }}
            disabled={!canNext}
          >
            <i className="simple-icon-arrow-right" />
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    );
  }
}
