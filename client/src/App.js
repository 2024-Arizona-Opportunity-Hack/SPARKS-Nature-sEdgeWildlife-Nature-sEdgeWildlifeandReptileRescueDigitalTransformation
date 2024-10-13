import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AdoptionPage from './pages/AdoptionPage'
import IntakePage from './pages/IntakePage';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import AdminHub from './pages/AdminHub';
import IntakeManagement from './components/IntakeManagement';
import FormGenerator from './components/FormGenerator';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/adopt",
    element: <AdoptionPage />,
  },
  {
    path: "/intake",
    element: <IntakePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminHub />,
    children: [
      {
        path: "/admin/intake",
        element: <IntakeManagement />    
      },
      {
        path: "/admin/forms",
        element: <FormGenerator />,
      }
    ]
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
