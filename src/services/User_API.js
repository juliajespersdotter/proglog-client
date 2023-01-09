import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

/**
 * GET an endpoint
 *
 * @param {string} endpoint
 * @returns Promise
 */
const get = async (endpoint, options) => {
	const res = await axios.get(endpoint, options).catch(err => {
		console.log('Error getting data', err)
	})
	// console.log(res.data)
	return res.data
}

// Access the backend to authorize user
/**
 *
 * Login with steam
 */
const authenticateUser = () => {
	return get('/user', { withCredentials: true })
}

const logoutUser = async () => {
	const res = await axios
		.delete(`/user/logout`, { withCredentials: true })
		.catch(err => {
			console.log('Error getting data', err)
		})
	console.log(res.data)
	return res.data
	// return get(`/auth/logout`, { withCredentials: true })
}

const getUserLists = userId => {
	return get(`/user/lists/${userId}`, { withCredentials: true })
}

const exports = {
	authenticateUser,
	logoutUser,
	getUserLists,
}

export default exports
