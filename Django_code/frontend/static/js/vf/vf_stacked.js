
// function cogChart(data) {
var chartDom2 = document.getElementById("vf_stacked");
var myChart2 = echarts.init(chartDom2);
var option2;
//myChart2.showLoading();
fetch("/static/json/vf/vf_stacked_ulcerans.json")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const VF_categories = data.VF_categories;
        const data_c2 = data.Core;
        const data_d2 = data.Dispensable;
        const data_u2 = data.Unique;
        option2 = {
            title: {
                text: 'Pan Virolom'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['Core', 'Dispensable', 'Unique'],
                itemGap: 8
            },
            grid: {
                top: '80',
                right: '160',
                bottom: '315',
                left: '260',
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                right: '130',
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

            xAxis: {
                type: 'category',
                name: 'VF Categories',
                boundaryGap: true,
                data: VF_categories,
                nameGap: '150',
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
                nameGap: '55',
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
                    //tiled: 'total',
                    barGap: 0,
                    emphasis: {
                        focus: 'series'
                    },
                    data: data_c2
                },
                {
                    name: 'Dispensable',
                    type: 'bar',
                    stack: 'total',
                    //tiled: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    data: data_d2
                },
                {
                    name: 'Unique',
                    type: 'bar',
                    stack: 'total',
                    //tiled: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    data: data_u2
                }
            ]
        };

        option2 && myChart2.setOption(option2);
    });