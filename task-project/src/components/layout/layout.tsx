
import './layout.css'
import TaskTableContainer from '../taskTable/taskTableContainer'
import Search from '../search/search';
import {Route, BrowserRouter } from "react-router-dom";
import ActionsBar from '../actionsBar/actionsBar';
import FormDialogBox from '../dialogBox/formDialogBox/formDialogBox';
import VerifyDialogBox from '../dialogBox/verifyDialogBox/verifyDialogBox';
import Alerts from '../alerts/alerts';



const Layout = () => {
  
  return (
    <BrowserRouter>
    <section>
      <header>
        <h1>"This is Header"</h1>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <script src='https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.8.1/rxjs.umd.min.js'></script>
      </header>
      <main>
        <Search />
        <ActionsBar />
        <TaskTableContainer />
        <FormDialogBox />
        <VerifyDialogBox />
        <Alerts />


      </main>
    </section>
  </BrowserRouter>
  );
};

export default Layout;
