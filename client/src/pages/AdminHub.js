import {  Outlet, NavLink, Navigate, useLocation } from 'react-router-dom';
import {useAuth} from '../AuthContext'
import '../Admin.css'


const AdminHub = () => {
  const location = useLocation();
  const { logout} = useAuth
  console.log("logout: ", logout)
  const handleLogout = (event) => {
    event.preventDefault();
    logout(); // Ensure logout is clearing state and localStorage
  };

  return (
    <div className="admin-hub-container">
      {/* Redirect to dashboard if at /admin */}
      {location.pathname === '/admin' && <Navigate to="/admin/dashboard" replace />}
      
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <h1>Admin Hub</h1>
        <nav>
          <ul>
            <li>
              <NavLink 
                to="/admin/dashboard"
                className={({ isActive }) => 
                  isActive ? 'active-link' : undefined
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/intake"
                className={({ isActive }) => 
                  isActive ? 'active-link' : undefined
                }
              >
                View Rescues in Reserve
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/adoption"
                className={({ isActive }) => 
                  isActive ? 'active-link' : undefined
                }
              >
                Manage Adoption Listings
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/adopt-req"
                className={({ isActive }) => 
                  isActive ? 'active-link' : undefined
                }
              >
                Browse Adoption Requests
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/donations"
                className={({ isActive }) => 
                  isActive ? 'active-link' : undefined
                }
              >
                Manage Donations
              </NavLink>
            </li>
            <li>
            <a href="#" onClick={handleLogout}>Log Out</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        <Outlet />
      </main>
    </div>
  );
};


export default AdminHub;
