import React from 'react'
import { BiPlus } from 'react-icons/bi'

//https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/dfgkfivjrhcksyymh9vw.jpg

const GameCard = ({ data }) => {
	console.log(data.screenshots)
	return (
		<div className='game-card'>
			<div className='game-card--title'>
				<h4>{data.name}</h4>
				<button className='button button--small'>
					Add <BiPlus />
				</button>
			</div>
			<div className='game-card--image'>
				{data.screenshots && (
					<img src={data.screenshots[0].url} alt='' />
				)}
			</div>
		</div>
	)
}

export default GameCard
