import React from 'react'
import { Navigate } from 'react-router-dom'
const protectedRoute = ({children}) => {
    
const token=localStorage.getItem("token")
const user=localStorage.getItem("user")

if(!token||!user){
     alert("U r not logged in")
    return <Navigate to="/login" replace/>
}
else return children;
 
}

export default protectedRoute
