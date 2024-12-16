$(document).ready(function () {
    var $quickSelect = $('.qsearch');

    // 初始化搜索框
    $quickSelect.select2({
        ajax: {
            url: '/ntmdb/static/json/home/total.json',
            dataType: 'json',
            delay: 200,
            data: function (params) {
                return {
                    q: params.term,
                    page: params.page
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;
                var q = params.term ? params.term.toLowerCase() : '';
                var filteredData = data.items.reduce(function (result, item) {
                    if (item.text.toLowerCase().indexOf(q) >= 0 && result.indexOf(item) < 0) {
                        result.push(item);
                    }
                    return result;
                }, []);
                var pageSize = 10;
                var offset = (params.page - 1) * pageSize;
                var end = Math.min(filteredData.length, offset + pageSize);
                return {
                    results: filteredData.slice(offset, end),
                    pagination: {
                        more: end < filteredData.length
                    }
                };
            },
            cache: false
        },
        templateSelection: function (data) {
            return data.text;
        },
        templateResult: function (data) {
            return data.text;
        },
        placeholder: 'Enter query...',
        minimumInputLength: 1,
    })


    $('#submitBtn').on('click', function () {
        var selectedOption = $('#quickSearch').select2('data')[0];
        if (!selectedOption) {
            // 如果用户没有选择选项，则不触发事件
            return;
        }
        var targetUrl;
        var idPrefix = selectedOption.id.substring(0, 3);
        if (idPrefix === 'st-') {
            targetUrl = '/ntmdb/strains/' + encodeURIComponent(selectedOption.text);
        } else if (idPrefix === 'sp-') {
            targetUrl = '/ntmdb/species/' + selectedOption.id.substring(3);
        } else if (idPrefix === 'VFG') {
            targetUrl = '/ntmdb/gene/virulence_gene/vfg_id=' + selectedOption.id;
        } else if (idPrefix === 'ARO') {
            targetUrl = '/ntmdb/gene/resistance_gene/card_id=' + selectedOption.id;
        }
        window.location.href = targetUrl;
    });

})


