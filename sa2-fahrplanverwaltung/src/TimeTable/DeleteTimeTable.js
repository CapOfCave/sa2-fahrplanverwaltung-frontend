import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

export default function DeleteTimeTable({open, id, handleClose, confirmDeletion}) {

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Wollen Sie diesen Fahrplan (ID:${id}) wirklich löschen?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Gelöschte Fahrpläne können nicht wiederhergestellt werden.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Abbrechen</Button>
          <Button onClick={confirmDeletion}>
            Löschen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
