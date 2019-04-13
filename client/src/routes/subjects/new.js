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
			apiUrl: "http://localhost:3000/" + "subjects",
			subject: [],
		};
	}

	handleSubjectChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	createSubject = () => {
		axios.post(this.state.apiUrl, {
			name: this.state.name,
			subjectCode: this.state.subjectCode,
			description: this.state.description
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
									<IntlMessages id="menu.subjects" />
								</CardTitle>

								<CardSubtitle>Create New Subject</CardSubtitle>

								<AvForm className="av-tooltip mb-5 row">
									<Colxx sm={6}>
										<AvGroup>
											<Label className="av-label" for="avexampleNameTooltip">
												<IntlMessages id="subjects.name" />
											</Label>
											<AvInput
												name="name" id={this.state.subject.name + this.state.subject._id}
												value=""
												onChange={this.handleSubjectChange}
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
												<IntlMessages id="subjects.code" />
											</Label>
											<AvInput
												name="subjectCode"
												id={this.state.subject.subjectCode + this.state.subject._id}
												value=""
												onChange={this.handleSubjectChange}
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
												<IntlMessages id="subjects.code" />
											</Label>
											<AvInput
												name="description"
												id={this.state.subject.description + this.state.subject._id}
												value=""
												onChange={this.handleSubjectChange}
												required
											/>
											<AvFeedback>
												<IntlMessages id="forms.lastname-message" />
											</AvFeedback>
										</AvGroup>
									</Colxx>

									<Colxx sm={12}>
										<FormGroup>
											<Button outline color="primary" onClick={this.createSubject}>
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