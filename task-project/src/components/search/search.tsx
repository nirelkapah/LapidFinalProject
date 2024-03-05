import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import {updateSearchByKeyword} from '../../redux/tasks/tasksSlice'
import { Grid } from "@mui/material";

const Search = () => {

  const dispatch = useDispatch();

  const onChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => dispatch(updateSearchByKeyword(event.target.value))

  return (
    <Grid container sx={{justifyContent:'center', m: '1' }} className="animate__animated animate__fadeInUp">
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
        >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Task.."
          onChange={onChangeKeyword}
        />
        <SearchIcon sx={{ p: '10px', color: '#c74cb1' }} aria-label="search" className="searchIcon"/>
      </Paper>
    </Grid>
  );
};

export default Search;
