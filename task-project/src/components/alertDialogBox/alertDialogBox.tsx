import React from 'react'
import './alertDialogBox.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { selectOpenAlertDialogBox } from '../../redux/web/webSelectors';
import { closeAlertDialogBox, openAlertDialogBox } from '../../redux/web/webSlice'



const AlertDialogBox = () => {

    const openFormState = useSelector(selectOpenAlertDialogBox);
    const dispatch = useDispatch()

    // const handleClickOpen = () => {
    //   dispatch(openAlertDialogBox());
      
    // };

    const handleClose = () => {
      dispatch(closeAlertDialogBox());   
 
    };

    return (
      <div>
        <Dialog
          open={openFormState}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        </div>
    );
  };

export default AlertDialogBox;