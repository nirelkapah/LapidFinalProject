import React, { useEffect } from 'react'
import './readDialogBox.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useDispatch, useSelector } from 'react-redux';
import { selectOpenAlertDialogBox, selectOpenReadDialogBox } from '../../../redux/web/webSelectors';
import { closeAlertDialogBox, closeReadDialogBox, openAlertDialogBox, updateErrorAlertMessage, updateSuccessAlertMessage } from '../../../redux/web/webSlice'
import { selectCurrentTask, selectTaskToDeleteId, selectTaskToDeleteTitle } from '../../../redux/tasks/tasksSelectors';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_TASK } from '../../../graphql/tasksQuery';
import { deleteTaskFromArray } from '../../../redux/tasks/tasksSlice';
import {Task} from '../../../model/task'
import dayjs from 'dayjs';


const ReadDialogBox = () => {

    const dispatch = useDispatch();
    const readDialogBoxIsOpen = useSelector(selectOpenReadDialogBox);
    const task = useSelector(selectCurrentTask);


    useEffect(() => {
     
      
    }, [readDialogBoxIsOpen])

    const handleClose = () => {
      dispatch(closeReadDialogBox())
    }


    return (
      <div>
      {task &&
      <Dialog className='taskContainer'
          open={readDialogBoxIsOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          
        >
            <DialogContent>
            <h3>{task.title}</h3>
            <DialogContentText>
              
            </DialogContentText>
            <DialogContentText className='description'>
              Description: {task.description}
            </DialogContentText>
            <DialogContentText>
              Estimated Time: {task.estimatedTime} Hours
            </DialogContentText>
            <DialogContentText>
              Status: {task.status}
            </DialogContentText>
            <DialogContentText>
              Priority: {task.priority}
            </DialogContentText>
            
            {task.untilDate &&
              <DialogContentText>
              Until: {dayjs.utc(task.untilDate).format('MMMM D, YYYY')}
            </DialogContentText>
            }

            {task.review &&
            <DialogContentText>
              Review: {task.review}
            </DialogContentText>
            }

            {task.review &&
            <DialogContentText>
              Time Spent: {task.timeSpent} Hours
            </DialogContentText>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className='closeIcon'>Close</Button>
          </DialogActions>
        </Dialog>}
        </div>
    );
  };

export default ReadDialogBox;