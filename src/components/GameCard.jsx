import { useState, useEffect } from 'react'
import { BiPlus } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import User_API from '../services/User_API'

//https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/dfgkfivjrhcksyymh9vw.jpg

const GameCard = ({ data, lists, user }) => {
	const [coverImg, setCoverImg] = useState('')

	const addToList = async e => {
		const listId = e.target.getAttribute('data-key')
		const gameId = data.id
		const userId = user.userId

		const res = await User_API.addGameToList(userId, gameId, listId)
		// console.log(res.data)
		// on click, add a loading spinner to show it is being added
		// find list and add list_id + game_id to games_userlists table if user === currentUser
	}

	useEffect(() => {
		if (data.cover) {
			setCoverImg(data.cover)
		} else if (data.screenshots) {
			setCoverImg(data.screenshots[0])
		}
	}, [])
	return (
		<div className='game-card'>
			<div className='game-card--title'>
				<Link to={`/game/${data.id}`}>
					<h4 className='button--tertiery'>{data.name}</h4>
				</Link>
				<Dropdown className='dropdown'>
					<Dropdown.Toggle
						variant='dark'
						className='button button--small'
					>
						Add <BiPlus />
					</Dropdown.Toggle>
					<Dropdown.Menu className='dropdown-content'>
						{lists.data.map(list => (
							<Dropdown.Item
								key={list.id}
								data-key={list.id}
								onClick={addToList}
								href='#'
							>
								{list.list_name}
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
			<div className='game-card--image'>
				{coverImg && (
					<img
						src={`https://images.igdb.com/igdb/image/upload/t_1080p/${coverImg.image_id}.jpg`}
						alt=''
					/>
				)}
			</div>
		</div>
	)
}

export default GameCard
