import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import apiService from '../api/ApiService';
import { useState } from 'react';

export default function AddBusLineStop({ open, nameStop, nameLine, handleClose, confirmAddition }) {


  const [stopID, setStopID] = useState('');
  const [seconds, setSeconds] = useState('');


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Tragen sie die Details der hinzuzufügenden Bushaltestelle nach der Bushaltestelle ${nameStop} in der Linie ${nameLine} ein`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="stopID"
            label="Einzufügende BusStopID"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => { setStopID(event.target.value) }}
          />
          <TextField
            margin="dense"
            id="seconds"
            label="Sekunden bis zum nächsten Stop"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => { setSeconds(event.target.value) }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Abbrechen</Button>
          <Button onClick={confirmAddition}>
            Hinzufügen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
