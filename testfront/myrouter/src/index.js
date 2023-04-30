import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  Link,
  createBrowserRouter,
  createRoutesFromElements,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import './index.css';
import App from './App';
import User from './user';
import Visit from './visit';
import Notfound from './notfound';


const routing= createBrowserRouter([
  {
    path:"/",
    element:<App/>,
  },
  {
    path:"/user",
    element:<User/>,
  },
  {
    path:"/visit",
    element:<Visit/>,
  },
  {
    path:"*",
    element:<Notfound/>
  }
]);

// let routes=(
//   <Router>
//     <div>
//     <ul>
//       <li>
//         <Link to="/">Home</Link>
//       </li>
//       <li>
//         <Link to="/user">User</Link>
//       </li>
//       <li>
//         <Link to="/visit">Visit</Link>
//       </li>
//     </ul>
//   </div>
//   <Routes>
//     <Route exact path='/'>
//       <App/>
//     </Route>
//     <Route path='/user'>
//       <User/>
//     </Route>
//     <Route path='/visit'>
//       <Visit/>
//     </Route>
//     <Route>
//       <Notfound/>
//     </Route>
//   </Routes>
//   </Router>
// );

{/* <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/user">User</Link>
      </li>
      <li>
        <Link to="/visit">Visit</Link>
      </li>
    </ul>
</div> */}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <RouterProvider router={routing}/>
    
  </React.StrictMode>
);


