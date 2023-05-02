import React from "react";
import "./actionsBar.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { openFormDialogBox } from "../../redux/web/webSlice";
import {
  toggleFilterByOpenStatus,
  toggleFilterByPriority,
} from "../../redux/tasks/tasksSlice";
import {
  selectFilterByOpenStatus,
  selectFilterByTopPriority,
} from "../../redux/tasks/tasksSelectors";
// import { filterTaskByOpen, filterTasksByTop } from '../../redux/tasks/tasksSlice';
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

const ActionsBar = () => {
  const dispatch = useDispatch();
  const topPriorityFilterPressed = useSelector(selectFilterByTopPriority);
  const openFilterPressed = useSelector(selectFilterByOpenStatus);

  const onClickOpenForm = () => {
    dispatch(openFormDialogBox());
  };

  const onClickTopPriority = () => {
    if (openFilterPressed) {
      dispatch(toggleFilterByOpenStatus());
    }
    dispatch(toggleFilterByPriority());
  };

  const onClickOnlyOpen = () => {
    if (topPriorityFilterPressed) {
      dispatch(toggleFilterByPriority());
    }
    dispatch(toggleFilterByOpenStatus());
  };

  return (
    <div className="actionsBarContainer animate__animated animate__fadeInUp">
      <Button
        variant="text"
        onClick={onClickOpenForm}
        className="actionBarButtons"
      >
        <span className="actionBarText"> Add Task</span> &nbsp;
        <AddBoxIcon id="addTaskIcon" />
      </Button>
      &nbsp;&nbsp;
      <br></br>
      <span className="actionBarSubText">QUICK FILTERS:</span>
      &nbsp;&nbsp;
      <Button
        variant="text"
        className="actionBarButtons"
        onClick={onClickTopPriority}
      >
        <span className="actionBarText">Only Top Priority</span>
        <KeyboardDoubleArrowUpIcon id="topPriorityIcon" />
      </Button>
      &nbsp;&nbsp;
      <Button
        variant="text"
        className="actionBarButtons"
        onClick={onClickOnlyOpen}
      >
        <span className="actionBarText"> Only Open</span>
        &nbsp;
        <NoteAddIcon id="openTaskIcon" />
      </Button>
    </div>
  );
};

export default ActionsBar;
