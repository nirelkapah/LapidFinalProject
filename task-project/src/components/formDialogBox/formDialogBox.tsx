import React from 'react'
import './formDialogBox.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { selectOpenFormDialogBox } from '../../redux/web/webSelectors';
import { closeFormDialogBox, openFormDialogBox } from '../../redux/web/webSlice'


const FormDialogBox = () => {

    const openFormState = useSelector(selectOpenFormDialogBox);
    const dispatch = useDispatch()

    const handleClickOpen = () => {
      dispatch(openFormDialogBox());

    };

    const handleClose = () => {
      dispatch(closeFormDialogBox());   
 
    };

    return (
      <div>
        <Dialog open={openFormState} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

export default FormDialogBox;