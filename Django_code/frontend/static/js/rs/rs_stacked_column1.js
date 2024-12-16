//import * as echarts from 'echarts';
var chartDom = document.getElementById('rs_stacked_column1');
var myChart = echarts.init(chartDom);
var option;

fetch("/static/json/rs/rs_stacked_column1/mab_data1.json")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const drug_class_name1 = data.drug_class_name1;
        const data_c1 = data.data_c1;
        const data_d1 = data.data_d1;
        const data_u1 = data.data_u1;
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    // Use axis to trigger tooltip
                    type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                }
            },
            legend: {},
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            yAxis: {
                type: 'value'
            },
            xAxis: {
                type: 'category',
                data: drug_class_name1,
                axisLabel: {
                    rotate: 45
                }
            },
            series: [
                {
                    name: 'Core',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: data_c1
                },
                {
                    name: 'Dispensable',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: data_d1
                },
                {
                    name: 'Unique',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: data_u1
                },
            ]
        };

        option && myChart.setOption(option);
    });