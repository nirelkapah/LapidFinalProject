import "../../index.css";
import TaskTable from "./taskTable";
import { useQuery, useLazyQuery  } from "@apollo/react-hooks";
import { QUERY_TASKS_LIST_BY_KEYWORD_AND_FILTERS, QUERY_TASK_BY_ID } from "../../graphql/queries";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Task } from '../../model/task';
import { useSubscription} from '@apollo/client';
import { TASK_CREATED, TASK_UPDATED, TASK_DELETED } from "../../graphql/subscriptions";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Button from "@mui/material/Button";
import FormDialogBox from "../dialogBox/formDialogBox/formDialogBox";
import { selectFilters, selectSearchByKeyWord } from "../../redux/tasks/tasksSelectors";
import { Grid, Typography } from "@mui/material";
import { Filters, PriorityOptions, StatusOptions } from "../../model/filters";


const TaskTableContainer = () => {

  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [isFormDialogBoxOpen, setIsFormDialogBoxOpen] = useState<boolean>(false);
  const searchKeyword: string = useSelector(selectSearchByKeyWord);
  const filters: Filters = useSelector(selectFilters);

  const { data, error, loading, refetch } = useQuery(QUERY_TASKS_LIST_BY_KEYWORD_AND_FILTERS,
    {variables: { keyword: searchKeyword , filters: filters }, fetchPolicy: 'no-cache' }, );
  
  // const [loadTask, { data: modiefiedTaskData }] = useLazyQuery(QUERY_TASK_BY_ID, {fetchPolicy: 'no-cache'});


  useEffect(() => {
    data && setTasksList(data.tasksByKeywordAndFilters);
  }, [data && data.tasksByKeywordAndFilters]);

  // const isMatchingTaskToFiltersAndSearch = (task: Task, taskPriority: PriorityOptions, taskStatus: StatusOptions): boolean => {
  //   if((filters.priority.length > 0) && filters.priority.indexOf(taskPriority) ===-1 || 
  //   ((filters.status.length > 0) && filters.status.indexOf(taskStatus) === -1) ||
  //   ((searchKeyword !=="") && !(task.description || task.status || task.title || task.priority).includes(searchKeyword))){
  //     return false
  //   }
  //   else{
  //     return true
  //   }
  // }
  // useEffect(() => {
  //   if(modiefiedTaskData && modiefiedTaskData.taskById) {
  //     const task = modiefiedTaskData.taskById;
  //     if(isMatchingTaskToFiltersAndSearch(task, task.priority, task.status)){
  //       let temporaryTasksList = [...tasksList];
  //       const matchingTaskIndex = temporaryTasksList.map((task) => task._id).indexOf(task._id);
  //       matchingTaskIndex !== -1 ? temporaryTasksList.splice(matchingTaskIndex, 1, task): temporaryTasksList.push(task);
  //       setTasksList(temporaryTasksList);
  //     } 
  //   }
  // },[modiefiedTaskData && modiefiedTaskData.taskById])

  useSubscription(
    TASK_CREATED, {
      onSubscriptionData: (data) => {
          const idNumber: string = data.subscriptionData.data.taskCreated;
          // loadTask({ variables: { taskId: idNumber } });
          refetch();


      }
    }
  )


  useSubscription(
    TASK_DELETED, {
      onSubscriptionData: (data) => {
        const idNumber: string = data.subscriptionData.data.taskDeleted;
        // let temporaryTasksList = [...tasksList];
        // let removeIndex = temporaryTasksList.map((task) => task._id).indexOf(idNumber);
        // temporaryTasksList.splice(removeIndex, 1);
        // setTasksList(temporaryTasksList);
        refetch();
      }
    }
  )

  useSubscription( 
    TASK_UPDATED, {
      onSubscriptionData: (data) => {
        const idNumber: string = data.subscriptionData.data.taskUpdated;
        // loadTask({ variables: { taskId: idNumber } });
        refetch();

      }
    }
  )

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
        style={{border: 'white', backgroundColor: '#00c0a6'}}
        >
        <Typography color={'white'} fontWeight={'light'}> Add Task</Typography> &nbsp;
          <AddBoxIcon style={{marginLeft: '5px', color: 'white' ,height: '20px'}} />
        </Button>
      
      </Grid>

      <Grid item m={0.5} textAlign={'center'}>
          {error && (
              <Typography color={'white'} fontSize={'20px'} fontWeight={100}>Sorry, An Error Occured, Please Check Your Internet Connection</Typography>
          )
          }

          {(tasksList && (tasksList.length === 0 && !error)) && (
              <Typography color={'white'} fontSize={'20px'} fontWeight={100}>Sorry, There are no Matching Tasks</Typography>
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

        {(tasksList && tasksList.length > 0) && (
          <TaskTable 
            tasks={tasksList}
            setTasksList={setTasksList}
            />
        )}
    </Grid>

    
    </Grid>
  )
};

export default TaskTableContainer;
