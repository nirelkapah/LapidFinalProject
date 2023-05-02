import "./taskTable.css";
import * as React from "react";
import TaskTable from "./taskTable";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_TASKS_LIST } from "../../graphql/tasksQuery";
import type { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { updateAlltasks } from "../../redux/tasks/tasksSlice";
import { Task } from "../../model/task";
import { updateErrorAlertMessage } from "../../redux/web/webSlice";

const TaskTableContainer = () => {
  const dispatch = useDispatch();
  const { data, error, loading } = useQuery(QUERY_TASKS_LIST);

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

    return <div>Sorry, An Error Occured</div>;
  }

  // const tasks = useSelector((state: RootState) => state.tasker.tasks);
  // console.log("This Is The Global State Without Update");
  // console.log(tasks);

  // dispatch(updateAlltasks(data.tasks))

  return <TaskTable tasks={data.tasks} />;
};

export default TaskTableContainer;
