import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { apiSearchTimetables } from "../api/ApiService";

export default function TimeTableSearchResult({ stop, time, timespan }) {

  const [scheduleEntries, setScheduleEntries] = useState([]);

  useEffect(() => {
    if (stop && time.isValid()) {
      apiSearchTimetables(stop?.id, time.format(), timespan).then(result =>
        setScheduleEntries(result?.scheduleEntries))
    }
  }, [stop, time, timespan]);

  const columns = [
    { id: 'line', label: 'Buslinie', minWidth: 170 },
    { id: 'arrivalTime', label: 'Ankunftszeit', minWidth: 170 },
    { id: 'lastStop', label: 'Endhaltestelle', minWidth: 170 },
  ]

  let navigate = useNavigate();
  function showBusLineDetails(lineId) {
    navigate("/buslines/" + lineId);
  }

  return (
    <div>
      <TableContainer sx={{ marginTop: 4 }}>
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
                <TableRow
                  key={[scheduleEntries?.schedule.id, scheduleEntries?.arrival]}
                  className='tablerow'
                  hover
                  onClick={(event) => showBusLineDetails(scheduleEntries?.schedule?.line?.id)}
                  sx={{ cursor: "pointer" }}>
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