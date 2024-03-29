import { useEffect } from "react";
import "./readDialogBox.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOpenReadDialogBox,
} from "../../../redux/web/webSelectors";
import {
  closeReadDialogBox,
} from "../../../redux/web/webSlice";
import {
  selectCurrentTask,
} from "../../../redux/tasks/tasksSelectors";
import {
  updateCurrentTaskId,
} from "../../../redux/tasks/tasksSlice";
import dayjs from "dayjs";

const ReadDialogBox = () => {

  //Hooks
  const dispatch = useDispatch();
  const readDialogBoxIsOpen = useSelector(selectOpenReadDialogBox);
  const task = useSelector(selectCurrentTask);

  //Event Function
  const handleClose = () => {
    dispatch(closeReadDialogBox());
    dispatch(updateCurrentTaskId(""));
  };

  return (
    <div>
      {task && (
        <Dialog
          className="taskContainer"
          open={readDialogBoxIsOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <h3>{task.title}</h3>
            <DialogContentText></DialogContentText>
            <DialogContentText className="description">
              <strong>Description:</strong> {task.description}
            </DialogContentText>
            <DialogContentText>
              <strong>Estimated Time:</strong> {task.estimatedTime} Hours
            </DialogContentText>
            <DialogContentText>
              <strong>Status:</strong> {task.status}
            </DialogContentText>
            <DialogContentText>
              <strong>Priority:</strong> {task.priority}
            </DialogContentText>

            {task.untilDate && (
              <DialogContentText>
                <strong>Until:</strong>{" "}
                {dayjs.utc(task.untilDate).format("MMMM D, YYYY")}
              </DialogContentText>
            )}

            {task.review && (
              <DialogContentText>
                <strong>Review:</strong> {task.review}
              </DialogContentText>
            )}

            {task.review && (
              <DialogContentText>
                <strong>Time Spent:</strong> {task.timeSpent} Hours
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className="closeIcon">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ReadDialogBox;
