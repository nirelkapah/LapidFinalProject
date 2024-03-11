import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSuccessAlertMessage,
  selectErrorAlertMessage,
} from "../../redux/web/webSelectors";
import { useEffect } from "react";
import {
  updateErrorAlertMessage,
  updateSuccessAlertMessage,
} from "../../redux/web/webSlice";

const Alerts = () => {

  const successAlertMessage = useSelector(selectSuccessAlertMessage);
  const errorAlertMessage = useSelector(selectErrorAlertMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(deleteAlert, 2000);
  }, [successAlertMessage, errorAlertMessage]);

  const deleteAlert = () => {
    dispatch(updateSuccessAlertMessage(""));
    dispatch(updateErrorAlertMessage(""));
  };

  return (
      <Stack position={'fixed'} left={'50%'} alignContent={'center'} margin={'0 auto'} zIndex={100} top={'5%'} sx={{opacity: 0.9, transform: 'translate(-50%, -50%)'}}>
        {successAlertMessage && (
          <Alert severity="success">{successAlertMessage}</Alert>
        )}

        {errorAlertMessage && (
          <Alert severity="error">{errorAlertMessage}</Alert>
        )}
      </Stack>
  );
};
export default Alerts;
