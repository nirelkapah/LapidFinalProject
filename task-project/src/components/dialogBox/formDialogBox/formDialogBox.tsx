import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch} from "react-redux";
import {updateSuccessAlertMessage,} from "../../../redux/web/webSlice";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormGroup, Grid, Typography } from "@mui/material";
import { useMutation } from "@apollo/client";
import { CREATE_TASK, UPDATE_TASK } from "../../../graphql/tasks";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import utc from "dayjs/plugin/utc";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Task } from "../../../model/task";

interface Props {
  isOpenForm: boolean;
  setIsOpenForm: Function;
  task?: Task;
}

const FormDialogBox = (props: Props) => {

  const newTask: Task = {
    status: 'Open',
    description: '',
    title: '',
    estimatedTime: 0,
    priority: ''
  }

  const dispatch = useDispatch();
  const [formTask, setFormTask] = useState<Task>(props.task ? props.task : newTask)
  const [FormError, setFormError] = useState("");

  dayjs.extend(utc);

  useEffect(() => {
    const propsTask = props.task;
    if (propsTask) {
      const tempTask: Task = {
        _id: propsTask._id,
        description: propsTask.description,
        status: propsTask.status,
        title: propsTask.title,
        estimatedTime: propsTask.estimatedTime,
        priority: propsTask.priority,
        timeSpent: propsTask.status === 'Closed' ? propsTask.timeSpent : 0,
        untilDate: propsTask.status === 'Urgent' || propsTask.status === 'Closed' ?
          dayjs.utc(propsTask.untilDate) :
          dayjs.utc(new Date()),
        review: propsTask.status === 'Closed' ? propsTask.review : ''
      }
      setFormTask(tempTask)
    } else {
      setFormTask(newTask)
    }
  }, [props.task]);

  useEffect(() => {
    if (formTask.status === "Open") {
      setFormTask({...formTask, review: '', timeSpent: 0, untilDate: dayjs.utc(new Date())})
    }
    if (formTask.status === "Urgent") {
      setFormTask({...formTask, review: '', timeSpent: 0})
    }
  }, [formTask.status]);

  const sendTask = async () => {
    try {
      if (props.task?._id) {
        await updateTaskMutation();
        dispatch(updateSuccessAlertMessage("Task Updated Succesfuly"));
      } else {
        await createTaskMutation();
        dispatch(updateSuccessAlertMessage("Task Added Succesfuly"));
      }
      handleClose();
      setFormTask(newTask);
    } catch (err) {
      let errorMessage = (err as Error).message;
      setFormError(errorMessage);
    }
  };
  
  const [updateTaskMutation] = useMutation(UPDATE_TASK, {
    variables: {
      taskInput: formTask},
  });
  
  const [createTaskMutation] = useMutation(CREATE_TASK, {
    variables: {
      taskInput: formTask
    },
  });

  //Event Functions
  const onClickSendTask = () => sendTask();

  const handleClose = () => {
    props.setIsOpenForm(false);
    setFormError("");
  };

  const onChangeStatus = (event: SelectChangeEvent) => setFormTask({...formTask, status: event.target.value});

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => setFormTask({...formTask, title: event.target.value});

  const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => setFormTask({...formTask, description: event.target.value});

  const onChangeEstTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    let zeroWithNumber = "0"+event.target.valueAsNumber;
    if (event.target.value == zeroWithNumber){
      setFormTask({...formTask, estimatedTime: event.target.valueAsNumber});
      event.target.value = event.target.valueAsNumber.toString();
    }
    else if (event.target.valueAsNumber || event.target.valueAsNumber === 0) {
      setFormTask({...formTask, estimatedTime: event.target.valueAsNumber});
    }};

  const onChangePriority = (event: SelectChangeEvent) => setFormTask({...formTask, priority: event.target.value});

  const onChangeReview = (event: React.ChangeEvent<HTMLInputElement>) => setFormTask({...formTask, review: event.target.value});

  const onChangeTimeSpent = (event: React.ChangeEvent<HTMLInputElement>) => {
    let zeroWithNumber = "0"+event.target.valueAsNumber;
    if (event.target.value == zeroWithNumber){
      setFormTask({...formTask, timeSpent: event.target.valueAsNumber});
      event.target.value = event.target.valueAsNumber.toString();
    }
    else if (event.target.valueAsNumber || event.target.valueAsNumber === 0) {
      setFormTask({...formTask, timeSpent: event.target.valueAsNumber});
    }};

  const onKeyDownEstimatedTime = (event: React.KeyboardEvent<HTMLDivElement>) => {
     (event.key === 'Backspace' && formTask.estimatedTime.toString().length === 1) &&
        setFormTask({...formTask, estimatedTime: 0});
    };

  const onKeyDownTimeSpent = (event: React.KeyboardEvent<HTMLDivElement>) => {
    (event.key === 'Backspace' && formTask.timeSpent) && 
      formTask.timeSpent.toString().length === 1 &&
        setFormTask({...formTask, timeSpent: 0});
    };

  return (
    <Grid container>
      <Dialog open={props.isOpenForm ? props.isOpenForm : false} onClose={handleClose}>
        <DialogTitle color={'6945ac'} className='dialogTitle'>
        
          <Typography color='#6945ac' fontSize={'20px'} justifyContent={'center'}><NoteAddIcon style={{color: '6945ac'}}/> {!props.task && 'Create'}{props.task && 'Modify'} Task</Typography>
        </DialogTitle>

        <DialogContent>
          <FormGroup sx={{ m: 1, minWidth: 400 }}>
            <FormControl variant="outlined">
              <InputLabel id="statusLabel" required>Status</InputLabel>
              <Select
                error={FormError.includes("Status")}
                required
                labelId="statusLabel"
                id="statusSelect"
                value={formTask.status}
                onChange={onChangeStatus}
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
              onChange={onChangeTitle}
              error={FormError.includes("Title")}
              required
              id="standard-required"
              label="Title"
              value={formTask.title}
              variant="outlined"
              helperText='Title Must Be Between 6 to 30 letters'
              margin={'normal'}
            />

            {FormError.includes('Title') && <Typography color={'red'}>{FormError} </Typography>}

            <TextField
              onChange={onChangeDescription}
              error={FormError.includes("Description")}
              required
              multiline
              id="standard-required"
              label="Description"
              value={formTask.description}
              variant="outlined"
              helperText='Description Must Be Between 10 to 120 letters'
              margin={'normal'}
            />
            {FormError.includes('Description') && <Typography color={'red'}>{FormError} </Typography>}


            <TextField
              onChange={onChangeEstTime}
              onKeyDown={onKeyDownEstimatedTime}
              error={FormError.includes("Estimated")}
              required
              type="number"
              id="standard-required"
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
                id="prioritySelect"
                value={formTask.priority}
                onChange={onChangePriority}
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
                onChange={onChangeReview}
                error={FormError.includes("Review")}
                id="standard-required"
                label="Review"
                value={formTask.review}
                variant="outlined"
                margin={'normal'}
              />
            )}
            {FormError.includes('Review') && <Typography color={'red'}>{FormError} </Typography>}

            {formTask.status === 'Closed' && (
              <TextField
                onChange={onChangeTimeSpent}
                onKeyDown={onKeyDownTimeSpent}
                error={FormError.includes("Spent")}
                type="number"
                id="standard-required"
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
          <Button onClick={handleClose}  style={{color: 'gray'}}>
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
