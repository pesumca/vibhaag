import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

import TopNav from 'Containers/TopNav'
import Sidebar from 'Containers/Sidebar';

import departments from './departments';
import DepartmentShow from './departments/show'
import DepartmentEdit from './departments/edit'
import sessions from './sessions';
import SessionShow from './sessions/show'
import subjects from './subjects';
import SubjectShow from './subjects/show';
import users from './users';
import UserShow from './users/show';

import { connect } from 'react-redux';


class MainApp extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { match, containerClassnames } = this.props;
		return (
			<div id="app-container" className={containerClassnames}>
				<TopNav history={this.props.history} />
				<Sidebar />
				<main>
					<div className="container-fluid">
						<Switch>
							<Route path={`${match.url}/departments`} component={departments} exact={true} />
							<Route path={`${match.url}/departments/:id`} component={DepartmentShow} exact={true} />
							<Route path={`${match.url}/departments/:id/edit`} component={DepartmentEdit} exact={true} />
							<Route path={`${match.url}/sessions`} component={sessions} exact={true} />
							<Route path={`${match.url}/sessions/:id`} component={SessionShow} exact={true} />
							<Route path={`${match.url}/subjects`} component={subjects} exact={true} />
							<Route path={`${match.url}/subjects/:id`} component={SubjectShow} exact={true} />
							<Route path={`${match.url}/users`} component={users} exact={true} />
							<Route path={`${match.url}/users/:id`} component={UserShow} exact={true} />
							<Redirect to="/error" />
						</Switch>
					</div>
				</main>
			</div>
		);
	}
}
const mapStateToProps = ({ menu }) => {
	const { containerClassnames } = menu;
	return { containerClassnames };
}

export default withRouter(connect(mapStateToProps, {})(MainApp));