import './taskTable.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Task} from '../../model/task';
import { useSelector, useDispatch } from 'react-redux';
import { selectTasks } from '../../redux/tasks/tasksSelectors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {openAlertDialogBox } from '../../redux/web/webSlice'


const TaskTable = () => {

      const tasksState = useSelector(selectTasks);  
      const dispatch = useDispatch()

      const onClickDeleteTask = () => {
        dispatch(openAlertDialogBox());
      };


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
                    <DeleteIcon className='icon' onClick={onClickDeleteTask}/>

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