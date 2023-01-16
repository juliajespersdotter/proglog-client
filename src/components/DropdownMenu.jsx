import { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { BiPlus } from 'react-icons/bi'
import PLDB_API from '../services/PLDB_API'
import { queryClient } from '../main'
import SmallLoadingSpinner from './Loading/SmallLoadingSpinner'

const DropdownMenu = ({ lists, game, user }) => {
	const [gameAdded, setGameAdded] = useState()
	const [toggle, setToggle] = useState()
	const [loading, setLoading] = useState(false)
	const [listId, setListId] = useState(null)

	const addToList = async e => {
		setLoading(true)
		const listId = e.target.getAttribute('data-key')
		setListId(listId)
		const gameId = game.id
		const userId = user.userId

		const res = await PLDB_API.addGameToList(userId, gameId, listId)
		if (res.status === 'success') {
			queryClient.invalidateQueries('games-list')
			setGameAdded(true)
			setLoading(false)
		}
		// console.log(res.data)
		// on click, add a loading spinner to show it is being added
		// find list and add list_id + game_id to games_userlists table if user === currentUser
	}

	return (
		<div className='dropdown'>
			<button
				className='button button--small'
				onClick={() => setToggle(!toggle)}
			>
				Add <BiPlus />
			</button>
			{toggle && (
				<div className='dropdown-content'>
					{lists &&
						lists.data.map(list =>
							!list.deletable ? (
								<a
									key={list.id}
									data-key={list.id}
									onClick={addToList}
								>
									{list.list_name}
									{/* {gameAdded && <p>Added!</p>} */}
									{/* {loading && listId === list.id && (
										<SmallLoadingSpinner />
									)} */}
								</a>
							) : (
								<a
									key={list.id}
									data-key={list.id}
									onClick={addToList}
									className='dropdown--link'
								>
									{list.list_name}
									{/* {gameAdded && <p>Added!</p>} */}
									{/* {loading && listId === list.id && (
											<SmallLoadingSpinner />
										)} */}
								</a>
							)
						)}
				</div>
			)}
		</div>
	)
}

export default DropdownMenu
