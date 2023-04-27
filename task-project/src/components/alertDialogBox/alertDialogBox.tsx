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
import { selectTaskToDelete } from '../../redux/tasks/tasksSelectors';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_TASK } from '../../graphql/tasksQuery';
import { deleteTaskFromArray } from '../../redux/tasks/tasksSlice';


const AlertDialogBox = () => {

    const openDialogBoxState = useSelector(selectOpenAlertDialogBox);
    const taskToDeleteId = useSelector(selectTaskToDelete);
    const dispatch = useDispatch()


    const onClickYes = () => {
      deleteTask();
    };

    const handleClose = () => {
      dispatch(closeAlertDialogBox());   

    }

    const deleteTask = async () => {

      try{
        await deleteTaskMutation();
        dispatch(deleteTaskFromArray(taskToDeleteId))
        handleClose();
      }
      catch{
        console.log('Catched')
      }
    }

    const [deleteTaskMutation] = useMutation(DELETE_TASK, {
      variables: {
        id: taskToDeleteId
      },
    });


    return (
      <div>
        <Dialog
          open={openDialogBoxState}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle id="alert-dialog-title">
            {"Hi"}
          </DialogTitle> */}
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are You Sure You Would Like To Delete This Task?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={onClickYes} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        </div>
    );
  };

export default AlertDialogBox;