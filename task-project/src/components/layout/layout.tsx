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
      <section>
        <header>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.8.1/rxjs.umd.min.js"></script>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Lato:100&effect=neon"
          ></link>
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap"
            rel="stylesheet"
          ></link>
          <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
        </header>
        <main>
          <Grid container textAlign={'center'} maxWidth={'1280px'}>

            <Header />
            <Search />
            <ActionsBar />
            <TaskTableContainer />

            <Alerts />

          </Grid>
          
        </main>
      </section>
    </BrowserRouter>
  );
};

export default Layout;
