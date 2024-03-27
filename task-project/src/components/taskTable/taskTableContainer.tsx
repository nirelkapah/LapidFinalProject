import "../../index.css";
import TaskTable from "./taskTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Task } from '../../model/task';
import { useSubscription, useQuery} from '@apollo/client';
import { TASK_CREATED, TASK_UPDATED, TASK_DELETED } from "../../graphql/subscriptions";
import { QUERY_TASK_BY_ID , QUERY_TASK_BY_ID_KEYWORD_AND_FILTERS} from "../../graphql/queries";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Button from "@mui/material/Button";
import FormDialogBox from "../dialogBox/formDialogBox/formDialogBox";
import { selectFilters, selectSearchByKeyWord } from "../../redux/filters/filtersSelectors";
import { Grid, Typography } from "@mui/material";
import { Filters, keywordAndFilters } from "../../model/filters";
import { selectTasks, selectTasksError, selectTasksLoading } from "../../redux/tasks/tasksSelectors";
import { triggerRefetch, removeTask, addTask} from "../../redux/tasks/tasksSlice";
import {apolloClient} from '../../main'

const TaskTableContainer = () => {

  const dispatch = useDispatch();
  const [isFormDialogBoxOpen, setIsFormDialogBoxOpen] = useState<boolean>(false);
  const searchKeyword: string = useSelector(selectSearchByKeyWord);
  const filters: Filters = useSelector(selectFilters);
  
  const loading : boolean = useSelector(selectTasksLoading);
  const tasksList: Task[] = useSelector(selectTasks);
  const error : boolean = useSelector(selectTasksError);

  const [keywordAndFilterValues, setKeywordAndFilterValues] = useState<keywordAndFilters>({keyword: searchKeyword , filters: filters});
  const [taskToFetchId, setTaskToFetchId] = useState<string>('');
  const { data: taskCreated} = useSubscription(TASK_CREATED,{variables: keywordAndFilterValues});
  const { data: taskDeleted} = useSubscription(TASK_DELETED,{variables: keywordAndFilterValues});
  const { data: taskUpdated} = useSubscription(TASK_UPDATED,{variables: keywordAndFilterValues});

  useEffect(() => {
    setKeywordAndFilterValues({keyword: searchKeyword , filters: filters});
  }, [filters, searchKeyword]);


  // const isQuery: boolean = () => taskToFetch ? true : false

  // const {data: taskFetchResult, refetch} = useQuery(QUERY_TASK_BY_ID, {fetchPolicy: 'no-cache', skip: !executeQuery});

  // useEffect(() => {
  //   taskFetchResult && dispatch(addTask(taskFetchResult.taskById))
  // }, [taskFetchResult]);

  // useEffect(() => {taskToFetch && refetch({taskId: taskToFetch})})
  const fetchTask = async (taskId: string) => {
    try {
      const { data } = await apolloClient.query({
        query: QUERY_TASK_BY_ID_KEYWORD_AND_FILTERS,
        variables: {taskByIdKeywordAndFiltersId: taskId, keyword: searchKeyword, filters: filters},
        fetchPolicy: 'no-cache',
      });
      console.log(data)
      data.taskByIdKeywordAndFilters ? 
      dispatch(addTask(data.taskByIdKeywordAndFilters)) :
      dispatch(removeTask(taskId))
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // setExecuteQuery(true);
    // taskCreated && refetch({taskId: taskCreated.taskCreated})
    // taskCreated && setTaskToFetchId(taskCreated.taskCreated)
    taskCreated && fetchTask(taskCreated.taskCreated);

      
    // refetch({taskId: taskCreated.taskCreated});
    // taskToFetch && refetch();
  }, [taskCreated])

  useEffect(() => {
    console.log(taskUpdated);
    taskUpdated && fetchTask(taskUpdated.taskUpdated)

    // taskUpdated && dispatch(triggerRefetch())
  }, [taskUpdated])

  useEffect(() => {
    taskDeleted && dispatch(removeTask(taskDeleted.taskDeleted))
  }, [taskDeleted])



  // useEffect(() => {
  //   if (taskToFetchId) {
  //     const fetchData = async () => {
  //       try {
  //         const { data } = await apolloClient.query({
  //           query: QUERY_TASK_BY_ID_KEYWORD_AND_FILTERS,
  //           variables: {taskByIdKeywordAndFiltersId: taskToFetchId, keyword: searchKeyword, filters: filters},
  //           fetchPolicy: 'no-cache',
  //         });
  //         console.log(data)
  //         data.taskByIdKeywordAndFilters ? 
  //         dispatch(addTask(data.taskByIdKeywordAndFilters)) :
  //         dispatch(removeTask(taskToFetchId))
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //     };
  //     fetchData();
  //   }
  // }, [taskCreated, taskUpdated]); // Only execute when executeQuery changes

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
