import apiService from "../api/ApiService";
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function TimeTableSearchResult({stop, time}){

    const [scheduleEntries, setScheduleEntries] = useState([]);
    useEffect(() => apiService().apiSearchTimetables(stop.id, time).then((result) => setScheduleEntries(result.scheduleEntries)), [stop.id, time]);

    const columns = [
        { id: 'id', label: 'ID', minWidth: 20 },
        { id: 'line', label: 'Buslinie', minWidth: 170 },
        { id: 'arrivalTime', label: 'Ankunftszeit', minWidth: 170 }, 
        { id: 'lastStop', label: 'Endhaltestelle', minWidth: 170 },  
    ]

    return(
        <div>      
      <TableContainer sx={{ maxHeight: 440, marginTop: 3 }}>
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
              scheduleEntries.map((scheduleEntries) => (
                <TableRow key={scheduleEntries?.schedule.id} className='tablerow'>
                  <TableCell>{scheduleEntries?.schedule.id}</TableCell>
                  <TableCell>{scheduleEntries?.schedule.line.name}</TableCell>
                  <TableCell>{Date(scheduleEntries?.arrival)}</TableCell>
                  <TableCell>{scheduleEntries?.schedule.finalStop.name}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
        </div>
    );
}