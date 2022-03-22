import Header from "../layout/Header";
import apiService from "../api/ApiService";
import { useState, useEffect } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import DeleteTimeTable from "./DeleteTimeTable"
import EditTimeTable from "./EditTimeTable";
import moment from "moment";
import { Navigate } from "react-router-dom";
import CreateTimeTable from "./CreateTimeTable";

export default function TimeTableList({isStaff,setIsStaff}){

    const [schedules, setSchedules] = useState([]);
    const [createDialog, setCreateDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [editedSchedule, setEditedSchedule] = useState(undefined);

    useEffect(() => apiService().apiGetAllSchedules().then((result) => setSchedules(result)), []);

    const columns = [
        { id: 'id', label: 'ID', minWidth: 20 },
        { id: 'lastStop', label: 'Endhaltestelle', minWidth: 170 },
        { id: 'line', label: 'Buslinie', minWidth: 170 },
        { id: 'startTime', label: 'Startzeit', minWidth: 170 },
        { id: 'edit', label: 'Bearbeiten', minWidth: 100 },
        { id: 'delete', label: 'Löschen', minWidth: 100 }        
    ]

    function deleteSchedule(schedule){
        setEditedSchedule(schedule);
        setDeleteDialog(true);
    }

    function confirmDeletion(){
      apiService().apiDeleteSchedule(editedSchedule.id).then(response => {
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
      <Button variant="outlined" onClick={(event) => createSchedule()}>
        Neuen Fahrplan anlegen
      </Button>
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