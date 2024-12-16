// DST table

// specify the column
const columnDefs_dst = [
    {
        field: 'species', colId: 'Species_name', minWidth: "180", maxWidth: "205", pinned: 'left', hide: false, unSortIcon: true, cellRenderer: function (params) {
            return `<i><a href="/ntmdb/species/M.${params.value}"> Mycobacterium  ${params.value} </a></i>`
        }
    },
    {
        field: 'strain', colId: 'Accession', maxWidth: "185", pinned: 'left', hide: false, unSortIcon: true, cellRenderer: function (params) {
            return `<a href="/ntmdb/strains/${params.value}"> ${params.value} </a>`
        }
    },
    // {
    //     field: 'Resistance_genes', colId: 'Genes', maxWidth: "190", pinned: 'left', hide: false, unSortIcon: true, cellRenderer: function (params) {
    //         return `<a href="/ntmdb/gene/resistance_gene"> ${params.value} </a>`
    //     }
    // },

    // DC01: Aminoglycosides
    {
        headerName: 'Aminoglycosides',
        marryChildren: true,
        children: [
            { field: 'Aminoglycosides', colId: 'Aminoglycosides', cellRenderer: dst_render, hide: false },
            { field: 'Amikacin', colId: 'Amikacin', cellRenderer: dst_render, columnGroupShow: 'closed', hide: false },
            { field: 'Capreomycin', colId: 'Capreomycin', cellRenderer: dst_render, columnGroupShow: 'closed', hide: false },
            { field: 'Streptomycin', colId: 'Streptomycin', cellRenderer: dst_render, columnGroupShow: 'closed', hide: false },
            { field: 'Tobramycin', colId: 'Tobramycin', cellRenderer: dst_render, columnGroupShow: 'closed', hide: false },
        ],
    },
    // DC02: Beta lactams
    {
        headerName: 'β-lactams',
        marryChildren: true,
        children: [
            { field: 'Cefoxitin', colId: 'Cefoxitin', cellRenderer: dst_render, hide: false },
            { field: 'Faropenem', colId: 'Faropenem', cellRenderer: dst_render, columnGroupShow: 'closed', hide: false },
            { field: 'Imipenem', colId: 'Imipenem', cellRenderer: dst_render, columnGroupShow: 'closed', hide: false },
            { field: 'Meropenem', colId: 'Meropenem', cellRenderer: dst_render, columnGroupShow: 'closed', hide: false },
        ],
    },
    // DC03: Chloramphenicols
    {
        headerName: 'Chloramphenicols',
        marryChildren: true,
        children: [
            { field: 'Chloramphenicol', colId: 'Chloramphenicol', cellRenderer: dst_render },
        ],
    },
    // DC04: Glycopeptides
    {
        headerName: 'Glycopeptides',
        marryChildren: true,
        children: [
            { field: 'Phleomycin', colId: 'Phleomycin', cellRenderer: dst_render },
        ],
    },
    // DC05: Macrolides
    {
        headerName: 'Macrolides',
        marryChildren: true,
        children: [
            { field: 'Macrolides', colId: 'Macrolides', cellRenderer: dst_render, hide: false },
            { field: 'Azithromycin', colId: 'Azithromycin', cellRenderer: dst_render, columnGroupShow: 'closed', hide: false },
            { field: 'Azithromycin_D3', colId: 'Azithromycin_D3', cellRenderer: dst_render, columnGroupShow: 'closed', hide: false },
            { field: 'Clarithromycin', colId: 'Clarithromycin', cellRenderer: dst_render, columnGroupShow: 'closed', hide: false },
            { field: 'Clarithromycin_D14', colId: 'Clarithromycin_D14', cellRenderer: dst_render, columnGroupShow: 'closed', hide: false },
            { field: 'Clarithromycin_D3', colId: 'Clarithromycin_D3', cellRenderer: dst_render, columnGroupShow: 'closed', hide: false },
            { field: 'Clarithromycin_D4', colId: 'Clarithromycin_D4', cellRenderer: dst_render, columnGroupShow: 'closed', hide: false },
            { field: 'Erythromycin', colId: 'Erythromycin', cellRenderer: dst_render, columnGroupShow: 'closed', hide: false },
            { field: 'Ethionamide', colId: 'Ethionamide', cellRenderer: dst_render, columnGroupShow: 'closed', hide: false },
        ],
    },
    // DC06: Oxazolidinones
    {
        headerName: 'Oxazolidinones',
        marryChildren: true,
        children: [
            { field: 'Linezolid', colId: 'Linezolid', cellRenderer: dst_render },
        ],
    },
    // DC07: Quinolones
    {
        headerName: 'Quinolones',
        marryChildren: true,
        children: [
            { field: 'Ciprofloxacin', colId: 'Ciprofloxacin', cellRenderer: dst_render },
            { field: 'Levofloxacin', colId: 'Levofloxacin', cellRenderer: dst_render, columnGroupShow: 'closed' },
            { field: 'Moxifloxacin', colId: 'Moxifloxacin', cellRenderer: dst_render, columnGroupShow: 'closed' },
            { field: 'Ofloxacin', colId: 'Ofloxacin', cellRenderer: dst_render, columnGroupShow: 'closed' },
        ],
    },
    // DC08: Tetracyclines
    {
        headerName: 'Tetracyclines',
        marryChildren: true,
        children: [
            { field: 'Tetracycline', colId: 'Tetracycline', cellRenderer: dst_render },
            { field: 'Doxycycline', colId: 'Doxycycline', cellRenderer: dst_render, columnGroupShow: 'closed' },
            { field: 'Minocycline', colId: 'Minocycline', cellRenderer: dst_render, columnGroupShow: 'closed' },
            { field: 'Tigecycline', colId: 'Tigecycline', cellRenderer: dst_render, columnGroupShow: 'closed' },
        ],
    },
    // DC09: Other
    {
        headerName: 'Others',
        marryChildren: true,
        children: [
            { field: 'Thiocarbohydrazide', colId: 'Thiocarbohydrazide', cellRenderer: dst_render },
            { field: 'Arginine', colId: 'Arginine', cellRenderer: dst_render, columnGroupShow: 'closed' },
            { field: 'D_cycloserine', colId: 'D_cycloserine', cellRenderer: dst_render, columnGroupShow: 'closed' },
        ],
    },
];


