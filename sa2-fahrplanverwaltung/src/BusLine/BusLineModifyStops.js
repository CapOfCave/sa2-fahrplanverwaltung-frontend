import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../api/ApiService";
import Header from "../layout/Header";
import Button from '@mui/material/Button';

export default function BusLineModifyStops({ isStaff, setIsStaff }) {

  let { id } = useParams();
  const [busLineDetail, setBusLineDetail] = useState(null);
  useEffect(() => apiService().getBusLine(id).then((result) => setBusLineDetail(result)), []);

  function deleteBusStopFromLine(line) {
  }

  return (
    <div>
      <Header isStaff={isStaff} setIsStaff={setIsStaff}></Header>
      <h1>Modify zur Linie: {busLineDetail?.name}</h1>
      <Button variant="outlined" onClick={(event) => deleteBusStopFromLine()} >Haltestelle Hinzufügen</Button>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell key={id}>ID</TableCell>
              <TableCell>Haltestelle</TableCell>
              <TableCell>Haltestelle Löschen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              busLineDetail?.lineStops.map((stop) => (
                <TableRow key={stop.id} className='tablerow'>
                  <TableCell>{stop.busStopId}</TableCell>
                  <TableCell>{stop.busStopName}</TableCell>
                  <TableCell><Button variant="outlined" onClick={(event) => deleteBusStopFromLine(stop.id)} >Haltestelle Löschen</Button></TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}