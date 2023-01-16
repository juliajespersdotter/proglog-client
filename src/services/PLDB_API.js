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
		console.log('Error getting data', err)
	})
	if (res) {
		console.log(res.data)
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
			console.log('Error getting data', err)
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

const getList = listId => {
	return get(`/user/lists/${listId}`, { withCredentials: true })
}

const getGamesInList = async listId => {
	const res = await get(`/user/games/${listId}`, { withCredentials: true })
	if (res.status === 'success') {
		const igdbRes = await IGDB_API.getGamesWithIds(res.data)
		const list = res.list
		const games = igdbRes.data
		return { games, list }
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
			console.log('Error getting data', err)
		})
	return res.data
}

const addReview = async (gameId, data) => {
	const res = await axios
		.post(`/reviews/${gameId}`, { data }, { withCredentials: true })
		.catch(err => {
			console.log('Error getting data', err)
		})
	return res.data
}

const addList = async (userId, data) => {
	const res = await axios
		.post(`/user/lists/${userId}`, { data }, { withCredentials: true })
		.catch(err => {
			console.log('Error getting data', err)
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
			console.log('Error getting data', err)
		})
	return res.data
}

const deleteList = async (userId, listId) => {
	console.log(userId, listId)
	const res = await axios
		.delete(`/user/lists/${userId}/${listId}`, { withCredentials: true })
		.catch(err => {
			console.log('Error getting data')
		})
	return res.data
}

const deleteGame = async (userId, listId, gameId) => {
	console.log(userId, listId, gameId)
	const res = await axios
		.delete(`/user/games/${userId}/${listId}/${gameId}`, {
			withCredentials: true,
		})
		.catch(err => {
			console.log('Error getting data')
		})
	return res.data
}

const deleteReview = async (reviewId, userId) => {
	console.log(reviewId, userId)
	const res = await axios
		.delete(`/reviews/${userId}/${reviewId}`, {
			withCredentials: true,
		})
		.catch(err => {
			console.log('Error getting data')
		})
	return res.data
}

const deleteComment = async (commentId, userId) => {
	console.log(commentId, userId)
	const res = await axios
		.delete(`/reviews/comments/${userId}/${commentId}`, {
			withCredentials: true,
		})
		.catch(err => {
			console.log('Error getting data')
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
	getGamesInList,
	addGameToList,
	addReview,
	addList,
	postComment,
	deleteList,
	deleteGame,
	deleteReview,
	deleteComment,
}

export default exports
