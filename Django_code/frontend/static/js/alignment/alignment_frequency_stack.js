const graph_json_path = document.getElementById("geneMSA").textContent;
console.log(graph_json_path)
fetch(graph_json_path)
  .then((response) => response.json())
  .then((data) => {
    stackPlot("geneMSA", data, [
      "#c23531",
      "#2f4554",
      "#61a0a8",
      "#d48265",
      "#749f83",
      "#ffffff",
    ]);
  });

function stackPlot(id, data, color) {
  var stackDom = document.getElementById(id);
  var stackChart = echarts.init(stackDom);
  let xAxisData = data.xAxisData;
  var emphasisStyle = {
    focus: "series",
  };
  var series = [
    {
      name: "A Substitution",
      type: "bar",
      stack: "total",
      emphasis: emphasisStyle,
      data: data["a"],
    },
    {
      name: "T Substitution",
      type: "bar",
      stack: "total",
      emphasis: emphasisStyle,
      data: data["t"],
    },
    {
      name: "C Substitution",
      type: "bar",
      stack: "total",
      emphasis: emphasisStyle,
      data: data["c"],
    },
    {
      name: "G Substitution",
      type: "bar",
      stack: "total",
      emphasis: emphasisStyle,
      data: data["g"],
    },
    {
      name: "Deletion",
      type: "bar",
      stack: "total",
      emphasis: emphasisStyle,
      data: data["-"],
    },
    {
      name: "No Substitution",
      type: "bar",
      stack: "total",
      emphasis: emphasisStyle,
      data: data["ref"],
    },
  ];
  var option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (param) {
        let text_return = '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' 
        + "From " + param[0].axisValue + "</div>";
        param.forEach(element => {
            if (element.seriesName == "No Substitution") {
                text_return += `<b style="color: #18122B;"> Not substitute` + "</b>: " + Math.round(element.value * data.number_of_strains / 100) + "<br>";
            } else {
                text_return += `<b style="color: ${element.color};">To ` + element.seriesName  + "</b>: " + Math.round(element.value * data.number_of_strains / 100) + "<br>";
            }
        });
        return text_return;
      },
    //   textStyle: {
    //     fontSize: 12,
    //   },
    },
    legend: {
      orient: "vertical",
      right: 16,
      top: 10,
      itemGap: 6,
      itemWidth: 18,
      itemHeight: 12,
      textStyle: {
        fontSize: 12,
      },
      data: ["A Substitution", "T Substitution", "C Substitution", "G Substitution", "Deletion", "No Substitution"],
    },
    grid: {
      top: "30",
      right: "180",
      bottom: "260",
      left: "180",
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      axisLabel: {
        formatter: '{value}%'
      },
      name: "Substitution Frequency",
      nameLocation: "middle",
      nameGap: "45",
      nameTextStyle: {
        fontSize: 14,
        fontWeight: "bold",
      },
    },
    xAxis: {
      type: "category",
      name: "Reference Nucleotide",
      boundaryGap: true,
      data: xAxisData,
      nameGap: "40",
      nameLocation: "center",
      nameTextStyle: {
        fontSize: 14,
        fontWeight: "bold",
      },
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        fontSize: 8,
        fontWeight: "bold",
        interval: 0,
        rotate: 0,
      },
    },
    series: series,
    color: color,
    dataZoom: [
      {
        type: "slider",
        show: true,
        start: 0,
        end: (150 * 100) / data.length,
        showDataShadow: true,
        showDetail: false,
        orient: "horizontal",
        bottom: '4'
      },
      {
        type: "inside",
        orient: "horizontal",
        start: 0,
        end: (150 * 100) / data.length,
        bottom: '4'
      },
    ],
  };
  if (option && typeof option === "object") {
    stackChart.setOption(option);
  }
}
