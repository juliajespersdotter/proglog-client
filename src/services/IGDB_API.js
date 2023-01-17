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
	if (res) {
		console.log(res.data)
		return res.data
	} else {
		return { status: 'error' }
	}
}

// Access the backend to get game data

/**
 *
 * @param {search} query
 * @param {the offset of which the data should be fetched} page
 * @returns result of query
 */
const search = async (query, page) => {
	page = page * 2 * 10
	console.log(page)
	return get(`/api/search/${query}/${page}`)
}

/**
 * Get all genres
 * @returns all genres from IGDB
 */
const getGenres = () => {
	return get(`/api/genres`)
}

/**
 *
 * @returns games by genre from IGDB
 */
const getGamesByGenre = (id, page) => {
	page = page * 2 * 10
	console.log(page)
	return get(`/api/genres/${id}/${page}`)
}

/**
 *
 * @returns Upcoming games from today
 */
const getComingSoon = async () => {
	return get(`/api/coming-soon`)
}

/**
 *
 * @param {integer} gameId
 * @returns Specific game's info
 */
const getGamesWithIds = async gameIds => {
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
	search,
	getGenres,
	getGamesByGenre,
	getGamesWithIds,
	getComingSoon,
}

export default exports
