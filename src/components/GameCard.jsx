import { useState, useEffect } from 'react'
import { BiPlus } from 'react-icons/bi'
import { Link } from 'react-router-dom'

//https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/dfgkfivjrhcksyymh9vw.jpg

const GameCard = ({ data }) => {
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
				<Link to={`/game/`}>
					<h4 className='button--tertiery'>{data.name}</h4>
				</Link>
				<button className='button button--small'>
					Add <BiPlus />
				</button>
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
