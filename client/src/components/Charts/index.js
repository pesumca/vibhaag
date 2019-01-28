import React, { Fragment } from "react";
import ChartComponent, { Chart } from "react-chartjs-2";
import {addCommas} from "Util/Utils";
import { ThemeColors } from "Util/ThemeColors";

export const chartTooltip = {
  backgroundColor: ThemeColors().foregroundColor,
  titleFontColor: ThemeColors().primaryColor,
  borderColor: ThemeColors().separatorColor,
  borderWidth: 0.5,
  bodyFontColor: ThemeColors().primaryColor,
  bodySpacing: 10,
  xPadding: 15,
  yPadding: 15,
  cornerRadius: 0.15
};


export const centerTextPlugin = {
  afterDatasetsUpdate: function(chart) {},
  beforeDraw: function(chart) {
    var width = chart.chartArea.right;
    var height = chart.chartArea.bottom;
    var ctx = chart.chart.ctx;
    ctx.restore();

    var activeLabel = chart.data.labels[0];
    var activeValue = chart.data.datasets[0].data[0];
    var dataset = chart.data.datasets[0];
    var meta = dataset._meta[Object.keys(dataset._meta)[0]];
    var total = meta.total;

    var activePercentage = parseFloat(((activeValue / total) * 100).toFixed(1));
    activePercentage = chart.legend.legendItems[0].hidden
      ? 0
      : activePercentage;

    if (chart.pointAvailable) {
      activeLabel = chart.data.labels[chart.pointIndex];
      activeValue =
        chart.data.datasets[chart.pointDataIndex].data[chart.pointIndex];

      dataset = chart.data.datasets[chart.pointDataIndex];
      meta = dataset._meta[Object.keys(dataset._meta)[0]];
      total = meta.total;
      activePercentage = parseFloat(((activeValue / total) * 100).toFixed(1));
      activePercentage = chart.legend.legendItems[chart.pointIndex].hidden
        ? 0
        : activePercentage;
    }

    ctx.font = "36px Nunito, sans-serif";
    ctx.fillStyle  = ThemeColors().primaryColor;
    ctx.textBaseline = "middle";

    var text = activePercentage + "%",
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = height / 2;
    ctx.fillText(text, textX, textY);

    ctx.font = "14px Nunito, sans-serif";
    ctx.textBaseline = "middle";

    var text2 = activeLabel,
      textX2 = Math.round((width - ctx.measureText(text2).width) / 2),
      textY2 = height / 2 - 30;
    ctx.fillText(text2, textX2, textY2);

    ctx.save();
  },
  beforeEvent: function(chart, event, options) {
    var firstPoint = chart.getElementAtEvent(event)[0];

    if (firstPoint) {
      chart.pointIndex = firstPoint._index;
      chart.pointDataIndex = firstPoint._datasetIndex;
      chart.pointAvailable = true;
    }
  }
};

export class PolarShadow extends React.Component {
  componentWillMount() {
    Chart.defaults.polarWithShadow = Chart.defaults.polarArea;
    Chart.controllers.polarWithShadow = Chart.controllers.polarArea.extend({
      draw: function(ease) {
        Chart.controllers.radar.prototype.draw.call(this, ease);
        let ctx = this.chart.chart.ctx;
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.2)";
        ctx.shadowBlur = 7;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 7;
        ctx.responsive = true;
        Chart.controllers.radar.prototype.draw.apply(this, arguments);
        ctx.restore();
      }
    });
  }

  render() {
    return (
      <ChartComponent
        ref={ref => (this.chart_instance = ref && ref.chart_instance)}
        type="polarWithShadow"
        {...this.props}
      />
    );
  }
}

export class LineShadow extends React.Component {
  componentWillMount() {
    Chart.defaults.lineWithShadow = Chart.defaults.line;
    Chart.controllers.lineWithShadow = Chart.controllers.line.extend({
      draw: function(ease) {
        Chart.controllers.line.prototype.draw.call(this, ease);
        var ctx = this.chart.ctx;
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.15)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 10;
        ctx.responsive = true;
        ctx.stroke();
        Chart.controllers.line.prototype.draw.apply(this, arguments);
        ctx.restore();
      }
    });
  }

  render() {
    return (
      <ChartComponent
        ref={ref => (this.chart_instance = ref && ref.chart_instance)}
        type="lineWithShadow"
        {...this.props}
      />
    );
  }
}

export class ScatterShadow extends React.Component {
  componentWillMount() {
    Chart.defaults.scatterWithShadow = Chart.defaults.scatter;
    Chart.controllers.scatterWithShadow = Chart.controllers.scatter.extend({
      draw: function(ease) {
        Chart.controllers.scatter.prototype.draw.call(this, ease);
        let ctx = this.chart.chart.ctx;
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.2)";
        ctx.shadowBlur = 7;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 7;
        ctx.responsive = true;
        Chart.controllers.scatter.prototype.draw.apply(this, arguments);
        ctx.restore();
      }
    });
  }

  render() {
    return (
      <ChartComponent
        ref={ref => (this.chart_instance = ref && ref.chart_instance)}
        type="scatterWithShadow"
        {...this.props}
      />
    );
  }
}

