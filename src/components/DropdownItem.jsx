import { useState } from 'react'
import PLDB_API from '../services/PLDB_API'
import { useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import SmallLoadingSpinner from './Loading/SmallLoadingSpinner'
import { BsCheckLg } from 'react-icons/bs'
import useGame from '../hooks/useGame'

const DropdownItem = ({ user, list, game }) => {
	const queryClient = useQueryClient()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState()
	const [success, setSuccess] = useState(false)
	const { data: gamelist, isLoading } = useGame(list.id, game.id)

	const addToList = async e => {
		setLoading(true)
		const listId = e.target.getAttribute('data-key')
		const userId = user.userId

		const res = await PLDB_API.addGameToList(userId, game, listId)
		if (res && res.status === 'success') {
			queryClient.invalidateQueries('games-list')
			setLoading(false)
			setSuccess(true)
		} else {
			setLoading(false)
			setError('Game already in list')
		}
	}

	if (isLoading) {
		return <SmallLoadingSpinner />
	}

	if (!isLoading && gamelist.isAdded) {
		return (
			<span className='button--tertiery game--success'>
				<Link to={`/list/${list.id}`}>{list.list_name}</Link>
				<BsCheckLg />
			</span>
		)
	}

	return (
		<>
			{success ? (
				<span className='button--tertiery game--success'>
					<Link to={`/list/${list.id}`}>{list.list_name}</Link>
					<BsCheckLg />
				</span>
			) : error ? (
				<span className='heading--red game--error'>{error}</span>
			) : loading ? (
				<SmallLoadingSpinner />
			) : (
				<Link key={list.id} data-key={list.id} onClick={addToList}>
					{list.list_name}
				</Link>
			)}
		</>
	)
}

export default DropdownItem
