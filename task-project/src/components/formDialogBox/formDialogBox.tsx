import React, { useEffect } from 'react'
import './formDialogBox.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { selectOpenFormDialogBox } from '../../redux/web/webSelectors';
import { closeFormDialogBox, openFormDialogBox } from '../../redux/web/webSlice'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import { Task } from '../../model/task';
import { FormGroup } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import { CREATE_TASK, UPDATE_TASK } from '../../graphql/tasksQuery';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import moment from 'moment';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import utc from 'dayjs/plugin/utc';
import { AddTask } from '@mui/icons-material';
import { addTaskToArray, replaceTaskToNewTask, updateTaskToDeleteId, updateTaskToEditId } from '../../redux/tasks/tasksSlice';
import { TaskIsEdited, selectTaskToEdit, selectTaskToEditId } from '../../redux/tasks/tasksSelectors';




const FormDialogBox = () => {
  
    //global state
    const openFormState = useSelector(selectOpenFormDialogBox);
    const taskToEdit = useSelector(selectTaskToEdit)
    const taskIsEdited = useSelector(TaskIsEdited)
    const dispatch = useDispatch()
    dayjs.extend(utc);

    // console.log("THIS TO EDIT")
    // console.log(taskToEdit)
    // console.log('Task Is Edited:' + taskIsEdited)

    //Local Component State
    const [status, setStatus] = React.useState('Open' );
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [estTime, setEstTime] = React.useState(0);
    const [priority, setPriority] = React.useState('');
    const [review, setReview] = React.useState('');
    const [timeSpent, setTimeSpent] = React.useState(0);
    const [untilDate, setUntilDate] = React.useState<Dayjs | null>(dayjs.utc(new Date()));

    const [currentlyUrgentTask, setUrgentTask] = React.useState(false);
    const [currentlyClosedTask, setClosedTask] = React.useState(false);

    //Checks If Task Is Edited

    useEffect(() => {
      if(taskToEdit){
        console.log('ENTERED TASK TO EDIT')
        setStatus(taskToEdit.status);
        setTitle(taskToEdit.title)
        setDescription(taskToEdit.description)
        setEstTime(taskToEdit.estimatedTime)
        setPriority(taskToEdit.priority)
        setReview(taskToEdit?.review as string)
        setTimeSpent(taskToEdit?.timeSpent as number)
        setUntilDate(dayjs.utc(taskToEdit.untilDate))
      }
      else{
        setStatus('Open');
        setTitle('')
        setDescription('')
        setEstTime(0)
        setPriority('')
        setReview('')
        setTimeSpent(0)
        setUntilDate(dayjs.utc(new Date()))
      }
    }, [taskIsEdited])
    
    useEffect(() => {

      if(status == 'Open'){
        setUrgentTask(false)
        setClosedTask(false)
        setUntilDate(dayjs.utc(new Date()));
        setReview('')
        setTimeSpent(0)
      }

      if(status == 'Urgent'){
        setUrgentTask(true)
        setClosedTask(false)
        setReview('')
        setTimeSpent(0)

      }

      if(status == 'Closed'){
        setUrgentTask(true)
        setClosedTask(true)
      }
    }, [status])


    const onClickSendTask = () => {
      
      sendTask()
    };

    const sendTask = async () => {
      let result;

      try{
        if(taskIsEdited){
          result = await updateTaskMutation()
          console.log('Sending edited Task')
          let task = result.data.updateTask;
          console.log(task);
          dispatch(replaceTaskToNewTask(task))
        }
        else{
          result = await createTaskMutation(); 
          dispatch(addTaskToArray(result.data.createTask));  
          console.log('Sending New Task')


        }
        handleClose();

      }
      catch(err){
        console.log(err);
        
      }
    }

    const [updateTaskMutation] = useMutation(UPDATE_TASK, {
      variables: {
        id: taskToEdit?._id,
        status: status,
        title: title,
        description: description,
        estimatedTime: estTime,
        priority: priority,
        review: currentlyClosedTask ? review : null,
        timeSpent: currentlyClosedTask ? timeSpent : null ,
        untilDate:  currentlyUrgentTask|| currentlyClosedTask ? untilDate?.toISOString() : null
      },
      
    });

    const [createTaskMutation] = useMutation(CREATE_TASK, {
      variables: {
        status: status,
        title: title,
        description: description,
        estimatedTime: estTime,
        priority: priority,
        review: currentlyClosedTask ? review : null,
        timeSpent: currentlyClosedTask ? timeSpent : null ,
        untilDate:  currentlyUrgentTask|| currentlyClosedTask ? untilDate?.toISOString() : null
      },
      
    });

    const handleClose = () => {
      dispatch(closeFormDialogBox());
      dispatch(updateTaskToEditId(''))   
 
    };

    const onChangeStatus = (event: SelectChangeEvent) => {
      setStatus(event.target.value);
    };

    const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    };

    const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDescription(event.target.value);
    };

    const onChangeEstTime = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEstTime(event.target.valueAsNumber);
    };

    const onChangePriority = (event: SelectChangeEvent) => {
      setPriority(event.target.value);
    };

    const onChangeReview = (event: React.ChangeEvent<HTMLInputElement>) => {
      setReview(event.target.value);
    };

    const onChangeTimeSpent = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTimeSpent(event.target.valueAsNumber);
    };


    return (
      <div>
        <Dialog open={openFormState} onClose={handleClose} >
          <DialogTitle>Create Or Modify Task</DialogTitle>
          <DialogContent>

            <FormGroup sx={{ m: 1, minWidth: 400 }}>

            
            <FormControl variant="standard" >
              <InputLabel id="statusLabel">Status</InputLabel>
              <Select
                labelId="statusLabel"
                id="statusSelect"
                value={status}
                onChange={onChangeStatus}
                label="status"
              >
                <MenuItem value={"Open"}>Open</MenuItem>
                <MenuItem value={"Urgent"}>Urgent</MenuItem>
                <MenuItem value={"Closed"}>Closed</MenuItem>
              </Select>
            </FormControl>


              <TextField onChange={onChangeTitle}
                  required
                  id="standard-required"
                  label="Title"
                  value= {title}
                  variant="standard"

              />  
              <br></br>

              <TextField onChange={onChangeDescription}
                  required
                  id="standard-required"
                  label="Description"
                  value= {description}
                  variant="standard"
                />

                <br></br>

                <TextField onChange={onChangeEstTime}
                    required
                    type='number'
                    id="standard-required"
                    label="Estimated Time (hours)"
                    value= {estTime}
                    variant="standard"
                  />
                <br></br>

                <FormControl variant="standard">
                <InputLabel id="priorityLabel">Priority</InputLabel>
                <Select
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
                <br></br>

                {currentlyUrgentTask && 
                <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs.utc}>
                  <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                  <DemoItem label="Until Date">
                  <DateCalendar value={dayjs.utc(untilDate)} onChange={(newValue) => setUntilDate(newValue)} />
                  </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
                }

                {currentlyClosedTask && 
                <TextField onChange={onChangeReview}
                  id="standard-required"
                  label="Review"
                  value= {review}
                  variant="standard"
                />
                }

                <br></br>
                
                {currentlyClosedTask && 
                <TextField onChange={onChangeTimeSpent}
                    type='number'
                    id="standard-required"
                    label="Time Spent (hours)"
                    value= {timeSpent}
                    variant="standard"
                  />
                }
                <br></br>
                </FormGroup>
                  

              <br></br>


            
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={onClickSendTask}>Send</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

export default FormDialogBox;