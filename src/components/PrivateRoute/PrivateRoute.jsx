// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'

const PrivateRoute = ({ children }) => {
	const { currentUser } = useAuthContext()

	if (!currentUser) {
		return <Navigate to='/login' />
	}

	return children
}

export default PrivateRoute
