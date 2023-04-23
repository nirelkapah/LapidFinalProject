import React from 'react'
import './actionsBar.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { openFormDialogBox } from '../../redux/web/webSlice'

const ActionsBar = () => {
  const dispatch = useDispatch()

  const onClickOpenForm = () => {
    dispatch(openFormDialogBox());
    
  };
    
    return (
    <div className='actionsBarContainer'>
        <Button variant="outlined" onClick={onClickOpenForm}>
        Add Task &nbsp;
        <AddBoxIcon />
        </Button>
        &nbsp;&nbsp;
        Quick Filters:
        &nbsp;&nbsp;
        <Button variant="outlined">
        Only Open
        </Button>
        &nbsp;&nbsp;
        <Button variant="outlined">
        Only Tasks
        </Button>
    </div>
    );
  };

export default ActionsBar;