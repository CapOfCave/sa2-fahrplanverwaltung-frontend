import { useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import BusStopList from "./BusStop/BusStopList";
import TimeTableList from "./TimeTable/TimeTableList";

export default function AppRouter() {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/busstops" element={<BusStopList/>}/>
                <Route path="/timetables/manage" element={<TimeTableList/>} />
                <Route path="*" element={<BusStopList/>} />
            </Routes></BrowserRouter></>
}