import { Button, Divider } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSnackbar } from "notistack";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { apiCreateBusLine, apiDeleteBusLine, apiGetAllBusLines, apiRenameBusLine } from "../api/ApiService";
import Header from "../layout/Header";
import CreateBusLine from "./CreateBusLine";
import DeleteBusLine from "./DeleteBusLine";

const columns = [
  { id: 'id', label: 'ID', minWidth: 5 },
  { id: 'name', label: 'Name', minWidth: 250 },
];
export default function BusLineOverview({ isStaff, setIsStaff }) {

  if (isStaff && columns.length < 3) {
    columns.push(
      { id: 'modify', label: 'Buslinie Bearbeiten', minWidth: 10 },
      { id: 'rename', label: 'Umbennenen', minWidth: 10 },
      { id: 'delete', label: 'Löschen', minWidth: 10 },
    )

  }
  if (!isStaff && columns.length > 3) {
    columns.splice(2, 3)
  }

  const [busLines, setBusLines] = useState([]);
  useEffect(() => apiGetAllBusLines().then((result) => setBusLines(result)), []);

  const [editedBusLine, setEditedBusLine] = useState(undefined);
  const [showDialog, setShowDialog] = useState(false);
  const [deleteBusLineDialog, setDeleteBusLineDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  function newBusLine() {
    setShowDialog(true);
  }

  function closeDialog() {
    setShowDialog(false);
    setDeleteBusLineDialog(false)
    setEditedBusLine(undefined);
  }

  function renameLine(name) {
    apiRenameBusLine(editedBusLine.id, name)
      .then(refresh)
      .catch(error => enqueueSnackbar(error.response.data, { variant: "error" }));
    closeDialog();
  }

  function createLine(name) {
    apiCreateBusLine(name)
      .then(refresh)
      .catch(error => enqueueSnackbar(error.response.data, { variant: "error" }));
    closeDialog();
  }

  function confirmDeletion() {
    apiDeleteBusLine(editedBusLine.id)
      .then(refresh)
      .catch(error => enqueueSnackbar(error.response.data, { variant: "error" }));
    closeDialog();
  }

  function refresh() {
    apiGetAllBusLines().then(((result) => setBusLines(result)), []);
  }

  function editBusLine(line) {
    setEditedBusLine(line)
    setShowDialog(true);
  }

  function deleteBusLine(line) {
    setEditedBusLine(line)
    setDeleteBusLineDialog(true)
  }

  let navigate = useNavigate();
  function showDetails(id) {
    navigate("/buslines/" + id)
  }

  function modifyStops(id) {
    navigate("/buslines/" + id + "/modify")
  }

  return (
    <div>
      <Header isStaff={isStaff} setIsStaff={setIsStaff} />
      <Divider sx={{ width: '90%', marginLeft: "5%" }}>
        <h1>Buslinienübersicht</h1>
        {isStaff &&
          <Button variant="outlined" onClick={newBusLine} sx={{ marginBottom: 4 }}>
            Neue Buslinie anlegen
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
              {busLines.map((line) => (
                <TableRow key={line.name} className='tablerow' hover onClick={() => showDetails(line.id)} sx={{ cursor: "pointer" }} >
                  <TableCell>{line.id}</TableCell>
                  <TableCell >{line.name}</TableCell>
                  {isStaff &&
                    <TableCell><Button variant="outlined" onClick={(event) => { event.stopPropagation(); modifyStops(line.id) }} >Bearbeiten</Button></TableCell>
                  }
                  {isStaff &&
                    <TableCell><Button variant="outlined" onClick={(event) => { event.stopPropagation(); editBusLine(line) }} >Umbenennen</Button></TableCell>
                  }
                  {isStaff &&
                    <TableCell><Button onClick={(event) => { event.stopPropagation(); deleteBusLine(line) }}>Löschen</Button></TableCell>
                  }
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <CreateBusLine open={showDialog} name={editedBusLine?.name} handleClose={() => closeDialog()} renameLine={renameLine} createNewLine={createLine}></CreateBusLine>
        <DeleteBusLine open={deleteBusLineDialog} name={editedBusLine?.name} handleClose={() => closeDialog()} confirmDeletion={() => confirmDeletion()}></DeleteBusLine>
      </Paper>
    </div>
  );
}