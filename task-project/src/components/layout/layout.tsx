
import './layout.css'
import TaskTable from '../table/table'
import Search from '../search/search';
import {Route, BrowserRouter } from "react-router-dom";


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
      </header>
      <main>
        <Search />
        <TaskTable />
      </main>
    </section>
  </BrowserRouter>
  );
};

export default Layout;
