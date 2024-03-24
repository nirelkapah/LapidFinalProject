import { useMutation } from "@apollo/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { DELETE_TASK } from "../graphql/mutations";
import { useDispatch } from "react-redux";
import { updateErrorAlertMessage, updateSuccessAlertMessage } from "../redux/web/webSlice";

interface useDeleteTaskProps {
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>, 
  taskId?: string
}

export const useDeleteTask = ({setIsDeleteDialogOpen, taskId}: useDeleteTaskProps) => {
    const dispatch = useDispatch();

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

    return {removeTask}

}