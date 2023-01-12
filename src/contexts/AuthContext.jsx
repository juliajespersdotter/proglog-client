import { createContext, useContext, useEffect, useState } from 'react'
import PLDB_API from '../services/PLDB_API'

const AuthContext = createContext()

const useAuthContext = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [loading, setLoading] = useState(true)

	const setUser = async data => {
		setCurrentUser(data.user)
	}

	useEffect(() => {
		PLDB_API.authenticateUser()
			.then(user => (user ? setCurrentUser(user.user) : ''))
			.catch(_error => {})
			.finally(() => setLoading(false))
	}, [])

	const contextValues = {
		currentUser,
		setUser,
		loading,
	}

	return (
		<AuthContext.Provider value={contextValues}>
			{!loading && children}
		</AuthContext.Provider>
	)
}

export { AuthContextProvider as default, useAuthContext }
