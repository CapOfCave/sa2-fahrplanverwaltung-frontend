import { useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import BusLineOverview from "./BusLine/BusLineOverview";
import BusStopDetail from "./BusStop/BusStopDetail";
import BusStopList from "./BusStop/BusStopList";
import TimeTableList from "./TimeTable/TimeTableList";
import TimeTableSearch from "./TimeTable/TimeTableSearch";

export default function AppRouter() {

    const [isStaff, setIsStaff] = useState(false);
    
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/busstops" element={<BusStopList isStaff={isStaff} setIsStaff={setIsStaff} />}/>
                <Route path="/schedules" element={<TimeTableList isStaff={isStaff} setIsStaff={setIsStaff}/>} />
                <Route path="/timetable" element={<TimeTableSearch isStaff={isStaff} setIsStaff={setIsStaff}></TimeTableSearch>}/>
                <Route path="/buslines" element={<BusLineOverview isStaff={isStaff} setIsStaff={setIsStaff}></BusLineOverview>} />
                <Route path="/busstops/:id" element={<BusStopDetail isStaff={isStaff} setIsStaff={setIsStaff}/>} />
                <Route path="/busstops/:id/timetable" element={<BusStopDetail isStaff={isStaff} setIsStaff={setIsStaff}/>} />
                <Route path="*" element={<BusStopList isStaff={isStaff} setIsStaff={setIsStaff}/>} />
            </Routes></BrowserRouter></>
}