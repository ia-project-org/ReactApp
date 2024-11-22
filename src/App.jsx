import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Login from './pages/login';

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Login></Login>,
      children:[]
    }
  ]);
  return (
    <RouterProvider router={router}></RouterProvider>
  )

}

export default App