export class BarShadow extends React.Component {
  componentWillMount() {
    Chart.defaults.barWithShadow = Chart.defaults.bar;
    Chart.controllers.barWithShadow = Chart.controllers.bar.extend({
      draw: function(ease) {
        Chart.controllers.bar.prototype.draw.call(this, ease);
        var ctx = this.chart.ctx;
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.2)";
        ctx.shadowBlur = 7;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 7;
        ctx.responsive = true;
        Chart.controllers.bar.prototype.draw.apply(this, arguments);
        ctx.restore();
      }
    });
  }

  render() {
    return (
      <ChartComponent
        ref={ref => (this.chart_instance = ref && ref.chart_instance)}
        type="barWithShadow"
        {...this.props}
      />
    );
  }
}

export class RadarShadow extends React.Component {
  componentWillMount() {
    Chart.defaults.radarWithShadow = Chart.defaults.radar;
    Chart.controllers.radarWithShadow = Chart.controllers.radar.extend({
      draw: function(ease) {
        Chart.controllers.radar.prototype.draw.call(this, ease);
        let ctx = this.chart.chart.ctx;
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.2)";
        ctx.shadowBlur = 7;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 7;
        ctx.responsive = true;
        Chart.controllers.radar.prototype.draw.apply(this, arguments);
        ctx.restore();
      }
    });
  }

  render() {
    return (
      <ChartComponent
        ref={ref => (this.chart_instance = ref && ref.chart_instance)}
        type="radarWithShadow"
        {...this.props}
      />
    );
  }
}

export class PieShadow extends React.Component {
  componentWillMount() {
    Chart.defaults.pieWithShadow = Chart.defaults.pie;
    Chart.controllers.pieWithShadow = Chart.controllers.pie.extend({
      draw: function(ease) {
        Chart.controllers.pie.prototype.draw.call(this, ease);
        let ctx = this.chart.chart.ctx;
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.15)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 10;
        ctx.responsive = true;
        Chart.controllers.pie.prototype.draw.apply(this, arguments);
        ctx.restore();
      }
    });
  }

  render() {
    return (
      <ChartComponent
        ref={ref => (this.chart_instance = ref && ref.chart_instance)}
        type="pieWithShadow"
        {...this.props}
      />
    );
  }
}

export class DoughnutShadow extends React.Component {
  componentWillMount() {
    Chart.defaults.doughnutWithShadow = Chart.defaults.doughnut;
    Chart.controllers.doughnutWithShadow = Chart.controllers.doughnut.extend({
      draw: function(ease) {
        Chart.controllers.doughnut.prototype.draw.call(this, ease);
        let ctx = this.chart.chart.ctx;
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.15)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 10;
        ctx.responsive = true;
        Chart.controllers.doughnut.prototype.draw.apply(this, arguments);
        ctx.restore();
      }
    });
  }

  render() {
    return (
      <ChartComponent
        ref={ref => (this.chart_instance = ref && ref.chart_instance)}
        type="doughnutWithShadow"
        {...this.props}
      />
    );
  }
}

export class SmallLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.changeState = this.changeState.bind(this);
    this.state = {
      currentValue: "",
      currentLabel: ""
    };
  }

  componentWillMount() {
    Chart.defaults.lineWithLine = Chart.defaults.line;
    Chart.controllers.lineWithLine = Chart.controllers.line.extend({
      draw: function(ease) {
        Chart.controllers.line.prototype.draw.call(this, ease);

        if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
          var activePoint = this.chart.tooltip._active[0];
          var ctx = this.chart.ctx;
          var x = activePoint.tooltipPosition().x;
          var topY = this.chart.scales["y-axis-0"].top;
          var bottomY = this.chart.scales["y-axis-0"].bottom;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = 1;
          ctx.strokeStyle = "rgba(0,0,0,0.1)";
          ctx.stroke();
          ctx.restore();
        }
      }
    });
  }

  changeState(yLabel, xLabel) {
    this.setState({ currentValue: yLabel, currentLabel: xLabel });
  }


  render() {
    let changeState = this.changeState;
    return (
      <Fragment>
        <div>
          <p className="lead color-theme-1 mb-1 value">
            {this.state.currentValue}
          </p>
          <p className="mb-0 label text-small">{this.state.currentLabel}</p>
        </div>
        <div className="chart">
          <ChartComponent
            ref={ref => (this.chart_instance = ref && ref.chart_instance)}
            type="lineWithLine"
            options={{
              layout: {
                padding: {
                  left: 5,
                  right: 5,
                  top: 10,
                  bottom: 10
                }
              },
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                display: false
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true
                    },
                    display: false
                  }
                ],
                xAxes: [
                  {
                    display: false
                  }
                ]
              },
              tooltips: {
                intersect: false,
                enabled: false,
                custom: function(tooltipModel) {
                  if (tooltipModel && tooltipModel.dataPoints) {
                    var yLabel = tooltipModel.dataPoints[0].yLabel;
                    var xLabel = tooltipModel.dataPoints[0].xLabel;
                    var label = tooltipModel.body[0].lines[0].split(":")[0];
                    changeState("$" + addCommas(yLabel), label + "-" + xLabel);
                  }
                }
              }
            }}
            plugins={[
              {
                afterInit: function(chart, options) {
                  var yLabel = chart.data.datasets[0].data[0];
                  var xLabel = chart.data.labels[0];
                  var label = chart.data.datasets[0].label;
                  changeState("$" + addCommas(yLabel), label + "-" + xLabel);
                }
              }
            ]}
            {...this.props}
          />
        </div>
      </Fragment>
    );
  }
}
