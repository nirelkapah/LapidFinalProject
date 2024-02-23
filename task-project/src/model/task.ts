import { Dayjs } from "dayjs";

export interface Task {
  _id?: string;
  title: string;
  description: string;
  estimatedTime: number;
  status: string; //
  priority: string;
  untilDate?: string | Dayjs;
  review?: string;
  timeSpent?: number;
}

