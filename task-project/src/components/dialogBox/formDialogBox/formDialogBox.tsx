import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState, KeyboardEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormGroup, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Task } from "../../../model/task";
import { useModifyTask } from "../../../hooks/useModifyTask";
import { useSendTask } from "../../../hooks/useSendTask";
interface formDialogBoxProps {
  isOpenForm: boolean;
  setIsOpenForm: Dispatch<SetStateAction<boolean>>;
  task?: Task;
}

const FormDialogBox = ({isOpenForm, setIsOpenForm, task }: formDialogBoxProps) => {

  const {formTask, setFormTask, FormError, setFormError} = useModifyTask(task);
  const {setIsSendTask} = useSendTask({formTask, task, setFormTask, setFormError, setIsOpenForm})

  const onClickSendTask = () => setIsSendTask(true);

  const onClickClose = () => {
    setIsOpenForm(false);
    setFormError("");
  };

  const onChangeSelectElement = (event: SelectChangeEvent) => setFormTask({...formTask, [event.target.name]: event.target.value});

  const onChangeStringInputElement = (event: ChangeEvent<HTMLInputElement>) => setFormTask({...formTask, [event.target.id]: event.target.value});

  const onChangeNumberInputElement = (event: React.ChangeEvent<HTMLInputElement>) => {
    let zeroWithNumber = "0"+event.target.valueAsNumber;
    (event.target.value == zeroWithNumber) ? 
    (setFormTask({...formTask, [event.target.id]: event.target.valueAsNumber}),
    event.target.value = event.target.valueAsNumber.toString())
    : 
    (event.target.valueAsNumber || event.target.valueAsNumber === 0) &&
    (setFormTask({...formTask, [event.target.id]: event.target.valueAsNumber})) 
  }

    const onKeDownEstimatedTime = (event: KeyboardEvent<HTMLInputElement>) => {
     (event.key === 'Backspace' && formTask.estimatedTime.toString().length === 1) &&
        setFormTask({...formTask, estimatedTime: 0});
    };

    const onKeyDownTimeSpent = (event: KeyboardEvent<HTMLInputElement>) => {
    (event.key === 'Backspace' && formTask.timeSpent) && formTask.timeSpent.toString().length === 1 &&
        setFormTask({...formTask, timeSpent: 0});
    };

  return (
    <Grid container>
      <Dialog open={isOpenForm ? isOpenForm : false} onClose={onClickClose}>
        <DialogTitle color={'6945ac'}>
        
          <Typography color='#6945ac' fontSize={'20px'} justifyContent={'center'}><NoteAddIcon sx={{color: '6945ac'}}/> {!task && 'Create'}{task && 'Modify'} Task</Typography>
        </DialogTitle>

        <DialogContent>
          <FormGroup sx={{ m: 1, minWidth: 400 }}>
            <FormControl variant="outlined">
              <InputLabel id="statusLabel" required>Status</InputLabel>
              <Select
                error={FormError.includes("Status")}
                required
                labelId="statusLabel"
                name="status"
                value={formTask.status}
                onChange={onChangeSelectElement}
                label="status" 
              >
                <MenuItem value={"Open"}>Open
                </MenuItem>
                <MenuItem value={"Urgent"}>Urgent</MenuItem>
                <MenuItem value={"Closed"}>Closed</MenuItem>
              </Select>
            </FormControl>
            {FormError.includes('Status') && <Typography color={'red'}>{FormError} </Typography>}

            <TextField
              onChange={onChangeStringInputElement}
              error={FormError.includes("Title")}
              required
              id="title"
              label="Title"
              value={formTask.title}
              variant="outlined"
              helperText='Title Must Be Between 6 to 30 letters'
              margin={'normal'}
            />

            {FormError.includes('Title') && <Typography color={'red'}>{FormError} </Typography>}

            <TextField
              onChange={onChangeStringInputElement}
              error={FormError.includes("Description")}
              required
              multiline
              id="description"
              label="Description"
              value={formTask.description}
              variant="outlined"
              helperText='Description Must Be Between 10 to 120 letters'
              margin={'normal'}
            />
            {FormError.includes('Description') && <Typography color={'red'}>{FormError} </Typography>}


            <TextField
              onChange={onChangeNumberInputElement}
              onKeyDown={onKeDownEstimatedTime}
              error={FormError.includes("Estimated")}
              required
              type="number"
              id="estimatedTime"
              label="Estimated Time (hours)"
              value={formTask.estimatedTime}
              variant="outlined"
              InputProps={{ inputProps: { min: 0, max: 1000 } }}
              margin={'normal'}

            />

            {FormError.includes('Estimated') && <Typography color={'red'}>{FormError} </Typography>}

            <FormControl variant="outlined" margin={'normal'}>
              <InputLabel id="priorityLabel" required>Priority</InputLabel>
              <Select
                error={FormError.includes("Priority")}
                required
                labelId="priorityLabel"
                name="priority"
                value={formTask.priority}
                onChange={onChangeSelectElement}
                label="Priority"
              >
                <MenuItem value={"Top"}>Top</MenuItem>
                <MenuItem value={"Regular"}>Regular</MenuItem>
                <MenuItem value={"Minor"}>Minor</MenuItem>
              </Select>
            </FormControl>
            {FormError.includes('Priority') && <Typography color={'red'}>{FormError} </Typography>}

            {(formTask.status === 'Closed' || formTask.status === 'Urgent') && (
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                dateLibInstance={dayjs.utc}
                margin={'normal'}
              >
                <DemoContainer components={["DateCalendar", "DateCalendar"]}>
                  <DemoItem label="Until Date">
                    <DateCalendar
                      value={dayjs.utc(formTask.untilDate)}
                      onChange={(newValue) => newValue && setFormTask({...formTask, untilDate: newValue})}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            )}
            {FormError.includes('Date') && <Typography color={'red'}>{FormError} </Typography>}

            {formTask.status === 'Closed' && (
              <TextField
                onChange={onChangeStringInputElement}
                error={FormError.includes("Review")}
                id="review"
                label="Review"
                value={formTask.review}
                variant="outlined"
                margin={'normal'}
              />
            )}
            {FormError.includes('Review') && <Typography color={'red'}>{FormError} </Typography>}

            {formTask.status === 'Closed' && (
              <TextField
                onChange={onChangeNumberInputElement}
                onKeyDown={onKeyDownTimeSpent}
                error={FormError.includes("Spent")}
                type="number"
                id="timeSpent"
                label="Time Spent (hours)"
                value={formTask.timeSpent}
                variant="outlined"
                InputProps={{ inputProps: { min: 0, max: 1000 } }}
                margin={'normal'}

              />
            )}

            {FormError.includes('Spent') && <Typography color={'red'}>{FormError} </Typography>}
          </FormGroup>

        </DialogContent>
        <DialogActions>
          <Button onClick={onClickClose}  sx={{color: 'gray'}}>
            <Typography color={'gray'} fontSize={'14px'} fontWeight={'500'}>Cancel</Typography>
          </Button>
          <Button onClick={onClickSendTask}>
            <Typography color={'#6945ac'} fontSize={'14px'} fontWeight={'500'}>Send</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default FormDialogBox;
