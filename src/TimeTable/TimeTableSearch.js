import AdapterMoment from '@mui/lab/AdapterMoment';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Autocomplete, Box, Button, Container, Divider, TextField } from "@mui/material";
import moment from 'moment';
import 'moment/locale/de';
import { useEffect, useState } from "react";
import { apiGetAllBusStops } from '../api/ApiService';
import Header from "../layout/Header";
import TimeTableSearchResult from './TimeTableSearchResult';

export default function TimeTableSearch({ isStaff, setIsStaff }) {
    const [stop, setStop] = useState(undefined);
    const [dateValue, setDateValue] = useState(moment());
    const [stops, setStops] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [timespan, setTimespan] = useState(0.5);

    useEffect(() => apiGetAllBusStops().then((result) => setStops(result)), []);


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
            <Divider sx={{ width: '90%', marginLeft: "5%" }}>
                <h1>Fahrplanauskunft</h1>
            </Divider>
            <Container maxWidth="xl">
                <form>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '1.5rem', mb: '2rem' }}>
                        <Autocomplete
                            disablePortal
                            disableClearable
                            options={stops}
                            getOptionLabel={(option) => (option ? option.name : "")}
                            onChange={handleStopChange}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Haltestelle" />}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                        />
                        <LocalizationProvider dateAdapter={AdapterMoment} locale="de">
                            <DateTimePicker
                                label="Startzeit"
                                mask="__.__.____ __:__"
                                value={dateValue}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} sx={{ width: 300, mr: '3rem' }} />}
                                sx={{ width: 300, marginBottom: 3, mr: '3rem' }}
                            />
                        </LocalizationProvider>
                        <TextField
                            id="outlined-number"
                            label="Zeitspanne in h"
                            type="number"
                            value={timespan}
                            error={timespan <= 0}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleTimespanChange}
                        />
                        <Box>
                            <Button
                                sx={{ width: 150 }}
                                variant="contained"
                                onClick={(event) => setShowResult(true)}
                                disabled={!stop || timespan <= 0 || !dateValue.isValid() }>Suchen</Button>
                        </Box>

                    </Box>
                </form>
                <Divider sx={{ mb: '4rem' }} />
                {showResult &&
                    <TimeTableSearchResult
                        stop={stop}
                        time={dateValue}
                        timespan={timespan} />
                }

            </Container>

        </div>
    );
}