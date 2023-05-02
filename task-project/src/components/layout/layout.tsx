
import './layout.css'
import TaskTableContainer from '../taskTable/taskTableContainer'
import Search from '../search/search';
import { BrowserRouter } from "react-router-dom";
import ActionsBar from '../actionsBar/actionsBar';
import FormDialogBox from '../dialogBox/formDialogBox/formDialogBox';
import VerifyDialogBox from '../dialogBox/verifyDialogBox/verifyDialogBox';
import Alerts from '../alerts/alerts';
import Header from '../header/header';
import ReadDialogBox from '../dialogBox/readDialogBox/readDialogBox';






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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:100&effect=neon"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap" rel="stylesheet"></link>
      </header>
      <main>

        <Header />
        <Search />
        <ActionsBar />
        <TaskTableContainer />

        <FormDialogBox />
        <VerifyDialogBox />
        <ReadDialogBox />
        <Alerts />
      </main>
    </section>
  </BrowserRouter>
  );
};

export default Layout;
