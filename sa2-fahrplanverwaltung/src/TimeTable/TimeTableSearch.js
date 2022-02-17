import { Button, TextField } from "@mui/material";
import { useState } from "react";
import Header from "../layout/Header";
import TimeTableAllLines from "./TimeTableAllLines";
import TimeTableDetails from "./TimeTableDetails";

export default function TimeTableSearch(){
const[oneLine, setOneLine] = useState(false);
const[allLines, setAllLines] = useState(false);
const line = 16;
const stop = "Abbey Road";

function closeDialog(){
    setOneLine(false);
    setAllLines(false);
}

    return(
        <div>
            <Header />
        <p>TimeTableSearch</p>
        <form>
            <TextField label="Haltestelle" variant="outlined"></TextField>
            <TextField label="Uhrzeit" variant="outlined"></TextField>
            <Button variant="outlined" onClick={(event) => setAllLines(true)}></Button>
        </form>
        <form>
            <TextField label="Haltestelle" variant="outlined"></TextField>
            <TextField label="Buslinie" variant="outlined"></TextField>
            <Button variant="outlined" onClick={(event) => setOneLine(true)}></Button>
        </form>
        <TimeTableDetails open={oneLine} line={line} stop={stop} handleClose={() => closeDialog()}></TimeTableDetails>
        <TimeTableAllLines open={allLines} handleClose={() => closeDialog()}></TimeTableAllLines>
        </div>
    );
}