// specify the data
const rowData_dst = [
    {
        Species: "Mycobacterium abscessus",
        Strain_accession: "ERR4298315",
        Resistance_genes: "mtrA;mtrB;mtrC;...",

        Aminoglycosides: "R",
        Amikacin: "R",
        Capreomycin: "R",
        Streptomycin: "S",
        Tobramycin: "-",

        Cefoxitin: "-",
        Faropenem: "S",
        Imipenem: "I",
        Meropenem: "-",

        Chloramphenicol: "-",

        Phleomycin: "R",

        Macrolides: "R",
        Azithromycin: "R",
        Azithromycin_D3: "R",
        Clarithromycin: "R",
        Clarithromycin_D14: "R",
        Clarithromycin_D3: "R",
        Clarithromycin_D4: "R",
        Erythromycin: "-",
        Ethionamide: "-",

        Linezolid: "-",

        Ciprofloxacin: "-",
        Levofloxacin: "S",
        Moxifloxacin: "S",
        Ofloxacin: "-",

        Tetracycline: "-",
        Doxycycline: "-",
        Minocycline: "-",
        Tigecycline: "-",

        Thiocarbohydrazide: "-",
        Arginine: "-",
        D_cycloserine: "-",
    },
    {
        Species: "Mycobacterium abscessus",
        Strain_accession: "SRR4423483",
        Strain: "Seahorse4",
        Resistance_genes: "mtrA;mtrB;mtrC;...",

        Aminoglycosides: "-",
        Amikacin: "-",
        Capreomycin: "-",
        Streptomycin: "S",
        Tobramycin: "R",

        Cefoxitin: "-",
        Faropenem: "S",
        Imipenem: "R",
        Meropenem: "R",

        Chloramphenicol: "-",

        Phleomycin: "R",

        Macrolides: "-",
        Azithromycin: "-",
        Azithromycin_D3: "-",
        Clarithromycin: "-",
        Clarithromycin_D14: "-",
        Clarithromycin_D3: "R",
        Clarithromycin_D4: "R",
        Erythromycin: "-",
        Ethionamide: "-",

        Linezolid: "-",

        Ciprofloxacin: "-",
        Levofloxacin: "R",
        Moxifloxacin: "R",
        Ofloxacin: "-",

        Tetracycline: "-",
        Doxycycline: "-",
        Minocycline: "-",
        Tigecycline: "-",

        Thiocarbohydrazide: "-",
        Arginine: "-",
        D_cycloserine: "-",
    },
    {
        Species: "Mycobacterium abscessus",
        Strain_accession: "ERR4298294",
        Resistance_genes: "mtrA;mtrB;",

        Aminoglycosides: "R",
        Amikacin: "R",
        Capreomycin: "R",
        Streptomycin: "S",
        Tobramycin: "-",

        Cefoxitin: "-",
        Faropenem: "S",
        Imipenem: "I",
        Meropenem: "S",

        Chloramphenicol: "S",

        Phleomycin: "-",

        Macrolides: "-",
        Azithromycin: "-",
        Azithromycin_D3: "R",
        Clarithromycin: "-",
        Clarithromycin_D14: "-",
        Clarithromycin_D3: "R",
        Clarithromycin_D4: "R",
        Erythromycin: "-",
        Ethionamide: "-",

        Linezolid: "-",

        Ciprofloxacin: "-",
        Levofloxacin: "S",
        Moxifloxacin: "S",
        Ofloxacin: "-",

        Tetracycline: "-",
        Doxycycline: "-",
        Minocycline: "-",
        Tigecycline: "-",

        Thiocarbohydrazide: "-",
        Arginine: "-",
        D_cycloserine: "-",
    },
    {
        Species: "Mycobacterium abscessus",
        Strain_accession: "ERR4298313",
        Resistance_genes: "mtrA;mtrB;mtrC;...",

        Aminoglycosides: "-",
        Amikacin: "R",
        Capreomycin: "R",
        Streptomycin: "S",
        Tobramycin: "-",

        Cefoxitin: "-",
        Faropenem: "S",
        Imipenem: "I",
        Meropenem: "-",

        Chloramphenicol: "-",

        Phleomycin: "-",

        Macrolides: "-",
        Azithromycin: "-",
        Azithromycin_D3: "-",
        Clarithromycin: "-",
        Clarithromycin_D14: "-",
        Clarithromycin_D3: "R",
        Clarithromycin_D4: "R",
        Erythromycin: "-",
        Ethionamide: "-",

        Linezolid: "-",

        Ciprofloxacin: "-",
        Levofloxacin: "R",
        Moxifloxacin: "S",
        Ofloxacin: "-",

        Tetracycline: "-",
        Doxycycline: "-",
        Minocycline: "-",
        Tigecycline: "-",

        Thiocarbohydrazide: "-",
        Arginine: "-",
        D_cycloserine: "-",
    },
    {
        Species: "Mycobacterium abscessus",
        Strain_accession: "ERR4298295",
        Resistance_genes: "mtrA;mtrB;mtrC;...",

        Aminoglycosides: "S",
        Amikacin: "S",
        Capreomycin: "S",
        Streptomycin: "S",
        Tobramycin: "-",

        Cefoxitin: "-",
        Faropenem: "R",
        Imipenem: "R",
        Meropenem: "-",

        Chloramphenicol: "I",

        Phleomycin: "R",

        Macrolides: "-",
        Azithromycin: "-",
        Azithromycin_D3: "-",
        Clarithromycin: "-",
        Clarithromycin_D14: "-",
        Clarithromycin_D3: "R",
        Clarithromycin_D4: "R",
        Erythromycin: "-",
        Ethionamide: "-",

        Linezolid: "-",

        Ciprofloxacin: "-",
        Levofloxacin: "S",
        Moxifloxacin: "S",
        Ofloxacin: "-",

        Tetracycline: "-",
        Doxycycline: "-",
        Minocycline: "-",
        Tigecycline: "-",

        Thiocarbohydrazide: "-",
        Arginine: "-",
        D_cycloserine: "-",
    },
];



