import React, { useState , SetStateAction } from 'react'
import './table.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import mock from './mock.json'


interface TableData {

    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,

}



const TaskTable = () => {

    // const [inputText, setState] = useState("");
    
    // let onchangeInput = (inputData: string) => {

    //     setState(inputData);
    // }

    return (
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="right">Priority</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Estimated Time</TableCell>
            <TableCell align="right">Review</TableCell>
            <TableCell align="right">Actions</TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {mock.tasks.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Here will be icons by status
              </TableCell>
              <TableCell align="center">{row.priority}</TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">{row.estimatedTime}</TableCell>
              <TableCell align="center">{row.review}</TableCell>
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