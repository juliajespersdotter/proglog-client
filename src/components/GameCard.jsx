import React from 'react'
import { BiPlus } from 'react-icons/bi'

const GameCard = ({ data }) => {
	return (
		<div className='game-card'>
			<div className='game-card--image'>
				<img src={`${data.background_image}`} alt='' />
			</div>
			<div className='game-card--title'>
				<h4>{data.name}</h4>
				<button className='button--small'>
					Add <BiPlus />
				</button>
			</div>
		</div>
	)
}

export default GameCard
