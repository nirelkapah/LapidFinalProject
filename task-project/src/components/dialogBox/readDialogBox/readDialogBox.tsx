import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import dayjs, { Dayjs } from "dayjs";
import { Task } from "../../../model/task";
import { Grid, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface readDialogBoxProps {
  isReadDialogBoxOpen: boolean,
  setIsReadDialogBoxOpen: Dispatch<SetStateAction<boolean>>,
  task?: Task
}


const ReadDialogBox = (props: readDialogBoxProps) => {
  const isDialogBoxOpen = props.isReadDialogBoxOpen;
  const setDialogBoxOpen = props.setIsReadDialogBoxOpen;
  const task = props.task;

  const handleClose = () => {
    setDialogBoxOpen(false);
  };

  const keysMap = new Map<string , string>([
    ['description', 'Description'],
    ['estimatedTime', 'Estimated Time'],
    ['priority', 'Priority'],
    ['review', 'Review'],
    ['status', 'Status' ],
    ['timeSpent', 'Time Spent'],
    ['title', 'Title'],
    ['untilDate','Until Date']
  ])

  const unWantedKeys = ['_id', '__typename']

  const DialogRow = {
    get: (key: string, value: string | number) => {
      const convertKeyToTitle = (key: any): string => key && keysMap.get(key);
      const convertDateToString = (value: any): string =>  dayjs.utc(value).format("MMMM D, YYYY");

      return (
        <DialogContentText key={key}>
              <Typography component={'span'}><b>{convertKeyToTitle(key)}:</b> {key === 'untilDate' ? convertDateToString(value) : value}</Typography>
        </DialogContentText>
      )
    }
  }

  return (
    <Grid container>
      {task && (
        <Dialog
          className="taskContainer"
          open={isDialogBoxOpen && isDialogBoxOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
          <Typography fontSize={'20px'} marginBottom={2} fontWeight={600} color={'black'}> {task.title}</Typography>

          {task && Object.entries(task).map(([rowKey, rowValue])=> !(unWantedKeys.includes(rowKey) || rowValue === null) && DialogRow.get(rowKey, rowValue))}
          
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{color: 'gray'}}>
              <Typography>
                Close
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Grid>
  );
};

export default ReadDialogBox;
