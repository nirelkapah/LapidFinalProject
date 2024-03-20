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
import { Grid, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {useDeleteTask} from "./useDeleteTask";

interface verifyDialogBoxProps{
  isDeleteDialogOpen: boolean,
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>,
  task?: Task
}

const VerifyDialogBox = ({isDeleteDialogOpen, setIsDeleteDialogOpen, task}: verifyDialogBoxProps) => {

  const setDeleteTask = useDeleteTask(setIsDeleteDialogOpen, task?._id);
  
  const handleClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const onClickYes = () => {
    setDeleteTask(true);
  };

  return (
    <Grid>
      <Dialog
        open={isDeleteDialogOpen ? isDeleteDialogOpen : false}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography component={'span'}>
              Are You Sure You Would Like To Delete '{task?.title}'?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color: 'gray'}}>
            <Typography component={'span'}>
              No
            </Typography>
          </Button>
          <Button onClick={onClickYes} sx={{color: 'red'}}>
            <Typography component={'span'}>
              Yes
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default VerifyDialogBox;
