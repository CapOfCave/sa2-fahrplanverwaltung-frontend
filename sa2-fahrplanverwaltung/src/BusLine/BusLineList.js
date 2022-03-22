import apiService from "../api/ApiService";
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CreateBusLine from "./CreateBusLine";
import { Button } from "@mui/material";
import Header from "../layout/Header";
import DeleteBusLine from "./DeleteBusLine";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: 'id', label: 'ID', minWidth: 5 },
  { id: 'name', label: 'Name', minWidth: 250 },
];
export default function BusLineOverview({ isStaff, setIsStaff }) {

  if (isStaff && columns.length < 3) {
    columns.push(
      { id: 'modify', label: 'Haltestellen Bearbeiten', minWidth: 10 },
      { id: 'rename', label: 'Umbennenen', minWidth: 10 },
      { id: 'delete', label: 'Löschen', minWidth: 10 },
    )

  }
  if (!isStaff && columns.length > 3) {
    columns.splice(2, 3)
  }

  const [busLines, setBusLines] = useState([]);
  useEffect(() => apiService().apiGetAllBusLines().then((result) => setBusLines(result)), []);

  const [editedBusLine, setEditedBusLine] = useState(undefined);
  const [showDialog, setShowDialog] = useState(false);
  const [deleteBusLineDialog, setDeleteBusLineDialog] = useState(false);

  function newBusLine() {
    setShowDialog(true);
  }

  function closeDialog() {
    setShowDialog(false);
    setDeleteBusLineDialog(false)
    setEditedBusLine(undefined);
  }

  function renameLine(name) {
    apiService().apiRenameBusLine(editedBusLine.id, name).then(response => {
      apiService().apiGetAllBusLines().then(((result) => setBusLines(result)), []);
    });
    closeDialog();
  }

  function createLine(name) {
    apiService().apiCreateBusLine(name).then(response => {
      apiService().apiGetAllBusLines().then(((result) => setBusLines(result)), []);
    });
    closeDialog();
  }

  function confirmDeletion() {
    apiService().apiDeleteBusLine(editedBusLine.id).then(response => {
      apiService().apiGetAllBusLines().then(((result) => setBusLines(result)), []);
    });
    closeDialog();
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Header isStaff={isStaff} setIsStaff={setIsStaff} />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                busLines.map((line) => (
                  <TableRow key={line.name} className='tablerow' >
                    <TableCell>{line.id}</TableCell>
                    <TableCell onClick={(event) => showDetails(line.id)}>{line.name}</TableCell>
                    {isStaff &&
                      <TableCell><Button variant="outlined" onClick={(event) => modifyStops(line.id)} >Bearbeiten</Button></TableCell>
                    }
                    {isStaff &&
                      <TableCell><Button variant="outlined" onClick={(event) => editBusLine(line)} >Umbenennen</Button></TableCell>
                    }
                    {isStaff &&
                      <TableCell><Button onClick={(event) => deleteBusLine(line)}>Löschen</Button></TableCell>
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
          count={busLines.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Button variant="outlined" onClick={newBusLine}>
          Neue Buslinie anlegen
        </Button>
        <CreateBusLine open={showDialog} name={editedBusLine?.name} handleClose={() => closeDialog()} renameLine={renameLine} createNewLine={createLine}></CreateBusLine>
        <DeleteBusLine open={deleteBusLineDialog} name={editedBusLine?.name} handleClose={() => closeDialog()} confirmDeletion={() => confirmDeletion()}></DeleteBusLine>
      </Paper>
    </div>
  );
}