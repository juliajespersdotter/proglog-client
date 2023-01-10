import React from 'react'
import { useQuery } from 'react-query'
import GameCard from '../components/GameCard'
import IGDB_API from '../services/IGDB_API'
import { useAuthContext } from '../contexts/AuthContext'
import SideBar from '../components/SideBar'
import SideProfileBar from '../components/SideProfileBar'
import LoadingSpinner from '../components/LoadingSpinner'
import useUserLists from '../hooks/useUserLists'
import useComingSoon from '../hooks/useComingSoon'

const FeedPage = () => {
	const { currentUser, loading } = useAuthContext()
	const { data: lists } = useUserLists(currentUser.userId)
	const { data: games, isLoading } = useComingSoon()

	// const {
	// 	isLoading,
	// 	isError,
	// 	data: games,
	// } = useQuery('games', IGDB_API.getComingSoon)
	// console.log(games)
	return (
		<div id='container' className='main-content--container'>
			<SideBar />
			<div className='main-content'>
				{loading && <LoadingSpinner />}
				{!loading && currentUser && (
					<h3>Welcome, {currentUser.username}</h3>
				)}
				<h4>Upcoming Games</h4>
				{isLoading && <LoadingSpinner />}
				<div>
					<p className='header--divider'>For PC</p>
					<div className='game-feed'>
						{games &&
							games.data
								.filter(game => game.platforms.includes(6))
								.splice(0, 5)
								.map(filteredGame => (
									<GameCard
										key={filteredGame.id}
										data={filteredGame}
										lists={lists}
										user={currentUser}
									/>
								))}
					</div>
				</div>
				<div>
					<p className='header--divider'>For PS5</p>
					<div className='game-feed'>
						{games &&
							games.data
								.filter(game => game.platforms.includes(167))
								.splice(0, 5)
								.map(filteredGame => (
									<GameCard
										key={filteredGame.id}
										data={filteredGame}
										lists={lists}
										user={currentUser}
									/>
								))}
					</div>
				</div>
				<div>
					<p className='header--divider'>For Nintendo Switch</p>
					<div className='game-feed'>
						{games &&
							games.data
								.filter(game => game.platforms.includes(130))
								.splice(0, 5)
								.map(filteredGame => (
									<GameCard
										key={filteredGame.id}
										data={filteredGame}
										lists={lists}
										user={currentUser}
									/>
								))}
					</div>
				</div>
				<div>
					<p className='header--divider'>For Xbox One</p>
					<div className='game-feed'>
						{games &&
							games.data
								.filter(game => game.platforms.includes(49))
								.splice(0, 5)
								.map(filteredGame => (
									<GameCard
										key={filteredGame.id}
										data={filteredGame}
										lists={lists}
										user={currentUser}
									/>
								))}
					</div>
				</div>
			</div>
			<SideProfileBar currentUser={currentUser} />
		</div>
	)
}

export default FeedPage
