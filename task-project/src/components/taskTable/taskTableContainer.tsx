import "../../index.css";
import TaskTable from "./taskTable";
import { useQuery} from "@apollo/react-hooks";
import { QUERY_TASKS_LIST_BY_KEYWORD_AND_FILTERS, QUERY_TASK_BY_ID } from "../../graphql/queries";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Task } from '../../model/task';
import { useSubscription, SubscribeToMoreOptions} from '@apollo/client';
import { TASK_CREATED, TASK_UPDATED, TASK_DELETED } from "../../graphql/subscriptions";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Button from "@mui/material/Button";
import FormDialogBox from "../dialogBox/formDialogBox/formDialogBox";
import { selectFilters, selectSearchByKeyWord } from "../../redux/tasks/tasksSelectors";
import { Grid, Typography } from "@mui/material";
import { Filters, keywordAndFilters } from "../../model/filters";

const TaskTableContainer = () => {

  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [isFormDialogBoxOpen, setIsFormDialogBoxOpen] = useState<boolean>(false);
  const searchKeyword: string = useSelector(selectSearchByKeyWord);
  const filters: Filters = useSelector(selectFilters);
  const [keywordAndFilterValues, setKeywordAndFilterValues] = useState<keywordAndFilters>({keyword: searchKeyword , filters: filters});

  const { data, error, loading, refetch } = useQuery(QUERY_TASKS_LIST_BY_KEYWORD_AND_FILTERS,
    {variables: { keyword: searchKeyword , filters: filters }, fetchPolicy: 'no-cache' }, );

  useEffect(() => {
    data && setTasksList(data.tasksByKeywordAndFilters);
    setKeywordAndFilterValues({keyword: searchKeyword , filters: filters});

  }, [data && data.tasksByKeywordAndFilters]);

  const { data: taskCreated} = useSubscription(TASK_CREATED,{variables: keywordAndFilterValues,});
  const { data: taskDeleted} = useSubscription(TASK_DELETED,{variables: keywordAndFilterValues,});
  const { data: taskUpdated} = useSubscription(TASK_UPDATED,{variables: keywordAndFilterValues,});

  useEffect(() => {
    (taskCreated || taskUpdated) && refetch();
    taskDeleted && deleteTask(taskDeleted.taskDeleted);
  }, [taskCreated, taskDeleted, taskUpdated]);

  const deleteTask = (taskId: string) => {
    let temporaryTasksList = [...tasksList];
    let removeIndex = temporaryTasksList.map((task) => task._id).indexOf(taskId);
    removeIndex !== -1 &&
    temporaryTasksList.splice(removeIndex, 1);
    setTasksList(temporaryTasksList);
  }

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
              <Typography color={'white'} fontSize={'20px'} fontWeight={100}>Sorry, An Error Occured, Please Check Your Internet Connection</Typography>
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

        {(tasksList && !loading && !error) && (
          <TaskTable 
            tasks={tasksList}
            />
        )}
      </Grid>

    
    </Grid>
  )
};

export default TaskTableContainer;
