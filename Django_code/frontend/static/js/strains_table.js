// strains table
//import { TooltipComponent } from 'ag-grid-community';
// specify the column
const columnDefs = [
  {
    headerName: "Accession",
    field: "accession",
    //maxWidth: 200,
    minWidth: 150,
    cellRenderer: function (params) {
      return `<a href="/ntmdb/strains/${params.value}"> ${params.value} </a>`;
    },
    //suppressNoRowsOverlay: true
  },
  {
    headerName: "Taxonomy",
    field: "species_name",
    autoHeight: true,
    minWidth: "150",
    cellRenderer: function (params) {
      return `<i><a href="/ntmdb/species/M.${params.value}"> Mycobacterium ${params.value} </a></i>`;
    },
  },
  {
    headerName: 'Representative',
    field: "representative",
    minWidth: "170",
    cellRenderer: function (params) {
      if (params.value === "") {
        return "-";
      } else {
        return params.value;
      }
    }
  },
  {
    headerName: "MLST",
    field: "MLST",
    minWidth: "120",
    cellRenderer: function (params) {
      if (params.value === null) {
        return "-";
      } else {
        return `<a target="view_frame" href="/ntmdb/mlst/?st=${params.value}">ST${params.value} </a>`;
      }
    },
  },
  {
    headerName: "Isolation Source",
    field: "source",
    minWidth: "190",
    cellRenderer: function (params) {
      if (params.value === "") {
        return "-";
      } else {
        return params.value
      }
    },
  },
  {
    headerName: "VF Genes",
    field: "vf_summary",
    minWidth: "290",
    cellRenderer: function (param) {
      if (param.value === null) {
        return "-";
      } else {
        const myObject = param.value;
        const organize = myObject.map(
          (vfc) => {
            const vfs = vfc.vf.map((vf) => `<a target="view_frame" href="http://www.mgc.ac.cn/cgi-bin/VFs/vfs.cgi?VFID=${vf.vf_id}">${vf.vf_name}</a>`)
            return `${vfc.vf_category}: ${vfs.join("; ")}`
          }
        );
        return organize.join("<br>");
      }
    },
  },
  {
    headerName: "Resistance Genes",
    field: "amr_summary",
    minWidth: "300",
    cellRenderer: function (param) {
      if (param.value === null) {
        return "-";
      } else {
        const myObject = param.value;
        const organize = myObject.map(
          (mech) => {
            const amrs = mech.amr.map((amr) => `<a target="view_frame" href="https://card.mcmaster.ca/ontology/${amr.card_id}">${amr.gene_name}</a>`)
            return `${mech.mechanism}: ${amrs.join("; ")}`
          }
        );
        return organize.join("<br>");
      }
    },
  },
  {
    headerName: "DST",
    field: "DST_test",
    minWidth: "180",
    headerTooltip: 'Drug susceptibility testing',
    tooltipComponentParams: { color: '#ececec' },
    //tooltipComponent: CustomTooltip,
    cellRenderer: function (param) {
      if (param.value) {
        return `<a target="view_frame" href="/ntmdb/browse/dst">See Detail</a>`;
      } else {
        return "-"
      }
    },
  },
  {
    headerName: "Year",
    field: "date",
    colId: "Year",
    //maxWidth: 200,
    minWidth: 100,
    hide: true,
    cellRenderer: function (params) {
      if (params.value === "") {
        return "-";
      } else {
        return params.value;
      }
    }
  },
  {
    headerName: "Country",
    field: "country",
    colId: "Country",
    //maxWidth: 200,
    minWidth: 130,
    hide: true,
    cellRenderer: function (params) {
      if (params.value === "") {
        return "-";
      } else {
        return params.value;
      }
    }
  },
  {
    headerName: "Assembly total length",
    field: "assembly_total_length",
    colId: "Assembly_total_length",
    //maxWidth: 200,
    minWidth: 200,
    hide: true,
  },
  {
    headerName: "GC percentage",
    field: "gc_percentage",
    colId: "GC_percentage",
    //maxWidth: 200,
    minWidth: 180,
    hide: true,
  },
  {
    headerName: "l50 contigs",
    field: "l50_contigs",
    colId: "l50_contigs",
    //maxWidth: 200,
    minWidth: 150,
    hide: true,
  },
  {
    headerName: "n50 contigs",
    field: "n50_contigs",
    colId: "n50_contigs",
    //maxWidth: 200,
    minWidth: 150,
    hide: true,
  },

];

