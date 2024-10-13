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
            <h3>Quick Actions</h3>
            <button className='btn' onClick={handleClick}>➕Add New Intake</button>
        </div>
      );
}

export default Dashboard