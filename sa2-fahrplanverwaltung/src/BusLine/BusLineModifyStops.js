import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../api/ApiService";
import Header from "../layout/Header";
import Button from '@mui/material/Button';
import DeleteBusLineStop from "./DeleteBusLineStop";
import AddBusLineStop from "./AddBusLineStop";

export default function BusLineModifyStops({ isStaff, setIsStaff }) {

  let { id } = useParams();
  var [editedBusLine, setEditedBusLine] = useState(undefined);
  var [editedBusStop, setEditedBusStop] = useState(undefined);
  const [deleteBusLineDialog, setDeleteBusLineDialog] = useState(false);
  const [addBusLineDialog, setAddBusLineDialog] = useState(false);
  const [busLineDetail, setBusLineDetail] = useState(null);
  useEffect(() => apiService().getBusLine(id).then((result) => setBusLineDetail(result)), []);

  function deleteBusStopFromLine(stop, line) {
    apiService().apiDeleteLineStop(stop, line).then(response => {
      apiService().getBusLine(line).then(((result) => setBusLineDetail(result)), []);
    })
    closeDialog();
  }
  function AddBusStopToLine(line, stop, time, target) {
    apiService().apiAddLineStop(line, stop, time, target).then(response => {
      apiService().getBusLine(line).then(((result) => setBusLineDetail(result)), []);
    })
    closeDialog();
  }

  function deleteDialog(stop, line) {
    setEditedBusLine(line)
    setEditedBusStop(stop)
    setDeleteBusLineDialog(true)
  }

  function addDialog(stop, line) {
    setEditedBusLine(line)
    setEditedBusStop(stop)
    setAddBusLineDialog(true)
  }

  function closeDialog() {
    setDeleteBusLineDialog(false)
    setAddBusLineDialog(false)
    setEditedBusLine(undefined)
    setEditedBusStop(undefined)
  }

  return (
    <div>
      <Header isStaff={isStaff} setIsStaff={setIsStaff}></Header>
      <h1>Modify zur Linie: {busLineDetail?.name}</h1>
      <Button variant="outlined">Haltestelle am Ende Hinzufügen</Button>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell key={id}>ID</TableCell>
              <TableCell>Haltestelle</TableCell>
              <TableCell>Haltestelle Löschen</TableCell>
              <TableCell>Haltestelle Einfügen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              busLineDetail?.lineStops.map((stop) => (
                <TableRow key={stop.id} className='tablerow'>
                  <TableCell>{stop.id}</TableCell>
                  <TableCell>{stop.busStopName}</TableCell>
                  <TableCell><Button variant="outlined" onClick={(event) => deleteDialog(stop.id, id)} >Haltestelle Löschen</Button></TableCell>
                  <TableCell><Button variant="outlined" onClick={(event) => addDialog(stop.id, id)} >Haltestelle Hier Hinzufügen</Button></TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteBusLineStop open={deleteBusLineDialog} nameStop={editedBusStop} nameLine={editedBusLine} handleClose={() => closeDialog()} confirmDeletion={() => deleteBusStopFromLine(editedBusStop, editedBusLine)}></DeleteBusLineStop>
      <AddBusLineStop open={addBusLineDialog} nameStop={editedBusStop} nameLine={editedBusLine} handleClose={() => closeDialog()} confirmDeletion={() => deleteBusStopFromLine(editedBusStop, editedBusLine)}></AddBusLineStop>
    </div>
  );
}