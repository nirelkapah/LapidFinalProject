import React from 'react'
import './actionsBar.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { openFormDialogBox } from '../../redux/web/webSlice'
import { toggleFilterByOpenStatus , toggleFilterByPriority } from '../../redux/tasks/tasksSlice';
import { selectFilterByOpenStatus, selectFilterByTopPriority } from '../../redux/tasks/tasksSelectors';
// import { filterTaskByOpen, filterTasksByTop } from '../../redux/tasks/tasksSlice';

const ActionsBar = () => {
  const dispatch = useDispatch()
  const topPriorityFilterPressed = useSelector(selectFilterByTopPriority)
  const openFilterPressed = useSelector(selectFilterByOpenStatus)


  const onClickOpenForm = () => {
    dispatch(openFormDialogBox());
    
  };


  const onClickTopPriority = () => {
    if(openFilterPressed){
      dispatch(toggleFilterByOpenStatus())
    }
    dispatch(toggleFilterByPriority())
  }

  const onClickOnlyOpen = () => {
    if(topPriorityFilterPressed){
      dispatch(toggleFilterByPriority())
    }
    dispatch(toggleFilterByOpenStatus())

  }



    
    return (
    <div className='actionsBarContainer'>
        <Button variant="outlined" onClick={onClickOpenForm}>
        Add Task &nbsp;
        <AddBoxIcon />
        </Button>
        &nbsp;&nbsp;
        Quick Filters:
        &nbsp;&nbsp;
        <Button variant="outlined"  onClick={onClickTopPriority} >
        Only Top Priority
        </Button>
        &nbsp;&nbsp;
        <Button variant="outlined" onClick={onClickOnlyOpen}>
        Only Open
        </Button>
    </div>
    );
  };

export default ActionsBar;