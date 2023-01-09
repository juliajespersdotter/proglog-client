import React from 'react'
import { useQuery } from 'react-query'
import GameCard from '../components/GameCard'
import IGDB_API from '../services/IGDB_API'
import { useAuthContext } from '../contexts/AuthContext'
import SideBar from '../components/SideBar'
import SideProfileBar from '../components/SideProfileBar'
import LoadingSpinner from '../components/LoadingSpinner'

const FeedPage = () => {
	const { currentUser, loading } = useAuthContext()

	const {
		isLoading,
		isError,
		data: games,
	} = useQuery('games', IGDB_API.getGames)
	return (
		<div id='container' className='main-content--container'>
			<SideBar />
			<div className='main-content'>
				{loading && <LoadingSpinner />}
				{!loading && currentUser && (
					<h4>Welcome, {currentUser.username}</h4>
				)}
				{isLoading && <LoadingSpinner />}
				<div className='game-feed'>
					{games && games.data.map(game => <GameCard data={game} />)}
				</div>
			</div>
			<SideProfileBar currentUser={currentUser} />
		</div>
	)
}

export default FeedPage
