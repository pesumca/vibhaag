import { ThemeColors } from "Util/ThemeColors";
import {
    chartTooltip, centerTextPlugin
  } from "Components/Charts";
  
const colors = ThemeColors();



export const fillChartConfig = {
  legend: {
    display: false
  },
  options: {
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 40,
        bottom: 0
      }
    },
    plugins: {
      datalabels: {
        display: true,
        backgroundColor: "transparent",
        borderRadius: 30,
        borderWidth: 1,
        padding: 5,
        borderColor: function(context) {
          return context.dataset.borderColor;
        },
        color: function(context) {
          return context.dataset.borderColor;
        },
        font: {
          weight: "bold",
          size: 10
        },
        formatter: Math.round
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    tooltips: chartTooltip,
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0
          },
          display: false
        }
      ],
      xAxes: [
        {
          ticks: {
            min: 0
          },
          display: false
        }
      ]
    }
  },
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Data",
        borderColor: colors.themeColor1,
        pointBorderColor: colors.themeColor1,
        pointBackgroundColor: colors.themeColor1,
        pointHoverBackgroundColor: colors.themeColor1,
        pointHoverBorderColor: colors.themeColor1,
        pointRadius: 3,
        pointBorderWidth: 3,
        pointHoverRadius: 3,
        fill: true,
        backgroundColor: colors.themeColor1_10,
        borderWidth: 2,
        data: [180, 140, 150, 120, 180, 110, 160],
        datalabels: {
          align: "end",
          anchor: "end"
        }
      }
    ]
  }
};


export const visitChartConfig = {
  legend: {
    display: false
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: chartTooltip,
    scales: {
      yAxes: [
        {
          gridLines: {
            display: true,
            lineWidth: 1,
            color: "rgba(0,0,0,0.1)",
            drawBorder: false
          },
          ticks: {
            beginAtZero: true,
            stepSize: 5,
            min: 50,
            max: 70,
            padding: 20
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ]
    }
  },
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "",
        data: [54, 63, 60, 65, 60, 68, 60],
        borderColor: colors.themeColor1,
        pointBackgroundColor: colors.foregroundColor,
        pointBorderColor: colors.themeColor1,
        pointHoverBackgroundColor: colors.themeColor1,
        pointHoverBorderColor: colors.foregroundColor,
        pointRadius: 4,
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        fill: true,
        borderWidth: 2,
        backgroundColor: colors.themeColor1_10
      }
    ]
  }
};




