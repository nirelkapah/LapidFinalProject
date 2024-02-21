import "./taskTable.css";
import TaskTable from "./taskTable";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_TASKS_LIST } from "../../graphql/tasks";
import { useDispatch } from "react-redux";
import { updateErrorAlertMessage } from "../../redux/web/webSlice";
import { useEffect, useState } from "react";
import { Task } from '../../model/task';
import {useSubscription} from '@apollo/client';
import { TASK_CREATED, TASK_UPDATED, TASK_DELETED } from "../../graphql/subscriptions";


const TaskTableContainer = () => {

  //Hooks
  // const dispatch = useDispatch();

  //Request Functions
  const [tasksList, setTasksList] = useState<Task[]>([]);
  
  const { data, error, loading } = useQuery(QUERY_TASKS_LIST);

  useEffect(() => {
    setTasksList(data && data.tasks);
  }, [data])

  //Subscriptions

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

  useSubscription( //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!NEED CHECK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
  
  return(
    <div>

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
