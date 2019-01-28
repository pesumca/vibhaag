import React, {Fragment} from "react";
import Slider, { Range } from "rc-slider";


const sliderHandle = props => {
    const { value, dragging, index, offset, ...restProps } = props;
    const positionStyle = {
      position: "absolute",
      left: `${offset}%`
    };
    return (
      <Fragment key={index}>
        <div className="rc-slider-tooltip" style={positionStyle}>
          {"$"+value}
        </div>
        <Slider.Handle value={value} offset={offset} {...restProps} />
      </Fragment>
    );
  };

export class SliderTooltip extends React.Component {
  render() {
      return (
        <Slider  handle={this.props.handle || sliderHandle} {...this.props}/>
      )
  }
}


export class RangeTooltip extends React.Component {
  render() {
      return (
        <Range handle={this.props.handle || sliderHandle} {...this.props}/>
      )
  }
}