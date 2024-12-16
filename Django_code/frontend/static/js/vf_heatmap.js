var HeatmapChartDom = document.getElementById("vf_heatmap");
var HeatmapChart = echarts.init(HeatmapChartDom);
var option;
fetch("/static/json/vf/heatmap.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    const VF_genes = data.VF_genes;
    const categories = data.Strains;
    const input_data = data.data;
    option = {
    //   tooltip: {
    //     position: "top",
    //   },
      grid: {
        height: "95%",
        top: "1%",

      },
      xAxis: {
        type: "category",
        
        data: VF_genes,
        position: 'top',
        axisLabel: {
          fontSize: 11,
          rotate: 45 // 标签旋转 45 度
        },
        splitArea: {
          show: true,
        },
      },
      yAxis: {
        type: "category",
        data: categories,
        axisLabel: {
          fontSize: 10 // 设置标签字体大小为 14 像素
        },
        splitArea: {
          show: true,
        },
      },
      visualMap: {
        min: 0,
        max: 1,
        calculable: true,
        orient: "horizontal",
        left: "center",
        bottom: "3.5%",
      },
      series: [
        {
          name: "Punch Card",
          type: "heatmap",
          data: input_data,
          label: {
            show: false,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    option && HeatmapChart.setOption(option);
  });