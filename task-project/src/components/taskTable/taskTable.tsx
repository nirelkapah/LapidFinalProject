import { Task } from "../../model/task";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import TaskIcon from "@mui/icons-material/Task";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import Tooltip from '@mui/material/Tooltip';
import FormDialogBox from "../dialogBox/formDialogBox/formDialogBox";
import VerifyDialogBox from "../dialogBox/verifyDialogBox/verifyDialogBox";
import ReadDialogBox from "../dialogBox/readDialogBox/readDialogBox";

interface Props {
  tasks: Task[];
  setTasksList: Function;
}

const TaskTable = (props: Props) => {
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [isReadDialogOpen, setIsReadDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task>();
  //Hooks

  //Event Functions
  const onClickDeleteTask = (task: Task) => {
    setCurrentTask(task);
    setIsDeleteDialogOpen(true);
  };

  const onClickEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsEditFormOpen(true);
  };

  const onClickShowTask = (task: Task) => {
    setCurrentTask(task);
    setIsReadDialogOpen(true);
  };

  //General Table Functions

  return (
    <Grid container justifyContent={"flex-start"}>
      <FormDialogBox 
        isOpenForm = {isEditFormOpen}
        setIsOpenForm={setIsEditFormOpen}
        task={currentTask}
      />
      <VerifyDialogBox 
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        task={currentTask}
      />
      <ReadDialogBox 
        isReadDialogBoxOpen = {isReadDialogOpen}
        setIsReadDialogBoxOpen={setIsReadDialogOpen}
        task={currentTask}/>
      
      <Box m={1}>
        {" "}
          <Typography fontWeight={'light'} color={'white'}>
          There Are Currently: {props.tasks && props.tasks.length} Results
          </Typography>
      </Box>


      <TableContainer component={Paper} style={{maxHeight: 330}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell align="right">Priority</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Estimated Time (h)</TableCell>
            <TableCell align="center">Actions</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {props.tasks.map((task) => (
            <TableRow
              key={task._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">

                {task.status === "Open" && (
                  <Tooltip title="Open Task" arrow>
                  <NoteAddIcon style={{color: '00c0a6'}}/>
                  </Tooltip>
                )}

                {task.status === "Urgent" && (
                  <Tooltip title="Urgent Task" arrow>
                  <PlagiarismIcon style={{color: 'efcf00'}} />
                  </Tooltip>
                )}

                {task.status === "Closed" && (
                  <Tooltip title="Closed Task" arrow>
                  <TaskIcon  style={{color: '00bbf9'}} />
                  </Tooltip>
                )}

              </TableCell>
              
              <TableCell align="right">
                {task.priority === "Top" && (
                  <Tooltip title="Top Priority" arrow>
                    <KeyboardDoubleArrowUpIcon
                    style={{color: 'ef476f'}}
                  />
                  </Tooltip>
                )}
                {task.priority === "Regular" && (
                  <Tooltip title="Regular Priority" arrow>
                  <KeyboardArrowUpIcon style={{color: 'f8961e'}}/>
                  </Tooltip>
                )}
                {task.priority === "Minor" && (
                  <Tooltip title="Minor Priority" arrow>
                  <KeyboardArrowDownIcon style={{color: 'ffdeb9'}}/>
                  </Tooltip>
                )}
              </TableCell>
              <TableCell align="center">{task.title}</TableCell>
              <TableCell align="center">{task.description}</TableCell>
              <TableCell align="center">{task.estimatedTime}</TableCell>
              <TableCell align="center">
              <Button
                  variant="text"
                  onClick={() => onClickShowTask(task)}>
                  <Tooltip title="Show Task" arrow>
                  <DescriptionIcon  style={{color: '7046ac'}} />
                  </Tooltip>
                </Button>
                <Button
                  variant="text"
                  onClick={() => onClickEditTask(task)}>
                  <Tooltip title="Edit Task" arrow>
                  <EditIcon style={{color: 'a84bb0'}}/>
                  </Tooltip>
                </Button>
                <Button
                  variant="text"
                  onClick={() =>
                    onClickDeleteTask(
                      task
                    )
                  }
                >
                  <Tooltip title="Delete Task" arrow>
                  <DeleteIcon style={{color: 'e54fb3'}}/>
                  </Tooltip>
                </Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </Grid>
  );
};

export default TaskTable;
