import apiService from "../api/ApiService";
import { useState } from 'react';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'modify', label: 'Bearbeiten', minWidth: 100 },
  { id: 'delete', label: 'Löschen', minWidth: 100 },
];
export default function BusStopList() {

//var busStops = apiService().apiGetAllBusStops();
var busStops = [
    {"id":1,"name":"Abbey Road"},{"id":2,"name":"Barn Street"},
    {"id":3,"name":"Camp Street"},{"id":4,"name":"Dean Avenue"},
    {"id":5,"name":"East Hills Avenue"},{"id":6,"name":"Farmer's lane"},
    {"id":7,"name":"Gold Street"}
];
const [displayedBusStops, setDisplayedBusStops] = useState(busStops);

console.log(busStops.toString());

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {
                            displayedBusStops.map((line) => (
                                <TableRow key={line.name} className='tablerow'>
                                    <TableCell>{line.id}</TableCell>
                                    <TableCell>{line.name}</TableCell>
                                    <TableCell><button>Bearbeiten</button></TableCell>
                                    <TableCell><button>Löschen</button></TableCell>
                                </TableRow>
                            ))
                        }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={busStops.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}