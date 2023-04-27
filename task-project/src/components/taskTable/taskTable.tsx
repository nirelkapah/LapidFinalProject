import './taskTable.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Task} from '../../model/task';
import { useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import { selectTasks } from '../../redux/tasks/tasksSelectors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {openAlertDialogBox } from '../../redux/web/webSlice';
import { gql, useMutation } from '@apollo/client';
import { DELETE_TASK } from '../../graphql/tasksQuery';
import React from 'react'
import { forwardRef, useImperativeHandle } from "react";
import { updateTaskToDelete } from '../../redux/tasks/tasksSlice';






const TaskTable = () => {

      const [deletedTaskId, setDeletedTaskId] = React.useState('');

      const tasksState = useSelector(selectTasks);  
      const dispatch = useDispatch()

      const onClickDeleteTask = async (taskId: string) => {
        console.log(taskId);
        setDeletedTaskId(taskId)
        dispatch(updateTaskToDelete(taskId));
        dispatch(openAlertDialogBox());
      
      };

        const deleteTask = async () => {

        try{
          await deleteTaskMutation();
        }
        catch{

        }
      }

      // useEffect(() => {
      //   console.log('EFEECT Took Effect')
      //   onClickDeleteTask();

      // }, [deletedTaskId]);


      const [deleteTaskMutation, { data, loading, error }] = useMutation(DELETE_TASK, {
        variables: {
          id: deletedTaskId
        },
      });
      
      // if (data) {console.log(data)}
      // if (loading) {console.log(loading) }
      // if (error) {console.log(error.message)}
      
     
  

      return (
        <div className='tableContainer'>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" className='table'

>
            <TableHead>
              <TableRow>
                <TableCell className='hyperTableCell'>Type</TableCell>
                <TableCell className='hyperTableCell'>Priority</TableCell>
                <TableCell className='hyperTableCell'>Title</TableCell>
                <TableCell className='hyperTableCell'>Description</TableCell>
                <TableCell className='hyperTableCell' colSpan={5}>Other</TableCell>
                <TableCell className='hyperTableCell'>Actions</TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className='tableCell'>Status</TableCell>
                <TableCell className='tableCell'>Estimated Time</TableCell>
                <TableCell className='tableCell'>Until Date</TableCell>
                <TableCell className='tableCell'>Review</TableCell>
                <TableCell className='tableCell'>Time Spent</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasksState.tasksArray.map((task: Task) => (
                <TableRow
                  key={task._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Here will be icons by status
                  </TableCell>
                  <TableCell align="center">{task.priority}</TableCell>
                  <TableCell align="center">{task.title}</TableCell>
                  <TableCell align="center">{task.description}</TableCell>
                  <TableCell align="center">{task.status}</TableCell>
                  <TableCell align="center">{task.estimatedTime}</TableCell>
                  <TableCell align="center">{task.untilDate}</TableCell>
                  <TableCell align="center">{task.review}</TableCell>
                  <TableCell align="center">{task.timeSpent}</TableCell>
                  <TableCell align="center">
                    <EditIcon className='icon'/>
                    &nbsp;
                    <DeleteIcon className='icon' onClick={() =>  onClickDeleteTask(task._id as string)}/>

                  </TableCell>
    
    
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
        );
  };
  


export default TaskTable;