import React from "react";
import classnames from 'classnames'

class ThumbnailImage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <img alt={this.props.alt} src={this.props.src} className={`img-thumbnail list-thumbnail align-self-center ${this.props.className}  ${classnames(
                {"rounded-circle": this.props.rounded,"small": this.props.small}
            )}`} />

        );
    }
}
export default ThumbnailImage;