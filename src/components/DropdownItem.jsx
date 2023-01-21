import { useState } from 'react'
import PLDB_API from '../services/PLDB_API'
import { useQueryClient } from 'react-query'
import SmallLoadingSpinner from './Loading/SmallLoadingSpinner'

const DropdownItem = ({ user, list, game }) => {
	const queryClient = useQueryClient()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState()
	const [success, setSuccess] = useState(false)

	const addToList = async e => {
		setLoading(true)
		const listId = e.target.getAttribute('data-key')
		const gameId = game.id
		const userId = user.userId

		const res = await PLDB_API.addGameToList(userId, gameId, listId)
		if (res && res.status === 'success') {
			queryClient.invalidateQueries('games-list')
			setLoading(false)
			setSuccess(true)
		} else {
			setLoading(false)
			setError('Game already in list')
		}
	}

	return (
		<>
			{success ? (
				<span>Game added!</span>
			) : error ? (
				<span className='heading--red'>{error}</span>
			) : loading ? (
				<SmallLoadingSpinner />
			) : (
				<a key={list.id} data-key={list.id} onClick={addToList}>
					{list.list_name}
				</a>
			)}
		</>
	)
}

export default DropdownItem
