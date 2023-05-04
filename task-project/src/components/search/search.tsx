import "./search.css";
import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import { useLazyQuery} from "@apollo/react-hooks";
import {
  QUERY_TASKS_LIST,
  QUERY_TASKS_LIST_BY_KEYWORD,
} from "../../graphql/tasks";
import { useDispatch } from "react-redux";
import { updateAlltasks } from "../../redux/tasks/tasksSlice";

const Search = () => {

  //Hooks 
  const [keyword, setSearchKeyword] = React.useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getMatchingTasks({ fetchPolicy: "no-cache" });

    if (keyword === "") {
      getAllTasks();
      if (allTasksResult.data) {
        dispatch(updateAlltasks(allTasksResult.data.tasks));
      }
    }
  }, [keyword]);

  //Request Functions
  const [getMatchingTasks, matchingTasksResult] = useLazyQuery(
    QUERY_TASKS_LIST_BY_KEYWORD,
    { variables: { keyword: keyword } }
  );
  const [getAllTasks, allTasksResult] = useLazyQuery(QUERY_TASKS_LIST);

  useEffect(() => {
    if (matchingTasksResult.data) {
      dispatch(updateAlltasks(matchingTasksResult.data.tasksByKeyword));
    }
  }, [matchingTasksResult]);

  //Event Functions
  const onChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <div id="searchContainer" className="animate__animated animate__fadeInUp">
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
        id="searchPaper"
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search For A Task.."
          inputProps={{ "aria-label": "search google maps" }}
          value={keyword}
          onChange={onChangeKeyword}
        />
          <SearchIcon sx={{ p: '10px' }} aria-label="search" className="searchIcon" />
      </Paper>
    </div>
  );
};

export default Search;
