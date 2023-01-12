import React from 'react'
import SideBar from '../components/SideBar'
import SideProfileBar from '../components/SideProfileBar'
import { useParams } from 'react-router-dom'
import useGamesWithIds from '../hooks/useGamesWithIds'
import LoadingSpinner from '../components/LoadingSpinner'
import moment from 'moment'
import DropdownMenu from '../components/DropdownMenu'
import { useAuthContext } from '../contexts/AuthContext'
import useUserLists from '../hooks/useUserLists'
import useReviews from '../hooks/useReviews'
import GameCard from '../components/GameCard'
import Review from '../components/Review'
import ReviewForm from '../components/ReviewForm'

const GamePage = () => {
	const { currentUser } = useAuthContext()
	const { gameId } = useParams()
	const { data: game, isLoading } = useGamesWithIds(gameId)
	const { data: lists } = useUserLists(currentUser.userId)
	const { data: reviews } = useReviews(gameId)
	console.log(reviews)

	return (
		<div id='container' className='main-content--container'>
			<SideBar />
			<div className='main-content'>
				{isLoading && <LoadingSpinner />}
				{!isLoading && (
					<div className='dashed-border gameinfo--container'>
						{game &&
							game.data.map(gameInfo => (
								<>
									<div
										key={gameInfo.id}
										className='gameinfo--header'
									>
										{gameInfo.cover && (
											<>
												<div className='gameinfo--cover-img'>
													<img
														src={`https://images.igdb.com/igdb/image/upload/t_1080p/${gameInfo.cover.image_id}.jpg`}
														alt=''
													/>
													<DropdownMenu
														lists={lists}
														game={game}
														user={currentUser}
													/>
												</div>
											</>
										)}

										<div className='gameinfo--data'>
											<h4>{gameInfo.name}</h4>
											<p className='gameinfo--date'>
												{moment
													.unix(
														gameInfo.first_release_date
													)
													.format('L')}
											</p>
											<p>{gameInfo.summary}</p>
										</div>
									</div>

									<div className='gameinfo--tags'>
										<div className='col'>
											<p className='header--divider'>
												Genres
											</p>
											<div className='row'>
												{gameInfo.genres ? (
													gameInfo.genres.map(
														genre => (
															<a className=' button--plus row'>
																{genre.name}
															</a>
														)
													)
												) : (
													<p className='row'>
														No data
													</p>
												)}
											</div>
										</div>
										<div className='col'>
											<p className='header--divider'>
												Platforms
											</p>
											<div className='row'>
												{gameInfo.platforms ? (
													gameInfo.platforms.map(
														platform => (
															<a className='button--plus row'>
																{
																	platform.abbreviation
																}
															</a>
														)
													)
												) : (
													<p className='row'>
														No data
													</p>
												)}
											</div>
										</div>
										<div className='col'>
											<p className='header--divider'>
												Gamemodes
											</p>
											<div>
												<div className='row'>
													{gameInfo.game_modes ? (
														gameInfo.game_modes.map(
															mode => (
																<a className='button--plus row'>
																	{mode.name}
																</a>
															)
														)
													) : (
														<p className='row'>
															No data
														</p>
													)}
												</div>
											</div>
										</div>
									</div>
									{gameInfo.similar_games && (
										<div className='game-feed'>
											<p className='header--divider'>
												Similar Games
											</p>
											{gameInfo.similar_games &&
												gameInfo.similar_games
													.slice(0, 6)
													.map(game => (
														<GameCard
															loading={isLoading}
															data={game}
															lists={lists}
															user={currentUser}
														/>
													))}
										</div>
									)}
									<div className='reviews'>
										<p className='header--divider'>
											Reviews
										</p>
										<ReviewForm />
										{reviews ? (
											reviews.data.map(review => (
												<Review data={review} />
											))
										) : (
											<p>No reviews yet</p>
										)}
									</div>
								</>
							))}
					</div>
				)}
			</div>
			<SideProfileBar />
		</div>
	)
}

export default GamePage
