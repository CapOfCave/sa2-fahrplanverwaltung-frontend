import { Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../api/ApiService";
import Header from "../layout/Header";

export default function BusStopDetail({ isStaff, setIsStaff }) {

  let { id } = useParams();

  const [busStopDetail, setBusStopDetail] = useState(null);
  useEffect(() => apiService().getBusStop(id).then((result) => setBusStopDetail(result)), []);

  let navigate = useNavigate();
  function showStopLineSchedule(stop, line){
    navigate("/busstops/" + stop + "/schedule/" + line)
  }

  return (
    <div>
      <Header isStaff={isStaff} setIsStaff={setIsStaff}></Header>
      <Divider sx={{ width: '90%', marginLeft: "5%"}}>
      <h1>Buslinien zur Haltestelle {busStopDetail?.name}</h1>
      </Divider>
      <Paper sx={{ width: '90%', overflow: 'hidden', marginLeft: "5%" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell key={id}>ID</TableCell>
              <TableCell>Buslinie</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              busStopDetail?.lines.map((line) => (
                <TableRow key={line.id} className='tablerow' onClick={(event) => showStopLineSchedule(id, line.id)}>
                  <TableCell >{line.id}</TableCell>
                  <TableCell>{line.name}</TableCell>
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