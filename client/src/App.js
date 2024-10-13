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
import Dashboard from './components/Dashboard';
import AdoptionRequests from './components/AdoptionRequests';
import UserManagement from './components/UserManagement';

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
      },
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      }, {
        path: "/admin/new-intake",
        element: (
          <ProtectedRoute>
            <IntakePage />
          </ProtectedRoute>
        )
      },
      {
        path: "/admin/adopt-req",
        element: (
          <ProtectedRoute>
            <AdoptionRequests />
          </ProtectedRoute>
        )
      }, 
      {
        path: "/admin/users",
        element: (
          <ProtectedRoute>
            <UserManagement />
          </ProtectedRoute>
        )
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
