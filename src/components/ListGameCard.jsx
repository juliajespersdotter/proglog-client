import { useState, useEffect } from 'react'
import { BiPlus } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import User_API from '../services/User_API'

//https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/dfgkfivjrhcksyymh9vw.jpg

const ListGameCard = ({ data, lists, user }) => {
	const [coverImg, setCoverImg] = useState('')

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
				<p>{data.summary}</p>
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

export default ListGameCard
