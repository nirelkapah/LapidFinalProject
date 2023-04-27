import React from 'react'
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
import { CREATE_TASK, SEND_NEW_TASK } from '../../graphql/tasksQuery';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import moment from 'moment';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import utc from 'dayjs/plugin/utc';
import { AddTask } from '@mui/icons-material';
import { addTaskToArray } from '../../redux/tasks/tasksSlice';




const FormDialogBox = () => {
  
    //global state
    const openFormState = useSelector(selectOpenFormDialogBox);
    const dispatch = useDispatch()
    dayjs.extend(utc);

    //local state
    const [status, setStatus] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [estTime, setEstTime] = React.useState(0);
    const [priority, setPriority] = React.useState('');
    const [review, setReview] = React.useState('');
    const [timeSpent, setTimeSpent] = React.useState(0);
    const [untilDate, setUntilDate] = React.useState<Dayjs | null>(dayjs.utc('2022-04-17'));



    const onClickSendTask = () => {
      sendTask()
    };

    const sendTask = async () => {
      try{
        let result = await addTaskMutation(); 
        dispatch(addTaskToArray(result.data.createTask));  
        handleClose();

      }
      catch{
        console.log('Catched')
      }
    }

    const [addTaskMutation] = useMutation(CREATE_TASK, {
      variables: {
        status: status,
        title: title,
        description: description,
        estimatedTime: estTime,
        priority: priority,
        review: review,
        timeSpent: timeSpent,
        untilDate: untilDate?.toISOString()
      },
    });
    
    // if (data) { 
    //   console.log (data);
    // }
    // if (loading) {console.log(loading) }
    // if (error) {console.log(error.message)}
   

    const handleClose = () => {
      dispatch(closeFormDialogBox());   
 
    };

    // const onChangeUntilDate = ({ target: React.ChangeEvent<HTMLInputElement> }) => {
    //   const newDate = moment(target.value.timeStamp).format('YYYY-MM-DD');
    //   setUntilDate(newDate);
    //   console.log(newDate); //always log "1970-01-01"
    // };

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
                  defaultValue= {title}
                  variant="standard"

              />  
              <br></br>

              <TextField onChange={onChangeDescription}
                  required
                  id="standard-required"
                  label="Description"
                  defaultValue= {description}
                  variant="standard"
                />

                <br></br>

                <TextField onChange={onChangeEstTime}
                    required
                    type='number'
                    id="standard-required"
                    label="Estimated Time (hours)"
                    defaultValue= {estTime}
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

                <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs.utc}>
                  <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                  <DemoItem label="Until Date">
                  <DateCalendar value={dayjs.utc(untilDate)} onChange={(newValue) => setUntilDate(newValue)} />
                  </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>

                <TextField onChange={onChangeReview}
                  id="standard-required"
                  label="Review"
                  defaultValue= {dayjs('2017-03-10')}
                  variant="standard"
                />

                <br></br>

                <TextField onChange={onChangeTimeSpent}
                    type='number'
                    id="standard-required"
                    label="Time Spent (hours)"
                    defaultValue= {timeSpent}
                    variant="standard"
                  />
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