import apiService from "../api/ApiService";
import { useState, useEffect } from 'react';
import { Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../layout/Header";

export default function BusStopLineSchedule({ isStaff, setIsStaff }) {

    let { stop, line } = useParams();

    const [result, setResult] = useState([]);
    const [scheduleEntries, setScheduleEntries] = useState([]);
    useEffect(() => apiService().apiGetBusStopLineSchedules(stop, line).then((result) => 
    {
        setResult(result);
        setScheduleEntries(result?.scheduleEntries);
    }), [stop, line]);

    const columns = [
        { id: 'lastStop', label: 'Endhaltestelle', minWidth: 170 },
        { id: 'arrivalTime', label: `Ankunftszeit an Haltestelle ${result?.busStop?.name ?? ""}`, minWidth: 170 },
    ]

    return (
        <div>
            <Header isStaff={isStaff} setIsStaff={setIsStaff} />
            <Divider sx={{ width: '90%', marginLeft: "5%"}}>
            <h1>Fahrpläne der Linie {result?.line?.name} zur Haltestelle {result?.busStop?.name}</h1>
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
                            scheduleEntries.map((scheduleEntries) => (
                                <TableRow key={scheduleEntries?.schedule.id} className='tablerow'>
                                    <TableCell>{scheduleEntries?.schedule.finalStop.name}</TableCell>
                                    <TableCell>{scheduleEntries?.arrival}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
        </div>
    );
}