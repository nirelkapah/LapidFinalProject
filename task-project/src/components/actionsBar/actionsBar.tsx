import "./actionsBar.css";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStatusFilter,
  updatePriorityFilter,
  removePriorityFilter,
  removeStatusFilter
} from "../../redux/tasks/tasksSlice";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { useState } from "react";

const ActionsBar = () => {

  //Hooks
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
    <div className="actionsBarContainer animate__animated animate__fadeInUp">

      <div className="filtersContainer">
        <span className="actionBarSubText">QUICK FILTERS:</span>

        &nbsp;&nbsp;&nbsp;

        <Button
          variant="outlined"
          className={isTopPriorityButtonPressed ?"actionBarButtonsIsPressed" : "actionBarButtons"}
          onClick={onClickTopPriority}
          disableElevation={isTopPriorityButtonPressed}
        >
          <span className="actionBarText">Only Top Priority</span>
          <KeyboardDoubleArrowUpIcon id="topPriorityIcon" />
        </Button>

        &nbsp;&nbsp;
        
        <Button
          variant="outlined"
          className={isOnlyOpenButtonPressed ?"actionBarButtonsIsPressed" : "actionBarButtons"}
          onClick={onClickOnlyOpen}
        >

          <span className="actionBarText"> Only Open</span>
          &nbsp;
          <NoteAddIcon id="openTaskIcon" />
        </Button>
      </div>

    </div>
  );
};

export default ActionsBar;
