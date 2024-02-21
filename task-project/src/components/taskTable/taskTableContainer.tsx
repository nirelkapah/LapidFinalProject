import "./taskTable.css";
import TaskTable from "./taskTable";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_TASKS_LIST } from "../../graphql/tasks";
import { useDispatch } from "react-redux";
import { updateErrorAlertMessage } from "../../redux/web/webSlice";
import { useState } from "react";

const TaskTableContainer = () => {

  //Hooks
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([])

  //Request Functions
  const { data, error, loading } = useQuery(QUERY_TASKS_LIST);

  console.log(data);
  setTasks(data);

  if (loading) {
    return (
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
    );
  }

  if (error || !data) {
    let errorMessage = (error as Error).message;
    dispatch(updateErrorAlertMessage(errorMessage));
    return <div className="errorAlert">Sorry, An Error Occured, Please Check Your Internet Connection</div>;
  }
  
  return <TaskTable tasks={tasks}/>;

};

export default TaskTableContainer;
