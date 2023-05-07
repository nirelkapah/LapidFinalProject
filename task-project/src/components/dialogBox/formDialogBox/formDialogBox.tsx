import React, { useEffect } from "react";
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


const FormDialogBox = () => {

  //Hooks
  const openFormState = useSelector(selectOpenFormDialogBox);
  const taskToEdit = useSelector(selectTaskToEdit);
  const taskIsEdited = useSelector(TaskIsEdited);
  const dispatch = useDispatch();

  //Setting Local States
  dayjs.extend(utc);
  const [status, setStatus] = React.useState("Open");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [estTime, setEstTime] = React.useState(0);
  const [priority, setPriority] = React.useState("");
  const [review, setReview] = React.useState("");
  const [timeSpent, setTimeSpent] = React.useState(0);
  const [untilDate, setUntilDate] = React.useState<Dayjs | null>(
    dayjs.utc(new Date())
  );
  const [currentlyUrgentTask, setUrgentTask] = React.useState(false);
  const [currentlyClosedTask, setClosedTask] = React.useState(false);
  const [FormError, setFormError] = React.useState("");

  //If Task Is New - starts new form. If Edited - retrieves data
  useEffect(() => {
    if (taskToEdit) {
      setStatus(taskToEdit.status);
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setEstTime(taskToEdit.estimatedTime);
      setPriority(taskToEdit.priority);
      if(taskToEdit.status === 'Urgent' || taskToEdit.status === 'Closed'){
        setUntilDate(dayjs.utc(taskToEdit.untilDate));
      }
      if(taskToEdit.status === 'Closed'){
        setReview(taskToEdit.review as string);
        setTimeSpent(taskToEdit.timeSpent as number);
      }
    } else {
      setStatus("Open");
      setTitle("");
      setDescription("");
      setEstTime(0);
      setPriority("");
      setReview("");
      setTimeSpent(0);
      setUntilDate(dayjs.utc(new Date()));
    }
  }, [taskIsEdited]);

  //Changes Form Stracture By Status
  useEffect(() => {
    if (status === "Open") {
      setUrgentTask(false);
      setClosedTask(false);
      setUntilDate(dayjs.utc(new Date()));
      setReview("");
      setTimeSpent(0);
    }

    if (status === "Urgent") {
      setUrgentTask(true);
      setClosedTask(false);
      setReview("");
      setTimeSpent(0);
    }

    if (status === "Closed") {
      setUrgentTask(true);
      setClosedTask(true);
    }
  }, [status]);

  //Request Functions
  const sendTask = async () => {
    let result;

    try {
      if (taskIsEdited) {
        result = await updateTaskMutation();
        dispatch(replaceTaskToNewTask(result.data.updateTask));
        dispatch(updateSuccessAlertMessage("Task Updated Succesfuly"));
      } else {
        result = await createTaskMutation();
        dispatch(addTaskToArray(result.data.createTask));
        dispatch(updateSuccessAlertMessage("Task Added Succesfuly"));
      }

      handleClose();
    } catch (err) {
      let errorMessage = (err as Error).message;
      setFormError(errorMessage);
    }
  };

  const [updateTaskMutation] = useMutation(UPDATE_TASK, {
    variables: {
      id: taskToEdit?._id,
      status: status,
      title: title,
      description: description,
      estimatedTime: estTime,
      priority: priority,
      review: currentlyClosedTask ? review : null,
      timeSpent: currentlyClosedTask ? timeSpent : null,
      untilDate:
        currentlyUrgentTask || currentlyClosedTask ? untilDate : null},
  });

  const [createTaskMutation] = useMutation(CREATE_TASK, {
    variables: {
      status: status,
      title: title,
      description: description,
      estimatedTime: estTime,
      priority: priority,
      review: currentlyClosedTask ? review : null,
      timeSpent: currentlyClosedTask ? timeSpent : null,
      untilDate:
        currentlyUrgentTask || currentlyClosedTask
          ? untilDate
          : null,
    },
  });

  //Event Functions
  const onClickSendTask = () => {
    sendTask();
  };

  const handleClose = () => {
    dispatch(closeFormDialogBox());
    dispatch(updateCurrentTaskId(""));

    setStatus("Open");
    setTitle("");
    setDescription("");
    setEstTime(0);
    setPriority("");
    setReview("");
    setTimeSpent(0);
    setUntilDate(dayjs.utc(new Date()));

    setFormError("");
  };

  const onChangeStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value);};

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);};

  const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);};

  const onChangeEstTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    let zeroWithNumber = "0"+event.target.valueAsNumber;
    if (event.target.value == zeroWithNumber){
      setEstTime(event.target.valueAsNumber);
      event.target.value = event.target.valueAsNumber.toString();
    }
    if (event.target.valueAsNumber || event.target.valueAsNumber === 0) {
      setEstTime(event.target.valueAsNumber);
    }};

  const onChangePriority = (event: SelectChangeEvent) => {
    setPriority(event.target.value);};

  const onChangeReview = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value);};

  const onChangeTimeSpent = (event: React.ChangeEvent<HTMLInputElement>) => {
    let zeroWithNumber = "0"+event.target.valueAsNumber;
    if (event.target.value == zeroWithNumber){
      setTimeSpent(event.target.valueAsNumber);
      event.target.value = event.target.valueAsNumber.toString();
    }
    if (event.target.valueAsNumber || event.target.valueAsNumber === 0) {
      setTimeSpent(event.target.valueAsNumber);
    }};

  const onKeyDownEstimatedTime = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Backspace' && estTime.toString().length === 1) {
      setEstTime(0);
    }};

  const onKeyDownTimeSpent = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Backspace' && timeSpent.toString().length === 1) {
      setTimeSpent(0);
    }};

  return (
    <div>
      <Dialog open={openFormState} onClose={handleClose}>
        <DialogTitle className='dialogTitle'>
        <NoteAddIcon /> &nbsp;
          Create Or Modify Task 
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
                value={status}
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
              value={title}
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
              value={description}
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
              value={estTime}
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
                value={priority}
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
                      value={dayjs.utc(untilDate)}
                      onChange={(newValue) => setUntilDate(newValue)}
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
                value={review}
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
                value={timeSpent}
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
