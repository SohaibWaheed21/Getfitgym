import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from './Components/Layout/MainLayout'
import Home from './Components/Home/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App