import "../../index.css";
import TaskTable from "./taskTable";
import { useQuery} from "@apollo/react-hooks";
import { QUERY_TASKS_LIST_BY_KEYWORD_AND_FILTERS, QUERY_TASK_BY_ID } from "../../graphql/queries";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Task } from '../../model/task';
import { useSubscription, SubscribeToMoreOptions} from '@apollo/client';
import { TASK_CREATED, TASK_UPDATED, TASK_DELETED } from "../../graphql/subscriptions";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Button from "@mui/material/Button";
import FormDialogBox from "../dialogBox/formDialogBox/formDialogBox";
import { selectFilters, selectSearchByKeyWord } from "../../redux/filters/filtersSelectors";
import { Grid, Typography } from "@mui/material";
import { Filters, keywordAndFilters } from "../../model/filters";
import { selectTasks, selectTasksError, selectTasksLoading } from "../../redux/tasks/tasksSelectors";
import { triggerRefetch, removeTask } from "../../redux/tasks/tasksSlice";

const TaskTableContainer = () => {

  const dispatch = useDispatch();
  const [isFormDialogBoxOpen, setIsFormDialogBoxOpen] = useState<boolean>(false);
  const searchKeyword: string = useSelector(selectSearchByKeyWord);
  const filters: Filters = useSelector(selectFilters);
  const loading : boolean = useSelector(selectTasksLoading);
  const tasksList: Task[] = useSelector(selectTasks);
  const error : boolean = useSelector(selectTasksError);

  const [keywordAndFilterValues, setKeywordAndFilterValues] = useState<keywordAndFilters>({keyword: searchKeyword , filters: filters});

  useEffect(() => {
    setKeywordAndFilterValues({keyword: searchKeyword , filters: filters});
  }, [filters || searchKeyword]);

  const { data: taskCreated} = useSubscription(TASK_CREATED,{variables: keywordAndFilterValues,});
  const { data: taskDeleted} = useSubscription(TASK_DELETED,{variables: keywordAndFilterValues,});
  const { data: taskUpdated} = useSubscription(TASK_UPDATED,{variables: keywordAndFilterValues,});

  useEffect(() => {
    taskCreated && dispatch(triggerRefetch())
  }, [taskCreated])

  useEffect(() => {
    taskUpdated && dispatch(triggerRefetch())
  }, [taskUpdated])

  useEffect(() => {
    taskDeleted && dispatch(removeTask(taskDeleted.taskDeleted))
  }, [taskDeleted])

  const onClickOpenForm = () => {
    setIsFormDialogBoxOpen(true);
  };
  
  return(
    <Grid container justifyContent={'center'} m={1} direction={'column'}>
      <FormDialogBox 
        isOpenForm = {isFormDialogBoxOpen}
        setIsOpenForm={setIsFormDialogBoxOpen}
    />

    
    <Grid item m={0.5} >

      <Button
      variant="text"
      onClick={onClickOpenForm}
      id="addTaskButton"
      sx={{border: 'white', backgroundColor: '#00c0a6'}}
      >
      <Typography color={'white'} fontWeight={'light'}> Add Task</Typography> &nbsp;
        <AddBoxIcon sx={{marginLeft: '5px', color: 'white' ,height: '20px'}} />
      </Button>
      
    </Grid>

    <Grid item m={0.5} textAlign={'center'}>
          {error && (
              <Typography color={'white'} fontSize={'20px'} fontWeight={100}>Please Check Your Internet Connection</Typography>
          )
          }

          {loading && (
                <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                </div>
          )}

        {(tasksList && !loading && !error) &&(
            <TaskTable 
              tasks={tasksList}
              />
          )}

        
      </Grid>

    
    </Grid>
  )
};

export default TaskTableContainer;
