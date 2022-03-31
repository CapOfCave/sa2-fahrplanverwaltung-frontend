import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import apiService from '../api/ApiService';
import Autocomplete from '@mui/material/Autocomplete'
import { useState } from 'react';
import { useSnackbar } from 'notistack';

export default function AddBusLineStop({ open, onSuccess, lineId, targetIndex, handleClose, allBusStops }) {


  const [selectedBusStop, setSelectedBusStop] = useState('');
  const [minutes, setMinutes] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  function addLineStop() {
    apiService()
      .apiAddLineStop(lineId, selectedBusStop.id, minutes && minutes * 60, targetIndex)
      .then(onSuccess)
      .then(handleClose)
      .catch(error => enqueueSnackbar(error.response.data, { variant: "error" }));
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          Bushaltestelle hinzufügen
        </DialogTitle>
        <DialogContent>

          <Autocomplete
            options={allBusStops.map(busStop => ({ ...busStop, label: busStop.name }))}
            fullWidth
            sx={{ mt: 2 }}
            renderInput={(params) => <TextField {...params} label="Bushaltestelle" />}
            onChange={(_event, newInputValue) => setSelectedBusStop(newInputValue)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
          <TextField
            label="Minuten bis zum nächsten Stop"
            type="number"
            fullWidth
            sx={{ mt: 2 }}
            variant="outlined"
            onChange={(event) => { setMinutes(event.target.value) }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          <Button onClick={addLineStop}>
            Hinzufügen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
