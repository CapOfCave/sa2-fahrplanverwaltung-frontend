import { useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import BusLineOverview from "./BusLine/BusLineOverview";
import BusStopList from "./BusStop/BusStopList";
import TimeTableList from "./TimeTable/TimeTableList";
import TimeTableSearch from "./TimeTable/TimeTableSearch";

export default function AppRouter() {

    const [isStaff, setIsStaff] = useState(false);
    
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/busstops" element={<BusStopList isStaff={isStaff} setIsStaff={setIsStaff} />}/>
                <Route path="/timetables/manage" element={<TimeTableList/>} />
                <Route path="/timetable" element={<TimeTableSearch></TimeTableSearch>}/>
                <Route path="/buslines" element={<BusLineOverview></BusLineOverview>} />
                <Route path="*" element={<BusStopList/>} />
            </Routes></BrowserRouter></>
}