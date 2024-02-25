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
  updateErrorAlertMessage,
  updateSuccessAlertMessage,
} from "../../../redux/web/webSlice";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_TASK } from "../../../graphql/tasks";
import { Task } from "../../../model/task";

interface Props{
  isDeleteDialogOpen: boolean,
  setIsDeleteDialogOpen: Function,
  task?: Task
}

const VerifyDialogBox = (props: Props) => {

  //Hooks
  // const openDialogBoxState = useSelector(selectOpenAlertDialogBox);
  // const taskToDeleteId = useSelector(selectCurrentTaskId)
  // const taskToDeleteTitle = useSelector(selectTaskToDeleteTitle);
  const dispatch = useDispatch();

  //Event Functions
  const onClickYes = () => {
    deleteTask();
  };
  const handleClose = () => {
    props.setIsDeleteDialogOpen(false);
    // dispatch(closeAlertDialogBox());
    // dispatch(updateCurrentTaskId(''));

  };

  //Request Functions
  const deleteTask = async () => {
    try {
      await deleteTaskMutation();
      // dispatch(deleteTaskFromArray(taskToDeleteId));
      handleClose();
      dispatch(updateSuccessAlertMessage("Task Deleted Succesfuly"));
    } catch (err) {
      let errorMessage = (err as Error).message;
      dispatch(updateErrorAlertMessage(errorMessage));
    }
  };

  const [deleteTaskMutation] = useMutation(DELETE_TASK, {
    variables: {
      id: props.task?._id,
    },
  });

  return (
    <div>
      <Dialog
        open={props.isDeleteDialogOpen ? props.isDeleteDialogOpen : false}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure You Would Like To Delete '{props.task?.title}'?
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
