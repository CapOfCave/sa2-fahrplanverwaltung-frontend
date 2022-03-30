import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Autocomplete, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../layout/Header";
import apiService from '../api/ApiService';
import TimeTableSearchResult from './TimeTableSearchResult';
import moment from 'moment';

export default function TimeTableSearch({isStaff, setIsStaff}) {
    const [stop, setStop] = useState(undefined);
    const [dateValue, setDateValue] = useState(Date());
    const [stops, setStops] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [timespan, setTimespan] = useState(0);

    useEffect(() => apiService().apiGetAllBusStops().then((result) => setStops(result)), []);
    

    const handleDateChange = (newValue) => {
        setDateValue(newValue);
    };

    const handleStopChange = (e, newValue) => {
        setStop(newValue);
    };

    const handleTimespanChange = (e) => {
        setTimespan(e.target.value);
    };

    return (
        <div>
            <Header isStaff={isStaff} setIsStaff={setIsStaff} />
            <h1>Fahrplanauskunft</h1>
            <form>
                <Autocomplete
                    disablePortal
                    disableClearable
                    id="combo-box-stops"
                    options={stops}
                    getOptionLabel={(option) => (option ? option.name : "")}
                    onChange={handleStopChange}
                    sx={{ width: 300, marginBottom: 3 }}
                    renderInput={(params) => <TextField {...params} label="Haltestelle" />}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label="Startzeit"
                        value={dateValue}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                        sx={{ width: 300, marginBottom: 3 }}
                    />
                </LocalizationProvider>
                <TextField
          id="outlined-number"
          label="Zeitspanne in h"
          type="number"
          value={timespan}
          error={timespan===0}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleTimespanChange}
        />
                <Button variant="outlined" onClick={(event) => setShowResult(true)} disabled={!stop}>Suchen</Button>
                { showResult &&
                <TimeTableSearchResult stop={stop} time={moment(dateValue).format()} timespan={timespan}/>
                }
            </form>
        </div>
    );
}