// let the grid know which columns and what data to use
const gridOptions_dst = {
    columnDefs: columnDefs_dst,
    rowData: rowData_dst,
    rowHeight: 50,
    defaultColDef: {
        editable: false,
        sortable: true,
        filter: true,
        floatingFilter: true,
        resizable: true,
        wrapText: true,
        maxWidth: "180",
        hide: true,
    },
    animateRows: true,
    localeText: {
        // noRowsToShow: 'Loading data, please wait ......',
        loadingOoo: 'Loading data, please wait ......',
    },
    // turns OFF row hover, it's on by default
    // suppressRowHoverHighlight: true,
    // turns ON column hover, it's off by default
    columnHoverHighlight: false,
    pagination: true,        // enable pagination  
    paginationPageSize: 10,
    // 'full height' mode
    domLayout: 'autoHeight',
    onColumnPinned: onColumnPinned,

};

function setFixedHeight() {
    // we could also call setDomLayout() here as normal is the default
    gridOptions_dst.api.setDomLayout('normal');
    // when auto height is off, the grid ahs a fixed height, and then the grid
    // will provide scrollbars if the data does not fit into it.
    document.querySelector('#dst').style.height = '400px';
}

// table-size
function onPageSizeChanged() {
    var value = document.getElementById('page-size').value;
    gridOptions_dst.api.paginationSetPageSize(Number(value));
}




