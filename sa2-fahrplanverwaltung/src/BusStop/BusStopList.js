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
import CreateBusStop from "./CreateBusStop";
import { Button } from "@mui/material";
import Header from "../layout/Header";
import DeleteBusStop from "./DeleteBusStop";

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
];
export default function BusStopList({isStaff}) {

  isStaff=true;

  if(isStaff && columns.length<3){
    columns.push(
      { id: 'modify', label: 'Bearbeiten', minWidth: 100 },
      { id: 'delete', label: 'Löschen', minWidth: 100 },)

  }
  //var busStops = apiService().apiGetAllBusStops();
  var busStops = [
    { "id": 1, "name": "Abbey Road" }, { "id": 2, "name": "Barn Street" },
    { "id": 3, "name": "Camp Street" }, { "id": 4, "name": "Dean Avenue" },
    { "id": 5, "name": "East Hills Avenue" }, { "id": 6, "name": "Farmer's lane" },
    { "id": 7, "name": "Gold Street" }
  ];

  const [displayedBusStops, setDisplayedBusStops] = useState(busStops);
  const [editedBusStop, setEditedBusStop] = useState(undefined);
  const [showDialog, setShowDialog] = useState(false);
  const [deleteBusStopDialog, setDeleteBusStopDialog] = useState(false);

  function newBusStop() {
    setShowDialog(true);
  }

  function closeDialog() {
    setShowDialog(false);
    setDeleteBusStopDialog(false)
    setEditedBusStop(undefined);
  }

  function editBusStop(stop) {
    setEditedBusStop(stop.name)
    setShowDialog(true);
  }

  function deleteBusStop(stop){
    setEditedBusStop(stop.name)
    setDeleteBusStopDialog(true)
  }

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
    <div>
      <Header />
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
              displayedBusStops.map((stop) => (
                <TableRow key={stop.name} className='tablerow'>
                  <TableCell>{stop.id}</TableCell>
                  <TableCell>{stop.name}</TableCell>
                  { isStaff &&
                      <TableCell><Button variant="outlined" onClick={(event) => editBusStop(stop)} >Bearbeiten</Button></TableCell>
                  }
                  { isStaff &&
                  <TableCell><Button onClick={(event) => deleteBusStop(stop)}>Löschen</Button></TableCell>
                  }
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
      <Button variant="outlined" onClick={newBusStop}>
        Neue Haltestelle anlegen
      </Button>
      <CreateBusStop open={showDialog} name={editedBusStop} handleClose={() => closeDialog()} ></CreateBusStop>
      <DeleteBusStop open={deleteBusStopDialog} name={editedBusStop} handleClose={() => closeDialog()}></DeleteBusStop>
    </Paper>
    </div>
  );
}