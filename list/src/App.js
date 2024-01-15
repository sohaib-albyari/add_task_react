import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddTask from './Pages/AddTask';
import EditTask from './Pages/EditTask';
import FilterTask from './Pages/FilterTask';
import { Outlet } from 'react-router-dom';
import Registration from './Pages/Registration';
import Task from './Pages/Task';
import SingIn from './Pages/SingIn';
// import UserName from './components/UserName';

function App() {

  // const loc = useLocation();
  // console.log(loc);

  return (
    <>

      {/* <UserName name={loc.state.user} /> */}
      <div className="App">

        <Routes>
          <Route path='/' element={<Registration />} />
          <Route path='/singin' element={<SingIn />} />
          <Route path='/task' element={<Outlet />}>
            <Route path='/task' element={<Task />} />
            <Route path='add' element={<AddTask />} />
            <Route path='filter' element={<FilterTask />} />
            <Route path='edit/:taskid' element={<EditTask />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
