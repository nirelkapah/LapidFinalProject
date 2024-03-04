import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useDispatch } from "react-redux";
import {
  updateErrorAlertMessage,
  updateSuccessAlertMessage,
} from "../../../redux/web/webSlice";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_TASK } from "../../../graphql/mutations";
import { Task } from "../../../model/task";
import { Grid } from "@mui/material";

interface Props{
  isDeleteDialogOpen: boolean,
  setIsDeleteDialogOpen: Function,
  task?: Task
}

const VerifyDialogBox = (props: Props) => {

  //Hooks
  const dispatch = useDispatch();

  //Event Functions
  const onClickYes = () => {
    deleteTask();
  };
  const handleClose = () => {
    props.setIsDeleteDialogOpen(false);
  };

  //Request Functions
  const deleteTask = async () => {
    try {
      await deleteTaskMutation();
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
    <Grid>
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
          <Button onClick={handleClose} style={{color: 'gray'}}>
            No
          </Button>
          <Button onClick={onClickYes} autoFocus style={{color: 'red'}}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default VerifyDialogBox;
