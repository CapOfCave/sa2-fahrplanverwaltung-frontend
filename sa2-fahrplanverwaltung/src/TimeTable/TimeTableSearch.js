import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Autocomplete, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import TimeTableAllLines from "./TimeTableAllLines";
import TimeTableDetails from "./TimeTableDetails";
import apiService from '../api/ApiService';
import TimeTableSearchResult from './TimeTableSearchResult';

export default function TimeTableSearch() {
    const [stop, setStop] = useState(undefined);
    const [dateValue, setDateValue] = useState(Date());
    const [stops, setStops] = useState([]);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => apiService().apiGetAllBusStops().then((result) => setStops(result)), []);
    

    const handleDateChange = (newValue) => {
        setDateValue(newValue);
    };

    const handleStopChange = (e, newValue) => {
        setStop(newValue);
    };

    return (
        <div>
            <Header />
            <p>TimeTableSearch</p>
            <form>
                <Autocomplete
                    disablePortal
                    id="combo-box-stops"
                    options={stops}
                    getOptionLabel={(option) => (option ? option.name : "")}
                    onChange={handleStopChange}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Haltestelle" />}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label="Startzeit"
                        value={dateValue}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <Button variant="outlined" onClick={(event) => setShowResult(true)}>Suchen</Button>
                { showResult &&
                <TimeTableSearchResult stop={stop} time={new Date(dateValue).toISOString()}/>
                }
            </form>
        </div>
    );
}