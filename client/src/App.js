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
