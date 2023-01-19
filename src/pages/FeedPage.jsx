import React from 'react'
import GameCard from '../components/GameCard'
import SideBar from '../components/Navigation/SideBar'
import SideProfileBar from '../components/User/SideProfileBar'
import LoadingSpinner from '../components/Loading/LoadingSpinner'
import useComingSoon from '../hooks/useComingSoon'
import Typewriter from 'typewriter-effect'

const FeedPage = ({ currentUser }) => {
	// const { currentUser, loading } = useAuthContext()
	const { data: games, isLoading } = useComingSoon()
	return (
		<div id='container' className='main-content--container'>
			<SideBar />
			<div className='main-content'>
				<div className='hero'>
					<div className='hero-text'>
						<div className='inputbox input--small'>
							<Typewriter
								options={{
									strings: [
										`Welcome, ${currentUser.username}_`,
									],
									autoStart: true,
									loop: false,
									pauseFor: 100000000,
								}}
							/>
						</div>
						{/* Welcome,{' '}
						<span className='heading--red'>
							{currentUser.username}
						</span> */}
					</div>
				</div>

				{/* <img className='hero--image' src='./images/hero.png' /> */}

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
