import { Button, Dialog } from "@mui/material";

export default function TimeTableAllLines({open, handleClose}){
    return(
        <Dialog open={open}
        onClose={handleClose}>
            TimeTableAllLines works!
            <Button onClick={handleClose}></Button>
        </Dialog>
    );
}