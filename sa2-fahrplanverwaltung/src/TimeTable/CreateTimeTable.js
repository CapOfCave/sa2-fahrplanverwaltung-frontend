import { TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import deLocale from 'date-fns/locale/de';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Autocomplete, Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useEffect, useState } from 'react';
import apiService from '../api/ApiService';
import moment from "moment";
import { useSnackbar } from 'notistack';

export default function CreateTimeTable({ open, handleClose, onSuccess }) {

  const [lines, setLines] = useState([]);
  useEffect(() => apiService().apiGetAllBusLines().then((result) => setLines(result)), []);
  const [finalStopOptions, setFinalStopOptions] = useState([]);

  // form elements
  const [selectedLine, setSelectedLine] = useState(null);
  const [time, setTime] = useState(null);
  const [selectedFinalStop, setSelectedFinalStop] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  // when a line is selected, set available final stops
  useEffect(() => {
    if (!selectedLine) {
      setFinalStopOptions([])
      return;
    }
    apiService().getBusLine(selectedLine.id)
      .then(lineDetail => lineDetail.lineStops)
      .then(lineStops => {
        const newFinalStops = [
          {
            label: lineStops[lineStops.length - 1].busStopName,
            reverseDirection: false
          },
          {
            label: lineStops[0].busStopName,
            reverseDirection: true,
          }
        ]
        setFinalStopOptions(newFinalStops);
        setSelectedFinalStop(newFinalStops[0]);
      })
  }, [selectedLine]);

  // reset form when closed
  useEffect(() => {
    if (open) return
    setSelectedLine(null);
    setTime(null);
    setSelectedFinalStop(null);
  }, [open])

  const handleLineChange = (e, newValue) => {
    setSelectedLine(newValue);
  };

  const handleTimeChange = (newValue) => {
    setTime(newValue);
  };

  const handleFinalStopChange = (e, newValue) => {
    setSelectedFinalStop(newValue);
  }

  const saveSchedule = () => {
    apiService().apiCreateSchedule(selectedLine.id, moment(new Date(time).toISOString()).format("HH:mm"), selectedFinalStop.reverseDirection)
    .catch(error => enqueueSnackbar(error.response.data, {variant: "error"}))  
    .then(response => {
        onSuccess();
        handleClose();
      });
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="createtimetable-dialog-title"
    >
      <DialogTitle id="createtimetable-dialog-title">
        Neuen Fahrplan anlegen
      </DialogTitle>
      <DialogContent sx={{ minWidth: '20rem' }}>
        <Autocomplete
          options={lines}
          value={selectedLine}
          getOptionLabel={option => option.name}
          onChange={handleLineChange}
          sx={{ mb: 2, mt: 1 }}
          renderInput={(params) => <TextField {...params} fullWidth label="Buslinie" />}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={deLocale}>
          <TimePicker
            label="Startzeit"
            value={time}
            onChange={handleTimeChange}
            sx={{ my: 2 }}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
        <Autocomplete
          options={finalStopOptions}
          disabled={finalStopOptions.length === 0}
          value={selectedFinalStop}
          onChange={handleFinalStopChange}
          sx={{ mt: 2 }}
          renderInput={(params) => <TextField fullWidth {...params} label="Endhaltestelle" />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>Abbrechen</Button>
        <Button onClick={saveSchedule} disabled={selectedLine === null || time === null || selectedFinalStop === null}>
          Speichern
        </Button>
      </DialogActions>
    </Dialog>
  );
}
