import { useState, useEffect } from 'react'
import { BiPlus } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import { queryClient } from '../main'
import User_API from '../services/User_API'

//https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/dfgkfivjrhcksyymh9vw.jpg

const GameCard = ({ data, lists, user }) => {
	const [coverImg, setCoverImg] = useState('')
	const [gameAdded, setGameAdded] = useState()

	const addToList = async e => {
		const listId = e.target.getAttribute('data-key')
		const gameId = data.id
		const userId = user.userId

		const res = await User_API.addGameToList(userId, gameId, listId)
		if (res.status === 'success') {
			queryClient.invalidateQueries('games-list')
			setGameAdded(true)
		}
		// console.log(res.data)
		// on click, add a loading spinner to show it is being added
		// find list and add list_id + game_id to games_userlists table if user === currentUser
	}

	useEffect(() => {
		if (data.cover) {
			setCoverImg(data.cover)
		} else if (data.screenshots) {
			setCoverImg(data.screenshots[0])
		} else if (data.artworks) {
			setCoverImg(data.artworks[0])
		}
	}, [])
	return (
		<div className='game-card'>
			<div className='game-card--image'>
				<Link to={`/game/${data.id}`}>
					{coverImg && (
						<img
							src={`https://images.igdb.com/igdb/image/upload/t_1080p/${coverImg.image_id}.jpg`}
							alt=''
						/>
					)}
					{!coverImg && <p>{data.name}</p>}
				</Link>
			</div>
			{/* <h4 className='button--tertiery'>{data.name}</h4> */}
			<Dropdown className='dropdown'>
				<Dropdown.Toggle
					variant='dark'
					className='button button--small'
				>
					Add <BiPlus />
				</Dropdown.Toggle>
				<Dropdown.Menu className='dropdown-content'>
					{lists &&
						lists.data.map(list => (
							<Dropdown.Item
								key={list.id}
								data-key={list.id}
								onClick={addToList}
								href='#'
							>
								{list.list_name}
								{gameAdded && <p>Added!</p>}
							</Dropdown.Item>
						))}

					{/* {countries?.map(country => (
						<div key={country._id}>
							<Link
								className='dropdown-link button--tertiery'
								href={`/country/${country.slug.current}`}
							>
								{country.country}
							</Link>
						</div>
					))} */}
				</Dropdown.Menu>
			</Dropdown>
		</div>
	)
}

export default GameCard
