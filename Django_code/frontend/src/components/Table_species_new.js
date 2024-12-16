import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const rows = [
  {
      "taxid": 1764,
      "name": "avium",
      "tax_level": "specie",
      "type_strains": "ATCC 25291; CCUG 20992; CIP 104244; DSM 44156; NCTC 13034",
      "lpsn_address": "https://lpsn.dsmz.de/species/mycobacterium-avium",
      "risk_group": "2",
      "pathogenicity": "ht",
      "ncbi_genus": "g__Mycobacterium",
      "ncbi_complex": "x__Mycobacterium avium complex (MAC)",
      "ncbi_specie": "s__Mycobacterium avium",
      "parent_taxid": 0
  },
  {
      "taxid": 1766,
      "name": "fortuitum",
      "tax_level": "specie",
      "type_strains": "6841; ATCC 6841; CCUG 20994; CIP 104534; DSM 46621; IFO 13159; JCM 6387; NBRC 13159; NCTC 10394",
      "lpsn_address": "https://lpsn.dsmz.de/species/mycobacterium-fortuitum",
      "risk_group": "",
      "pathogenicity": "",
      "ncbi_genus": "g__Mycolicibacterium",
      "ncbi_complex": "",
      "ncbi_specie": "s__Mycolicibacterium fortuitum",
      "parent_taxid": 0
  },
  {
      "taxid": 1767,
      "name": "intracellulare",
      "tax_level": "specie",
      "type_strains": "ATCC 13950; CCUG 28005; CIP 104243; DSM 43223; JCM 6384; NCTC 13025; TMC 1406",
      "lpsn_address": "https://lpsn.dsmz.de/species/mycobacterium-intracellulare",
      "risk_group": "2",
      "pathogenicity": "ht",
      "ncbi_genus": "g__Mycobacterium",
      "ncbi_complex": "x__Mycobacterium avium complex (MAC)",
      "ncbi_specie": "s__Mycobacterium intracellulare",
      "parent_taxid": 0
  }]

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Species</TableCell>
            <TableCell align="right">Taxonmy&nbsp;ID</TableCell>
            <TableCell align="right">Type&nbsp;Strians</TableCell>
            <TableCell align="right">Risk&nbsp;Group</TableCell>
            <TableCell align="right">Source</TableCell>
            <TableCell align="right">Total Strians</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.taxid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Mycobacterium {row.name}
              </TableCell>
              <TableCell align="right">{row.taxid}</TableCell>
              <TableCell align="right">{row.type_strains}</TableCell>
              <TableCell align="right">{row.risk_group}({row.pathogenicity})</TableCell>
              <TableCell align="right">Core: 2381, 52.36% / Dispensable: 1053, 23.16% / Unique: 1113, 24.48%</TableCell>
              <TableCell align="right">100</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
