import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import TopNav from 'Containers/TopNav'
import Sidebar from 'Containers/Sidebar';

import Department from './departments';
import DepartmentShow from './departments/show'
import DepartmentEdit from './departments/edit'
import DepartmentNew from './departments/new'

import User from './users';
import UserShow from './users/show'
import UserEdit from './users/edit'
import UserNew from './users/new'

import Subject from './subjects';
import SubjectShow from './subjects/show'
import SubjectEdit from './subjects/edit'
import SubjectNew from './subjects/new'

import DepartmentUser from './departments/users';
import DepartmentUserShow from './departments/users/show'
import DepartmentUserEdit from './departments/users/edit'

import DepartmentSubject from './departments/subjects';
import DepartmentSubjectShow from './departments/subjects/show'
import DepartmentSubjectEdit from './departments/subjects/edit'

import DepartmentBatch from './departments/batches'
import DepartmentBatchShow from './departments/batches/show'
import DepartmentBatchEdit from './departments/batches/edit'

import DepartmentBatchSession from './departments/batches/sessions'
import DepartmentBatchSessionShow from './departments/batches/sessions/show'
import DepartmentBatchSessionEdit from './departments/batches/sessions/edit'

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
							<Route path={`${match.url}/departments`} component={Department} exact={true} />
							<Route path={`${match.url}/departments/new`} component={DepartmentNew} exact={true} />
							<Route path={`${match.url}/departments/:id`} component={DepartmentShow} exact={true} />
							<Route path={`${match.url}/departments/:id/edit`} component={DepartmentEdit} exact={true} />

							<Route path={`${match.url}/users`} component={User} exact={true} />
							<Route path={`${match.url}/users/new`} component={UserNew} exact={true} />
							<Route path={`${match.url}/users/:id`} component={UserShow} exact={true} />
							<Route path={`${match.url}/users/:id/edit`} component={UserEdit} exact={true} />

							<Route path={`${match.url}/subjects`} component={Subject} exact={true} />
							<Route path={`${match.url}/subjects/new`} component={SubjectNew} exact={true} />
							<Route path={`${match.url}/subjects/:id`} component={SubjectShow} exact={true} />
							<Route path={`${match.url}/subjects/:id/edit`} component={SubjectEdit} exact={true} />

							<Route path={`${match.url}/departments/:id/users`} component={DepartmentUser} exact={true} />
							<Route path={`${match.url}/departments/:id/users/:id`} component={DepartmentUserShow} exact={true} />
							<Route path={`${match.url}/departments/:id/users/:id/edit`} component={DepartmentUserEdit} exact={true} />

							<Route path={`${match.url}/departments/:id/subjects`} component={DepartmentSubject} exact={true} />
							<Route path={`${match.url}/departments/:id/subjects/:id`} component={DepartmentSubjectShow} exact={true} />
							<Route path={`${match.url}/departments/:id/subjects/:id/edit`} component={DepartmentSubjectEdit} exact={true} />

							<Route path={`${match.url}/departments/:id/batches`} component={DepartmentBatch} exact={true} />
							<Route path={`${match.url}/departments/:id/batches/:id`} component={DepartmentBatchShow} exact={true} />
							<Route path={`${match.url}/departments/:id/batches/:id/edit`} component={DepartmentBatchEdit} exact={true} />

							<Route path={`${match.url}/departments/:id/batches/:id/sessions`} component={DepartmentBatchSession} exact={true} />
							<Route path={`${match.url}/departments/:id/batches/:id/sessions/:id`} component={DepartmentBatchSessionShow} exact={true} />
							<Route path={`${match.url}/departments/:id/batches/:id/sessions/:id/edit`} component={DepartmentBatchSessionEdit} exact={true} />

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