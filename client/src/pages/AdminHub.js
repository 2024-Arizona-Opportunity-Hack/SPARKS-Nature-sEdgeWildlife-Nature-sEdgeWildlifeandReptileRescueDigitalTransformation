import { Link, Outlet } from 'react-router-dom';
import '../Admin.css'

const AdminHub = () => {
  return (
    <div className="admin-hub-container">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <h1>Admin Hub</h1>
        <nav>
          <ul>
            <li><Link to="/admin/intake">Manage Intake</Link></li>
            <li><Link to="/admin/adoption">Manage Adoption</Link></li>
            <li><Link to="/admin/Donations">Manage Donations</Link></li>
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
