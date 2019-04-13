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
			apiUrl: "http://localhost:3000/" + "departments",
			department: [],
		};
	}

	handleDepartmentChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	createDepartment = () => {
		axios.post(this.state.apiUrl, {
			name: this.state.name,
			departmentCode: this.state.departmentCode
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
									<IntlMessages id="menu.departments" />
								</CardTitle>

								<CardSubtitle>Create New Department</CardSubtitle>

								<AvForm className="av-tooltip mb-5 row">
									<Colxx sm={6}>
										<AvGroup>
											<Label className="av-label" for="avexampleNameTooltip">
												<IntlMessages id="departments.name" />
											</Label>
											<AvInput
												name="name" id={this.state.department.name + this.state.department._id}
												value=""
												onChange={this.handleDepartmentChange}
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
												<IntlMessages id="departments.code" />
											</Label>
											<AvInput
												name="departmentCode"
												id={this.state.department.departmentCode + this.state.department._id}
												value=""
												onChange={this.handleDepartmentChange}
												required
											/>
											<AvFeedback>
												<IntlMessages id="forms.lastname-message" />
											</AvFeedback>
										</AvGroup>
									</Colxx>

									<Colxx sm={12}>
										<FormGroup>
											<Button outline color="primary" onClick={this.createDepartment}>
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