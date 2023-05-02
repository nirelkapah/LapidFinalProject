import * as React from "react";
import "./alerts.css";
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
    <div className="alertsContainer">
      <Stack sx={{ width: "100%" }} spacing={2}>
        {successAlertMessage && (
          <Alert severity="success">{successAlertMessage}</Alert>
        )}

        {errorAlertMessage && (
          <Alert severity="error">{errorAlertMessage}</Alert>
        )}
      </Stack>
    </div>
  );
};
export default Alerts;
function dispatch(arg0: {
  payload: string;
  type: "web/updateSuccessAlertMessage";
}) {
  throw new Error("Function not implemented.");
}
