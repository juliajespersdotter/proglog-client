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

// Access the backend to get game data

/**
 *
 * @returns all games in DB
 */
const getGames = () => {
	return get(`/api/games`)
}

/**
 *
 * @param {integer} gameId
 * @returns Specific game's info
 */
const getGame = gameId => {
	return get(`/api/games/${gameId}`)
}

const exports = {
	getGames,
	getGame,
}

export default exports
