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
import dayjs from "dayjs";
import { Task } from "../../../model/task";

interface Props {
  isReadDialogBoxOpen: boolean,
  setIsReadDialogBoxOpen: Function,
  task?: Task
}

const ReadDialogBox = (props: Props) => {

  //Hooks
  // const dispatch = useDispatch();
  // const readDialogBoxIsOpen = useSelector(selectOpenReadDialogBox);
  // const task = useSelector(selectCurrentTask);

  //Event Function
  const handleClose = () => {
    props.setIsReadDialogBoxOpen(false);
    // dispatch(closeReadDialogBox());
    // dispatch(updateCurrentTaskId(""));
  };

  return (
    <div>
      {props.task && (
        <Dialog
          className="taskContainer"
          open={props.isReadDialogBoxOpen && props.isReadDialogBoxOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <h3>{props.task.title}</h3>
            <DialogContentText></DialogContentText>
            <DialogContentText className="description">
              <strong>Description:</strong> {props.task.description}
            </DialogContentText>
            <DialogContentText>
              <strong>Estimated Time:</strong> {props.task.estimatedTime} Hours
            </DialogContentText>
            <DialogContentText>
              <strong>Status:</strong> {props.task.status}
            </DialogContentText>
            <DialogContentText>
              <strong>Priority:</strong> {props.task.priority}
            </DialogContentText>

            {props.task.untilDate && (
              <DialogContentText>
                <strong>Until:</strong>{" "}
                {dayjs.utc(props.task.untilDate).format("MMMM D, YYYY")}
              </DialogContentText>
            )}

            {props.task.review && (
              <DialogContentText>
                <strong>Review:</strong> {props.task.review}
              </DialogContentText>
            )}

            {props.task.review && (
              <DialogContentText>
                <strong>Time Spent:</strong> {props.task.timeSpent} Hours
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
