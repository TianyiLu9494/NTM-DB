// genes table

// specify the column
const columnDefs = [
  {
    headerName: 'Species',
    field: "species",
    filter: false,
    minWidth: "100",
    cellRenderer: function (params) {
      return `<i><a href="/species/${params.value}"> ${params.value} </a></i>`
    }
  },
  {
    headerName: 'Prevalence',
    field: "prevalence",
    filter: false,
    minWidth: "100"
  },
  {
    headerName: 'Ka/Ks',
    field: "kaks",
    filter: false,
    minWidth: "100",
  },
  {
    headerName: 'Strain selected in MSA',
    field: "strain",
    filter: false,
    minWidth: "200",
    cellRenderer: function (params) {
      return `<a href="/strains/${params.value}"> ${params.value} </a>`
    }
  },
  {
    headerName: 'Gene location',
    field: "position",
    filter: false,
    minWidth: "300"
  },
];


// specify the dat
const rowData = [
  { species: "M.abscessus", prevalence: "76.7%", kaks: "0. 25", strain: "GCA_000069185.1", position: 'NZ_UPHO01000001.1|-|25993-26988|' },
  { species: "M.abscessus", prevalence: "76.7%", kaks: "0. 25", strain: "GCA_000069185.1", position: 'NZ_UPHO01000001.1|-|25993-26988|' },
  { species: "M.abscessus", prevalence: "76.7%", kaks: "0. 25", strain: "GCA_000069185.1", position: 'NZ_UPHO01000001.1|-|25993-26988|' },
  { species: "M.abscessus", prevalence: "76.7%", kaks: "0. 25", strain: "GCA_000069185.1", position: 'NZ_UPHO01000001.1|-|25993-26988|' },
  { species: "M.abscessus", prevalence: "76.7%", kaks: "0. 25", strain: "GCA_000069185.1", position: 'NZ_UPHO01000001.1|-|25993-26988|' },
  { species: "M.abscessus", prevalence: "76.7%", kaks: "0. 25", strain: "GCA_000069185.1", position: 'NZ_UPHO01000001.1|-|25993-26988|' },
  { species: "M.abscessus", prevalence: "76.7%", kaks: "0. 25", strain: "GCA_000069185.1", position: 'NZ_UPHO01000001.1|-|25993-26988|' },
  { species: "M.abscessus", prevalence: "76.7%", kaks: "0. 25", strain: "GCA_000069185.1", position: 'NZ_UPHO01000001.1|-|25993-26988|' },
  { species: "M.abscessus", prevalence: "76.7%", kaks: "0. 25", strain: "GCA_000069185.1", position: 'NZ_UPHO01000001.1|-|25993-26988|' },
];

// let the grid know which columns and what data to use
const gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  rowHeight: 50,
  // 自适应(情况一)： 表格初始化完毕，自适应浏览器大小。
  onGridReady: onTotalGridReady,
  // 自适应(情况二)： 当浏览器页面大小没变，但是表格大小有变化时，也重绘至自适应浏览器大小
  onGridSizeChanged: onTotalGridReady,
  // onColumnEverythingChanged:onTotalGridReady
  defaultColDef: {
    editable: false,
    sortable: true,
    filter: true,
    resizable: true,
    wrapText: true,
  },
  animateRows: true,
  // turns OFF row hover, it's on by default
  // suppressRowHoverHighlight: true,
  // turns ON column hover, it's off by default
  columnHoverHighlight: true,

  // enable pagination
  pagination: true,
  // 'full height' mode
  domLayout: 'autoHeight',
};

function setFixedHeight() {
  // we could also call setDomLayout() here as normal is the default
  gridOptions.api.setDomLayout('normal');
  // when auto height is off, the grid ahs a fixed height, and then the grid
  // will provide scrollbars if the data does not fit into it.
  document.querySelector('#genes_alignment').style.height = '400px';
}

// 表格适应页面大小
function onTotalGridReady(params) {
  gridOptions.api.sizeColumnsToFit();//调整表格大小自适应
}

// 自适应(情况三)： 浏览器大小变化时，gird自适应浏览器大小
window.addEventListener('resize', () => {
  gridOptions.api.sizeColumnsToFit();
});

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
  const gridDiv = document.querySelector('#genes_alignment');
  new agGrid.Grid(gridDiv, gridOptions);
});