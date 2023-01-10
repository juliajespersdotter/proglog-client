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
const GetGamesWithIds = async gameIds => {
	const games = gameIds.toString()
	const res = await axios
		.post(
			`/api/games`,
			{ ids: gameIds },
			{
				withCredentials: true,
			}
		)
		.catch(err => {
			console.log('Error getting data', err)
			return false
		})
	// console.log(res.data)
	if (res) {
		return res.data
	}
}

const exports = {
	getGames,
	GetGamesWithIds,
}

export default exports
