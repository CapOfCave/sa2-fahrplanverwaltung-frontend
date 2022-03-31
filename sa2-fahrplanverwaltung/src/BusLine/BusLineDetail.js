import ApartmentIcon from '@mui/icons-material/Apartment';
import { Button, Container, Divider, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiService from "../api/ApiService";
import Header from "../layout/Header";

export default function BusLineDetail({ isStaff, setIsStaff }) {

  let { id } = useParams();
  const [busLineDetail, setBusLineDetail] = useState(null);
  useEffect(() => apiService().getBusLine(id).then((result) => setBusLineDetail(result)), [id]);

  return (
    <div>
      <Header isStaff={isStaff} setIsStaff={setIsStaff}></Header>
      <Container maxWidth="lg" sx={{ paddingTop: '2rem' }}>
        <Divider sx={{ width: '90%', marginLeft: "5%" }}>
          <h1>Details zur Linie: {busLineDetail?.name}</h1>
        </Divider>
        <List>
          {busLineDetail?.lineStops.map((lineStop) => (
            <ListItem sx={{ minHeight: '4rem' }} key={lineStop.id}>
              <ListItemIcon>
                <ApartmentIcon />
              </ListItemIcon>
              <ListItemText primary={lineStop.busStopName} />
              <ListItemSecondaryAction>
                <TextField
                  disabled
                  value={lineStop.secondsToNextStop / 60 ?? null}
                  label="Minuten zum nächsten Halt"
                  size="small"
                  sx={{ width: '15rem' }}
                  variant="outlined"
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        {isStaff &&
          <Button variant="contained" component={Link} to={`/buslines/${id}/modify`}>
            Bearbeiten
          </Button>}
      </Container>

    </div>
  );
}