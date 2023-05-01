
import './layout.css'
import TaskTableContainer from '../taskTable/taskTableContainer'
import Search from '../search/search';
import {Route, BrowserRouter } from "react-router-dom";
import ActionsBar from '../actionsBar/actionsBar';
import FormDialogBox from '../dialogBox/formDialogBox/formDialogBox';
import VerifyDialogBox from '../dialogBox/verifyDialogBox/verifyDialogBox';
import Alerts from '../alerts/alerts';
import Header from '../header/header';




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
        <script src='https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.8.1/rxjs.umd.min.js'></script>
      </header>
      <main>
        <Header />
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
