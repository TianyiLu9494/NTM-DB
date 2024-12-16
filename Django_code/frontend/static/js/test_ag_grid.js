// specify the column
const columnDefs = [
    { 
      headerName: 'group1',
      children: [ 
          {field: "make", sortable: true, filter: true, maxWidth:90 },
          {field: "model", sortable: true, filter: true, wrapText: true, autoHeight: true },
      ],
    },
    { headerName: 'group2',
      children: [ 
          {field: "price", sortable: true, filter: true },
          {field: "country", cellRenderer: function(params) {
              return `<a href="/species/${params.value.A}"> ${params.value.B} </a>`}}
      ]
    }
  ];
 

// specify the data
const rowData = [
{ make: "Toyota", model: "Celica", price: 35000, country : { A :"M.Abscessus",B: "M.abscessus"}},
{ make: "Toyota", model: "Celica", price: 35000, country : { A :"M.Abscessus",B: "M.abscessus"}},
{ make: "Toyota", model: "Celica", price: 35000, country : { A :"M.Abscessus",B: "M.abscessus"}},
{ make: "Toyota", model: "Celica", price: 35000, country : { A :"M.Abscessus",B: "M.abscessus"}},
{ make: "Toyota", model: "Celica", price: 35000, country : { A :"M.Abscessus",B: "M.abscessus"}},
{ make: "Toyota", model: "Celica", price: 35000, country : { A :"M.Abscessus",B: "M.abscessus"}},
{ make: "Toyota", model: "Celica", price: 35000, country : { A :"M.Abscessus",B: "M.abscessus"}},
{ make: "Toyota", model: "Celica", price: 35000, country : { A :"M.Abscessus",B: "M.abscessus"}},
{ make: "Toyota", model: "Celica", price: 35000, country : { A :"M.Abscessus",B: "M.abscessus"}},
{ make: "Toyota", model: "Celica", price: 35000, country : { A :"M.Abscessus",B: "M.abscessus"}},
{ make: "Toyota", model: "Celica", price: 35000, country : { A :"M.Abscessus",B: "M.abscessus"}},
{ make: "Toyota", model: "Celica", price: 35000, country : { A :"M.Abscessus",B: "M.abscessus"}},
{ make: "Toyota", model: "Celica", price: 35000, country : { A :"M.Abscessus",B: "M.abscessus"}},
{ make: "Toyota", model: "Celica", price: 35000, country : { A :"M.Abscessus",B: "M.abscessus"}},
// { make: "Ford", model: "Mondeo", price: 32000, country : "M.abscessus" },
// { make: "Porsche", model: "Boxster", price: 72000, country : "M.abscessus" },
// { make: "Porsche", model: "Boxster", price: 72000, country : "M.abscessus" },
// { make: "Porsche", model: "Boxster", price: 72000, country : "M.abscessus" }
];

// let the grid know which columns and what data to use
const gridOptions = {
columnDefs: columnDefs,
rowData: rowData,
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
  document.querySelector('#myGrid').style.height = '400px';
}


// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
});