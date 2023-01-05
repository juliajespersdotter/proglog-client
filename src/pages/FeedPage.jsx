import React from 'react'
import { useQuery } from 'react-query'
import GameCard from '../components/GameCard'
import RAWG_API from '../services/RAWG_API'
import User_API from '../services/User_API'
import StickyBox from 'react-sticky-box'
import { useAuthContext } from '../contexts/AuthContext'
import { useEffect } from 'react'

const FeedPage = () => {
	const { currentUser, loading } = useAuthContext()

	const {
		isLoading,
		isError,
		data: games,
	} = useQuery('games', RAWG_API.getGames)
	return (
		<div id='container' className='feedpage'>
			<StickyBox offsetTop={10} offsetBottom={20}>
				<div className='sidebar'>
					<button className='button button--primary'>PROFILE</button>
					<button className='button button--primary'>MY GAMES</button>
					<button className='button button--primary'>NEWS</button>
					<button className='button button--primary'>BROWSE</button>
				</div>
			</StickyBox>
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
			<StickyBox offsetTop={20} offsetBottom={20}>
				<div className='sidebar'>
					<img className='avatar' src={currentUser.avatar} />
					<p>{currentUser.username}</p>
					{/* <button className='button button--primary'>NEWS</button>
					<button className='button button--primary'>BROWSE</button> */}
				</div>
			</StickyBox>
		</div>
	)
}

export default FeedPage
