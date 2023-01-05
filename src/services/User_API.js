import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

/**
 * GET an endpoint
 *
 * @param {string} endpoint
 * @returns Promise
 */
const get = async (endpoint, options) => {
	const res = await axios.get(endpoint, options)
	console.log(res.data)
	return res.data
}

// Access the backend to authorize user
/**
 *
 * Login with steam
 */
const getUser = () => {
	return get('/auth/user', { withCredentials: true })
}

/**
 * Login with Google
 */
const googleLogin = () => {
	return get(`/auth/google`)
}

const exports = {
	getUser,
	googleLogin,
}

export default exports
