import Button from "@mui/material/Button";
import { useDispatch, useSelector} from "react-redux";
import {
  updateStatusFilter,
  updatePriorityFilter,
  removePriorityFilter,
  removeStatusFilter
} from "../../redux/tasks/tasksSlice";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Filters } from "../../model/filters";
import { selectFilters } from "../../redux/tasks/tasksSelectors";

const ActionsBar = () => {

  const dispatch = useDispatch();
  // const [isTopPriorityButtonPressed, setTopPriorityButton] = useState<boolean>(false);
  // const [isOnlyOpenButtonPressed, setOnlyOpenButton] = useState<boolean>(false);
  const filters: Filters = useSelector(selectFilters);


  const onClickTopPriority = () => {
    // setTopPriorityButton(!filters.priority.includes('Top'));
    !filters.priority.includes('Top') ? 
    dispatch(updatePriorityFilter('Top'))
    :
    dispatch(removePriorityFilter('Top'))
  };

  const onClickOnlyOpen = () => {
    // setOnlyOpenButton(!isOnlyOpenButtonPressed);
    !filters.status.includes('Open') ? 
    dispatch(updateStatusFilter('Open'))
    :
    dispatch(removeStatusFilter('Open'))
  };

  const buttonStyle = {
    margin: '5px', 
    borderColor: 'white',  
    ":hover": {borderColor: 'white', backgroundColor: 'purple'}
  }

  return (
    <Grid sx={{justifyContent: 'center' , alignItems: 'center'}} container className="animate__animated animate__fadeInUp" m={1}>

        <Typography fontWeight={'light'} marginRight={1} color={'white'}>QUICK FILTERS:</Typography>

        <Button
          variant="outlined"
          onClick={onClickTopPriority}
          sx={{...buttonStyle, backgroundColor: filters.priority.includes('Top') ? 'purple': 'transparent'}}
        >
          <Typography fontWeight={'light'} color={'white'}>Only Top Priority</Typography>
          <KeyboardDoubleArrowUpIcon sx={{marginLeft: '5px', color: 'white' ,height: '20px'}} />
        </Button>
        
        <Button
          variant="outlined"
          onClick={onClickOnlyOpen}
          sx={{...buttonStyle, backgroundColor: filters.status.includes('Open') ? 'purple': 'transparent'}}
        >

          <Typography fontWeight={'light'} color={'white'}> Only Open</Typography>
          <NoteAddIcon sx={{marginLeft: '5px', color: 'white' ,height: '20px'}}  />
        </Button>

    </Grid>
  );
};

export default ActionsBar;
