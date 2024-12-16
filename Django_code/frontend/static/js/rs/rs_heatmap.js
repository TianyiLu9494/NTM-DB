var HeatmapChartDom = document.getElementById("rs_heatmap");
var HeatmapChart = echarts.init(HeatmapChartDom);
var option;

// prettier-ignore
const drug_class = [
    'aminocoumarin antibiotic', 'aminoglycoside antibiotic', 'bicyclomycin-like antibiotic', 'carbapenem', 'cephalosporin', 'cephamycin', 'diaminopyrimidine antibiotic', 'disinfecting agents and antiseptics', 'fluoroquinolone antibiotic', 'fusidane antibiotic', 'glycopeptide antibiotic', 'glycylcycline', 'isoniazid-like antibiotic', 'lincosamide antibiotic', 'macrolide antibiotic', 'monobactam', 'mupirocin-like antibiotic', 'nucleoside antibiotic', 'oxazolidinone antibiotic', 'penam', 'penem', 'peptide antibiotic', 'phenicol antibiotic', 'phosphonic acid antibiotic', 'pleuromutilin antibiotic', 'rifamycin antibiotic', 'streptogramin A antibiotic', 'streptogramin B antibiotic', 'streptogramin antibiotic', 'sulfonamide antibiotic', 'tetracycline antibiotic'];
// prettier-ignore
const mechanism = ['efflux', 'inactivation', 'target alteration', 'target protection', 'target replacement'];
// prettier-ignore
const data = [[0, 0, 1], [0, 1, 0], [0, 2, 0], [0, 3, 0], [0, 4, 0], [1, 0, 1], [1, 1, 10], [1, 2, 0], [1, 3, 0], [1, 4, 0], [2, 0, 0], [2, 1, 0], [2, 2, 0], [2, 3, 0], [2, 4, 0], [3, 0, 1], [3, 1, 0], [3, 2, 0], [3, 3, 0], [3, 4, 0], [4, 0, 2], [4, 1, 0], [4, 2, 0], [4, 3, 0], [4, 4, 0], [5, 0, 1], [5, 1, 1], [5, 2, 0], [5, 3, 0], [5, 4, 0], [6, 0, 2], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 2], [7, 0, 6], [7, 1, 0], [7, 2, 0], [7, 3, 0], [7, 4, 0], [8, 0, 13], [8, 1, 0], [8, 2, 0], [8, 3, 0], [8, 4, 0], [9, 0, 0], [9, 1, 0], [9, 2, 0], [9, 3, 2], [9, 4, 0], [10, 0, 0], [10, 1, 0], [10, 2, 0], [10, 3, 0], [10, 4, 0], [11, 0, 2], [11, 1, 0], [11, 2, 0], [11, 3, 0], [11, 4, 0], [12, 0, 1], [12, 1, 0], [12, 2, 0], [12, 3, 0], [12, 4, 0], [13, 0, 0], [13, 1, 0], [13, 2, 5], [13, 3, 2], [13, 4, 0], [14, 0, 8], [14, 1, 1], [14, 2, 5], [14, 3, 2], [14, 4, 0], [15, 0, 1], [15, 1, 0], [15, 2, 0], [15, 3, 0], [15, 4, 0], [16, 0, 0], [16, 1, 0], [16, 2, 1], [16, 3, 0], [16, 4, 0], [17, 0, 0], [17, 1, 1], [17, 2, 0], [17, 3, 0], [17, 4, 0], [18, 0, 1], [18, 1, 0], [18, 2, 0], [18, 3, 0], [18, 4, 0], [19, 0, 4], [19, 1, 1], [19, 2, 0], [19, 3, 0], [19, 4, 2], [20, 0, 1], [20, 1, 0], [20, 2, 0], [20, 3, 0], [20, 4, 0], [21, 0, 2], [21, 1, 0], [21, 2, 0], [21, 3, 0], [21, 4, 0], [22, 0, 3], [22, 1, 1], [22, 2, 0], [22, 3, 0], [22, 4, 0], [23, 0, 0], [23, 1, 1], [23, 2, 0], [23, 3, 0], [23, 4, 0], [24, 0, 0], [24, 1, 0], [24, 2, 0], [24, 3, 2], [24, 4, 0], [25, 0, 3], [25, 1, 0], [25, 2, 1], [25, 3, 1], [25, 4, 0], [26, 0, 0], [26, 1, 1], [26, 2, 4], [26, 3, 1], [26, 4, 0], [27, 0, 0], [27, 1, 0], [27, 2, 4], [27, 3, 2], [27, 4, 0], [28, 0, 0], [28, 1, 1], [28, 2, 4], [28, 3, 4], [28, 4, 0], [29, 0, 1], [29, 1, 0], [29, 2, 0], [29, 3, 0], [29, 4, 1], [30, 0, 14], [30, 1, 0], [30, 2, 0], [30, 3, 3], [30, 4, 0]]
    .map(function (item) {
        return [item[0], item[1], item[2] || '-'];
    });
option = {
    tooltip: {
        position: 'top'
    },
    grid: {
        height: '30%',
        top: '10%'
    },
    xAxis: {
        type: 'category',
        data: drug_class,
        splitArea: {
            show: true
        },
        axisLabel: {
            rotate: 45
        }
    },

    yAxis: {
        type: 'category',
        data: mechanism,
        splitArea: {
            show: true
        },
        // axisLabel: {
        //     rotate: 50
        // }
    },
    visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '35%'
    },
    series: [
        {
            name: 'Gene number',
            type: 'heatmap',
            data: data,
            label: {
                show: true
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }

    ]
};
option && HeatmapChart.setOption(option);