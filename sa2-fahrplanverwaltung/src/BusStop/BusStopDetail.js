import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../api/ApiService";
import Header from "../layout/Header";

export default function BusStopDetail({isStaff,setIsStaff}){

    let {id} = useParams();
    const [busStopDetail, setBusStopDetail] = useState(null);
    useEffect(() => apiService().getBusStop(id).then((result) => setBusStopDetail(result)), []);

    return (
        <div>
            <Header isStaff={isStaff} setIsStaff={setIsStaff}></Header>
        <p>BusStopDetail! zu {id} </p>
        <h1>{id} {busStopDetail?.name}</h1>      
      <TableContainer sx={{ maxHeight: 440 }}>
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
                <TableRow key={line.id} className='tablerow'>
                  <TableCell>{line.id}</TableCell>
                  <TableCell>{line.name}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    );
}