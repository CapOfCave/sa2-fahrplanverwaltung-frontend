import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../api/ApiService";
import Header from "../layout/Header";

export default function BusLineDetail({ isStaff, setIsStaff }) {

  let { id } = useParams();
  const [busLineDetail, setBusLineDetail] = useState(null);
  useEffect(() => apiService().getBusLine(id).then((result) => setBusLineDetail(result)), []);

  return (
    <div>
      <Header isStaff={isStaff} setIsStaff={setIsStaff}></Header>
      <h1>Details zur Linie: {busLineDetail?.name}</h1>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell key={id}>ID</TableCell>
              <TableCell>Haltestelle</TableCell>
              <TableCell>Fahrtzeit zur nächsten Haltestelle (in Minuten)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              busLineDetail?.lineStops.map((stop) => (
                <TableRow key={stop.id} className='tablerow'>
                  <TableCell>{stop.id}</TableCell>
                  <TableCell>{stop.busStopName}</TableCell>
                  <TableCell>{stop.secondsToNextStop / 60}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}