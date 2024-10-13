import React from 'react'
import { useAuth } from '../AuthContext';
import '../Dashboard.css'
import { useNavigate } from 'react-router-dom';
function Dashboard (){
    const navigate = useNavigate()
    const {user} = useAuth()
    const handleClick = () =>{
        navigate('/admin/new-intake')
    }
    return (
        <div>
            <h1>Welcome, {user.name}.</h1>
            {user.type === 'Volunteer' && <span className='pill'>{user.type}</span>}
            {user.type === 'Admin' && <span className='pill admin'>{user.type}</span>}
            <h3>Quick Actions</h3>
            <button className='btn' onClick={handleClick}>Add New Intake</button>
            {user.type === 'Admin' && <button className='btn' onClick={handleClick}>Add New User</button>}

        </div>
      );
}

export default Dashboard