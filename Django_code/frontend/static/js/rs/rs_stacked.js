const rs_graph_path = document.getElementById("rs_graph_path").getAttribute("data-file-path");
// function cogChart(data) {
var chartDom2 = document.getElementById("rs_stacked_column2");
var myChart2 = echarts.init(chartDom2);
var option2;

function getLastPartOfUrl() {
    // 获取当前网页的URL
    var url = window.location.href;
    // 使用 split() 方法将 URL 拆分为一个数组
    var parts = url.split('/');
    // 使用 pop() 方法获取最后一个元素
    var lastPart = parts.pop();
    // 再次使用 split() 方法将字符串拆分并获取最后一个元素
    return lastPart;
}


fetch(rs_graph_path)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const drug_class_name = data.drug_class_name;
        const data_c = data.data_c;
        const data_d = data.data_d;
        const data_u = data.data_u;
        option2 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['Core', 'Dispensable', 'Unique']
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                right: '65',
                feature: {
                    mark: {
                        show: true
                    },
                    magicType: {
                        show: true,
                        type: ['stack'],
                        title: {
                            bar: 'bar',
                            stack: 'Stack',
                            tiled: 'Tile'
                        },
                    },
                    restore: {
                        show: true,
                        title: 'Restore'
                    },
                    saveAsImage: {
                        show: true,
                        title: 'Save image'
                    }
                }
            },
            grid: {
                top: '70',
                right: '100',
                bottom: '200',
                left: '100',
            },
            xAxis: {
                type: 'category',
                name: 'Drug Class',
                boundaryGap: true,
                data: drug_class_name,
                nameGap: '135',
                nameLocation: 'center',
                nameTextStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                },
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    fontSize: 12,
                    fontWeight: 'bold',
                    interval: 0,
                    rotate: 45,
                },
            },
            yAxis: {
                type: 'value',
                name: 'Gene Number',
                nameLocation: 'middle',
                nameGap: '45',
                nameTextStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                }
            },
            color: ['#8F1D13', '#045775', '#D9BDA0'],
            series: [
                {
                    name: 'Core',
                    type: 'bar',
                    stack: 'total',
                    barGap: 0,
                    emphasis: {
                        focus: 'series'
                    },
                    data: data_c
                },
                {
                    name: 'Dispensable',
                    type: 'bar',
                    stack: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    data: data_d
                },
                {
                    name: 'Unique',
                    type: 'bar',
                    stack: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    data: data_u
                }
            ]
        };

        option2 && myChart2.setOption(option2);
    });