export const conversionChartConfig = {
  legend: {
    display: false
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: chartTooltip,
    scales: {
      yAxes: [
        {
          gridLines: {
            display: true,
            lineWidth: 1,
            color: "rgba(0,0,0,0.1)",
            drawBorder: false
          },
          ticks: {
            beginAtZero: true,
            stepSize: 5,
            min: 50,
            max: 70,
            padding: 20
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ]
    }
  },
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "",
        data: [65, 60, 68, 60, 58, 63, 60],
        borderColor: colors.themeColor2,
        pointBackgroundColor: colors.foregroundColor,
        pointBorderColor: colors.themeColor2,
        pointHoverBackgroundColor: colors.themeColor2,
        pointHoverBorderColor: colors.foregroundColor,
        pointRadius: 4,
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        fill: true,
        borderWidth: 2,
        backgroundColor: colors.themeColor2_10
      }
    ]
  }
};

  
  export const lineChartConfig = {
    legend: {
      display: false
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: chartTooltip,
      plugins: {
        datalabels: {
          display: false
        }
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: true,
              lineWidth: 1,
              color: "rgba(0,0,0,0.1)",
              drawBorder: false
            },
            ticks: {
              beginAtZero: true,
              stepSize: 5,
              min: 50,
              max: 70,
              padding: 20
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              display: false
            }
          }
        ]
      }
    },
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "",
          data: [54, 63, 60, 65, 60, 68, 60],
          borderColor: colors.themeColor1,
          pointBackgroundColor: colors.foregroundColor,
          pointBorderColor: colors.themeColor1,
          pointHoverBackgroundColor: colors.themeColor1,
          pointHoverBorderColor: colors.foregroundColor,
          pointRadius: 6,
          pointBorderWidth: 2,
          pointHoverRadius: 8,
          fill: false
        }
      ]
    }
  };
  
  export const polarChartConfig = {
    legend: {
      position: "bottom",
      labels: {
        padding: 30,
        usePointStyle: true,
        fontSize: 12
      }
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scale: {
        ticks: {
          display: false
        }
      },
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: chartTooltip
    },
    data: {
      labels: ["Cakes", "Desserts", "Cupcakes"],
      datasets: [
        {
          data: [80, 90, 70],
          borderWidth: 2,
          borderColor: [
            colors.themeColor1,
            colors.themeColor2,
            colors.themeColor3
          ],
          backgroundColor: [
            colors.themeColor1_10,
            colors.themeColor2_10,
            colors.themeColor3_10
          ]
        }
      ]
    }
  };
  
  export const smallChartData1 = {
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Total Orders",
          borderColor: colors.themeColor1,
          pointBorderColor: colors.themeColor1,
          pointHoverBackgroundColor: colors.themeColor1,
          pointHoverBorderColor: colors.themeColor1,
          pointRadius: 2,
          pointBorderWidth: 3,
          pointHoverRadius: 2,
          fill: false,
          borderWidth: 2,
          data: [1250, 1300, 1550, 921, 1810, 1106, 1610],
          datalabels: {
            align: "end",
            anchor: "end"
          }
        }
      ]
    }
  };
  
  export const smallChartData2 = {
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Pending Orders",
          borderColor: colors.themeColor1,
          pointBorderColor: colors.themeColor1,
          pointHoverBackgroundColor: colors.themeColor1,
          pointHoverBorderColor: colors.themeColor1,
          pointRadius: 2,
          pointBorderWidth: 3,
          pointHoverRadius: 2,
          fill: false,
          borderWidth: 2,
          data: [115, 120, 300, 222, 105, 85, 36],
          datalabels: {
            align: "end",
            anchor: "end"
          }
        }
      ]
    }
  };
  
  export const smallChartData3 = {
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Total Orders",
          borderColor: colors.themeColor1,
          pointBorderColor: colors.themeColor1,
          pointHoverBackgroundColor: colors.themeColor1,
          pointHoverBorderColor: colors.themeColor1,
          pointRadius: 2,
          pointBorderWidth: 3,
          pointHoverRadius: 2,
          fill: false,
          borderWidth: 2,
          data: [350, 452, 762, 952, 630, 85, 158],
          datalabels: {
            align: "end",
            anchor: "end"
          }
        }
      ]
    }
  };
  
  export const smallChartData4 = {
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Total Orders",
          borderColor: colors.themeColor1,
          pointBorderColor: colors.themeColor1,
          pointHoverBackgroundColor: colors.themeColor1,
          pointHoverBorderColor: colors.themeColor1,
          pointRadius: 2,
          pointBorderWidth: 3,
          pointHoverRadius: 2,
          fill: false,
          borderWidth: 2,
          data: [200, 452, 250, 630, 125, 85, 20],
          datalabels: {
            align: "end",
            anchor: "end"
          }
        }
      ]
    }
  };
  
export const doughnutChartConfig = {
    plugins: [centerTextPlugin],
    legend: {
      position: "bottom",
      labels: {
        padding: 30,
        usePointStyle: true,
        fontSize: 12
      }
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: false
      },
      cutoutPercentage: 80,
      layout: {
        padding: {
          bottom: 20
        }
      },
      tooltips: chartTooltip
    },
    data: {
      labels: ["Cakes", "Cupcakes", "Desserts"],
      datasets: [
        {
          label: "",
          borderColor: [colors.themeColor3, colors.themeColor2, colors.themeColor1],
          backgroundColor: [colors.themeColor3_10, colors.themeColor2_10, colors.themeColor1_10],
          borderWidth: 2,
          data: [15, 25, 20]
        }
      ]
    }
  };


  export const radarChartConfig = {
    legend: {
      position: "bottom",
      labels: {
        padding: 30,
        usePointStyle: true,
        fontSize: 12
      }
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scale: {
        ticks: {
          display: false
        }
      },
      tooltips: chartTooltip
    },
    data: {
      datasets: [
        {
          label: "Stock",
          borderWidth: 2,
          pointBackgroundColor: colors.themeColor1,
          borderColor: colors.themeColor1,
          backgroundColor: colors.themeColor1_10,
          data: [80, 90, 70]
        },
        {
          label: "Order",
          borderWidth: 2,
          pointBackgroundColor: colors.themeColor2,
          borderColor: colors.themeColor2,
          backgroundColor: colors.themeColor2_10,
          data: [68, 80, 95]
        }
      ],
      labels: ["Cakes", "Desserts", "Cupcakes"]
    }
  };
  

  
