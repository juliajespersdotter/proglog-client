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
			return { status: 'error', err }
		})
	return res.data
	// return get(`/auth/logout`, { withCredentials: true })
}

const getSteamUserData = steamId => {
	return get(`/api/steam/${steamId}`, { withCredentials: true })
}

const getProfile = userId => {
	return get(`/user/profile/${userId}`, { withCredentials: true })
}

const getUserLists = userId => {
	return get(`/user/lists/${userId}`, { withCredentials: true })
}

const getComments = reviewId => {
	return get(`/reviews/comments/${reviewId}`, { withCredentials: true })
}

const getUser = userId => {
	return get(`/user/${userId}`, { withCredentials: true })
}

const getReviews = gameId => {
	return get(`/reviews/${gameId}`, { withCredentials: true })
}

const getList = (listId, option) => {
	return get(`/user/lists/${listId}`, { withCredentials: true })
}

const getGameInList = (gameId, listId) => {
	return get(`/user/lists/${listId}/${gameId}`, { withCredentials: true })
}

const getGamesInList = async listId => {
	const res = await get(`/user/games/${listId}`, { withCredentials: true })
	if (res.status === 'success') {
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
		return res
	}
}

const addGameToList = async (userId, gameId, listId) => {
	const res = await axios
		.post(
			`/user/add/${userId}`,
			{ gameId, listId },
			{ withCredentials: true }
		)
		.catch(err => {
			return { status: 'error', err }
		})
	return res.data
}

const addReview = async (gameId, data) => {
	const res = await axios
		.post(`/reviews/${gameId}`, { data }, { withCredentials: true })
		.catch(err => {
			return { status: 'error', err }
		})
	return res.data
}

const addList = async (userId, data) => {
	const res = await axios
		.post(`/user/lists/${userId}`, { data }, { withCredentials: true })
		.catch(err => {
			return { status: 'error', err }
		})
	return res.data
}

const updateGame = async (gameId, listId, data) => {
	const res = await axios
		.post(
			`/user/games/${listId}/${gameId}`,
			{ data },
			{ withCredentials: true }
		)
		.catch(err => {
			return { status: 'error', err }
		})
	return res.data
}

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

const deleteList = async (userId, listId) => {
	const res = await axios
		.delete(`/user/lists/${userId}/${listId}`, { withCredentials: true })
		.catch(err => {
			return { status: 'error', err }
		})
	return res.data
}

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
