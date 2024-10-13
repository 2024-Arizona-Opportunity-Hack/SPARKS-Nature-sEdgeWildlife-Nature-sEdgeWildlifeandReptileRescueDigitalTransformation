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
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <IntakeManagement />,
  },
  {
    path: "/adopt",
    element: <AdoptionPage />,
  },
  {
    path: "/intake",
    element: <IntakeManagement />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminHub />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin/intake",
        element:
        (
          <ProtectedRoute>
            <IntakeManagement />    
          </ProtectedRoute>
        )
      },
      {
        path: "/admin/forms",
        element: (
          <ProtectedRoute>
            <FormGenerator />
          </ProtectedRoute>
        ),
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
