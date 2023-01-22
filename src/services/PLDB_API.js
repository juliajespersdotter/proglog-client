import axios from 'axios'
import IGDB_API from './IGDB_API'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

/**
 * GET an endpoint
 *
 * @param {string} endpoint
 * @returns Promise
 */
const get = async (endpoint, options) => {
	const res = await axios.get(endpoint, options).catch(err => {
		return { status: 'error', err }
	})
	if (res) {
		return res.data
	} else {
		return { status: 'error' }
	}
}

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
			return { status: 'error', err }
		})
	return res.data
}

/**
 *
 * @param {integer} steamId
 * @returns steam user data
 */
const getSteamUserData = steamId => {
	return get(`/api/steam/${steamId}`, { withCredentials: true })
}

/**
 *
 * @param {integer} userId
 * @returns profile data
 */
const getProfile = userId => {
	return get(`/user/profile/${userId}`, { withCredentials: true })
}

/**
 *
 * @param {integer} userId
 * @returns user lists
 */
const getUserLists = userId => {
	return get(`/user/lists/${userId}`, { withCredentials: true })
}

/**
 *
 * @param {integer} reviewId
 * @returns comments
 */
const getComments = reviewId => {
	return get(`/reviews/comments/${reviewId}`, { withCredentials: true })
}

/**
 *
 * @param {integer} userId
 * @returns user data
 */
const getUser = userId => {
	return get(`/user/${userId}`, { withCredentials: true })
}

/**
 *
 * @param {integer} gameId
 * @returns reviews
 */
const getReviews = gameId => {
	return get(`/reviews/${gameId}`, { withCredentials: true })
}

/**
 *
 * @param {integer} listId
 * @returns list data
 */
const getList = listId => {
	return get(`/user/lists/${listId}`, { withCredentials: true })
}

/**
 *
 * @param {integer} gameId
 * @param {integer} listId
 * @returns game in list
 */
const getGameInList = (gameId, listId) => {
	return get(`/user/lists/${listId}/${gameId}`, { withCredentials: true })
}

/**
 *
 * @param {integer} listId
 * @returns games in list
 */
const getGamesInList = async listId => {
	const res = await get(`/user/games/${listId}`, { withCredentials: true })
	if (res && res.status === 'success') {
		const igdbRes = await IGDB_API.getGamesWithIds(res.data)
		const list = res.list
		let list_game = res.games
		let igdbData = igdbRes.data

		let mergedArray = igdbData.map(item => {
			let match = list_game.find(item3 => item3.game_id === item.id)
			return Object.assign({}, item, match)
		})
		return { games: mergedArray, list }
	} else {
		return { status: 'error' }
	}
}

/**
 *
 * @param {integer} userId
 * @param {object} game
 * @param {integer} listId
 * @returns game posted to list
 */
const addGameToList = async (userId, game, listId) => {
	const res = await axios
		.post(
			`/user/add/${userId}`,
			{ game, listId },
			{ withCredentials: true }
		)
		.catch(err => {
			return { status: 'error', err }
		})
	return res.data
}

/**
 *
 * @param {integeer} gameId
 * @param {object} data
 * @returns added review
 */
const addReview = async (gameId, data) => {
	const res = await axios
		.post(`/reviews/${gameId}`, { data }, { withCredentials: true })
		.catch(err => {
			return { status: 'error', err }
		})
	return res.data
}

/**
 *
 * @param {integer} userId
 * @param {object} data
 * @returns added list
 */
const addList = async (userId, data) => {
	const res = await axios
		.post(`/user/lists/${userId}`, { data }, { withCredentials: true })
		.catch(err => {
			return { status: 'error', err }
		})
	return res.data
}

/**
 *
 * @param {integer} game
 * @param {integer} listId
 * @param {object} data
 * @returns updated game in list
 */
const updateGame = async (game, listId, data) => {
	const res = await axios
		.post(
			`/user/games/${listId}/${game}`,
			{ data },
			{ withCredentials: true }
		)
		.catch(err => {
			return { status: 'error', err }
		})
	return res.data
}

/**
 *
 * @param {integer} reviewId
 * @param {object} data
 * @returns comment posted on review
 */
const postComment = async (reviewId, data) => {
	const res = await axios
		.post(
			`/reviews/comments/${reviewId}`,
			{ data },
			{ withCredentials: true }
		)
		.catch(err => {
			return { status: 'error', err }
		})
	return res.data
}

/**
 *
 * @param {integer} userId
 * @param {integer} listId
 * @returns deleted list
 */
const deleteList = async (userId, listId) => {
	const res = await axios
		.delete(`/user/lists/${userId}/${listId}`, { withCredentials: true })
		.catch(err => {
			return { status: 'error', err }
		})
	return res.data
}

/**
 *
 * @param {integer} userId
 * @param {integer} listId
 * @param {integer} gameId
 * @returns deleted game from list
 */
const deleteGame = async (userId, listId, gameId) => {
	const res = await axios
		.delete(`/user/games/${userId}/${listId}/${gameId}`, {
			withCredentials: true,
		})
		.catch(err => {
			return { status: 'error', err }
		})
	return res.data
}

/**
 *
 * @param {integer} reviewId
 * @param {integer} userId
 * @returns deleted review
 */
const deleteReview = async (reviewId, userId) => {
	const res = await axios
		.delete(`/reviews/${userId}/${reviewId}`, {
			withCredentials: true,
		})
		.catch(err => {
			return { status: 'error', err }
		})
	return res.data
}

/**
 *
 * @param {integer} commentId
 * @param {integer} userId
 * @returns deleted comment
 */
const deleteComment = async (commentId, userId) => {
	const res = await axios
		.delete(`/reviews/comments/${userId}/${commentId}`, {
			withCredentials: true,
		})
		.catch(err => {
			return { status: 'error', err }
		})
	return res.data
}

const exports = {
	authenticateUser,
	logoutUser,
	getProfile,
	getSteamUserData,
	getUserLists,
	getComments,
	getUser,
	getReviews,
	getList,
	getGameInList,
	getGamesInList,
	addGameToList,
	addReview,
	addList,
	updateGame,
	postComment,
	deleteList,
	deleteGame,
	deleteReview,
	deleteComment,
}

export default exports
