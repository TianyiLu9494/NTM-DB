const queryParams = new URLSearchParams(window.location.search);
let st = queryParams.get("st"); // 获取 "st" 参数的值
if (st != null) {
  st = st.replace("/", ""); // 使用 replace() 方法移除 "/" 字符
}

const grapetree_graph_path = document.getElementById("grapetree_graph_path").getAttribute("data-file-path");
// console.log(grapetree_graph_path)
fetch(grapetree_graph_path)
  .then((response) => response.json())
  .then((data) => {
    const graph = data //.graph
    // console.log(graph)
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
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 60,
          bottom: 20,
          data: data.legendData
        }
      ],
      animationDuration: 1500,
      animationEasingUpdate: "quinticInOut",
      series: [
        {
          name: "MLST grape tree",
          type: "graph",
          layout: "none",
          zoom: 1.1, // 初始缩放比例
          scaleLimit: { min: 0.5, max: 3 }, // 设置缩放的上限和下限
          data: graph.nodes,
          links: graph.links,
          categories: graph.categories,
          roam: true,
          label: {
            position: "right",
            formatter: "{b}",
            fontSize: "7"
          },
          lineStyle: {
            color: 'rgba(88,88,88,10)',
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

var myChart = echarts.init(document.getElementById("gptree"));
myChart.on('click', function (params) {
  const mlst = params.data.id.replace(/ST/g, "");
  window.open(`/ntmdb/browse/strains/?mlst=${mlst}`);
});