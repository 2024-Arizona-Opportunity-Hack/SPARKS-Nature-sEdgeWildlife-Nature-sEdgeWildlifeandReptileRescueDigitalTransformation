import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AdoptionPage from './pages/AdoptionPage'
import IntakePage from './pages/IntakePage';
import HomePage from './pages/HomePage';
import Login from './components/Login';

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
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
