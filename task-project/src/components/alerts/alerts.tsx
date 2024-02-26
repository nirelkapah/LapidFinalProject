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
import { Grid } from "@mui/material";

const Alerts = () => {

  //Hooks
  const successAlertMessage = useSelector(selectSuccessAlertMessage);
  const errorAlertMessage = useSelector(selectErrorAlertMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(deleteAlert, 2000);
  }, [successAlertMessage, errorAlertMessage]);

  //Event Functions
  const deleteAlert = () => {
    dispatch(updateSuccessAlertMessage(""));
    dispatch(updateErrorAlertMessage(""));
  };

  return (
    <Grid container position={'fixed'} sx={{opacity: 0.9, justifyContent: 'center', maxWidth: '1280px', top: '1%'}}>
      <Stack sx={{ width: "100%" }} spacing={2} alignItems={'center'}>
        {successAlertMessage && (
          <Alert severity="success">{successAlertMessage}</Alert>
        )}

        {errorAlertMessage && (
          <Alert severity="error">{errorAlertMessage}</Alert>
        )}
      </Stack>
    </Grid>
  );
};
export default Alerts;
