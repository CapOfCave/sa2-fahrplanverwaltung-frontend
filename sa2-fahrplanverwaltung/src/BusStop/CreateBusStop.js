import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateBusStop({open, name, handleClose}) {

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{name ? `Haltestelle ${name} umbenennen` : `Neue Haltestelle`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bitte geben Sie einen Namen für die Haltestelle ein.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Bushaltestelle"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          <Button onClick={handleClose}>Bestätigen</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
