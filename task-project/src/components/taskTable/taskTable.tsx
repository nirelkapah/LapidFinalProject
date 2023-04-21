import './taskTable.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Task} from '../../model/task'

interface Props {
  data: [Task];
}

const TaskTable: React.FC<Props> = ({data}) => {
  console.log(data)

      return (
        <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className='tableCell'>Type</TableCell>
                <TableCell className='tableCell'>Priority</TableCell>
                <TableCell className='tableCell'>Title</TableCell>
                <TableCell className='tableCell'>Description</TableCell>
                <TableCell className='tableCell'>Status</TableCell>
                <TableCell className='tableCell'>Estimated Time</TableCell>
                <TableCell className='tableCell'>Until Date</TableCell>
                <TableCell className='tableCell'>Review</TableCell>
                <TableCell className='tableCell'>Time Spent</TableCell>
                <TableCell className='tableCell'>Actions</TableCell>
    
    
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((task: Task) => (
                <TableRow
                  key={task.id}
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
                  <TableCell align="center">Here will be actions</TableCell>
    
    
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
        );
  };
  


export default TaskTable;