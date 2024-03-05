import { Task } from "../../model/task";
import { Dispatch, SetStateAction, useState } from "react";
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
import { headerTableCell } from "./columns/headerColumns";
import { bodyTableCell } from "./columns/bodyColumns";
import { ColumnType, SortType } from "../../model/sort";

interface taskTableProps {
  tasks: Task[];
  setTasksList: Dispatch<SetStateAction<Task[]>>;
}

const TaskTable = (props: taskTableProps) => {
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [isReadDialogOpen, setIsReadDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task>();
  const [sortBy, setSortBy] = useState<SortType>({orderType: 'status', direction: 'down'});
  const propsTasks: Task[] = props.tasks;

  const titles: ColumnType[] = ['status', 'priority', 'title', 'description', 'estimatedTime']

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

  return (
    <Grid container justifyContent={"flex-start"}>
      <Grid item xs={12}>
        <FormDialogBox 
          isOpenForm = {isEditFormOpen}
          setIsOpenForm={setIsEditFormOpen}
          task={currentTask}/>

        <VerifyDialogBox 
          isDeleteDialogOpen={isDeleteDialogOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          task={currentTask}/>

        <ReadDialogBox 
          isReadDialogBoxOpen = {isReadDialogOpen}
          setIsReadDialogBoxOpen={setIsReadDialogOpen}
          task={currentTask}/>
      </Grid>

      <Grid item xs={12} textAlign={'left'}>
        <Box m={1}>
            <Typography fontWeight={'light'} color={'white'}>
            There Are Currently: {propsTasks && propsTasks.length} Results
            </Typography>
        </Box>


        <TableContainer component={Paper} style={{maxHeight: 350}}>
        <Table  aria-label="simple table">

          <TableHead>
            <TableRow>
              {titles.map((title: ColumnType) => headerTableCell.getSortbaleColumn(title, setSortBy, sortBy))}
              {headerTableCell.getColumn('Actions')}
            </TableRow>
          </TableHead>

          <TableBody>
            {headerTableCell.OrderByArray(propsTasks, sortBy.orderType, sortBy.direction).map((task) => (
              <TableRow
                key={task._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {bodyTableCell.getStatusCell(task.status)}
                {bodyTableCell.getPriorityCell(task.priority)}
                {bodyTableCell.getRegularCell(task.title)}
                {bodyTableCell.getRegularCell(task.description)}
                {bodyTableCell.getRegularCell(task.estimatedTime)}
                {bodyTableCell.getActionsCell(task, onClickShowTask, onClickEditTask, onClickDeleteTask)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    
      </Grid>
    </Grid>
  );
};

export default TaskTable;
