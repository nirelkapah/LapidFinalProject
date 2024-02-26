import "../../index.css";
import TaskTable from "./taskTable";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_TASKS_LIST_BY_KEYWORD_AND_FILTERS } from "../../graphql/tasks";
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

const TaskTableContainer = () => {

  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [isFormDialogBoxOpen, setIsFormDialogBoxOpen] = useState<boolean>(false);
  const searchKeyword = useSelector(selectSearchByKeyWord);
  const filters = useSelector(selectFilters);

  const { data, error, loading } = useQuery(QUERY_TASKS_LIST_BY_KEYWORD_AND_FILTERS,
    { variables: { keyword: searchKeyword , filters: filters } });

  useEffect(() => {
    setTasksList(data && data.tasksByKeywordAndFilters);
  }, [data]);

  useSubscription(
    TASK_CREATED, {
      onSubscriptionData: (data) => {
          const task: Task = data.subscriptionData.data.taskCreated;
          const updatedTasksList = [...tasksList, task];
          setTasksList(updatedTasksList);
      }
    }
  )


  useSubscription(
    TASK_DELETED, {
      onSubscriptionData: (data) => {
        const idNumber: string = data.subscriptionData.data.taskDeleted;
        let temporaryTasksList = [...tasksList];
        let removeIndex = temporaryTasksList.map((task) => task._id).indexOf(idNumber);
        temporaryTasksList.splice(removeIndex, 1);
        setTasksList(temporaryTasksList);
      }
    }
  )

  useSubscription( 
    TASK_UPDATED, {
      onSubscriptionData: (data) => {
        const task: Task = data.subscriptionData.data.taskDeleted;
        console.log(task);
        let temporaryTasksList = [...tasksList];
        let replaceIndex = temporaryTasksList.map((task) => task._id).indexOf(task._id);
        temporaryTasksList.splice(replaceIndex, 1, task);
        setTasksList(temporaryTasksList);
      }
    }
  )

    const onClickOpenForm = () => {
      setIsFormDialogBoxOpen(true);
    };
  
  return(
    <Grid container justifyContent={'center'} m={1}>
      <FormDialogBox 
        isOpenForm = {isFormDialogBoxOpen}
        setIsOpenForm={setIsFormDialogBoxOpen}
      />

    
      <Grid container m={0.5} >
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

      {error && (
          <Typography color={'white'} fontSize={'20px'} fontWeight={100}>Sorry, An Error Occured, Please Check Your Internet Connection</Typography>
      )
      }

      {(tasksList && tasksList.length === 0) && (
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
  )
};

export default TaskTableContainer;