// specify the data
const rowData = [];

// let the grid know which columns and what data to use
const gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  localeText: {
    noRowsToShow: 'Loading data, please wait ......'
  },
  defaultColDef: {
    editable: false,
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
    wrapText: true,
    autoHeight: true,
    unSortIcon: true,
    cellStyle: { 'user-select': 'auto' }

  },
  // 自适应(情况一)： 表格初始化完毕，自适应浏览器大小。
  onGridReady: onTotalGridReady,
  // 自适应(情况二)： 当浏览器页面大小没变，但是表格大小有变化时，也重绘至自适应浏览器大小
  onGridSizeChanged: onTotalGridReady,
  // onColumnEverythingChanged:onTotalGridReady
  animateRows: true,
  // suppressRowHoverHighlight: true,               // turns OFF row hover, it's on by default
  columnHoverHighlight: false,
  pagination: true,                                 // enable pagination
  paginationPageSize: 20,
  // 'full height' mode
  domLayout: "autoHeight",
  tooltipShowDelay: 0,                              // tooltip
  tooltipHideDelay: 2000,
  /* components: {
    customTooltipComponent: TooltipComponent,
  }, */

};

function setFixedHeight() {
  // we could also call setDomLayout() here as normal is the default
  gridOptions.api.setDomLayout("normal");
  // when auto height is off, the grid ahs a fixed height, and then the grid
  // will provide scrollbars if the data does not fit into it.
  document.querySelector("#strains_table").style.height = "400px";
}

// 表格适应页面大小
function onTotalGridReady(params) {
  gridOptions.api.sizeColumnsToFit(); //调整表格大小自适应
}

// 自适应(情况三)： 浏览器大小变化时，gird自适应浏览器大小
window.addEventListener("resize", () => {
  gridOptions.api.sizeColumnsToFit();
});

// table-size
function onPageSizeChanged() {
  var value = document.getElementById('page-size').value;
  gridOptions.api.paginationSetPageSize(Number(value));
}

// parse the search string
// 假设URL为：http://127.0.0.1:8000/browse/strains/?species=abscessus
const currentSearch = window.location.search;
console.log(currentSearch); // 打印 ?species=abscessus



// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", () => {
  const gridDiv = document.querySelector("#strains_table");
  new agGrid.Grid(gridDiv, gridOptions);

  fetch(`/ntmdb/api/strains/${currentSearch}`)
    .then((response) => response.json())
    .then((data) => {
      gridOptions.api.setRowData(data);
    });
});


// show or hide cols
////////////////////1.Year///////////////////////
// hide: Year
function onBtHide_Year() {
  gridOptions.columnApi.applyColumnState({
    state: [
      { colId: 'Year', hide: true },
    ],
  });
}
// show: Year
function onBtShow_Year() {
  gridOptions.columnApi.applyColumnState({
    state: [
      { colId: 'Year', hide: false },
    ],
  });
}
// checkbox_function: Year
function OncheckBox_Year(e) {
  if (e.checked == true) {
    onBtShow_Year();
  } else {
    onBtHide_Year();
  }
}

/////////////////2.Country///////////////////
// hide: Country
function onBtHide_Country() {
  gridOptions.columnApi.applyColumnState({
    state: [
      { colId: 'Country', hide: true },
    ],
  });
}
// show: Country
function onBtShow_Country() {
  gridOptions.columnApi.applyColumnState({
    state: [
      { colId: 'Country', hide: false },
    ],
  });
}
// checkbox_function: Country
function OncheckBox_Country(e) {
  if (e.checked == true) {
    onBtShow_Country();
  } else {
    onBtHide_Country();
  }
}

