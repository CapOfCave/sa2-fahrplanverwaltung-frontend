import apiService from "../api/ApiService";
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CreateBusStop from "./CreateBusStop";
import { Button, Divider } from "@mui/material";
import Header from "../layout/Header";
import DeleteBusStop from "./DeleteBusStop";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const columns = [
  { id: 'id', label: 'ID', minWidth: 5 },
  { id: 'name', label: 'Name', minWidth: 250 },
];
export default function BusStopList({ isStaff, setIsStaff }) {

  if (isStaff && columns.length < 3) {
    columns.push(
      { id: 'modify', label: 'Bearbeiten', minWidth: 10 },
      { id: 'delete', label: 'Löschen', minWidth: 10 },
    )

  }
  if (!isStaff && columns.length > 3) {
    columns.splice(2, 2)
  }

  const [busStops, setBusStops] = useState([]);
  useEffect(() => apiService().apiGetAllBusStops().then((result) => setBusStops(result)), []);


  /*var busStops = [
    { "id": 1, "name": "Abbey Road" }, { "id": 2, "name": "Barn Street" },
    { "id": 3, "name": "Camp Street" }, { "id": 4, "name": "Dean Avenue" },
    { "id": 5, "name": "East Hills Avenue" }, { "id": 6, "name": "Farmer's lane" },
    { "id": 7, "name": "Gold Street" }
  ];*/

  const [editedBusStop, setEditedBusStop] = useState(undefined);
  const [showDialog, setShowDialog] = useState(false);
  const [deleteBusStopDialog, setDeleteBusStopDialog] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  function newBusStop() {
    setShowDialog(true);
  }

  function closeDialog() {
    setShowDialog(false);
    setDeleteBusStopDialog(false)
    setEditedBusStop(undefined);
  }

  function renameStop(name) {
    apiService().apiRenameBusStop(editedBusStop.id, name).then(response => {
      apiService().apiGetAllBusStops().then(((result) => setBusStops(result)), []);
    }).catch(error => enqueueSnackbar(error.response.data, {variant: "error"}));
    closeDialog();
  }

  function createStop(name) {
    apiService().apiCreateBusStop(name).then(response => {
      apiService().apiGetAllBusStops().then(((result) => setBusStops(result)), []);
    }).catch(error => enqueueSnackbar(error.response.data, {variant: "error"}));
    closeDialog();
  }

  function confirmDeletion() {
    apiService().apiDeleteBusStop(editedBusStop.id).then(response => {
      apiService().apiGetAllBusStops().then(((result) => setBusStops(result)), []);
    }).catch(error => enqueueSnackbar(error.response.data, {variant: "error"}));
    closeDialog();
  }

  function editBusStop(stop) {
    setEditedBusStop(stop)
    setShowDialog(true);
  }

  function deleteBusStop(stop) {
    setEditedBusStop(stop)
    setDeleteBusStopDialog(true)
  }

  let navigate = useNavigate();
  function showDetails(id) {
    navigate("/busstops/" + id)
  }

  return (
    <div>
      <Header isStaff={isStaff} setIsStaff={setIsStaff} />
      <Divider sx={{ width: '90%', marginLeft: "5%"}}>
      <h1>Bushaltestellen</h1>
      {isStaff &&
          <Button variant="outlined" onClick={newBusStop} sx={{ marginBottom: 4}}>
            Neue Haltestelle anlegen
          </Button>
        }
      </Divider>
      <Paper sx={{ width: '90%', overflow: 'hidden', marginLeft: "5%" }}>
        <TableContainer>
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
                busStops.map((stop) => (
                  <TableRow key={stop.name} className='tablerow' hover onClick={(event) => showDetails(stop.id)}>
                    <TableCell>{stop.id}</TableCell>
                    <TableCell>{stop.name}</TableCell>
                    {isStaff &&
                      <TableCell><Button variant="outlined" onClick={(event) => {event.stopPropagation(); editBusStop(stop)}} >Bearbeiten</Button></TableCell>
                    }
                    {isStaff &&
                      <TableCell><Button onClick={(event) => {event.stopPropagation(); deleteBusStop(stop)}}>Löschen</Button></TableCell>
                    }
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <CreateBusStop open={showDialog} name={editedBusStop?.name} handleClose={() => closeDialog()} renameStop={renameStop} createNewStop={createStop}></CreateBusStop>
        <DeleteBusStop open={deleteBusStopDialog} name={editedBusStop?.name} handleClose={() => closeDialog()} confirmDeletion={() => confirmDeletion()}></DeleteBusStop>
      </Paper>
    </div>
  );
}