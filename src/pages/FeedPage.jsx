import React from 'react'
import { useQuery } from 'react-query'
import GameCard from '../components/GameCard'
import RAWG_API from '../services/RAWG_API'
import { useAuthContext } from '../contexts/AuthContext'
import SideBar from '../components/SideBar'
import SideProfileBar from '../components/SideProfileBar'

const FeedPage = () => {
	const { currentUser, loading } = useAuthContext()

	const {
		isLoading,
		isError,
		data: games,
	} = useQuery('games', RAWG_API.getGames)
	return (
		<div id='container' className='feedpage'>
			<SideBar />
			<div className='feed'>
				{!loading && currentUser && (
					<h4>Welcome, {currentUser.username}</h4>
				)}
				<div className='game-feed'>
					{games &&
						games.data.results.map(game => (
							<GameCard data={game} />
						))}
				</div>
			</div>
			<SideProfileBar currentUser={currentUser} />
		</div>
	)
}

export default FeedPage
