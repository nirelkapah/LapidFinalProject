import "./actionsBar.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
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
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

const ActionsBar = () => {

  //Hooks
  const dispatch = useDispatch();
  const topPriorityFilterPressed = useSelector(selectFilterByTopPriority);
  const openFilterPressed = useSelector(selectFilterByOpenStatus);

  // //Event Functions
  // const onClickOpenForm = () => {
  //   dispatch(openFormDialogBox());
  // };

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

      <div className="filtersContainer">
        <span className="actionBarSubText">QUICK FILTERS:</span>

        &nbsp;&nbsp;&nbsp;

        <Button
          variant="outlined"
          className={topPriorityFilterPressed ?"actionBarButtonsIsPressed" : "actionBarButtons"}
          onClick={onClickTopPriority}
          disableElevation={topPriorityFilterPressed}
        >
          <span className="actionBarText">Only Top Priority</span>
          <KeyboardDoubleArrowUpIcon id="topPriorityIcon" />
        </Button>

        &nbsp;&nbsp;
        
        <Button
          variant="outlined"
          className={openFilterPressed ?"actionBarButtonsIsPressed" : "actionBarButtons"}
          onClick={onClickOnlyOpen}
        >

          <span className="actionBarText"> Only Open</span>
          &nbsp;
          <NoteAddIcon id="openTaskIcon" />
        </Button>
      </div>
{/* 
      <div className="addTaskContainer">
      <Button
        variant="text"
        onClick={onClickOpenForm}
        id="addTaskButton">
        <span className="actionBarText" > Add Task</span> &nbsp;
          <AddBoxIcon id="addTaskIcon" />
        </Button>
        
        &nbsp;&nbsp;

      </div> */}

    </div>
  );
};

export default ActionsBar;
