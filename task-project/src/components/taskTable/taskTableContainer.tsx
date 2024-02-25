import "./taskTable.css";
import TaskTable from "./taskTable";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_TASKS_LIST, QUERY_TASKS_LIST_BY_KEYWORD, QUERY_TASKS_LIST_BY_KEYWORD_AND_FILTERS } from "../../graphql/tasks";
import { useDispatch, useSelector } from "react-redux";
import { updateErrorAlertMessage } from "../../redux/web/webSlice";
import { useEffect, useState } from "react";
import { Task } from '../../model/task';
import {useLazyQuery, useSubscription} from '@apollo/client';
import { TASK_CREATED, TASK_UPDATED, TASK_DELETED } from "../../graphql/subscriptions";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Button from "@mui/material/Button";
import FormDialogBox from "../dialogBox/formDialogBox/formDialogBox";
import { selectFilters, selectSearchByKeyWord } from "../../redux/tasks/tasksSelectors";


const TaskTableContainer = () => {

  //Hooks

  //Request Functions
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [isFormDialogBoxOpen, setIsFormDialogBoxOpen] = useState<boolean>(false);
  const searchKeyword = useSelector(selectSearchByKeyWord);
  const filters = useSelector(selectFilters);

  // const [getMatchingTasks, matchingTasksResult] = useLazyQuery(
  //   QUERY_TASKS_LIST_BY_KEYWORD,
  //   { variables: { keyword: searchKeyword } }
  // );


  const { data, error, loading } = useQuery(QUERY_TASKS_LIST_BY_KEYWORD_AND_FILTERS,
    { variables: { keyword: searchKeyword , filters: filters } });

  useEffect(() => {
    setTasksList(data && data.tasksByKeywordAndFilters);
  }, [data])



  // useEffect(() => {
  //   getMatchingTasks();

  //   if (matchingTasksResult.data) {
  //     setTasksList(matchingTasksResult.data.tasksByKeyword)

  //   }
    
  // }, [searchKeyword])
  //Subscriptions

  // const getTasksByKeyword = async () => {
  //   try{
  //     await getMatchingTasks({ fetchPolicy: "no-cache" });
  //     setTasksList(matchingTasksResult.data.tasksByKeyword)
  //   }
  //   catch (error) {
  //     console.log(error)
  //   }
  // }

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

    //Event Functions
    const onClickOpenForm = () => {
      setIsFormDialogBoxOpen(true);
    };
  
  return(
    <div>
      <FormDialogBox 
        isOpenForm = {isFormDialogBoxOpen}
        setIsOpenForm={setIsFormDialogBoxOpen}
      />

    
      <div className="addTaskContainer">
        <Button
        variant="text"
        onClick={onClickOpenForm}
        id="addTaskButton">
        <span className="actionBarText" > Add Task</span> &nbsp;
          <AddBoxIcon id="addTaskIcon" />
        </Button>
        
        &nbsp;&nbsp;

      </div>

    {error && (
          <div className="errorAlert">Sorry, An Error Occured, Please Check Your Internet Connection</div>
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

    {tasksList && (
      <TaskTable tasks={tasksList}/>
    )}

    </div>

  )

};

export default TaskTableContainer;
