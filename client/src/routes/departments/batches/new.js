import React, { Component, Fragment } from "react";
import axios from 'axios';
import { injectIntl } from 'react-intl';
import { Colxx, Separator } from "Components/CustomBootstrap";
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
			apiUrl: "http://localhost:3000/" + "departments" + "/" + this.props.match.params.id,
			batch: [],
		};
	}

	handleBatchChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	newBatch = () => {
		axios.put(this.state.apiUrl, {
			name: this.state.name,
			noOfStudents: this.state.noOfStudents,
			department: this.state.description,
			start: this.state.start,
			end: this.state.end,
			semester: this.state.semester,
		})
			.then((response) => {
				this.props.history.goBack();
				console.log(response);

			})
			.catch(function (error) {
				console.log(error);
			});
	}

	componentDidMount() {
		console.log("APIURL: " + this.state.apiUrl);

		axios.get(this.state.apiUrl)
			.then((response) => {
				console.log("Response: " + JSON.stringify(response.data));
				this.setState({
					batch: response.data
				}, () => {
					console.log(this.state.batch);
				})
			})
			.catch((error) => {
				console.log(error);
			});
		console.log("Batch: " + this.state.batch);
	}

	render() {
		return (
			<Fragment>
				<Row className="mb-4">
					<Colxx xxs="12">
						<Card>
							<CardBody>
								<CardTitle>
									<IntlMessages id="menu.batches" />
								</CardTitle>

								<CardSubtitle>New: {this.state.batch.name}</CardSubtitle>

								<AvForm className="av-tooltip mb-5 row">
									<Colxx sm={6}>
										<AvGroup>
											<Label className="av-label" for="avexampleNameTooltip">
												<IntlMessages id="batches.name" />
											</Label>
											<AvInput
												name="name" id={this.state.batch.name + this.state.batch._id}
												onChange={this.handleBatchChange}
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
												<IntlMessages id="batches.code" />
											</Label>
											<AvInput
												name="noOfStudents"
												id={this.state.batch.noOfStudents + this.state.batch._id}
												onChange={this.handleBatchChange}
												required
											/>
											<AvFeedback>
												<IntlMessages id="forms.lastname-message" />
											</AvFeedback>
										</AvGroup>
									</Colxx>

									<Colxx sm={6}>
										<AvGroup>
											<Label
												className="av-label"
												for="avexampleLastNameTooltip"
											>
												<IntlMessages id="batches.code" />
											</Label>
											<AvInput
												name="department"
												id={this.state.batch.department + this.state.batch._id}
												onChange={this.handleBatchChange}
												required
											/>
											<AvFeedback>
												<IntlMessages id="forms.lastname-message" />
											</AvFeedback>
										</AvGroup>
									</Colxx>

									<Colxx sm={6}>
										<AvGroup>
											<Label
												className="av-label"
												for="avexampleLastNameTooltip"
											>
												<IntlMessages id="batches.code" />
											</Label>
											<AvInput
												name="start"
												id={this.state.batch.start + this.state.batch._id}
												onChange={this.handleBatchChange}
												required
											/>
											<AvFeedback>
												<IntlMessages id="forms.lastname-message" />
											</AvFeedback>
										</AvGroup>
									</Colxx>

									<Colxx sm={6}>
										<AvGroup>
											<Label
												className="av-label"
												for="avexampleLastNameTooltip"
											>
												<IntlMessages id="batches.code" />
											</Label>
											<AvInput
												name="end"
												id={this.state.batch.end + this.state.batch._id}
												onChange={this.handleBatchChange}
												required
											/>
											<AvFeedback>
												<IntlMessages id="forms.lastname-message" />
											</AvFeedback>
										</AvGroup>
									</Colxx>

									<Colxx sm={6}>
										<AvGroup>
											<Label
												className="av-label"
												for="avexampleLastNameTooltip"
											>
												<IntlMessages id="batches.code" />
											</Label>
											<AvInput
												name="semester"
												id={this.state.batch.semester + this.state.batch._id}
												onChange={this.handleBatchChange}
												required
											/>
											<AvFeedback>
												<IntlMessages id="forms.lastname-message" />
											</AvFeedback>
										</AvGroup>
									</Colxx>

									<Colxx sm={12}>
										<FormGroup>
											<Button outline color="primary" onClick={this.newBatch}>
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