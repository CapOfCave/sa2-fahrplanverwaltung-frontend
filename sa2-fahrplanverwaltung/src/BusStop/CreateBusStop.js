import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export default function CreateBusStop({open, name, handleClose, renameStop, createNewStop}) {

  const [textFieldValue, setTextFieldValue] = useState('');

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
            fullWidth
            variant="standard"
            onChange={(event) => {setTextFieldValue(event.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          <Button onClick={name ? () => renameStop(textFieldValue) : () => createNewStop(textFieldValue)}>Bestätigen</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
