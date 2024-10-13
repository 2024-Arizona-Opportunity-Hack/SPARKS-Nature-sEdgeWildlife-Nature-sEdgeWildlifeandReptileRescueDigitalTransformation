import React from 'react'
import { useAuth } from '../AuthContext';
import '../UserManagementstyles.css'


function UserManagement() {
    const { user } = useAuth()

    return (
        <div>
            {user.type === "Admin" && (
                <div>
                    <h1>Users</h1>
                </div>
            )}
            {user.type === "Volunteer" && (
                <div>
                    <div class="snake-warning">
    <span class="warning-icon">🐍</span>
    <h2>Unauthorized Path!</h2>
    <p>You've slithered into a restricted area. Please return to safer grounds.</p>
    <button onclick="goBack()">Back to Safety</button>
</div>
                </div>
            )}
        </div>
    )
}

export default UserManagement