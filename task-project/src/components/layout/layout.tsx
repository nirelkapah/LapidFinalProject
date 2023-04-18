
import './layout.css'
import Table from '../table/table'
import Search from '../search/search';
import {Route, BrowserRouter } from "react-router-dom";


const Layout = () => {
  
  return (
    <BrowserRouter>
    <section>
      <header>
        <h1>"This is Header"</h1>
      </header>
      <main>
        <Search />
        <Table />
      </main>
    </section>
  </BrowserRouter>
  );
};

export default Layout;
