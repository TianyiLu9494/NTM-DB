// genes table

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
      minWidth: "100",
      cellRenderer: function (params) {
        return `<a href="/ntmdb/gene/resistance_gene"> ${params.value} </a>`
      }
    },
    {
      headerName: 'Accession',
      field: "vfg_id",
      minWidth: "120",
      cellRenderer: function (params) {
        return `<a target="view_frame" href="http://www.mgc.ac.cn/cgi-bin/VFs/gene.cgi?GeneID=${params.value}"> ${params.value} </a>`
      }
    },

    {
      headerName: 'Number of Species',
      field: "number_of_species",
      /* filter: false, */
      minWidth: "80",
      cellRenderer: function (params) {
        return `<a href="/ntmdb/browse/species/?card_id=${params.data.card_accession}"> ${params.value} </a>`
      }
    },
    {
      headerName: 'Number of Strains',
      field: "number_of_strains",
      /* filter: false, */
      minWidth: "80",
      sort: 'desc',
      cellRenderer: function (params) {
        return `<a href="/ntmdb/browse/strain/?card_id=${params.data.card_accession}"> ${params.value} </a>`
      }
    },
    {
      headerName: 'Virulence Factor',
      field: "vf_name",
      minWidth: "280",
      autoHeight: true,
      cellRenderer: function (params) {
        return `<a target="view_frame" href="http://www.mgc.ac.cn/cgi-bin/VFs/vfs.cgi?VFID=${params.data.vf_id}">${params.value}</a>`
      }
    },
    {
      headerName: 'Virulence Factor Category',
      field: "vfc_name",
      minWidth: "410",
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

    fetch(url)
      .then((response) => response.json())
      .then((data) => gridOptions_vf.api.setRowData(data))
      .catch((error) => console.error(error));
  }
}