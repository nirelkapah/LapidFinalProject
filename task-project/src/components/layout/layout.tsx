import TaskTableContainer from "../taskTable/taskTableContainer";
import Search from "../search/search";
import { BrowserRouter } from "react-router-dom";
import ActionsBar from "../actionsBar/actionsBar";
import Alerts from "../alerts/alerts";
import Header from "../header/header";
import { Grid } from "@mui/material";

const Layout = () => {
  return (
    <BrowserRouter>
          <Grid container direction={"column"}>
            
            <Grid item textAlign={"center"}>
              <Header />
            </Grid>
            
            <Grid item>
              <Search />
            </Grid>

            <Grid item>
              <ActionsBar />
            </Grid>

            <Grid item>
              <TaskTableContainer />
            </Grid>

            <Alerts />

          </Grid>
    </BrowserRouter>
  );
};

export default Layout;
