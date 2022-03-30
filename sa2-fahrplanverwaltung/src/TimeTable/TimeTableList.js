import Header from "../layout/Header";
import apiService from "../api/ApiService";
import { useState, useEffect } from 'react';
import { Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import DeleteTimeTable from "./DeleteTimeTable"
import EditTimeTable from "./EditTimeTable";
import moment from "moment";
import { Navigate } from "react-router-dom";
import CreateTimeTable from "./CreateTimeTable";
import { useSnackbar } from "notistack";

export default function TimeTableList({isStaff,setIsStaff}){

    const [schedules, setSchedules] = useState([]);
    const [createDialog, setCreateDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [editedSchedule, setEditedSchedule] = useState(undefined);

    useEffect(() => apiService().apiGetAllSchedules().then((result) => setSchedules(result)), []);

    const columns = [
        { id: 'id', label: 'ID', minWidth: 10 },
        { id: 'lastStop', label: 'Endhaltestelle', minWidth: 100 },
        { id: 'line', label: 'Buslinie', minWidth: 100 },
        { id: 'startTime', label: 'Startzeit', minWidth: 40 },
        { id: 'edit', label: 'Bearbeiten', minWidth: 40 },
        { id: 'delete', label: 'Löschen', minWidth: 40 }        
    ]

    const { enqueueSnackbar } = useSnackbar();

    function deleteSchedule(schedule){
        setEditedSchedule(schedule);
        setDeleteDialog(true);
    }

    function confirmDeletion(){
      apiService().apiDeleteSchedule(editedSchedule.id)
      .catch(error => enqueueSnackbar(error.response.data, {variant: "error"}))
      .then(response => {
        apiService().apiGetAllSchedules().then(((result) => setSchedules(result)), []);
      });
      closeDialog();
    }

    function refreshSchedules() {
      apiService().apiGetAllSchedules().then(result => setSchedules(result))
    }

    function editSchedule(schedule){
      setEditedSchedule(schedule);
      setEditDialog(true);
  }

  function createSchedule(){
    setCreateDialog(true);
}

  function closeDialog(){
    setEditDialog(false);
    setDeleteDialog(false);
    setEditedSchedule(undefined);
  }

  if(!isStaff){
    return (
      <Navigate to="/timetable" />
    );
  }

    return(
        <div>
            <Header isStaff={isStaff} setIsStaff={setIsStaff}/>
            <Divider sx={{ width: '90%', marginLeft: "5%"}}>
            <h1>Fahrplanverwaltung</h1>
        <Button variant="outlined" onClick={(event) => createSchedule()} sx={{ marginBottom: 4}}>
        Neuen Fahrplan anlegen
      </Button>
      </Divider>
        <Paper sx={{ width: '90%', overflow: 'hidden', marginLeft: "5%"}}>
          
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
              schedules.map((schedule) => (
                <TableRow key={schedule.id} className='tablerow'>
                  <TableCell>{schedule.id}</TableCell>
                  <TableCell>{schedule.finalStop.name}</TableCell>
                  <TableCell>{schedule.line.name}</TableCell>
                  <TableCell>{schedule.startTime}</TableCell>
                  <TableCell><Button onClick={(event) => editSchedule(schedule)}>Bearbeiten</Button></TableCell>
                  <TableCell><Button onClick={(event) => deleteSchedule(schedule)}>Löschen</Button></TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteTimeTable open={deleteDialog} id={editedSchedule?.id} handleClose={() => closeDialog()} confirmDeletion={() => confirmDeletion()}/>
      <EditTimeTable 
          open={editDialog} 
          schedule={editedSchedule} 
          handleClose={() => setEditDialog(false)} 
          onSuccess={refreshSchedules}
        />
        <CreateTimeTable
          open={createDialog}
          handleClose={() => setCreateDialog(false)}
          onSuccess={refreshSchedules}
        />

    </Paper>
        </div>
    );
}