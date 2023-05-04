import "./taskTable.css";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Task } from "../../model/task";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  selectFilterByOpenStatus,
  selectFilterByTopPriority,
  selectTasks,
} from "../../redux/tasks/tasksSelectors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  openAlertDialogBox,
  openFormDialogBox,
  openReadDialogBox,
} from "../../redux/web/webSlice";
import { gql, useMutation } from "@apollo/client";
import { DELETE_TASK } from "../../graphql/tasksQuery";
import { forwardRef, useImperativeHandle } from "react";
import {
  updateCurrentTaskId,
  updateTaskToDeleteId,
  updateTaskToDeleteTitle,
  updateTaskToEditId,
} from "../../redux/tasks/tasksSlice";
import { updateAlltasks } from "../../redux/tasks/tasksSlice";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import TaskIcon from "@mui/icons-material/Task";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Button } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import ReadDialogBox from "../dialogBox/readDialogBox/readDialogBox";
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';


interface Props {
  tasks: Task[];
}

const TaskTable = (props: Props) => {
  const topPriorityFilterPressed = useSelector(selectFilterByTopPriority);
  const openFilterPressed = useSelector(selectFilterByOpenStatus);

  const tasksState = useSelector(selectTasks);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateAlltasks(props.tasks));
  }, []);

  const onClickDeleteTask = (taskId: string, taskTitle: string) => {
    dispatch(updateTaskToDeleteId(taskId));
    dispatch(updateTaskToDeleteTitle(taskTitle));
    dispatch(openAlertDialogBox());
  };

  const onClickEditTask = (taskId: string) => {
    dispatch(updateTaskToEditId(taskId));
    dispatch(openFormDialogBox());
  };

  const onClickShowTask = (taskId: string) => {
    dispatch(updateCurrentTaskId(taskId));
    dispatch(openReadDialogBox());
  };

  const filterBy = (tasksArray: Task[]) => {
    if (openFilterPressed == true) {
      return tasksArray.filter((task: Task) => task.status == "Open");
    }
    if (topPriorityFilterPressed == true) {
      return tasksArray.filter((task: Task) => task.priority == "Top");
    } else {
      return tasksArray;
    }
  };

  const columns: GridColDef[] = [
    { field: 'type',
     headerName: 'Type',
     filterable: false,
     sortable: false,
     headerAlign: 'center',
     align: 'center',
     renderCell: (params: GridRenderCellParams<Task>) => (
      <div>
      {params.row.status === "Open" && (
        <NoteAddIcon className="icon" id="openIcon" />
      )}

      {params.row.status === "Urgent" && (
        <PlagiarismIcon className="icon" id="urgentIcon" />
      )}

      {params.row.status === "Closed" && (
        <TaskIcon className="icon" id="closedIcon" />
      )}
      </div>
     ),
    width: 70 },

    { field: 'priority', 
    headerName: 'Priority', 
    filterable: false,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams<Task>) => (
      <div>
        {params.row.priority === "Top" && (
                      <KeyboardDoubleArrowUpIcon
                        className="icon"
                        id="priorityTop"
                      />
                    )}

        {params.row.priority === "Regular" && (
          <KeyboardArrowUpIcon
            className="icon"
            id="priorityRegular"
          />
        )}

        {params.row.priority === "Minor" && (
          <KeyboardArrowDownIcon
            className="icon"
            id="priorityMinor"
          />
        )}

      </div>
    ),
    width: 70 },
    { field: 'title', headerName: 'Title', width: 150, headerAlign: 'center',align: 'center', },
    { field: 'description', 
      headerName: 'Description', 
      width: 320, 
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<Task>) => (
        <p className="descriptionCellField">{params.row.description}</p>
      ), },
    { field: 'status', headerName: 'Status', width: 70 , headerAlign: 'center',align: 'center' },
    {
      field: 'estimatedTime',
      headerName: 'Estimated Time (h)',
      headerAlign: 'center',
      align: 'center',
      width: 140,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<Task>) => (
      
        <div>
  
                      <Button
                        variant="text"
                        onClick={() => onClickShowTask(params.row._id as string)}
                      >
                        <Tooltip title="Show Task" arrow>
                        <DescriptionIcon className="icon descriptionIcon" />
                        </Tooltip>
                      </Button>
  
                      <Button
                        variant="text"
                        onClick={() => onClickEditTask(params.row._id as string)}
                      >
                        <Tooltip title="Edit Task" arrow>
                        <EditIcon className="icon editIcon" />
                        </Tooltip>
                      </Button>

                      <Button
                        variant="text"
                        onClick={() =>
                          onClickDeleteTask(
                            params.row._id as string,
                            params.row.title as string
                          )
                        }
                      >
                        <Tooltip title="Delete Task" arrow>
                        <DeleteIcon className="icon trashIcon" />
                        </Tooltip>
                      </Button>
        </div>
        
        )
        
    },
  ];

  const filteredTasks = filterBy(tasksState.tasksArray);

  return (
    <div className="tableContainer">
      
      {filteredTasks.length > 0 &&
      <p className="ResultsCount">
        {" "}
        There Are Currently: {filteredTasks.length} Results
      </p>}

      {filteredTasks.length > 0 &&
      <DataGrid
        className="table"
        rows={filteredTasks}
        getRowId={(filteredTasks) => filteredTasks._id}        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 4 },
          },
        }}
        autoHeight
        pageSizeOptions={[4, 8]}
      />}

      {filteredTasks.length == 0 && (
        <h1 className="sorrySign">Sorry , No Tasks Found</h1>
      )}
    </div>
  );
};

export default TaskTable;
