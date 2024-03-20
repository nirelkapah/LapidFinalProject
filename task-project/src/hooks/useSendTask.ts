import { useDispatch } from "react-redux";
import { Task } from "../model/task";
import { updateSuccessAlertMessage } from "../redux/web/webSlice";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TASK, UPDATE_TASK } from "../graphql/mutations";

interface useSendTaskProps{
    formTask: Task, 
    setFormTask: Dispatch<SetStateAction<Task>>, 
    setFormError: Dispatch<SetStateAction<string>>,
    setIsOpenForm: Dispatch<SetStateAction<boolean>>
}

export const useSendTask = ({formTask ,setFormTask, setFormError, setIsOpenForm}: useSendTaskProps) => {

  const dispatch = useDispatch();
  const [isSendTask, setIsSendTask] = useState<boolean>(false);

  useEffect(() => {
    isSendTask && sendTask();
  }, [isSendTask])

  const sendTask = async () => {
    try {
      (formTask?._id) ? (
        await updateTaskMutation(),
        dispatch(updateSuccessAlertMessage("Task Updated Succesfuly"))) 
        : (
        await createTaskMutation(),
        dispatch(updateSuccessAlertMessage("Task Added Succesfuly"))
      )
      setIsOpenForm(false);
      resetFormAfterSend('', true);

    } catch (err) {
      let errorMessage = (err as Error).message;
      resetFormAfterSend(errorMessage, false)
    }
  };

  const resetFormAfterSend = (errorMessage: string, sentSuccesfuly: boolean) => {
    setFormError(errorMessage ? errorMessage : '');
    setIsSendTask(false);
    sentSuccesfuly && setFormTask({status:'', description:'', title:'', estimatedTime:0, priority:''});
  }
  
  const [updateTaskMutation] = useMutation(UPDATE_TASK, {variables: {taskInput: formTask}});
  const [createTaskMutation] = useMutation(CREATE_TASK, {variables: {taskInput: formTask},});

  return {setIsSendTask}
}