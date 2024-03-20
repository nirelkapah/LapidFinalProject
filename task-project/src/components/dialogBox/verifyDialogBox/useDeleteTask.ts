import { useMutation } from "@apollo/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { DELETE_TASK } from "../../../graphql/mutations";
import { Task } from "../../../gql/graphql";
import { useDispatch } from "react-redux";
import { updateErrorAlertMessage, updateSuccessAlertMessage } from "../../../redux/web/webSlice";


export const useDeleteTask = (setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>, taskId?: string) => {
    const dispatch = useDispatch();

    const [deleteTask, setDeleteTask] = useState<boolean>(false);

    useEffect(()=> {
        deleteTask && removeTask();
    },[deleteTask])

    const removeTask = async () => {
        try {
          await deleteTaskMutation();
          dispatch(updateSuccessAlertMessage("Task Deleted Succesfuly"));
          setIsDeleteDialogOpen(false)

        } catch (err) {
          let errorMessage = (err as Error).message;
          dispatch(updateErrorAlertMessage(errorMessage));
        }
      };
    
    const [deleteTaskMutation] = useMutation(DELETE_TASK, {
        variables: {
          id: taskId,
        },
      });

    return setDeleteTask

}