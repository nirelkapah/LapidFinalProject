import "./search.css";
import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useEffect } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import {
  QUERY_TASKS_LIST,
  QUERY_TASKS_LIST_BY_KEYWORD,
} from "../../graphql/tasksQuery";
import { useDispatch } from "react-redux";
import { updateAlltasks } from "../../redux/tasks/tasksSlice";

const Search = () => {
  const [keyword, setSearchKeyword] = React.useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getMatchingTasks({ fetchPolicy: "no-cache" });

    if (keyword == "") {
      getAllTasks();
      if (allTasksResult.data) {
        dispatch(updateAlltasks(allTasksResult.data.tasks));
      }
    }
  }, [keyword]);

  // const onClickSearch = () =>{
  //   console.log
  //   getMatchingTasks();
  //   console.log(matchingTasksResult.data);
  //   if(matchingTasksResult.data){;
  //     dispatch(updateAlltasks(matchingTasksResult.data.tasksByKeyword));
  //   }
  // }

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

  // const { loading, error, data , refetch } = useQuery(QUERY_TASKS_LIST_BY_KEYWORD, {
  //   variables: {keyword : keyword},

  // },);
  // const { data, error, refetch } =
  // useQuery(QUERY_TASKS_LIST_BY_KEYWORD,{
  //   variables: {keyword: keyword},
  //   defaultOptions: {enabled: false},
  // })

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
        {/* <IconButton sx={{ p: '10px' }} aria-label="search"> */}
          <SearchIcon sx={{ p: '10px' }} aria-label="search" className="searchIcon" />
        {/* </IconButton> */}
      </Paper>
    </div>
  );
};

export default Search;
