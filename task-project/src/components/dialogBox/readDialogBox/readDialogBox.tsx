import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import dayjs, { Dayjs } from "dayjs";
import { Task } from "../../../model/task";
import { Grid, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { DialogRow } from "./dialogRow";

interface readDialogBoxProps {
  isReadDialogBoxOpen: boolean,
  setIsReadDialogBoxOpen: Dispatch<SetStateAction<boolean>>,
  task?: Task
}

const unWantedKeys = ['_id', '__typename']


const ReadDialogBox = ({isReadDialogBoxOpen,setIsReadDialogBoxOpen,task}: readDialogBoxProps) => {

  const handleClose = () => setIsReadDialogBoxOpen(false);


  return (
    <Grid container>
      {task && (
        <Dialog
          open={isReadDialogBoxOpen && isReadDialogBoxOpen}
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
