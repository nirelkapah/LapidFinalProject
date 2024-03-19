import { Task } from "../../model/task";
import { Dispatch, SetStateAction, useState } from "react";
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import FormDialogBox from "../dialogBox/formDialogBox/formDialogBox";
import VerifyDialogBox from "../dialogBox/verifyDialogBox/verifyDialogBox";
import ReadDialogBox from "../dialogBox/readDialogBox/readDialogBox";
import { regularColumn, sortColumn } from "./columns/headerColumns";
import { regularTableCell, statusTableCell, priorityTableCell, actionsTableCell } from "./columns/bodyColumns";
import { ColumnType, SortType } from "../../model/sort";

interface taskTableProps {
  tasks: Task[];
}

const TaskTable = ({tasks}: taskTableProps) => {
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [isReadDialogOpen, setIsReadDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task>();
  const [sortBy, setSortBy] = useState<SortType>({orderType: 'status', direction: 'down'});

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


      {(tasks && (tasks.length === 0)) && (
      <Grid item  alignItems={'center'} xs={12}>
        <Typography color={'white'} fontSize={'20px'} fontWeight={100}>Sorry, There are no Matching Tasks</Typography>
      </Grid>

        )
      }
        
        

      {tasks && tasks.length > 0 &&
        <Grid item textAlign={'left'} xs={12}>
          <Box m={1}>
          <Typography fontWeight={'light'} color={'white'}>
          There Are Currently: {tasks && tasks.length} Results
          </Typography>
          </Box>

          <TableContainer component={Paper} style={{maxHeight: 350}}>
          <Table  aria-label="simple table">

            <TableHead>
              <TableRow>
                {titles.map((title: ColumnType) => sortColumn.get(title, setSortBy, sortBy))}
                {regularColumn.get('Actions')}
              </TableRow>
            </TableHead>

            <TableBody>
                {sortColumn.OrderByArray([...tasks], sortBy.orderType, sortBy.direction).map((task) => (
                  <TableRow
                    key={task._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                  {statusTableCell.get(task.status)}
                  {priorityTableCell.get(task.priority)}
                  {regularTableCell.get(task.title)}
                  {regularTableCell.get(task.description)}
                  {regularTableCell.get(task.estimatedTime)}
                  {actionsTableCell.get(task, onClickShowTask, onClickEditTask, onClickDeleteTask)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      }
    
      </Grid>
  );
};

export default TaskTable;
