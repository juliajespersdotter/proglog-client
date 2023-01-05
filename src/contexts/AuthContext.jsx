import { createContext, useContext, useEffect, useState } from 'react'
import User_API from '../services/User_API'
import { Navigate, useNavigate } from 'react-router-dom'

const AuthContext = createContext()

const useAuthContext = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	// const [userName, setUserName] = useState(null)
	// const [userEmail, setUserEmail] = useState(null)
	// const [userPhotoUrl, setUserPhotoUrl] = useState(null)
	const [loading, setLoading] = useState(true)

	const setUser = async data => {
		// console.log('user', user)
		setCurrentUser(data.user)
	}

	// const resetPassword = email => {
	// 	return sendPasswordResetEmail(auth, email)
	// }

	// const setEmail = email => {
	// 	return updateEmail(currentUser, email)
	// }

	// const setPassword = newPassword => {
	// 	return updatePassword(currentUser, newPassword)
	// }

	useEffect(() => {
		User_API.authenticateUser()
			.then(user => setCurrentUser(user.user))
			.catch(_error => {})
			.finally(() => setLoading(false))
	}, [])

	const contextValues = {
		currentUser,
		setUser,
		loading,
		// reloadUser,
		// resetPassword,
		// setEmail,
		// setPassword,
		// userName,
		// userEmail,
		// userPhotoUrl,
	}

	return (
		<AuthContext.Provider value={contextValues}>
			{!loading && children}
		</AuthContext.Provider>
	)
}

export { AuthContextProvider as default, useAuthContext }
