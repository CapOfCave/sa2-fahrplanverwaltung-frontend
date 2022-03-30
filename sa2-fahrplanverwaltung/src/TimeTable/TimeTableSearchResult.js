import apiService from "../api/ApiService";
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";

export default function TimeTableSearchResult({stop, time, timespan}){

    const [scheduleEntries, setScheduleEntries] = useState([]);

    useEffect(() => {if(stop){apiService().apiSearchTimetables(stop?.id, time, timespan).then((result) => setScheduleEntries(result.scheduleEntries))}}, [stop, time, timespan]);

    const columns = [
        { id: 'id', label: 'ID', minWidth: 20 },
        { id: 'line', label: 'Buslinie', minWidth: 170 },
        { id: 'arrivalTime', label: 'Ankunftszeit', minWidth: 170 }, 
        { id: 'lastStop', label: 'Endhaltestelle', minWidth: 170 },  
    ]

    function formatDate(dateString){
      const date = new Date(dateString);
      var minutes = "00";
      if(date.getMinutes()<10 && date.getMinutes()!=0){
        const temp = date.getMinutes() * 10;
        minutes = temp;
      }
      else{
        minutes = date.getMinutes();
      }
      console.log(moment(date).format("DD.MM.YYYY HH:mm"));
      const text = "" + date.getDay() +"."+date.getMonth()+"."+date.getFullYear()+ ", "+date.getHours()+":"+minutes;
      return text;
    };

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
              scheduleEntries?.map((scheduleEntries) => (
                <TableRow key={[scheduleEntries?.schedule.id, scheduleEntries?.arrival]} className='tablerow'>
                  <TableCell>{scheduleEntries?.schedule.id}</TableCell>
                  <TableCell>{scheduleEntries?.schedule.line.name}</TableCell>
                  <TableCell>{moment(scheduleEntries?.arrival).format("DD.MM.YYYY HH:mm")}</TableCell>
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