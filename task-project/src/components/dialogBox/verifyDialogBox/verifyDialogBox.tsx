import React from "react";
import "./verifyDialogBox.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useDispatch, useSelector } from "react-redux";
import { selectOpenAlertDialogBox } from "../../../redux/web/webSelectors";
import {
  closeAlertDialogBox,
  openAlertDialogBox,
  updateErrorAlertMessage,
  updateSuccessAlertMessage,
} from "../../../redux/web/webSlice";
import {
  selectTaskToDeleteId,
  selectTaskToDeleteTitle,
} from "../../../redux/tasks/tasksSelectors";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_TASK } from "../../../graphql/tasksQuery";
import { deleteTaskFromArray } from "../../../redux/tasks/tasksSlice";

const VerifyDialogBox = () => {
  const openDialogBoxState = useSelector(selectOpenAlertDialogBox);
  const taskToDeleteId = useSelector(selectTaskToDeleteId);
  const taskToDeleteTitle = useSelector(selectTaskToDeleteTitle);

  const dispatch = useDispatch();

  const onClickYes = () => {
    deleteTask();
  };

  const handleClose = () => {
    dispatch(closeAlertDialogBox());
  };

  const deleteTask = async () => {
    try {
      await deleteTaskMutation();
      dispatch(deleteTaskFromArray(taskToDeleteId));
      handleClose();
      dispatch(updateSuccessAlertMessage("Task Deleted Succesfuly"));
    } catch (err) {
      let errorMessage = (err as Error).message;
      dispatch(updateErrorAlertMessage(errorMessage));
    }
  };

  const [deleteTaskMutation] = useMutation(DELETE_TASK, {
    variables: {
      id: taskToDeleteId,
    },
  });

  return (
    <div>
      <Dialog
        open={openDialogBoxState}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure You Would Like To Delete '{taskToDeleteTitle}'?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="closeIcon">
            No
          </Button>
          <Button onClick={onClickYes} autoFocus className="deleteTaskIcon">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VerifyDialogBox;
