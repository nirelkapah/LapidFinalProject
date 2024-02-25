import "./search.css";
import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import {updateSearchByKeyword} from '../../redux/tasks/tasksSlice'

const Search = () => {

  //Hooks 
  const dispatch = useDispatch();

  //Event Functions
  const onChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchByKeyword(event.target.value))
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
          // value={keyword}
          onChange={onChangeKeyword}
        />
          <SearchIcon sx={{ p: '10px' }} aria-label="search" className="searchIcon" />
      </Paper>
    </div>
  );
};

export default Search;
