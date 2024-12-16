
$(document).ready(function () {
    var $speciesSelect = $('.species_name');
    var $strainSelect = $('.strain_accession');
    var $rsGeneSelect = $('.rs_gene_name');
    var $vfGeneSelect = $('.vf_gene_name');
    var $dcSelect = $('.drug_class');
    var $vfcSelect = $('.vf_category');

    // (1) 初始化 species_name 搜索框
    $speciesSelect.select2({
        ajax: {
            url: '/ntmdb/static/json/search/searchSpeciesName.json',
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

        minimumInputLength: 1,

    });
    // (2) 初始化 strain_accession 搜索框
    $strainSelect.select2({
        ajax: {
            url: '/ntmdb/static/json/search/searchStrainAcc.json',
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

        minimumInputLength: 1,

        // 在打开搜索框时禁用其他搜索框
        // dropdown: {
        //     onShow: function () {
        //         disableOtherSelect($strainSelect);
        //     }
        // }
    });
    // (3) 初始化 rs_gene_name 搜索框
    $rsGeneSelect.select2({
        ajax: {
            url: '/ntmdb/static/json/search/searchRSGN.json',
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

        minimumInputLength: 1,

        // 在打开搜索框时禁用其他搜索框
        // dropdown: {
        //     onShow: function () {
        //         disableOtherSelect($rsGeneSelect);
        //     }
        // }
    });
    // (4) 初始化 vf_gene_name 搜索框
    $vfGeneSelect.select2({
        ajax: {
            url: '/ntmdb/static/json/search/searchVFGN.json',
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

        minimumInputLength: 1,

    });
    // (5) 初始化 drug_class 搜索框
    $dcSelect.select2({
        ajax: {
            url: '/ntmdb/static/json/search/searchDrugClass.json',
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
        placeholder: 'Select a drug class',
        minimumInputLength: 0,  // 0：不输入，直接下拉
        allowClear: false,
    });
    // (6) 初始化 vf_category 搜索框
    $vfcSelect.select2({
        ajax: {
            url: '/ntmdb/static/json/search/searchVFC.json',
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
        placeholder: 'Select a VF category',
        minimumInputLength: 0,  // 0：不输入，直接下拉
        allowClear: false,
    });


    // 搜索框点击选项后
    $speciesSelect.on('select2:select', function () {
        // 记录该搜索框为最后一次打开下拉列表并选择了选项的搜索框
        lastSelect = $speciesSelect;
        butActive();
    })
    $strainSelect.on('select2:select', function () {
        lastSelect = $strainSelect;
    })
    $rsGeneSelect.on('select2:select', function () {
        lastSelect = $rsGeneSelect;
    });
    $vfGeneSelect.on('select2:select', function () {
        lastSelect = $vfGeneSelect;
    });
    $dcSelect.on('select2:select', function () {
        lastSelect = $dcSelect;
    });
    $vfcSelect.on('select2:select', function () {
        lastSelect = $vfcSelect;
    });


    // 绑定清空按钮的点击事件
    $('button.searchButRes').click(function () {
        // 清空所有搜索框的内容和选中项
        $speciesSelect.val(null).trigger('change');
        $strainSelect.val(null).trigger('change');
        $rsGeneSelect.val(null).trigger('change');
        $vfGeneSelect.val(null).trigger('change');
        $dcSelect.val(null).trigger('change');
        $vfcSelect.val(null).trigger('change');
        // 启用所有搜索框
        $speciesSelect.prop('disabled', false);
        $strainSelect.prop('disabled', false);
        $rsGeneSelect.prop('disabled', false);
        $vfGeneSelect.prop('disabled', false);
        $dcSelect.prop('disabled', false);
        $vfcSelect.prop('disabled', false);
        // 重置"上一个选中的搜索框"
        lastSelect = null;
    });
    ///////////////////////////
    ///////////////////////////


    // 监听提交按钮点击事件
    $('.submit-btn').on('click', function () {
        var targetUrl = null;
        var selectedOption = lastSelect.find(':selected');
        if (lastSelect === $speciesSelect && selectedOption.length > 0) {
            targetUrl = '/ntmdb/species/' + selectedOption.text();
        } else if (lastSelect === $strainSelect && selectedOption.length > 0) {
            targetUrl = '/ntmdb/strains/' + selectedOption.text();
        } else if (lastSelect === $rsGeneSelect && selectedOption.length > 0) {
            console.log(selectedOption)
            targetUrl = '/ntmdb/gene/resistance_gene/card_id=' + selectedOption.val();
        } else if (lastSelect === $vfGeneSelect && selectedOption.length > 0) {
            targetUrl = '/ntmdb/gene/virulence_gene/vfg_id=' + selectedOption.val();
        }

        // drug class
        else if (lastSelect === $dcSelect && selectedOption.length > 0) {

            // Remove existing ag-Grid wrapper element, if present
            const agRootWrapper = document.querySelector('.ag-root-wrapper');
            if (agRootWrapper) {
                agRootWrapper.remove();
            }

            $('.ag-theme-alpine').attr('id', 'genes_table_rs'); // 将HTML代码中的id赋值"genes_table_rs"
            $('.ag-theme-alpine').css('height', 'auto');
            // 获取所有script标签
            var scriptTags = document.getElementsByTagName('script');
            // 遍历script标签
            for (var i = 0; i < scriptTags.length; i++) {
                // 如果script标签的src属性包含了我们要重载的脚本文件名
                if (scriptTags[i].src.indexOf('genes_table_rs.js') !== -1 || scriptTags[i].src.indexOf('genes_table_vf.js') !== -1) {
                    // 删除该script标签
                    scriptTags[i].parentNode.removeChild(scriptTags[i]);
                    i--;
                }
            }
            // 调用loadGenesTableRs函数
            loadGenesTableRs();
        }
        // VFC
        else if (lastSelect === $vfcSelect && selectedOption.length > 0) {

            // Remove existing ag-Grid wrapper element, if present
            const agRootWrapper = document.querySelector('.ag-root-wrapper');
            if (agRootWrapper) {
                agRootWrapper.remove();
            }

            $('.ag-theme-alpine').attr('id', 'genes_table_vf'); // 将HTML代码中的id赋值"genes_table_rs"
            $('.ag-theme-alpine').css('height', 'auto');
            // 获取所有script标签
            var scriptTags = document.getElementsByTagName('script');
            // 遍历script标签
            for (var i = 0; i < scriptTags.length; i++) {
                // 如果script标签的src属性包含了我们要重载的脚本文件名
                if (scriptTags[i].src.indexOf('genes_table_rs.js') !== -1 || scriptTags[i].src.indexOf('genes_table_vf.js') !== -1) {
                    // 删除该script标签
                    scriptTags[i].parentNode.removeChild(scriptTags[i]);
                    i--;
                }
            }
            // 调用loadGenesTableRs函数
            loadGenesTableVf();
        }

        if (targetUrl) {
            window.location.href = targetUrl;
        }
    });


    // 用于将页面中的下拉框恢复到默认状态
    // 接受两个参数，分别表示需要启用的元素和需要禁用的元素
    function optionActive(item1, item2) {
        $(item1).attr('disabled', false).prop('checked', true);
        $(item2).attr('disabled', false);
        $('.searchContent > select').val(null).trigger('change');
    }
    // 将 class 为 searchContent 中的所有输入框禁用并取消选中状态，将其他元素禁用。
    function optionDisabled() {
        $('.searchContent > input').attr('disabled', true).prop('checked', false);
        $('.searchContent > select').attr('disabled', true);
    }
    // 激活按钮，鼠标移过去会变成手型。用于在选择选项后激活submit按钮。
    function butActive() {
        $('.searchButSub').attr('disabled', false);
        // $('.searchButRes').attr('disabled', false);
        $('.searchButSub').css('cursor', 'pointer');
        // $('.searchButRes').css('cursor', 'pointer');
    }
    function butDisabled() {
        $('.searchButSub').attr('disabled', true);
        // $('.searchButRes').attr('disabled', false);
        // $('.searchButSub').css('cursor', 'pointer');
        // $('.searchButRes').css('cursor', 'pointer');
    }


    // 在选择结果后触发事件：激活submit按钮
    // $speciesSelect.on('select2:select', function () { butActive() });
    // $strainSelect.on('select2:select', function () { butActive() });
    // $rsGeneSelect.on('select2:select', function () { butActive() });
    // $vfGeneSelect.on('select2:select', function () { butActive() });
    // $dcSelect.on('select2:select', function () { butActive() });
    // $vfcSelect.on('select2:select', function () { butActive() });

    $('#speciesSN + span').on('click', function () {
        butActive(); optionDisabled(); optionActive('#optionSN', '#speciesSN');
    });
    $('#strainAcc + span').on('click', function () {
        butActive(); optionDisabled(); optionActive('#optionStrainAcc', '#strainAcc');
    });
    $('#geneRSGN + span').on('click', function () {
        butActive(); optionDisabled(); optionActive('#optionRSGN', '#geneRSGN');
    });
    $('#drugDC + span').on('click', function () {
        butActive(); optionDisabled(); optionActive('#optionDC', '#drugDC');
    });
    $('#geneVFGN + span').on('click', function () {
        butActive(); optionDisabled(); optionActive('#optionVFGN', '#geneVFGN');
    });
    $('#virulenceVFC + span').on('click', function () {
        butActive(); optionDisabled(); optionActive('#optionVFC', '#virulenceVFC');
    });


    // rs genes table
    function loadGenesTableRs() {
        const container = document.getElementById("select2-drugDC-container");
        let drug_class_name;
        if (container && container.textContent) {
            drug_class_name = container.textContent;
            console.log("Got drug_class_name:", drug_class_name);
        } else {
            console.log("Can't get drug_class");
        }

        // specify the column
        const columnDefs_rs = [
            {
                headerName: 'Gene Name',
                field: "gene_name",
                minWidth: "140",
                // filterType: 'text',
                // type: 'startsWith',
                // filter: 'a',
                cellRenderer: function (params) {
                    return `<a href="/ntmdb/gene/resistance_gene/card_id=${params.data.card_accession}">${params.value} </a>`
                }
            },
            {
                headerName: 'Accession',
                field: "card_accession",
                minWidth: "137",
                cellRenderer: function (params) {
                    return `<a target="view_frame" href="https://card.mcmaster.ca/ontology/${params.data.card_id}"> ${params.value} </a>`
                }
            },
            {
                headerName: 'Number of Species',
                field: "number_of_species",
                /* filter: false, */
                minWidth: "180",
                cellRenderer: function (params) {
                    return `<a href="/ntmdb/browse/species/?card_id=${params.data.card_accession}"> ${params.value} </a>`
                }
            },
            {
                headerName: 'Number of Strains',
                field: "number_of_strains",
                /* filter: false, */
                sort: 'desc',
                minWidth: "180",
                cellRenderer: function (params) {
                    return `<a href="/ntmdb/browse/strains?card_id=${params.data.card_accession}"> ${params.value} </a>`
                }
            },
            {
                headerName: 'Mechanism',
                field: "mechanism",
                minWidth: "250",
                autoHeight: true,
                cellRenderer: function (params) {
                    return `<a target="view_frame" href="https://card.mcmaster.ca/ontology/${params.data.mechanism_ontology_id}"> ${params.value} </a>`
                }
            },
            {
                headerName: 'Drug',
                field: "drug_class",
                minWidth: "250",
                autoHeight: true,
                filter: 'agTextColumnFilter', filterParams: { defaultOption: 'contains', defaultValue: 'macrolide' }
            }
        ];


        // let the grid know which columns and what data to use
        const gridOptions_rs = {
            columnDefs: columnDefs_rs,
            rowData: null,
            animateRows: true,
            columnHoverHighlight: true,
            pagination: true,
            paginationPageSize: 10,
            onGridReady: onTotalGridReady,
            onGridSizeChanged: onTotalGridReady,
            domLayout: 'autoHeight',
            rowHeight: 50,
            defaultColDef: {
                editable: false,
                sortable: true,
                filter: true,
                floatingFilter: true,
                resizable: true,
                wrapText: true,
                unSortIcon: true,
            },
        };

        function setFixedHeight() {
            gridOptions_rs.api.setDomLayout('normal');
            document.querySelector('#genes_table_rs').style.height = '400px';
        }


        function onTotalGridReady(params) {
            gridOptions_rs.api.sizeColumnsToFit();
        }

        function onPageSizeChanged_rs() {
            var value = document.getElementById('page-size-rs').value;
            gridOptions_rs.api.paginationSetPageSize(Number(value));
        }

        const gridDiv_rs = document.querySelector('#genes_table_rs');
        new agGrid.Grid(gridDiv_rs, gridOptions_rs);


        if (drug_class_name) {
            fetch(`/ntmdb/api/amrgenes/?drug_class=${drug_class_name}`)
                .then((response) => response.json())
                .then((data) => gridOptions_rs.api.setRowData(data))
                .catch((error) => console.error(error));
        }
    }

    // vf genes table
    function loadGenesTableVf() {
        const container = document.getElementById("select2-virulenceVFC-container");
        let vfc_name;
        if (container && container.textContent) {
            vfc_name = container.textContent;
            console.log("Got vfc_name:", vfc_name);
        } else {
            console.log("Can't get vfc_name");
        }


        // specify the column
        const columnDefs_vf = [
            {
                headerName: 'Gene Name',
                field: "gene_name",
                minWidth: "145",
                cellRenderer: function (params) {
                    return `<a href="/ntmdb/gene/virulence_gene/vfg_id=${params.data.vfg_id}"> ${params.value} </a>`
                }
            },
            {
                headerName: 'Accession',
                field: "vfg_id",
                minWidth: "137",
                cellRenderer: function (params) {
                    return `<a target="view_frame" href="http://www.mgc.ac.cn/cgi-bin/VFs/gene.cgi?GeneID=${params.value}"> ${params.value} </a>`
                }
            },

            {
                headerName: 'Number of Species',
                field: "number_of_species",
                /* filter: false, */
                minWidth: "192",
                cellRenderer: function (params) {
                    return `<a href="/ntmdb/browse/species/?vfg_id=${params.data.vfg_id}"> ${params.value} </a>`
                }
            },
            {
                headerName: 'Number of Strains',
                field: "number_of_strains",
                /* filter: false, */
                minWidth: "189",
                sort: 'desc',
                cellRenderer: function (params) {
                    return `<a href="/ntmdb/browse/strains/?vfg_id=${params.data.vfg_id}"> ${params.value} </a>`
                }
            },
            {
                headerName: 'Virulence Factor',
                field: "vf_name",
                minWidth: "190",
                autoHeight: true,
                cellRenderer: function (params) {
                    return `<a target="view_frame" href="http://www.mgc.ac.cn/cgi-bin/VFs/vfs.cgi?VFID=${params.data.vf_id}">${params.value}</a>`
                }
            },
            {
                headerName: 'Virulence Factor Category',
                field: "vfc_name",
                minWidth: "300",
                autoHeight: true,
                cellRenderer: function (params) {
                    return `<a target="view_frame" href="http://www.mgc.ac.cn/cgi-bin/VFs/VFcategory.cgi?${params.data.vfc_id}">${params.value}</a>`
                }
            },
        ];


        // specify the dat
        const rowData_vf = [
            {
                gene_accession: "VFG001381",
                gene_name: "adsA",
                species_hitted: 130,
                strains_hitted: 12315,
                vf: "Adenosine synthase A",
                vfc: "Immune modulation"
            },
            {
                gene_accession: "VFG001818",
                gene_name: "aur",
                species_hitted: 120,
                strains_hitted: 11778,
                vf: "Aureolysin",
                vfc: "Exoenzyme",
            },
            {
                gene_accession: "VFG002382",
                gene_name: "adsA",
                species_hitted: 49,
                strains_hitted: 4098,
                vf: "Adenosine synthase A",
                vfc: "Immune modulation"
            },
            {
                gene_accession: "VFG001383",
                gene_name: "aur",
                species_hitted: 25,
                strains_hitted: 778,
                vf: "Aureolysin",
                vfc: "Exoenzyme",
            },
            {
                gene_accession: "VFG001395",
                gene_name: "aur",
                species_hitted: 4,
                strains_hitted: 14,
                vf: "Aureolysin",
                vfc: "Exoenzyme",
            },
            {
                gene_accession: "VFG001381",
                gene_name: "adsA",
                species_hitted: 130,
                strains_hitted: 12315,
                vf: "Adenosine synthase A",
                vfc: "Immune modulation"
            },
            {
                gene_accession: "VFG001818",
                gene_name: "aur",
                species_hitted: 120,
                strains_hitted: 11778,
                vf: "Aureolysin",
                vfc: "Exoenzyme",
            },
            {
                gene_accession: "VFG002382",
                gene_name: "adsA",
                species_hitted: 49,
                strains_hitted: 4098,
                vf: "Adenosine synthase A",
                vfc: "Immune modulation"
            },
            {
                gene_accession: "VFG001383",
                gene_name: "aur",
                species_hitted: 25,
                strains_hitted: 778,
                vf: "Aureolysin",
                vfc: "Exoenzyme",
            },
            {
                gene_accession: "VFG001395",
                gene_name: "aur",
                species_hitted: 4,
                strains_hitted: 14,
                vf: "Aureolysin",
                vfc: "Exoenzyme",
            },
        ];

        // let the grid know which columns and what data to use
        const gridOptions_vf = {
            columnDefs: columnDefs_vf,
            rowData: null,
            animateRows: true,
            // turns OFF row hover, it's on by default
            // suppressRowHoverHighlight: true,
            // turns ON column hover, it's off by default
            columnHoverHighlight: true,
            // enable pagination
            pagination: true,
            paginationPageSize: 10,
            // 自适应(情况一)： 表格初始化完毕，自适应浏览器大小。
            onGridReady: onTotalGridReady,
            // 自适应(情况二)： 当浏览器页面大小没变，但是表格大小有变化时，也重绘至自适应浏览器大小
            onGridSizeChanged: onTotalGridReady,
            // onColumnEverythingChanged:onTotalGridReady
            // 'full height' mode
            domLayout: 'autoHeight',
            rowHeight: 50,
            defaultColDef: {
                editable: false,
                sortable: true,
                filter: true,
                floatingFilter: true,
                resizable: true,
                wrapText: true,
                unSortIcon: true,
            },

        };

        function setFixedHeight() {
            // we could also call setDomLayout() here as normal is the default
            gridOptions_vf.api.setDomLayout('normal');
            // when auto height is off, the grid ahs a fixed height, and then the grid
            // will provide scrollbars if the data does not fit into it.
            document.querySelector('#genes_table_vf').style.height = '400px';
        }

        // 表格适应页面大小
        function onTotalGridReady(params) {
            gridOptions_vf.api.sizeColumnsToFit();//调整表格大小自适应
        }

        // 自适应(情况三)： 浏览器大小变化时，gird自适应浏览器大小
        // window.addEventListener('resize', () => {
        //   gridOptions_vf.api.sizeColumnsToFit();
        // });

        // table-size
        function onPageSizeChanged_vf() {
            var value = document.getElementById('page-size-vf').value;
            gridOptions_vf.api.paginationSetPageSize(Number(value));
        }

        // setup the grid after the page has finished loading
        // document.addEventListener('DOMContentLoaded', () => {
        // });
        const gridDiv_vf = document.querySelector('#genes_table_vf');
        new agGrid.Grid(gridDiv_vf, gridOptions_vf);

        // fetch('/api/vfgenes/?vfc_name=')
        //   .then((response) => response.json())
        //   .then((data) => gridOptions_vf.api.setRowData(data));


        if (vfc_name) {
            const encodedVfcName = encodeURIComponent(vfc_name);
            const url = `/ntmdb/api/vfgenes/?vfc_name=${encodedVfcName}`;
            console.log(url)
            fetch(url)

                .then((response) => response.json())
                .then((data) => gridOptions_vf.api.setRowData(data))
                .catch((error) => console.error(error));
        }
    }

});




// Reset 按钮
// $('.searchButRes').on('click', function () {
//     $('.searchContent > input').prop('disabled', false).prop('checked', false);
//     $('.searchContent > select').val(null).trigger('change').prop('disabled', false);
//     butActive();
// });






