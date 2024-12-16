// 获取查询参数
const queryParams = new URLSearchParams(window.location.search);
const st = queryParams.get("st"); // 获取"st"查询参数的值
fetch("/ntmdb/static/json/grapetree_graph/all_gptree_by_st.json")
  .then((response) => response.json())
  .then((data) => {
    const graph = data; //.graph
    console.log(graph);
    graph.nodes.forEach(function (node) {
      node.label = {
        show: node.symbolSize > 15,
      };
      if (node.id === `ST${st}`) {
        node.itemStyle = {
          borderColor: "red",
          borderWidth: 4,
        };
      };
    });

    const option = {
      // title: {
      //   text: "Les Miserables",
      //   subtext: "Default layout",
      //   top: "bottom",
      //   left: "right",
      // },
      tooltip: {},
      legend: [
        {
          // selectedMode: 'single',
          data: graph.categories.map(function (a) {
            return a.name;
          }),
          type: "scroll",
          orient: "vertical",
          right: 10,
          top: 60,
          bottom: 20,
          data: data.legendData,
        },
      ],
      animationDuration: 1500,
      animationEasingUpdate: "quinticInOut",
      series: [
        {
          name: "MLST",
          type: "graph",
          layout: "none",
          data: graph.nodes,
          links: graph.links,
          categories: graph.categories,
          roam: true,
          label: {
            position: "right",
            formatter: "{b}",
            fontSize: "7",
          },
          lineStyle: {
            color: "rgba(88,88,88,10)",
            curveness: 0,
          },
          emphasis: {
            focus: "adjacency",
            lineStyle: {
              width: 1.5,
            },
          },
        },
      ],
    };
    myChart.setOption(option);
  });
console.log("loading");

var myChart = echarts.init(document.getElementById("echarts_graph"));
myChart.on("click", function (params) {
  const st = params.data.id.replace(/ST/g, "");
  window.open(`/ntmdb/species/M.${params.data.species}/?st=${st}#mlst`);
});