export const barChartConfig = {
  legend: {
    position: "bottom",
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12
    }
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          gridLines: {
            display: true,
            lineWidth: 1,
            color: "rgba(0,0,0,0.1)",
            drawBorder: false
          },
          ticks: {
            beginAtZero: true,
            stepSize: 100,
            min: 300,
            max: 800,
            padding: 20
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ]
    },
    tooltips: chartTooltip
  },
  data: {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Cakes",
        borderColor: colors.themeColor1,
        backgroundColor: colors.themeColor1_10,
        data: [456, 479, 324, 569, 702, 600],
        borderWidth: 2
      },
      {
        label: "Desserts",
        borderColor: colors.themeColor2,
        backgroundColor: colors.themeColor2_10,
        data: [364, 504, 605, 400, 345, 320],
        borderWidth: 2
      }
    ]
  }
};



export const scatterChartConfig = {
  legend: {
    position: "bottom",
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12
    }
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          gridLines: {
            display: true,
            lineWidth: 1,
            color: "rgba(0,0,0,0.1)",
            drawBorder: false
          },
          ticks: {
            beginAtZero: true,
            stepSize: 20,
            min: -80,
            max: 80,
            padding: 20
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: true,
            lineWidth: 1,
            color: "rgba(0,0,0,0.1)"
          }
        }
      ]
    },
    tooltips: chartTooltip
  },
  data: {
    datasets: [
      {
        borderWidth: 2,
        label: "Cakes",
        borderColor: colors.themeColor1,
        backgroundColor: colors.themeColor1_10,
        data: [
          { x: 62, y: -78 },
          { x: -0, y: 74 },
          { x: -67, y: 45 },
          { x: -26, y: -43 },
          { x: -15, y: -30 },
          { x: 65, y: -68 },
          { x: -28, y: -61 }
        ]
      },
      {
        borderWidth: 2,
        label: "Desserts",
        borderColor: colors.themeColor2,
        backgroundColor: colors.themeColor2_10,
        data: [
          { x: 79, y: 62 },
          { x: 62, y: 0 },
          { x: -76, y: -81 },
          { x: -51, y: 41 },
          { x: -9, y: 9 },
          { x: 72, y: -37 },
          { x: 62, y: -26 }
        ]
      }
    ]
  }
};





export const areaChartConfig = {
  legend: {
    display: false
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: chartTooltip,
    scales: {
      yAxes: [
        {
          gridLines: {
            display: true,
            lineWidth: 1,
            color: "rgba(0,0,0,0.1)",
            drawBorder: false
          },
          ticks: {
            beginAtZero: true,
            stepSize: 5,
            min: 50,
            max: 70,
            padding: 20
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ]
    }
  },
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "",
        data: [54, 63, 60, 65, 60, 68, 60],
        borderColor: colors.themeColor1,
        pointBackgroundColor: colors.foregroundColor,
        pointBorderColor: colors.themeColor1,
        pointHoverBackgroundColor: colors.themeColor1,
        pointHoverBorderColor: colors.foregroundColor,
        pointRadius: 4,
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        fill: true,
        borderWidth: 2,
        backgroundColor: colors.themeColor1_10
      }
    ]
  }
};


export const pieChartConfig = {
  legend: {
    position: "bottom",
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12
    }
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: false
    },
    layout: {
      padding: {
        bottom: 20
      }
    },
    tooltips: chartTooltip
  },
  data: {
    labels: ["Cakes", "Cupcakes", "Desserts"],
    datasets: [
      {
        label: "",
        borderColor: [
          colors.themeColor1,
          colors.themeColor2,
          colors.themeColor3
        ],
        backgroundColor: [
          colors.themeColor1_10,
          colors.themeColor2_10,
          colors.themeColor3_10
        ],
        borderWidth: 2,
        data: [15, 25, 20]
      }
    ]
  }
};