// setup the grid after the page has finished loading
// document.addEventListener('DOMContentLoaded', () => {
//     const gridDiv = document.querySelector('#dst');
//     new agGrid.Grid(gridDiv, gridOptions_dst);
// });


// parse the search string
// 假设URL为：http://127.0.0.1:8000/browse/dst/?species=abscessus
// const currentSearch = window.location.search;
// console.log(currentSearch); // 打印 ?species=abscessus


// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", () => {
    const gridDiv = document.querySelector('#dst');
    new agGrid.Grid(gridDiv, gridOptions_dst);

    fetch(`/ntmdb/api/DST`)
        .then((response) => response.json())
        .then((data) => {
            gridOptions_dst.api.setRowData(data);
        });
});









// function dst_render(params) {
//     //颜色可以用英文、rgb以及十六进制
//     if (params.value === 'R') {
//         return ('<span style="Color:#DC143C;font-weight:bold">' + params.value + '</span>');
//     }
//     else if (params.value === 'S') {
//         return ('<span style="Color:#38B000;font-weight:bold">' + params.value + '</span>');
//     }
//     else if (params.value === 'I') {
//         return ('<span style="Color:#FF8C00;font-weight:bold">' + params.value + '</span>');
//     }
//     else {
//         return ('<span style="Color:black">' + params.value + '</span>');
//     }
// }


function dst_render(params) {
    const drugName = params.colDef.colId;
    const drugData = params.data[drugName];

    if (!drugData) {
        return '-';
    }

    let susceptibility = drugData.drug_susceptibility;
    let color = 'black';
    let fontWeight = 'normal';

    if (susceptibility === 'susceptible') {
        susceptibility = 'S';
        color = '#38B000';
        fontWeight = 'bold';
    } else if (susceptibility === 'resistance') {
        susceptibility = 'R';
        color = '#DC143C';
        fontWeight = 'bold';
    } else if (susceptibility === 'intermediate') {
        susceptibility = 'I';
        color = '#FF8C00';
        fontWeight = 'bold';
    } else if (susceptibility === 'Unknown') {
        susceptibility = '-';
    }

    //return `[${susceptibility}]/[${drugData.MIC}]`;
    return `<span style="color: ${color}; font-weight: ${fontWeight}">[${susceptibility}]</span> / [${drugData.MIC}]`;
}



// 获取下载按钮元素并绑定点击事件
var downloadButton = document.querySelector('#downloadButton');
downloadButton.addEventListener('click', function () {
    gridOptions_dst.api.exportDataAsCsv(); // 导出 CSV 文件
});


// Pin columns
function onColumnPinned(e) {
    console.log('Event Column Pinned', e);
}

function defaultPinned() {
    gridOptions_dst.columnApi.applyColumnState({
        state: [
            { colId: 'Species_name', pinned: 'left' },
            { colId: 'Accession', pinned: 'left' },
            { colId: 'Genes', pinned: 'left' },
        ],
        defaultState: { pinned: null },
    });
}

function clearPinned() {
    gridOptions_dst.columnApi.applyColumnState({ defaultState: { pinned: null } });
}





