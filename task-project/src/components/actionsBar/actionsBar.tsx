import Button from "@mui/material/Button";
import { useDispatch} from "react-redux";
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

const ActionsBar = () => {

  const dispatch = useDispatch();
  const [isTopPriorityButtonPressed, setTopPriorityButton] = useState<boolean>(false);
  const [isOnlyOpenButtonPressed, setOnlyOpenButton] = useState<boolean>(false);

  const onClickTopPriority = () => {
    setTopPriorityButton(!isTopPriorityButtonPressed);
    !isTopPriorityButtonPressed ? 
    dispatch(updatePriorityFilter('Top'))
    :
    dispatch(removePriorityFilter('Top'))
  };

  const onClickOnlyOpen = () => {
    setOnlyOpenButton(!isOnlyOpenButtonPressed);
    !isOnlyOpenButtonPressed ? 
    dispatch(updateStatusFilter('Open'))
    :
    dispatch(removeStatusFilter('Open'))
  };

  return (
    <Grid sx={{justifyContent: 'center' , alignItems: 'center'}} container className="actionsBarContainer animate__animated animate__fadeInUp">

        <Typography fontWeight={'light'} marginRight={1} color={'white'}>QUICK FILTERS:</Typography>

        <Button
          variant="outlined"
          className={isTopPriorityButtonPressed ?"actionBarButtonsIsPressed" : "actionBarButtons"}
          onClick={onClickTopPriority}
          disableElevation={isTopPriorityButtonPressed}
          style={{margin: '5px', borderColor: 'white'}}
        >
          <Typography fontWeight={'light'} className="actionBarText" color={'white'}>Only Top Priority</Typography>
          <KeyboardDoubleArrowUpIcon style={{marginLeft: '5px', color: 'white' ,height: '20px'}} />
        </Button>
        
        <Button
          variant="outlined"
          className={isOnlyOpenButtonPressed ?"actionBarButtonsIsPressed" : "actionBarButtons"}
          onClick={onClickOnlyOpen}
          style={{margin: '5px', borderColor: 'white'}}

        >

          <Typography fontWeight={'light'} color={'white'}> Only Open</Typography>
          <NoteAddIcon style={{marginLeft: '5px', color: 'white' ,height: '20px'}}  />
        </Button>

    </Grid>
  );
};

export default ActionsBar;
