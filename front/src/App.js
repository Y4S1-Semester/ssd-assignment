import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

//router
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAuth0 } from "@auth0/auth0-react";
//components
import Write from "./pages/Write";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./style.scss"
import ProtectedRoute from "./utils/protect";
import axios from "axios";

const Layout = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/post/:id",
        element:<Single/>

      },
      {
        path:"/write",
        element: (
            <ProtectedRoute>
              <Write />
            </ProtectedRoute>
        ),
      },
    ]    
  },
  {
    path: "/register",
    element: <Register/>,
  },

  {
    path: "/login",
    element: <Login/>,
  },
]);

function callApi(){
    axios.get('http')
}

function callProtectedApi(){

}
function App() {
  const {loginWithPopup,loginWithRedirect,logout,user,isAuthenticated} = useAuth0()
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/>
        <h1>Authenication</h1>
        <li><button onClick={loginWithPopup}>login with PopUp</button></li>
        <li><button onClick={loginWithRedirect}>login with Redirect</button></li>
        <li><button onClick={logout}>Logout</button></li>
        <h3>User is {isAuthenticated? "Logged in ":"Not logged in"}</h3>
        {isAuthenticated && 
        <pre style={{textAlign:'start'}}>{JSON.stringify(user,null,2)}</pre>
        }
        <ul>
          <li><button>protected api route</button></li>
          <li><button>non-protected api route</button></li>
        </ul>
        </div>
    </div>
  );
}


export default App;