// hide DC01: Aminoglycosides
function onBtHide_Aminoglycosides() {
    gridOptions_dst.columnApi.applyColumnState({
        state: [
            { colId: 'Aminoglycosides', hide: true },
            { colId: 'Amikacin', hide: true },
            { colId: 'Capreomycin', hide: true },
            { colId: 'Streptomycin', hide: true },
            { colId: 'Tobramycin', hide: true },
        ],
    });
}
// show DC01: Aminoglycosides
function onBtShow_Aminoglycosides() {
    gridOptions_dst.columnApi.applyColumnState({
        state: [
            { colId: 'Aminoglycosides', hide: false },
            { colId: 'Amikacin', hide: false },
            { colId: 'Capreomycin', hide: false },
            { colId: 'Streptomycin', hide: false },
            { colId: 'Tobramycin', hide: false },
        ],
    });
}
// checkbox_function DC01: Aminoglycosides
function OncheckBox_Aminoglycosides(e) {
    if (e.checked == true) {
        onBtShow_Aminoglycosides();
    } else {
        onBtHide_Aminoglycosides();
    }
}

// hide DC02: Beta lactams
function onBtHide_Beta_lactams() {
    gridOptions_dst.columnApi.applyColumnState({
        state: [
            { colId: 'Cefoxitin', hide: true },
            { colId: 'Faropenem', hide: true },
            { colId: 'Imipenem', hide: true },
            { colId: 'Meropenem', hide: true },
        ],
    });
}
// show DC02: Beta lactams
function onBtShow_Beta_lactams() {
    gridOptions_dst.columnApi.applyColumnState({
        state: [
            { colId: 'Cefoxitin', hide: false },
            { colId: 'Faropenem', hide: false },
            { colId: 'Imipenem', hide: false },
            { colId: 'Meropenem', hide: false },
        ],
    });
}
// checkbox_function DC02: Beta lactams
function OncheckBox_Beta_lactams(e) {
    if (e.checked == true) {
        onBtShow_Beta_lactams();
    } else {
        onBtHide_Beta_lactams();
    }
}

// hide DC03: Chloramphenicols
function onBtHide_Chloramphenicols() {
    gridOptions_dst.columnApi.applyColumnState({
        state: [
            { colId: 'Chloramphenicol', hide: true },
        ],
    });
}
// show DC03: Chloramphenicols
function onBtShow_Chloramphenicols() {
    gridOptions_dst.columnApi.applyColumnState({
        state: [
            { colId: 'Chloramphenicol', hide: false },
        ],
    });
}
// checkbox_function DC03: Chloramphenicols
function OncheckBox_Chloramphenicols(e) {
    if (e.checked == true) {
        onBtShow_Chloramphenicols();
    } else {
        onBtHide_Chloramphenicols();
    }
}

// hide DC04: Glycopeptides
function onBtHide_Glycopeptides() {
    gridOptions_dst.columnApi.applyColumnState({
        state: [
            { colId: 'Phleomycin', hide: true },
        ],
    });
}
// show DC04: Glycopeptides
function onBtShow_Glycopeptides() {
    gridOptions_dst.columnApi.applyColumnState({
        state: [
            { colId: 'Phleomycin', hide: false },
        ],
    });
}
// checkbox_function  DC04: Glycopeptides
function OncheckBox_Glycopeptides(e) {
    if (e.checked == true) {
        onBtShow_Glycopeptides();
    } else {
        onBtHide_Glycopeptides();
    }
}

// hide DC05: Macrolides
function onBtHide_Macrolides() {
    gridOptions_dst.columnApi.applyColumnState({
        state: [
            { colId: 'Macrolides', hide: true },
            { colId: 'Azithromycin', hide: true },
            { colId: 'Azithromycin_D3', hide: true },
            { colId: 'Clarithromycin', hide: true },
            { colId: 'Clarithromycin_D3', hide: true },
            { colId: 'Clarithromycin_D14', hide: true },
            { colId: 'Clarithromycin_D3', hide: true },
            { colId: 'Clarithromycin_D4', hide: true },
            { colId: 'Erythromycin', hide: true },
            { colId: 'Ethionamide', hide: true },
        ],
    });
}
// show DC05: Macrolides
function onBtShow_Macrolides() {
    gridOptions_dst.columnApi.applyColumnState({
        state: [
            { colId: 'Macrolides', hide: false },
            { colId: 'Azithromycin', hide: false },
            { colId: 'Azithromycin_D3', hide: false },
            { colId: 'Clarithromycin', hide: false },
            { colId: 'Clarithromycin_D3', hide: false },
            { colId: 'Clarithromycin_D14', hide: false },
            { colId: 'Clarithromycin_D3', hide: false },
            { colId: 'Clarithromycin_D4', hide: false },
            { colId: 'Erythromycin', hide: false },
            { colId: 'Ethionamide', hide: false },
        ],
    });
}
// checkbox_function  DC05: Macrolides
function OncheckBox_Macrolides(e) {
    if (e.checked == true) {
        onBtShow_Macrolides();
    } else {
        onBtHide_Macrolides();
    }
}

