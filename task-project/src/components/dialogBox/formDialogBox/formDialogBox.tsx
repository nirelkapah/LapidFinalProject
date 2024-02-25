import React, { useEffect, useState } from "react";
import "./formDialogBox.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { selectOpenFormDialogBox } from "../../../redux/web/webSelectors";
import {
  closeFormDialogBox,
  updateSuccessAlertMessage,
} from "../../../redux/web/webSlice";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormGroup } from "@mui/material";
import { useMutation } from "@apollo/client";
import { CREATE_TASK, UPDATE_TASK } from "../../../graphql/tasks";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import utc from "dayjs/plugin/utc";
import {
  addTaskToArray,
  replaceTaskToNewTask,
  updateCurrentTaskId,
} from "../../../redux/tasks/tasksSlice";
import {
  TaskIsEdited,
  selectTaskToEdit,
} from "../../../redux/tasks/tasksSelectors";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Task } from "../../../model/task";

interface Props {
  isOpenForm: boolean;
  setIsOpenForm: Function;
  task?: Task;
}

const FormDialogBox = (props: Props) => {

  //Hooks
  // const openFormState = useSelector(selectOpenFormDialogBox);
  // const taskToEdit = useSelector(selectTaskToEdit);
  // const taskIsEdited = useSelector(TaskIsEdited);
  const dispatch = useDispatch();

  //Setting Local States;
  const newTask: Task = {
    status: 'Open',
    description: '',
    title: '',
    estimatedTime: 0,
    priority: ''
  }
  const [formTask, setFormTask] = useState<Task>(props.task ? props.task : newTask)

  dayjs.extend(utc);

  const [currentlyUrgentTask, setUrgentTask] = useState(false);
  const [currentlyClosedTask, setClosedTask] =useState(false);
  const [FormError, setFormError] = useState("");

  //If Task Is New - starts new form. If Edited - retrieves data
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

  //Changes Form Stracture By Status
  useEffect(() => {
    if (formTask.status === "Open") {
      setUrgentTask(false);
      setClosedTask(false);
      setFormTask({...formTask, review: '', timeSpent: 0, untilDate: dayjs.utc(new Date())})
    }

    if (formTask.status === "Urgent") {
      setUrgentTask(true);
      setClosedTask(false);
      setFormTask({...formTask, review: '', timeSpent: 0})
    }

    if (formTask.status === "Closed") {
      setUrgentTask(true);
      setClosedTask(true);
    }
  }, [formTask.status]);

  //Request Functions
  const sendTask = async () => {
    let result;

    try {
      if (props.task?._id) {
        result = await updateTaskMutation();
        dispatch(updateSuccessAlertMessage("Task Updated Succesfuly"));
      } else {
        result = await createTaskMutation();
        dispatch(updateSuccessAlertMessage("Task Added Succesfuly"));
      }

      handleClose();
    } catch (err) {
      let errorMessage = (err as Error).message;
      setFormError(errorMessage);
    }
  };

  // const [updateTaskMutation] = useMutation(UPDATE_TASK, {
  //   variables: {
  //     id: formTask._id,
  //     status: formTask.status,
  //     title: formTask.title,
  //     description: formTask.description,
  //     estimatedTime: formTask.estimatedTime,
  //     priority: formTask.priority,
  //     review: currentlyClosedTask ? formTask.priority : null,
  //     timeSpent: currentlyClosedTask ? formTask.timeSpent : null,
  //     untilDate:
  //       currentlyUrgentTask || currentlyClosedTask ? formTask.untilDate : null},
  // });

  
  const [updateTaskMutation] = useMutation(UPDATE_TASK, {
    variables: {
      taskInput: formTask},
  });

  // const [createTaskMutation] = useMutation(CREATE_TASK, {
  //   variables: {
  //     status: formTask.status,
  //     title: formTask.title,
  //     description: formTask.description,
  //     estimatedTime: formTask.estimatedTime,
  //     priority: formTask.priority,
  //     review: currentlyClosedTask ? formTask.review : null,
  //     timeSpent: currentlyClosedTask ? formTask.timeSpent : null,
  //     untilDate:
  //       currentlyUrgentTask || currentlyClosedTask
  //         ? formTask.untilDate
  //         : null,
  //   },
  // });

  
  const [createTaskMutation] = useMutation(CREATE_TASK, {
    variables: {
      taskInput: formTask
    },
  });

  //Event Functions
  const onClickSendTask = () => {
    sendTask();
  };

  const handleClose = () => {
    props.setIsOpenForm(false);
    setFormError("");
  };

  const onChangeStatus = (event: SelectChangeEvent) => 
    setFormTask({...formTask, status: event.target.value});
  

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempTask = {...formTask, title: event.target.value}
    setFormTask(tempTask);
  }
    // setTitle(event.target.value);};

  const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempTask = {...formTask, description: event.target.value}
    setFormTask(tempTask);
  }
    // setDescription(event.target.value);};

  const onChangeEstTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    let zeroWithNumber = "0"+event.target.valueAsNumber;
    if (event.target.value == zeroWithNumber){
      const tempTask = {...formTask, estimatedTime: event.target.valueAsNumber}
      setFormTask(tempTask);
      // setEstTime(event.target.valueAsNumber);
      event.target.value = event.target.valueAsNumber.toString();
    }
    if (event.target.valueAsNumber || event.target.valueAsNumber === 0) {
      const tempTask = {...formTask, estimatedTime: event.target.valueAsNumber}
      setFormTask(tempTask);
      // setEstTime(event.target.valueAsNumber);
    }};

  const onChangePriority = (event: SelectChangeEvent) => {
    const tempTask = {...formTask, priority: event.target.value}
    setFormTask(tempTask);}

    // setPriority(event.target.value);};

  const onChangeReview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempTask = {...formTask, review: event.target.value}
    setFormTask(tempTask);}
    // setReview(event.target.value);};

  const onChangeTimeSpent = (event: React.ChangeEvent<HTMLInputElement>) => {
    let zeroWithNumber = "0"+event.target.valueAsNumber;
    if (event.target.value == zeroWithNumber){
      const tempTask = {...formTask, timeSpent: event.target.valueAsNumber}
      setFormTask(tempTask);
      // setTimeSpent(event.target.valueAsNumber);
      event.target.value = event.target.valueAsNumber.toString();
    }
    if (event.target.valueAsNumber || event.target.valueAsNumber === 0) {
      const tempTask = {...formTask, timeSpent: event.target.valueAsNumber}
      setFormTask(tempTask);
      // setTimeSpent(event.target.valueAsNumber);
    }};

  const onKeyDownEstimatedTime = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Backspace' && formTask.estimatedTime.toString().length === 1) {
      setFormTask({...formTask, estimatedTime: 0});
      // setEstTime(0);
    }};

  const onKeyDownTimeSpent = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Backspace' && formTask.timeSpent) {
      formTask.timeSpent.toString().length === 1 &&
      setFormTask({...formTask, timeSpent: 0});
    }};

  return (
    <div>
      <Dialog open={props.isOpenForm ? props.isOpenForm : false} onClose={handleClose}>
        <DialogTitle className='dialogTitle'>
        <NoteAddIcon /> &nbsp;
          {!props.task && 'Create'}{props.task && 'Modify'} Task
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
            {FormError.includes('Status') && <span className="formError">{FormError} </span>}

            <br></br>

            <TextField
              onChange={onChangeTitle}
              error={FormError.includes("Title")}
              required
              id="standard-required"
              label="Title"
              value={formTask.title}
              variant="outlined"
              helperText='Title Must Be Between 6 to 30 letters'
              
            />

            {FormError.includes('Title') && <span className="formError">{FormError} </span>}
            <br></br>

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

            />
            {FormError.includes('Description') && <span className="formError">{FormError} </span>}

            <br></br>

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

            />

            {FormError.includes('Estimated') && <span className="formError">{FormError} </span>}
            <br></br>

            <FormControl variant="outlined">
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
            {FormError.includes('Priority') && <span className="formError">{FormError} </span>}

            <br></br>

            {currentlyUrgentTask && (
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                dateLibInstance={dayjs.utc}
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
            {FormError.includes('Date') && <span className="formError">{FormError} </span>}

            {currentlyClosedTask && (
              <TextField
                onChange={onChangeReview}
                error={FormError.includes("Review")}
                id="standard-required"
                label="Review"
                value={formTask.review}
                variant="outlined"
              />
            )}
            {FormError.includes('Review') && <span className="formError">{FormError} </span>}

            <br></br>

            {currentlyClosedTask && (
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

              />
            )}

            {FormError.includes('Spent') && <span className="formError">{FormError} </span>}
          </FormGroup>

          <br></br>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="closeIcon">
            Cancel
          </Button>
          <Button onClick={onClickSendTask} className="sendIcon">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialogBox;
