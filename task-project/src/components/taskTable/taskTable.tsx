import "./taskTable.css";
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
import {
  updateCurrentTaskId,
  updateTaskToDeleteTitle,
} from "../../redux/tasks/tasksSlice";
import { updateAlltasks } from "../../redux/tasks/tasksSlice";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import TaskIcon from "@mui/icons-material/Task";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';

interface Props {
  tasks: Task[];
}

const TaskTable = (props: Props) => {

  //Hooks
  const topPriorityFilterPressed = useSelector(selectFilterByTopPriority);
  const openFilterPressed = useSelector(selectFilterByOpenStatus);
  const tasksState = useSelector(selectTasks);
  const dispatch = useDispatch();

  //Event Functions
  const onClickDeleteTask = (taskId: string, taskTitle: string) => {
    dispatch(updateCurrentTaskId(taskId));
    dispatch(updateTaskToDeleteTitle(taskTitle));
    dispatch(openAlertDialogBox());
  };

  const onClickEditTask = (taskId: string) => {
    dispatch(updateCurrentTaskId(taskId));
    dispatch(openFormDialogBox());
  };

  const onClickShowTask = (taskId: string) => {
    dispatch(updateCurrentTaskId(taskId));
    dispatch(openReadDialogBox());
  };

  //General Table Functions
  const filterBy = (tasksArray: Task[]) => {
    if (openFilterPressed === true) {
      return tasksArray.filter((task: Task) => task.status === "Open");
    }
    if (topPriorityFilterPressed === true) {
      return tasksArray.filter((task: Task) => task.priority === "Top");
    } else {
      return tasksArray;
    }
  };
  const filteredTasks = filterBy(tasksState.tasksArray);


  //Table Grid UI
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
        <Tooltip title="Open Task" arrow>
        <NoteAddIcon className="icon" id="openIcon" />
        </Tooltip>
      )}

      {params.row.status === "Urgent" && (
        <Tooltip title="Urgent Task" arrow>
        <PlagiarismIcon className="icon" id="urgentIcon" />
        </Tooltip>
      )}

      {params.row.status === "Closed" && (
        <Tooltip title="Closed Task" arrow>
        <TaskIcon className="icon" id="closedIcon" />
        </Tooltip>
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
    width: 70,
    renderCell: (params: GridRenderCellParams<Task>) => (
      <div>
        {params.row.priority === "Top" && (
          <Tooltip title="Top Priority" arrow>
            <KeyboardDoubleArrowUpIcon
            className="icon"
            id="priorityTop"
          />
          </Tooltip>
        )}
        {params.row.priority === "Regular" && (
          <Tooltip title="Regular Priority" arrow>
          <KeyboardArrowUpIcon
            className="icon"
            id="priorityRegular"
          />
          </Tooltip>
        )}
        {params.row.priority === "Minor" && (
          <Tooltip title="Minor Priority" arrow>
          <KeyboardArrowDownIcon
            className="icon"
            id="priorityMinor"
          />
          </Tooltip>
        )}
      </div>
    ),},
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
      filterable: false,
      renderCell: (params: GridRenderCellParams<Task>) => (
      
        <div>
          <Button
            variant="text"
            onClick={() => onClickShowTask(params.row._id as string)}>
            <Tooltip title="Show Task" arrow>
            <DescriptionIcon className="icon descriptionIcon" />
            </Tooltip>
          </Button>
          <Button
            variant="text"
            onClick={() => onClickEditTask(params.row._id as string)}>
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

      {filteredTasks.length === 0 && (
        <h1 className="sorrySign">Sorry , No Tasks Found</h1>
      )}
    </div>
  );
};

export default TaskTable;
