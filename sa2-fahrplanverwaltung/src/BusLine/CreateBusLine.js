import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export default function CreateBusLine({open, name, handleClose, renameLine, createNewLine}) {

  const [textFieldValue, setTextFieldValue] = useState('');

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{name ? `Buslinie ${name} umbenennen` : `Neue Buslinie`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bitte geben Sie einen Namen für die Buslinie ein.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Buslinie"
            fullWidth
            variant="standard"
            onChange={(event) => {setTextFieldValue(event.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          <Button onClick={name ? () => renameLine(textFieldValue) : () => createNewLine(textFieldValue)}>Bestätigen</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
