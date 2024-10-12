import React from 'react';
import { Link } from 'react-router-dom';

const AdminHub = () => {
  return (
    <div className="admin-hub">
      <h1>Admin Hub</h1>
      <nav>
        <ul>
          <li><Link to="/admin/forms">Manage Forms</Link></li>
          <li><Link to="/admin/animals">Manage Animals</Link></li>
          <li><Link to="/admin/intake">View Intake</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminHub;