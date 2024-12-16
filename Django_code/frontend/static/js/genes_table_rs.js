// genes table

// specify the column
const columnDefs_rs = [
  {
    headerName: 'Gene Name',
    field: "gene_name",
    minWidth: "150",
    // filterType: 'text',
    // type: 'startsWith',
    // filter: 'a',
    cellRenderer: function (params) {
      return `<i><a href="/ntmdb/gene/resistance_gene/card_id=${params.data.card_accession}"> ${params.value} </a></i>`
    }
  },
  {
    headerName: 'Accession',
    field: "card_accession",
    minWidth: "150",
    cellRenderer: function (params) {
      return `<a target="view_frame" href="https://card.mcmaster.ca/ontology/${params.data.card_id}"> ${params.value} </a>`
    }
  },
  {
    headerName: 'Number of Species',
    field: "number_of_species",
    /* filter: false, */
    minWidth: "150",
    cellRenderer: function (params) {
      return `<a href="/ntmdb/browse/species/?card_id=${params.data.card_accession}"> ${params.value} </a>`
    }
  },
  {
    headerName: 'Number of Strains',
    field: "number_of_strains",
    /* filter: false, */
    sort: 'desc',
    minWidth: "150",
    cellRenderer: function (params) {
      return `<a href="/ntmdb/browse/strains?card_id=${params.data.card_accession}"> ${params.value} </a>`
    }
  },
  {
    headerName: 'Mechanism',
    field: "mechanism",
    minWidth: "280",
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

// specify the dat
const rowData_rs = [
  {
    gene_accession: "ARO:3000816",
    gene_name: "mtrA",
    species_hitted: 151,
    strains_hitted: 12371,
    drug: "Drug1: Amikacin; Drug2: Ciprofloxacin; Drug3: Levofloxacin",
    mechanism: "Antibiotic target alteration",
  },
  {
    gene_accession: "ARO:3000816",
    gene_name: "BopD",
    species_hitted: 99,
    strains_hitted: 8801,
    drug: "Drug1: Ciprofloxacin",
    mechanism: "Reduced permeability to antibiotic",
  },
  {
    gene_accession: "ARO:3000456",
    gene_name: "BopD",
    species_hitted: 7,
    strains_hitted: 677,
    drug: "Drug1: Amikacin; Drug2: Ciprofloxacin; Drug3: Levofloxacin",
    mechanism: "Antibiotic target alteration",
  },
  {
    gene_accession: "ARO:3000456",
    gene_name: "BopD",
    species_hitted: 3,
    strains_hitted: 45,
    drug: "Drug1: Levofloxacin",
    mechanism: "Reduced permeability to antibiotic",
  },
  {
    gene_accession: "ARO:3000456",
    gene_name: "BopD",
    species_hitted: 1,
    strains_hitted: 3,
    drug: "Drug1: Levofloxacin",
    drug: "Drug1: Amikacin; Drug2: Ciprofloxacin; Drug3: Levofloxacin",
    mechanism: "Antibiotic target alteration",
  },
  {
    gene_accession: "ARO:3000816",
    gene_name: "mtrA",
    species_hitted: 151,
    strains_hitted: 12371,
    drug: "Drug1: Amikacin; Drug2: Ciprofloxacin; Drug3: Levofloxacin",
    mechanism: "Antibiotic target alteration",
  },
  {
    gene_accession: "ARO:3000816",
    gene_name: "BopD",
    species_hitted: 99,
    strains_hitted: 8801,
    drug: "Drug1: Ciprofloxacin",
    mechanism: "Reduced permeability to antibiotic",
  },
  {
    gene_accession: "ARO:3000456",
    gene_name: "BopD",
    species_hitted: 7,
    strains_hitted: 677,
    drug: "Drug1: Amikacin; Drug2: Ciprofloxacin; Drug3: Levofloxacin",
    mechanism: "Antibiotic target alteration",
  },
  {
    gene_accession: "ARO:3000456",
    gene_name: "BopD",
    species_hitted: 3,
    strains_hitted: 45,
    drug: "Drug1: Levofloxacin",
    mechanism: "Reduced permeability to antibiotic",
  },
  {
    gene_accession: "ARO:3000456",
    gene_name: "BopD",
    species_hitted: 1,
    strains_hitted: 3,
    drug: "Drug1: Levofloxacin",
    drug: "Drug1: Amikacin; Drug2: Ciprofloxacin; Drug3: Levofloxacin",
    mechanism: "Antibiotic target alteration",
  },
];

// let the grid know which columns and what data to use
const gridOptions_rs = {
  columnDefs: columnDefs_rs,
  rowData: null,
  animateRows: true,
  // turns OFF row hover, it's on by default
  // suppressRowHoverHighlight: true,
  // turns ON column hover, it's off by default
  columnHoverHighlight: false,
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
  localeText: {
    // noRowsToShow: 'Loading data, please wait ......',
    loadingOoo: 'Loading data, please wait ......',
  },
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
  gridOptions_rs.api.setDomLayout('normal');
  // when auto height is off, the grid ahs a fixed height, and then the grid
  // will provide scrollbars if the data does not fit into it.
  document.querySelector('#genes_table_rs').style.height = '400px';
}

// 表格适应页面大小
function onTotalGridReady(params) {
  gridOptions_rs.api.sizeColumnsToFit();//调整表格大小自适应
}

// 自适应(情况三)： 浏览器大小变化时，gird自适应浏览器大小
// window.addEventListener('resize', () => {
//   gridOptions_rs.api.sizeColumnsToFit();
// });

// table-size
function onPageSizeChanged_rs() {
  var value = document.getElementById('page-size-rs').value;
  gridOptions_rs.api.paginationSetPageSize(Number(value));
}

// setup the grid after the page has finished loading
// document.addEventListener('DOMContentLoaded', () => {
// });

// 获取下载按钮元素并绑定点击事件
var downloadButton = document.querySelector('#downloadButton');
downloadButton.addEventListener('click', function () {
  gridOptions_rs.api.exportDataAsCsv(); // 导出 CSV 文件
});


const currentSearch = window.location.search;
console.log(currentSearch);


//console.log("event is trigered")
const gridDiv_rs = document.querySelector('#genes_table_rs');
new agGrid.Grid(gridDiv_rs, gridOptions_rs);
fetch(`/ntmdb/api/amrgenes/?${currentSearch}`)
  .then((response) => response.json())
  .then((data) => gridOptions_rs.api.setRowData(data));
