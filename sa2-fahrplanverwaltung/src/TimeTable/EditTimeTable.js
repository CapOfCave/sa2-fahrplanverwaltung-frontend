import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import apiService from '../api/ApiService';
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/lab';
import { useState } from 'react';
import { Autocomplete } from '@mui/material';
import { useEffect } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

export default function EditTimeTable({ open, schedule, handleClose, saveSchedule, line, setLine, time, setTime, setReverseDirection }) {

  const [lines, setLines] = useState([]);

  useEffect(() => apiService().apiGetAllBusLines().then((result) => setLines(result)), []);

  const [finalStops, setFinalStops] = useState(null);
  const [selectedFinalStop, setSelectedFinalStop] = useState(null);

  useEffect(() => {
    if (!line) {
      return;
    }
    apiService().getBusLine(line.id)
      .then(lineDetail => lineDetail.lineStops)
      .then(lineStops => {
        setFinalStops([
          lineStops[lineStops.length - 1],
          lineStops[0],
        ]);
        setSelectedFinalStop(lineStops[0]);
      })
  }, [line])


  const handleLineChange = (e, newValue) => {
    setLine(newValue);
  };

  const handleTimeChange = (newValue) => {
    setTime(newValue);
  };

  const handleFinalStopChange = (e, newValue) => {
    setSelectedFinalStop(newValue);
    if (newValue === finalStops[1]) {
      setReverseDirection(true);
    } else {
      setReverseDirection(false)
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {schedule &&
          <DialogTitle id="alert-dialog-title">
            {`Fahrplan (ID:${schedule.id}) bearbeiten`}
          </DialogTitle>
        }
        {!schedule &&
          <DialogTitle id="alert-dialog-title">
            {`Neuen Fahrplan anlegen`}
          </DialogTitle>
        }
        <DialogContent sx={{ width: 300, display: 'flex', flexDirection: 'column', justifyContent: "space-between" }}>
          {!schedule &&
            <Autocomplete
              id="combo-box-lines"
              options={lines}
              getOptionLabel={(option) => (option ? option.name : "")}
              onChange={handleLineChange}
              sx={{ width: 300, marginTop: 2, marginBottom: 3 }}
              renderInput={(params) => <TextField {...params} label="Buslinie" />}
            />
          }
          {schedule &&
            <TextField
              id="buslinie-read-only-input"
              label="Buslinie"
              defaultValue={schedule.line.name}
              InputProps={{
                readOnly: true,
              }}
              sx={{ width: 300, marginTop: 2, marginBottom: 3 }}
            />
          }
          <LocalizationProvider dateAdapter={AdapterDateFns} >
            <TimePicker
              label="Startzeit"
              value={time}
              onChange={handleTimeChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Autocomplete
            id="combo-box-final-stops"
            options={finalStops ?? []}
            getOptionLabel={stop => stop.busStopName}
            value={selectedFinalStop}
            onChange={handleFinalStopChange}
            sx={{ width: 300, marginTop: 2, marginBottom: 3 }}
            renderInput={(params) => <TextField {...params} label="Endhaltestelle" />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Abbrechen</Button>
          <Button onClick={saveSchedule}>
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
