import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import dayjs from "dayjs";
import { Task } from "../../../model/task";
import { Grid, Typography } from "@mui/material";

interface Props {
  isReadDialogBoxOpen: boolean,
  setIsReadDialogBoxOpen: Function,
  task?: Task
}

const ReadDialogBox = (props: Props) => {

  //Event Function
  const handleClose = () => {
    props.setIsReadDialogBoxOpen(false);
  };

  return (
    <Grid container>
      {props.task && (
        <Dialog
          className="taskContainer"
          open={props.isReadDialogBoxOpen && props.isReadDialogBoxOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <Typography fontSize={'20px'} marginBottom={2} fontWeight={600} color={'black'}> {props.task.title}</Typography>
            <DialogContentText></DialogContentText>
            <DialogContentText className="description" overflow={'break-word'}>
              <Typography><b>Description:</b> {props.task.description} </Typography>
            </DialogContentText>
            <DialogContentText>
              <Typography><b>Estimated Time:</b> {props.task.estimatedTime} Hours </Typography>
            </DialogContentText>
            <DialogContentText>
              <Typography><b>Status:</b> {props.task.status} </Typography>
            </DialogContentText>
            <DialogContentText>
            < Typography><b>Priority:</b> {props.task.priority} </Typography>
            </DialogContentText>

            {props.task.untilDate && (
              <DialogContentText>
                <b>Until:</b>{" "}
                {dayjs.utc(props.task.untilDate).format("MMMM D, YYYY")}
              </DialogContentText>
            )}

            {props.task.review && (
              <DialogContentText>
                <b>Review:</b> {props.task.review}
              </DialogContentText>
            )}

            {props.task.review && (
              <DialogContentText>
                <b>Time Spent:</b> {props.task.timeSpent} Hours
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={{color: 'gray'}}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Grid>
  );
};

export default ReadDialogBox;
