import React, { Component, Fragment } from "react";
import axios from 'axios';
import { injectIntl } from 'react-intl';
import { Colxx } from "Components/CustomBootstrap";
import IntlMessages from "Util/IntlMessages";
import {
	Row,
	Card,
	CardBody,
	CardTitle,
	FormGroup,
	Label,
	Button,
	CardSubtitle
} from "reactstrap";

import {
	AvForm,
	AvGroup,
	AvInput,
	AvFeedback
} from "availity-reactstrap-validation";
import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "react-fine-uploader/gallery/gallery.css";

class FormsUi extends Component {
	constructor(props) {
		super(props);

		this.state = {
			apiUrl: "http://localhost:3000/" + "users",
			user: [],
			name: "",
			departmentCode: ""
		};
	}

	handleUserChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	createUser = () => {
		axios.post(this.state.apiUrl, {
			name: this.state.name,
			email: this.state.email,
			roles: this.state.roles,
		})
			.then((response) => {
				this.props.history.push("/");
				console.log(response);

			})
			.catch(function (error) {
				console.log(error);
			});
	}

	componentDidMount() {
		console.log("APIURL: " + this.state.apiUrl);
	}

	render() {
		return (
			<Fragment>
				<Row className="mb-4">
					<Colxx xxs="12">
						<Card>
							<CardBody>
								<CardTitle>
									<IntlMessages id="menu.users" />
								</CardTitle>

								<CardSubtitle>Create New User</CardSubtitle>

								<AvForm className="av-tooltip mb-5 row">
									<Colxx sm={6}>
										<AvGroup>
											<Label className="av-label" for="avexampleNameTooltip">
												<IntlMessages id="users.name" />
											</Label>
											<AvInput
												name="name" id={this.state.user.name + this.state.user._id}
												value=""
												onChange={this.handleUserChange}
												required />
											<AvFeedback>
												<IntlMessages id="forms.firstname-message" />
											</AvFeedback>
										</AvGroup>
									</Colxx>

									<Colxx sm={6}>
										<AvGroup>
											<Label
												className="av-label"
												for="avexampleLastNameTooltip"
											>
												<IntlMessages id="users.code" />
											</Label>
											<AvInput
												name="email"
												id={this.state.user.email + this.state.user._id}
												value={this.state.user.email}
												onChange={this.handleUserChange}
												required
											/>
											<AvFeedback>
												<IntlMessages id="forms.lastname-message" />
											</AvFeedback>
										</AvGroup>
									</Colxx>

									<Colxx sm={12}>
										<AvGroup>
											<Label
												className="av-label"
												for="avexampleLastNameTooltip"
											>
												<IntlMessages id="users.code" />
											</Label>
											<AvInput
												name="roles"
												id={this.state.user.roles + this.state.user._id}
												value={this.state.user.roles}
												onChange={this.handleUserChange}
												required
											/>
											<AvFeedback>
												<IntlMessages id="forms.lastname-message" />
											</AvFeedback>
										</AvGroup>
									</Colxx>

									<Colxx sm={12}>
										<FormGroup>
											<Button outline color="primary" onClick={this.createUser}>
												<IntlMessages id="forms.submit" />
											</Button>
										</FormGroup>
									</Colxx>
								</AvForm>
							</CardBody>
						</Card>
					</Colxx>
				</Row>
			</Fragment>
		);
	}
}

export default injectIntl(FormsUi)