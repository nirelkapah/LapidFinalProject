import * as React from 'react';
import TaskTable from './taskTable';
import {useQuery} from '@apollo/react-hooks'
import {QUERY_TASKS_LIST} from './tasksQuery'
import type { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { updateAlltasks } from '../../redux/tasks/tasksSlice'
import { Task } from '../../model/task';

const TaskTableContainer = () => {
  
  const dispatch = useDispatch()

  const { data, error, loading } = useQuery(QUERY_TASKS_LIST);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  // const tasks = useSelector((state: RootState) => state.tasker.tasks);
  // console.log("This Is The Global State Without Update");
  // console.log(tasks);

  dispatch(updateAlltasks(data.tasks))

  return <TaskTable />;
};

export default TaskTableContainer;