// genes table
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
      minWidth: "150",
      // filterType: 'text',
      // type: 'startsWith',
      // filter: 'a',
      cellRenderer: function (params) {
        return `<a href="/ntmdb/gene/resistance_gene"> ${params.value} </a>`
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