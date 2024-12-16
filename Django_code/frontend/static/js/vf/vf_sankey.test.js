var chartDom3 = document.getElementById("vf_sankey");
var myChart3 = echarts.init(chartDom3);
var option3;
console.log("/static/json/vf/vf_sankey_ulcerans.1.json")
fetch("/static/json/vf/vf_sankey_ulcerans.1.json")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        option3 = {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            series: [
                {
                    type: 'sankey',
                    data: data.nodes,
                    links: data.links,
                    emphasis: {
                        focus: 'adjacency'
                    },
                    lineStyle: {
                        color: 'gradient',
                        curveness: 0.5
                    },
                    layoutIterations: 0
                }
            ]
        }
        option3 && myChart3.setOption(option3);
    });