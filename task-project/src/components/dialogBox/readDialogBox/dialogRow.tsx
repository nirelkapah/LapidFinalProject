
import DialogContentText from "@mui/material/DialogContentText";
import dayjs from "dayjs";
import { Typography } from "@mui/material";

const keysMap = new Map<string , string>([
    ['description', 'Description'],
    ['estimatedTime', 'Estimated Time'],
    ['priority', 'Priority'],
    ['review', 'Review'],
    ['status', 'Status' ],
    ['timeSpent', 'Time Spent'],
    ['title', 'Title'],
    ['untilDate','Until Date']
  ])

export const DialogRow = {
    get: (key: string, value: string | number) => {
      const convertKeyToTitle = (key: any): string => key && keysMap.get(key);
      const convertDateToString = (value: any): string =>  dayjs.utc(value).format("MMMM D, YYYY");
  
      return (
        <DialogContentText key={key}>
              <Typography component={'span'}><b>{convertKeyToTitle(key)}:</b> {key === 'untilDate' ? convertDateToString(value) : value}</Typography>
        </DialogContentText>
      )
    }
  }