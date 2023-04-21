import * as React from 'react';
import TaskTable from './taskTable';
import {useQuery} from '@apollo/react-hooks'
import {QUERY_TASKS_LIST} from './tasksQuery'

const TaskTableContainer = () => {
  
  const { data, error, loading } = useQuery(QUERY_TASKS_LIST)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  return <TaskTable data={data.tasks} />;
};

export default TaskTableContainer;