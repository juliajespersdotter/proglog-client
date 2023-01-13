import React from 'react'
import { useQuery } from 'react-query'
import GameCard from '../components/GameCard'
import IGDB_API from '../services/IGDB_API'
import { useAuthContext } from '../contexts/AuthContext'
import SideBar from '../components/Navigation/SideBar'
import SideProfileBar from '../components/User/SideProfileBar'
import LoadingSpinner from '../components/Loading/LoadingSpinner'
import useUserLists from '../hooks/useUserLists'
import useComingSoon from '../hooks/useComingSoon'
import SmallLoadingSpinner from '../components/Loading/SmallLoadingSpinner'

const FeedPage = () => {
	const { currentUser, loading } = useAuthContext()
	const { data: lists } = useUserLists(currentUser.userId)
	const { data: games, isLoading } = useComingSoon()
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
				{!isLoading && (
					<>
						<div>
							<p className='header--divider'>FOR PC_</p>
							<div className='game-feed'>
								{games &&
									games.data
										.filter(game =>
											game.platforms.includes(6)
										)
										.slice(0, 5)
										.map(filteredGame => (
											<GameCard
												key={filteredGame.id}
												loading={isLoading}
												data={filteredGame}
												lists={lists}
												user={currentUser}
											/>
										))}
							</div>
						</div>
						<div>
							<p className='header--divider'>FOR PS5_</p>
							<div className='game-feed'>
								{games &&
									games.data
										.filter(game =>
											game.platforms.includes(167)
										)
										.splice(0, 5)
										.map(filteredGame => (
											<GameCard
												key={filteredGame.id}
												loading={isLoading}
												data={filteredGame}
												lists={lists}
												user={currentUser}
											/>
										))}
							</div>
						</div>
						<div>
							<p className='header--divider'>
								FOR NINTENDO SWITCH_
							</p>
							<div className='game-feed'>
								{games &&
									games.data
										.filter(game =>
											game.platforms.includes(130)
										)
										.splice(0, 5)
										.map(filteredGame => (
											<GameCard
												key={filteredGame.id}
												loading={isLoading}
												data={filteredGame}
												lists={lists}
												user={currentUser}
											/>
										))}
							</div>
						</div>
						<div>
							<p className='header--divider'>FOR XBOX ONE_</p>
							<div className='game-feed'>
								{games &&
									games.data
										.filter(game =>
											game.platforms.includes(49)
										)
										.splice(0, 5)
										.map(filteredGame => (
											<GameCard
												key={filteredGame.id}
												loading={isLoading}
												data={filteredGame}
												lists={lists}
												user={currentUser}
											/>
										))}
							</div>
						</div>
					</>
				)}
			</div>
			<SideProfileBar currentUser={currentUser} />
		</div>
	)
}

export default FeedPage
