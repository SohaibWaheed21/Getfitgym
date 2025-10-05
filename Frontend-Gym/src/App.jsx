import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from './Components/Layout/MainLayout'
import Home from './Components/Home/Home'
import Trainers from './Components/Trainers/Trainers'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      {path:'/trainers', element:<Trainers/>},
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App