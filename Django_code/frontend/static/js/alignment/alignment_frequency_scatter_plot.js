var chartDom = document.getElementById("main");
var myChart = echarts.init(chartDom);
var option;
//myChart2.showLoading();
fetch("/static/MSA/test_aln_freq.json")
  .then((response) => response.json())
  .then((data) => {
    const SubA = data.dataset.a;
    const SubT = data.dataset.t;
    const SubC = data.dataset.c;
    const SubG = data.dataset.g;

    const schema = [
      { name: "pos", index: 0, text: "Postion" },
      { name: "ratio", index: 1, text: "Ratio" },
      { name: "freq", index: 2, text: "Frequence" },
      { name: "sub", index: 3, text: "Subsititution" },
      { name: "ref", index: 4, text: "Reference" },
    ];
    const itemStyle = {
      opacity: 0.8,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: "rgba(0,0,0,0.3)",
    };
    option = {
      color: ["#ff4c29", "#2d4263", "#29c7ac", "#ecb365"],
      legend: {
        top: 10,
        data: ["突变A", "突变C", "突变T", "突变G"],
        textStyle: {
          fontSize: 16,
        },
      },
      grid: {
        left: "10%",
        right: 150,
        top: "18%",
        bottom: "10%",
      },
      tooltip: {
        backgroundColor: "rgba(255,255,255,0.7)",
        formatter: function (param) {
          var value = param.value;
          // prettier-ignore
          return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                  + param.seriesName + 'at Position ' + value[0] + ' from' + value[4]
                  + '</div>'
                  + schema[1].text + '：' + value[1] + '<br>'
                  + schema[2].text + '：' + value[2] + '<br>'
        },
      },
      xAxis: {
        type: "value",
        name: "Position",
        nameGap: 16,
        nameTextStyle: {
          fontSize: 16,
        },
        max: data.alignment_len,
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        name: "Subsititution Ratio (%)",
        nameLocation: "end",
        nameGap: 20,
        max: 100,
        nameTextStyle: {
          fontSize: 16,
        },
        splitLine: {
          show: false,
        },
      },
      dataZoom: [
        {
          type: "inside",
          orient: "horizontal",
          start: 0,
          end: 150*100/data.alignment_len,
        },
        {
            type: 'slider',
            show: true,
            start: 0,
            end: 150*100/data.alignment_len,
            showDataShadow: true,
            showDetail: true,
            // handleSize: '30',
            orient:'horizontal',
            bottom: '8',
            },
      ],
      visualMap: [
        {
          left: "right",
          top: "10%",
          dimension: 2,
          min: 0,
          max: parseInt(data.number_of_sequences),
          itemWidth: 30,
          itemHeight: 120,
          calculable: true,
          precision: 0.1,
          text: ["圆形大小：frequence"],
          textGap: 30,
          inRange: {
            symbolSize: [5, 70],
          },
          outOfRange: {
            symbolSize: [5, 70],
            color: ["rgba(255,255,255,0.4)"],
          },
          controller: {
            inRange: {
              color: ["#c23531"],
            },
            outOfRange: {
              color: ["#999"],
            },
          },
        },
      ],
      series: [
        {
          name: "突变A",
          type: "scatter",
          itemStyle: itemStyle,
          data: SubA,
        },
        {
          name: "突变C",
          type: "scatter",
          itemStyle: itemStyle,
          data: SubC,
        },
        {
          name: "突变T",
          type: "scatter",
          itemStyle: itemStyle,
          data: SubT,
        },
        {
          name: "突变G",
          type: "scatter",
          itemStyle: itemStyle,
          data: SubG,
        },
      ],
    };

    option && myChart.setOption(option);
  });
