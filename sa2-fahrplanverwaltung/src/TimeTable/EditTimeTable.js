import { TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import deLocale from 'date-fns/locale/de';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Autocomplete } from '@mui/material';
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

export default function EditTimeTable({ open, handleClose, onSuccess, schedule }) {

  const [finalStopOptions, setFinalStopOptions] = useState([]);

  // form elements
  const [time, setTime] = useState(null);
  const [selectedFinalStop, setSelectedFinalStop] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!schedule?.line?.id) {
      setFinalStopOptions([])
      return;
    }
    apiService().getBusLine(schedule.line.id)
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
  }, [schedule?.line?.id]);

  // update form with default values when selected
  useEffect(() => {
    if (!schedule) return;
    const time = moment(schedule.startTime, "HH:mm:ss");
    setTime(time);
  }, [schedule])

  useEffect(() => {
    if (!schedule) return;
    if (finalStopOptions.length < 2) return;
    setSelectedFinalStop(schedule.reverseDirection ? finalStopOptions[1] : finalStopOptions[0]);
  }, [schedule, finalStopOptions])

  const handleTimeChange = (newValue) => {
    setTime(moment(newValue));
  };

  const handleFinalStopChange = (e, newValue) => {
    setSelectedFinalStop(newValue);
  }


  const saveSchedule = () => {   
    apiService().apiUpdateSchedule(schedule.id, time.format("HH:mm"), selectedFinalStop.reverseDirection)
    .catch(error => enqueueSnackbar(error.response.data, {variant: "error"}))
      .then(response => {
        onSuccess();
        handleClose();
      });
  }
  return (
    <Dialog
      open={Boolean(open && schedule)}
      onClose={handleClose}
      aria-labelledby="edittimetable-dialog-title"
    >
      <DialogTitle id="edittimetable-dialog-title">
        Fahrplan {schedule?.id} bearbeiten
      </DialogTitle>
      <DialogContent sx={{ minWidth: '20rem' }}>
        <TextField
          label="Buslinie"
          value={schedule?.line?.name}
          disabled
          sx={{ mb: 2, mt: 1 }}
          fullWidth
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
        <Button onClick={saveSchedule} disabled={time === null || selectedFinalStop === null}>
          Speichern
        </Button>
      </DialogActions>
    </Dialog>
  );
}
