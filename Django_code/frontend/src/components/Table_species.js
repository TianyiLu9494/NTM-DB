import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'species', headerName: 'Species', width: 200 },
  {
    field: 'tax_id',
    headerName: 'Taxonomy ID',
    width: 100,
    editable: false,
  },
  {
    field: 'type_strain',
    headerName: 'Type Strain',
    width: 130,
    editable: false,
  },
  {
    field: 'representative',
    headerName: 'Representative',
    width: 150,
    editable: false,
  },
  {
    field: 'strian_count',
    headerName: 'Number of Strain',
    type: 'number',
    width: 100,
    editable: false,
  },
  {
    field: 'source',
    headerName: 'Source',
    width: 200,
    editable: false,
  },
  {
    field: 'growth_type',
    headerName: 'Growth Type',
    width: 120,
    editable: false,
  },
];

const rows = [
  { id: 1,species: 'Mycobacteroides abscess',tax_id: '36809',type_strain: 'ATCC 19977',representative: 'Reference genome',strain_count: 100,source: '{"Huamne source":100,"Animal source":10,"Environment source":5}',growth_type: "Rapid" },
  { id: 2,species: 'Mycobacteroides abscess',tax_id: '36809',type_strain: 'ATCC 19977',representative: 'Reference genome',strain_count: 100,source: '{"Huamne source":100,"Animal source":10,"Environment source":5}',growth_type: "Rapid" },
  { id: 3,species: 'Mycobacteroides abscess',tax_id: '36809',type_strain: 'ATCC 19977',representative: 'Reference genome',strain_count: 100,source: '{"Huamne source":100,"Animal source":10,"Environment source":5}',growth_type: "Rapid" },
  { id: 4,species: 'Mycobacteroides abscess',tax_id: '36809',type_strain: 'ATCC 19977',representative: 'Reference genome',strain_count: 100,source: '{"Huamne source":100,"Animal source":10,"Environment source":5}',growth_type: "Rapid" },
  { id: 5,species: 'Mycobacteroides abscess',tax_id: '36809',type_strain: 'ATCC 19977',representative: 'Reference genome',strain_count: 100,source: '{"Huamne source":100,"Animal source":10,"Environment source":5}',growth_type: "Rapid" },
  { id: 6,species: 'Mycobacteroides abscess',tax_id: '36809',type_strain: 'ATCC 19977',representative: 'Reference genome',strain_count: 100,source: '{"Huamne source":100,"Animal source":10,"Environment source":5}',growth_type: "Rapid" },
  { id: 7,species: 'Mycobacteroides abscess',tax_id: '36809',type_strain: 'ATCC 19977',representative: 'Reference genome',strain_count: 100,source: '{"Huamne source":100,"Animal source":10,"Environment source":5}',growth_type: "Rapid" },
  { id: 8,species: 'Mycobacteroides abscess',tax_id: '36809',type_strain: 'ATCC 19977',representative: 'Reference genome',strain_count: 100,source: '{"Huamne source":100,"Animal source":10,"Environment source":5}',growth_type: "Rapid" },
  { id: 9,species: 'Mycobacteroides abscess',tax_id: '36809',type_strain: 'ATCC 19977',representative: 'Reference genome',strain_count: 100,source: '{"Huamne source":100,"Animal source":10,"Environment source":5}',growth_type: "Rapid" },
  { id: 10,species: 'Mycobacteroides abscess',tax_id: '36809',type_strain: 'ATCC 19977',representative: 'Reference genome',strain_count: 100,source: '{"Huamne source":100,"Animal source":10,"Environment source":5}',growth_type: "Rapid" },
  { id: 11,species: 'Mycobacteroides abscess',tax_id: '36809',type_strain: 'ATCC 19977',representative: 'Reference genome',strain_count: 100,source: '{"Huamne source":100,"Animal source":10,"Environment source":5}',growth_type: "Rapid" },
  { id: 12,species: 'Mycobacteroides abscess',tax_id: '36809',type_strain: 'ATCC 19977',representative: 'Reference genome',strain_count: 100,source: '{"Huamne source":100,"Animal source":10,"Environment source":5}',growth_type: "Rapid" },
  { id: 13,species: 'Mycobacteroides abscess',tax_id: '36809',type_strain: 'ATCC 19977',representative: 'Reference genome',strain_count: 100,source: '{"Huamne source":100,"Animal source":10,"Environment source":5}',growth_type: "Rapid" },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
      />
    </div>
  );
}