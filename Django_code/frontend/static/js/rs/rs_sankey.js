var chartDom3 = document.getElementById("rs_sankey");
var myChart3 = echarts.init(chartDom3);
var option3;

fetch("/static/json/rs/rs_sankey.json")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        option3 = {
            title: {
                text: 'Pan Resistom'
            },
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
                    }
                }
            ]
        }
        option3 && myChart3.setOption(option3);
    });