// hide DC06: Oxazolidinones
function onBtHide_Oxazolidinones() {
    gridOptions_dst.columnApi.applyColumnState({
        state: [
            { colId: 'Linezolid', hide: true },
        ],
    });
}
// show DC06: Oxazolidinones
function onBtShow_Oxazolidinones() {
    gridOptions_dst.columnApi.applyColumnState({
        state: [
            { colId: 'Linezolid', hide: false },
        ],
    });
}
// checkbox_function  DC06: Oxazolidinones
function OncheckBox_Oxazolidinones(e) {
    if (e.checked == true) {
        onBtShow_Oxazolidinones();
    } else {
        onBtHide_Oxazolidinones();
    }
}

// hide DC07: Quinolones
function onBtHide_Quinolones() {
    gridOptions_dst.columnApi.applyColumnState({
        state: [
            { colId: 'Ciprofloxacin', hide: true },
            { colId: 'Levofloxacin', hide: true },
            { colId: 'Moxifloxacin', hide: true },
            { colId: 'Ofloxacin', hide: true },
        ],
    });
}
// show DC07: Quinolones
function onBtShow_Quinolones() {
    gridOptions_dst.columnApi.applyColumnState({
        state: [
            { colId: 'Ciprofloxacin', hide: false },
            { colId: 'Levofloxacin', hide: false },
            { colId: 'Moxifloxacin', hide: false },
            { colId: 'Ofloxacin', hide: false },
        ],
    });
}
// checkbox_function  DC07: Quinolones
function OncheckBox_Quinolones(e) {
    if (e.checked == true) {
        onBtShow_Quinolones();
    } else {
        onBtHide_Quinolones();
    }
}

// hide DC08: Tetracyclines
function onBtHide_Tetracyclines() {
    gridOptions_dst.columnApi.applyColumnState({
        state: [
            { colId: 'Tetracycline', hide: true },
            { colId: 'Doxycycline', hide: true },
            { colId: 'Minocycline', hide: true },
            { colId: 'Tigecycline', hide: true },
        ],
    });
}
// show DC08: Tetracyclines
function onBtShow_Tetracyclines() {
    gridOptions_dst.columnApi.applyColumnState({
        state: [
            { colId: 'Tetracycline', hide: false },
            { colId: 'Doxycycline', hide: false },
            { colId: 'Minocycline', hide: false },
            { colId: 'Tigecycline', hide: false },
        ],
    });
}
// checkbox_function  DC08: Tetracyclines
function OncheckBox_Tetracyclines(e) {
    if (e.checked == true) {
        onBtShow_Tetracyclines();
    } else {
        onBtHide_Tetracyclines();
    }
}

// hide DC09: Other
function onBtHide_Other() {
    gridOptions_dst.columnApi.applyColumnState({
        state: [
            { colId: 'Thiocarbohydrazide', hide: true },
            { colId: 'Arginine', hide: true },
            { colId: 'D_cycloserine', hide: true },
        ],
    });
}
// show DC09: Other
function onBtShow_Other() {
    gridOptions_dst.columnApi.applyColumnState({
        state: [
            { colId: 'Thiocarbohydrazide', hide: false },
            { colId: 'Arginine', hide: false },
            { colId: 'D_cycloserine', hide: false },
        ],
    });
}
// checkbox_function  DC09: Other
function OncheckBox_Other(e) {
    if (e.checked == true) {
        onBtShow_Other();
    } else {
        onBtHide_Other();
    }
}



// selectDefault and selectAll buttons

const clearButton = document.querySelector('button#clear-button');
const selectDefaultButton = document.querySelector('#select-default-button');
const checkboxes = document.querySelectorAll('label.check_items input[type="checkbox"]');


clearButton.addEventListener('click', () => {
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
        checkbox.click(); // 添加点击操作
    });
});

selectDefaultButton.addEventListener('click', () => {
    checkboxes.forEach((checkbox) => {
        if (checkbox.value === 'Aminoglycosides' ||
            checkbox.value === 'Beta_lactams' ||
            checkbox.value === 'Macrolides') {
            checkbox.checked = false;
        } else {
            checkbox.checked = true;
        }
        checkbox.click();
    });
});