/////////////3.Assembly_total_length//////////////
// hide: Assembly_total_length
function onBtHide_Assembly_total_length() {
  gridOptions.columnApi.applyColumnState({
    state: [
      { colId: 'Assembly_total_length', hide: true },
    ],
  });
}
// show: Assembly_total_length
function onBtShow_Assembly_total_length() {
  gridOptions.columnApi.applyColumnState({
    state: [
      { colId: 'Assembly_total_length', hide: false },
    ],
  });
}
// checkbox_function: Assembly_total_length
function OncheckBox_Assembly_total_length(e) {
  if (e.checked == true) {
    onBtShow_Assembly_total_length();
  } else {
    onBtHide_Assembly_total_length();
  }
}

/////////////////4.GC_percentage/////////////////
// hide: GC_percentage
function onBtHide_GC_percentage() {
  gridOptions.columnApi.applyColumnState({
    state: [
      { colId: 'GC_percentage', hide: true },
    ],
  });
}
// show: GC_percentage
function onBtShow_GC_percentage() {
  gridOptions.columnApi.applyColumnState({
    state: [
      { colId: 'GC_percentage', hide: false },
    ],
  });
}
// checkbox_function: GC_percentage
function OncheckBox_GC_percentage(e) {
  if (e.checked == true) {
    onBtShow_GC_percentage();
  } else {
    onBtHide_GC_percentage();
  }
}

/////////////////5.l50_contigs//////////////////
// hide: l50_contigs
function onBtHide_l50_contigs() {
  gridOptions.columnApi.applyColumnState({
    state: [
      { colId: 'l50_contigs', hide: true },
    ],
  });
}
// show: l50_contigs
function onBtShow_l50_contigs() {
  gridOptions.columnApi.applyColumnState({
    state: [
      { colId: 'l50_contigs', hide: false },
    ],
  });
}
// checkbox_function: l50_contigs
function OncheckBox_l50_contigs(e) {
  if (e.checked == true) {
    onBtShow_l50_contigs();
  } else {
    onBtHide_l50_contigs();
  }
}

/////////////////6.n50_contigs/////////////////
// hide: n50_contigs
function onBtHide_n50_contigs() {
  gridOptions.columnApi.applyColumnState({
    state: [
      { colId: 'n50_contigs', hide: true },
    ],
  });
}
// show: n50_contigs
function onBtShow_n50_contigs() {
  gridOptions.columnApi.applyColumnState({
    state: [
      { colId: 'n50_contigs', hide: false },
    ],
  });
}
// checkbox_function: n50_contigs
function OncheckBox_n50_contigs(e) {
  if (e.checked == true) {
    onBtShow_n50_contigs();
  } else {
    onBtHide_n50_contigs();
  }
}


// set buttons and checkboxes
// const selectAllButton = document.querySelector('button.btn-outline-primary:nth-of-type(1)');
// const clearButton = document.querySelector('button.btn-outline-primary:nth-of-type(2)');
// const checkboxes = document.querySelectorAll('label.check_items input[type="checkbox"]');

const selectAllButton = document.querySelector('button#select-all-button');
const clearButton = document.querySelector('button#clear-button');
const checkboxes = document.querySelectorAll('label.check_items input[type="checkbox"]');



selectAllButton.addEventListener('click', () => {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = true;
    checkbox.click(); // 添加点击操作
  });
});

clearButton.addEventListener('click', () => {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.click(); // 添加点击操作
  });
});

// 获取下载按钮元素并绑定点击事件
var downloadButton = document.querySelector('#downloadButton');
downloadButton.addEventListener('click', function () {
  gridOptions.api.exportDataAsCsv(); // 导出 CSV 文件
});