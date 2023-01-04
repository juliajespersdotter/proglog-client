import React from 'react'
import { useQuery } from 'react-query'
import GameCard from '../components/GameCard'
import RAWG_API from '../services/RAWG_API'

const FeedPage = () => {
	const {
		isLoading,
		isError,
		data: games,
	} = useQuery('games', RAWG_API.getGames)
	console.log(games)
	return (
		<div id='container' className='feedpage'>
			<div className='sidebar'>
				<button className='button button--primary'>PROFILE</button>
				<button className='button button--primary'>MY GAMES</button>
				<button className='button button--primary'>NEWS</button>
				<button className='button button--primary'>BROWSE</button>
			</div>
			<div className='feed'>
				<h2>Games</h2>
				<div className='game-feed'>
					{games &&
						games.data.results.map(game => (
							<GameCard data={game} />
						))}
				</div>
			</div>
			<div className='sidebar'></div>
		</div>
	)
}

export default FeedPage
