// species table

// specify the column
const columnDefs = [
  {
    headerName: 'Species',
    field: "name",
    //minWidth: "320",
    cellRenderer: function (params) {
      return `<i><a href="/ntmdb/species/M.${params.value}"> Mycobacterium  ${params.value} </a></i>`
    }
  },
  {
    headerName: 'Taxonomy ID',
    field: "taxid",
    //minWidth: "250",
    cellRenderer: function (params) {
      return `<a target="view_window" href="https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=${params.value}"> ${params.value} </a>`
    }
  },
  {
    headerName: 'Type Strain Genome',
    field: "type_strain_genome",
    //minWidth: "270",
    cellRenderer: function (params) {
      return `<a target="view_window" href="https://www.ncbi.nlm.nih.gov/data-hub/genome/${params.value}"> ${params.value} </a>`
    }
  },
  {
    headerName: 'Representative Genome',
    field: "representative_genome",
    //minWidth: "290",
    cellRenderer: function (params) {
      return `<a  target="view_window" href="https://www.ncbi.nlm.nih.gov/data-hub/genome/${params.value}"> ${params.value} </a>`
    }
  },
  {
    headerName: 'Risk Group',
    field: "risk_group",
    //minWidth: "220"
  },
  {
    headerName: 'Growth Type',
    field: "growth_type",
    //minWidth: "250",
  },
  {
    headerName: 'Number of Strains',
    field: "strains_count",
    /* filter: false, */
    sort: 'desc',
    //minWidth: "250",
    cellRenderer: function (params) {
      return `<a href="/ntmdb/browse/strains/?species_name=${params.data.name}"> ${params.value} </a>`
    }
  }
];


// specify the data
const rowData = [
  { species: "Mycobacteroides abscessus", taxonomy_id: "36809", type_strain: "ATCC 19977", representative: "GCF_004028015.1", risk_group: "2(ht)", growth_type: "Rapid", strain_number: 6426 },
  { species: "Mycobacterium avium", taxonomy_id: "1764", type_strain: "CCUG 20993", representative: "GCF_004028015.1", risk_group: "1(t)", growth_type: "Rapid", strain_number: 3000 },
  { species: "Mycobacterium intracellulare", taxonomy_id: "1767", type_strain: "DMS 3244", representative: "GCF_004028015.1", risk_group: "2(ht+)", growth_type: "Rapid", strain_number: 500 },
  { species: "Mycobacterium ulcerans", taxonomy_id: "1809", type_strain: "CIP 104536", representative: "GCF_004028015.1", risk_group: "3(**)", growth_type: "Rapid", strain_number: 56 },
  { species: "Mycobacterium marinum", taxonomy_id: "1781", type_strain: "CIP 104536", representative: "GCF_004028015.1", risk_group: "2(Z)", growth_type: "Rapid", strain_number: 72 }
];

// let the grid know which columns and what data to use
const gridOptions = {
  columnDefs: columnDefs,
  rowData: null,
  localeText: {
    // noRowsToShow: 'Loading data, please wait ......',
    loadingOoo: 'Loading data, please wait ......',
  },
  onGridReady: onTotalGridReady,                  // 自适应(情况一)： 表格初始化完毕，自适应浏览器大小。
  onGridSizeChanged: onTotalGridReady,            // 自适应(情况二)： 当浏览器页面大小没变，但是表格大小有变化时，也重绘至自适应浏览器大小
  // onColumnEverythingChanged:onTotalGridReady
  rowHeight: 50,
  defaultColDef: {
    editable: false,
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
    wrapText: true,
    unSortIcon: true,
    //flex: 1,
  },
  animateRows: true,
  // suppressRowHoverHighlight: true,             // turns OFF row hover, it's on by default
  columnHoverHighlight: false,                     // turns ON column hover, it's off by default
  pagination: true,                               // enable pagination
  paginationPageSize: 20,
  domLayout: 'autoHeight',                        // 'full height' mode
};


// 自适应
function setFixedHeight() {
  // we could also call setDomLayout() here as normal is the default
  gridOptions.api.setDomLayout('normal');
  // when auto height is off, the grid ahs a fixed height, and then the grid
  // will provide scrollbars if the data does not fit into it.
  document.querySelector('#species_table').style.height = '400px';
}
// 表格适应页面大小
function onTotalGridReady(params) {
  gridOptions.api.sizeColumnsToFit();             //调整表格大小自适应
}
// 自适应(情况三)： 浏览器大小变化时，gird自适应浏览器大小
window.addEventListener('resize', () => {
  gridOptions.api.sizeColumnsToFit();
});

// table-size
function onPageSizeChanged() {
  var value = document.getElementById('page-size').value;
  gridOptions.api.paginationSetPageSize(Number(value));
}



const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(parseFloat(n));

class NumberFilter {
  constructor() {
    NumberFilter.prototype.__init.call(this);
  }

  __init() {
    this.filterText = null;
  }

  init(params) {
    this.filterParams = params;
    this.filterText = null;
    this.params = params;
    this.setupGui();
  }

  // not called by AG Grid, just for us to help setup
  setupGui() {
    this.gui = document.createElement('div');
    this.gui.innerHTML =
      '<div style="padding: 4px;">' +
      '<div style="font-weight: bold;">Greater than: </div>' +
      '<div><input style="margin: 4px 0px 4px 0px;" type="number" id="filterText" placeholder="Number of medals..."/></div>' +
      '</div>';

    this.onFilterChanged = () => {
      this.extractFilterText();
      this.params.filterChangedCallback();
    };

    this.eFilterText = this.gui.querySelector('#filterText');
    this.eFilterText.addEventListener('input', this.onFilterChanged);
  }

  extractFilterText() {
    this.filterText = this.eFilterText.value;
  }

  getGui() {
    return this.gui;
  }

  doesFilterPass(params) {
    if (!this.isFilterActive()) {
      return false;
    }

    const { api, colDef, column, columnApi, context } = this.filterParams;
    const { node } = params;
    const value = this.filterParams.valueGetter({
      api,
      colDef,
      column,
      columnApi,
      context,
      data: node.data,
      getValue: (field) => node.data[field],
      node,
    });

    const filterValue = this.filterText;

    if (!value) return false;
    return Number(value) > Number(filterValue);
  }

  isFilterActive() {
    return (
      this.filterText !== null &&
      this.filterText !== undefined &&
      this.filterText !== '' &&
      isNumeric(this.filterText)
    );
  }

  getModel() {
    return this.isFilterActive() ? Number(this.eFilterText.value) : null;
  }

  setModel(model) {
    this.eFilterText.value = model;
    this.extractFilterText();
  }

  destroy() {
    this.eFilterText.removeEventListener('input', this.onFilterChanged);
  }

  getModelAsString() {
    return this.isFilterActive() ? '>' + this.filterText : '';
  }
}

// 获取下载按钮元素并绑定点击事件
var downloadButton = document.querySelector('#downloadButton');
downloadButton.addEventListener('click', function () {
  gridOptions.api.exportDataAsCsv(); // 导出 CSV 文件
});


/* // 首字母大写
const capitalized =
  word.charAt(0).toUpperCase()
  + word.slice(1) */

// parse the search string
// 假设URL为：http://127.0.0.1:8000/browse/strains/?species=abscessus
const currentSearch = window.location.search;
console.log(currentSearch); // 打印 ?species=abscessus

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
  const gridDiv = document.querySelector('#species_table');
  new agGrid.Grid(gridDiv, gridOptions);

  fetch(`/ntmdb/api/species/${currentSearch}`)
    .then((response) => response.json())
    .then((data) => gridOptions.api.setRowData(data));
});
