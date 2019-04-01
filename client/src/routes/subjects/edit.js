import React, { Component, Fragment } from "react";
import axios from 'axios';
import { injectIntl} from 'react-intl';
import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";
import IntlMessages from "Util/IntlMessages";
import {
  Row,
  Card,
  CardBody,
  Input,
  CardTitle,
  FormGroup,
  Label,
  CustomInput,
  Button,
  FormText,
  Form,
  CardSubtitle
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";
import DatePicker from "react-datepicker";
import moment from "moment";
import TagsInput from "react-tagsinput";

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

const selectData = [
  { label: "Chocolate", value: "chocolate", key: 0 },
  { label: "Vanilla", value: "vanilla", key: 1 },
  { label: "Strawberry", value: "strawberry", key: 2 },
  { label: "Caramel", value: "caramel", key: 3 },
  { label: "Cookies and Cream", value: "cookiescream", key: 4 },
  { label: "Peppermint", value: "peppermint", key: 5 }
];

class FormsUi extends Component {
  constructor(props) {
    super(props);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleTagChangeLabelOver = this.handleTagChangeLabelOver.bind(this);
    this.handleChangeDateLabelOver = this.handleChangeDateLabelOver.bind(this);
    this.handleTagChangeLabelTop = this.handleTagChangeLabelTop.bind(this);
    this.handleChangeLabelTop = this.handleChangeLabelTop.bind(this);
    this.handleChangeDateLabelTop = this.handleChangeDateLabelTop.bind(this);

    this.state = {
      selectedOption: "",
      selectedOptionLabelOver: "",
      selectedOptionLabelTop: "",
      startDate: null,
      startDateLabelOver: null,
      startDateLabelTop: null,
      startDateTime: null,
      startDateRange: null,
      endDateRange: null,
      embeddedDate: moment(),
      apiUrl: "http://localhost:3000/" + "subjects" + "/" + this.props.match.params.id,
      tags: [],
      subject: [],
      name: "",
      subjectCode: "",
      tagsLabelOver: [],
      tagsLabelTop: []
    };
  }

  handleTagChange(tags) {
    this.setState({ tags });
  }

  handleTagChangeLabelOver(tagsLabelOver) {
    this.setState({ tagsLabelOver });
  }

  handleTagChangeLabelTop(tagsLabelTop) {
    this.setState({ tagsLabelTop });
  }

  handleChangeLabelOver = selectedOptionLabelOver => {
    this.setState({ selectedOptionLabelOver });
  };

  handleChangeLabelTop = selectedOptionLabelTop => {
    this.setState({ selectedOptionLabelTop });
  };

  handleChangeDateLabelOver(date) {
    this.setState({
      startDateLabelOver: date
    });
  }
  handleChangeDateLabelTop(date) {
    this.setState({
      startDateLabelTop: date
    });
  }

  handleNameChange = (event) => {
    console.log(event.target.value);
    
    this.setState({
        name: event.target.value,
    });

  }

  handleCodeChange = (event) => {
    console.log(event.target.value);
    
    this.setState({
        subjectCode: event.target.value,
    });

  }

  editSubject = () => {
    axios.put(this.state.apiUrl, {
        name: this.state.name,
        subjectCode: this.state.subjectCode
      })
      .then((response) => {
        this.props.history.push("/");
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
      });


  }

  componentDidMount(){
    console.log("APIURL: " + this.state.apiUrl);

    axios.get(this.state.apiUrl)
      .then((response) => {
        console.log("Response: " + JSON.stringify(response.data));
          this.setState({
              subject: response.data
          }, () => {
            console.log(this.state.subject);
          })   
      })
      .catch((error) => {
        console.log(error);
      });
      console.log("Subject: " + this.state.subject);
    }

  render() {
    const {messages} = this.props.intl;
    return (
      <Fragment>
        <Row>
          {/* <Colxx xxs="12">
            <BreadcrumbContainer
              heading={<IntlMessages id="menu.subjects" />}
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx> */}
        </Row>

        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="menu.subjects" />
                </CardTitle>

                <CardSubtitle>Edit: {this.state.subject.name}</CardSubtitle>

                <AvForm className="av-tooltip mb-5 row">
                  <Colxx sm={6}>
                    <AvGroup>
                      <Label className="av-label" for="avexampleNameTooltip">
                        <IntlMessages id="subjects.name" />
                      </Label>
                      <AvInput 
                      name="name" id={this.state.subject.name + this.state.subject._id} 
                      value={this.state.subject.name} 
                      onChange={this.handleNameChange}
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
                        value={this.state.subject.subjectCode}
                        onChange={this.handleCodeChange}
                        required
                      />
                      <AvFeedback>
                        <IntlMessages id="forms.lastname-message" />
                      </AvFeedback>
                    </AvGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup>
                      <Button outline color="primary" onClick={this.editSubject}>
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
export default  injectIntl(FormsUi)