import React, { Component } from 'react';
import { Route, withRouter, Switch,Redirect } from 'react-router-dom';

import TopNav from 'Containers/TopNav'
import Sidebar from 'Containers/Sidebar';

import departments from './departments';
import DepartmentShow from './departments/show'
import sessions from './sessions';
import users from './users';

import { connect } from 'react-redux';


class MainApp extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { match, containerClassnames} = this.props;
		return (
			<div id="app-container" className={containerClassnames}>
				<TopNav history={this.props.history} />
				<Sidebar/>
				<main>
					<div className="container-fluid">
						<Switch>
							<Route path={`${match.url}/departments`} component={departments} exact={true} />
							<Route path={`${match.url}/departments/:id`} component={DepartmentShow} exact={true} />
							<Route path={`${match.url}/sessions`} component={sessions} />
							<Route path={`${match.url}/users`} component={users} />
							<Redirect to="/error" />
						</Switch>
					</div>
				</main>
			</div>
		);
	}
}
const mapStateToProps = ({ menu }) => {
	const { containerClassnames} = menu;
	return { containerClassnames };
  }
  
  export default withRouter(connect(mapStateToProps, {})(MainApp));