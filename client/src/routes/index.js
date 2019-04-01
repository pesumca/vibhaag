import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import TopNav from 'Containers/TopNav'
import Sidebar from 'Containers/Sidebar';

import Department from './departments';
import DepartmentShow from './departments/show'
import DepartmentEdit from './departments/edit'

import User from './users';
import UserShow from './users/show'
import UserEdit from './users/edit'

import Subject from './subjects';
import SubjectShow from './subjects/show'
import SubjectEdit from './subjects/edit'

import DepartmentUser from './departments/users';
import DepartmentUserShow from './departments/users/show'
import DepartmentUserEdit from './departments/users/edit'

import DepartmentSubject from './departments/subjects';
import DepartmentSubjectShow from './departments/subjects/show'
import DepartmentSubjectEdit from './departments/subjects/edit'

import DepartmentSemester from './departments/semesters'
import DepartmentSemesterShow from './departments/semesters/show'
import DepartmentSemesterEdit from './departments/semesters/edit'

import DepartmentSemesterBatch from './departments/semesters/batches'
import DepartmentSemesterBatchShow from './departments/semesters/batches/show'
import DepartmentSemesterBatchEdit from './departments/semesters/batches/edit'

import DepartmentSemesterBatchSession from './departments/semesters/batches/sessions'
import DepartmentSemesterBatchSessionShow from './departments/semesters/batches/sessions/show'
import DepartmentSemesterBatchSessionEdit from './departments/semesters/batches/sessions/edit'

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
							<Route path={`${match.url}/departments/:id`} component={DepartmentShow} exact={true} />
							<Route path={`${match.url}/departments/:id/edit`} component={DepartmentEdit} exact={true} />

							<Route path={`${match.url}/users`} component={User} exact={true} />
							<Route path={`${match.url}/users/:id`} component={UserShow} exact={true} />
							<Route path={`${match.url}/users/:id/edit`} component={UserEdit} exact={true} />

							<Route path={`${match.url}/subjects`} component={Subject} exact={true} />
							<Route path={`${match.url}/subjects/:id`} component={SubjectShow} exact={true} />
							<Route path={`${match.url}/subjects/:id/edit`} component={SubjectEdit} exact={true} />

							<Route path={`${match.url}/departments/:id/users`} component={DepartmentUser} exact={true} />
							<Route path={`${match.url}/departments/:id/users/:id`} component={DepartmentUserShow} exact={true} />
							<Route path={`${match.url}/departments/:id/users/:id/edit`} component={DepartmentUserEdit} exact={true} />
							
							<Route path={`${match.url}/departments/:id/subjects`} component={DepartmentSubject} exact={true} />
							<Route path={`${match.url}/departments/:id/subjects/:id`} component={DepartmentSubjectShow} exact={true} />
							<Route path={`${match.url}/departments/:id/subjects/:id/edit`} component={DepartmentSubjectEdit} exact={true} />

							<Route path={`${match.url}/departments/:id/semesters`} component={DepartmentSemester} exact={true} />
							<Route path={`${match.url}/departments/:id/semesters/:id`} component={DepartmentSemesterShow} exact={true} />
							<Route path={`${match.url}/departments/:id/semesters/:id/edit`} component={DepartmentSemesterEdit} exact={true} />

							<Route path={`${match.url}/departments/:id/semesters/:id/batches`} component={DepartmentSemesterBatch} exact={true} />
							<Route path={`${match.url}/departments/:id/semesters/:id/batches/:id`} component={DepartmentSemesterBatchShow} exact={true} />
							<Route path={`${match.url}/departments/:id/semesters/:id/batches/:id/edit`} component={DepartmentSemesterBatchEdit} exact={true} />

							<Route path={`${match.url}/departments/:id/semesters/:id/batches/:id/sessions`} component={DepartmentSemesterBatchSession} exact={true} />
							<Route path={`${match.url}/departments/:id/semesters/:id/batches/:id/sessions/:id`} component={DepartmentSemesterBatchSessionShow} exact={true} />
							<Route path={`${match.url}/departments/:id/semesters/:id/batches/:id/sessions/:id/edit`} component={DepartmentSemesterBatchSessionEdit} exact={true} />

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