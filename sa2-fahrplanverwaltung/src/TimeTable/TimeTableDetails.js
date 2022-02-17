import Header from "../layout/Header";
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";


export default function TimeTableDetails({open, line, stop, handleClose}) {

  /*return (
      <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Button
              edge="start"
              color="red"
              onClick={handleClose}
              aria-label="close"
            >
              Schließen
            </Button>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Buslinie {{line}} von Haltestelle {{stop}}:
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="16:11 Uhr" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="17:11 Uhr"
            />
          </ListItem>
        </List>
      </Dialog>
      </div>
  );*/

  return(
      <Dialog open={open}
      onClose={handleClose}>
          TimeTableDetails works!
          <Button onClick={handleClose}></Button>
      </Dialog>
  );
}