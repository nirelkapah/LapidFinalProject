import './taskTable.css'
import React from 'react'
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
import { selectFilterByOpenStatus, selectFilterByTopPriority, selectTasks } from '../../redux/tasks/tasksSelectors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {openAlertDialogBox, openFormDialogBox } from '../../redux/web/webSlice';
import { gql, useMutation } from '@apollo/client';
import { DELETE_TASK } from '../../graphql/tasksQuery';
import { forwardRef, useImperativeHandle } from "react";
import { updateTaskToDeleteId, updateTaskToDeleteTitle, updateTaskToEditId } from '../../redux/tasks/tasksSlice';
import { updateAlltasks } from '../../redux/tasks/tasksSlice'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import TaskIcon from '@mui/icons-material/Task';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button } from '@mui/material';



interface Props {
  tasks: Task[]
}



const TaskTable = (props: Props) => {

      const topPriorityFilterPressed = useSelector(selectFilterByTopPriority);
      const openFilterPressed = useSelector(selectFilterByOpenStatus);


      const tasksState = useSelector(selectTasks);  

      const dispatch = useDispatch()
      
      useEffect(() => {
        dispatch(updateAlltasks(props.tasks))
      }, []);

      const onClickDeleteTask = (taskId: string, taskTitle: string) => {
        console.log(taskId);
        // setTaskToDeleteId(taskId)
        dispatch(updateTaskToDeleteId(taskId));
        dispatch(updateTaskToDeleteTitle(taskTitle))
        dispatch(openAlertDialogBox());
      
      };

      const onClickEditTask = (taskId: string) => {
        dispatch(updateTaskToEditId(taskId));
        dispatch(openFormDialogBox());

      };

      const filterBy = (tasksArray: Task[]) => {

        if (openFilterPressed == true){
          return tasksArray.filter(
            (task: Task) => task.status == "Open")
        }
        if (topPriorityFilterPressed == true){
          return tasksArray.filter(
            (task: Task) => task.priority == "Top")
        }
        else{
          return tasksArray
        }

      }

      const filteredTasks = filterBy(tasksState.tasksArray)

  

      return (
        <div className='tableContainer'>
        <h5 className='ResultsCount'> There Are Currently: {filteredTasks.length} Results</h5>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" className='table'

>
            <TableHead>
              <TableRow>
                <TableCell className='hyperTableCell'>Type</TableCell>
                <TableCell className='hyperTableCell'>Priority</TableCell>
                <TableCell className='hyperTableCell'>Title</TableCell>
                <TableCell className='hyperTableCell'>Description</TableCell>
                <TableCell className='hyperTableCell'>Status</TableCell>
                <TableCell className='hyperTableCell'>Estimated Time</TableCell>
                <TableCell className='hyperTableCell'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.map((task: Task) => (
                <TableRow
                  key={task._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  className='tableRow'
                >
                  <TableCell component="th" scope="row">

                    {task.status==='Open' && 
                    <NoteAddIcon className='icon' id='openIcon'/> }

                    {task.status==='Urgent' && 
                    <PlagiarismIcon className='icon' id='urgentIcon'/>}

                    {task.status==='Closed' && 
                    <TaskIcon className='icon' id='closedIcon'/>}

                  </TableCell>
                  <TableCell align="center">

                    {task.priority ==='Top' && 
                    <KeyboardDoubleArrowUpIcon className='icon' id='priorityTop'/> }

                    {task.priority ==='Regular' && 
                    <KeyboardArrowUpIcon className='icon' id='priorityRegular'/>}

                    {task.priority ==='Minor' && 
                    <KeyboardArrowDownIcon className='icon' id='priorityMinor'/>}
                  
                  </TableCell>
                  <TableCell align="center">{task.title}</TableCell>
                  <TableCell align="center">{task.description}</TableCell>
                  <TableCell align="center">{task.status}</TableCell>
                  <TableCell align="center">{task.estimatedTime}</TableCell>
                  <TableCell align="center">

                  <Button variant="text" onClick={() =>  onClickEditTask(task._id as string)}>
                    <EditIcon className='icon'/>
                  </Button>

                  <Button variant="text" onClick={() =>  onClickDeleteTask(task._id as string, task.title as string)}>
                    <DeleteIcon className='icon'/>
                  </Button>

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