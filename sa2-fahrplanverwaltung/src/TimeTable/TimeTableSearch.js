import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Autocomplete, Button, Divider, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../layout/Header";
import apiService from '../api/ApiService';
import TimeTableSearchResult from './TimeTableSearchResult';
import moment from 'moment';
import 'moment/locale/de';

export default function TimeTableSearch({ isStaff, setIsStaff }) {
    const [stop, setStop] = useState(undefined);
    const [dateValue, setDateValue] = useState(moment());
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
            <Divider sx={{ width: '90%', marginLeft: "5%"}}>
            <h1>Fahrplanauskunft</h1>
            </Divider>
            <Paper sx={{ width: '90%', marginLeft: "5%"}}>
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
                <LocalizationProvider dateAdapter={AdapterMoment} locale="de">
                    <DateTimePicker
                        label="Startzeit"
                        mask="__.__.____ __:__"
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
                    error={timespan === 0}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleTimespanChange}
                />
                <Button 
                variant="outlined" 
                onClick={(event) => setShowResult(true)} 
                disabled={!stop}>Suchen</Button>
                {showResult &&
                    <TimeTableSearchResult 
                    stop={stop} 
                    time={moment(dateValue).format()} 
                    timespan={timespan} />
                }
            </form>
            </Paper>
        </div>
    );
}