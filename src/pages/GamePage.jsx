import { useState } from 'react'
import SideBar from '../components/Navigation/SideBar'
import SideProfileBar from '../components/User/SideProfileBar'
import { useParams } from 'react-router-dom'
import useGamesWithIds from '../hooks/useGamesWithIds'
import LoadingSpinner from '../components/Loading/LoadingSpinner'
import moment from 'moment'
import DropdownMenu from '../components/DropdownMenu'
import { useAuthContext } from '../contexts/AuthContext'
import useUserLists from '../hooks/useUserLists'
import useReviews from '../hooks/useReviews'
import GameCard from '../components/GameCard'
import Review from '../components/Review/Review'
import ReviewForm from '../components/Review/ReviewForm'

const GamePage = ({ currentUser }) => {
	// const { currentUser } = useAuthContext()
	const { gameId } = useParams()
	const [toggle, setToggle] = useState(false)
	const { data: game, isLoading } = useGamesWithIds(gameId)
	const { data: lists } = useUserLists(currentUser.userId)
	const { data: reviews } = useReviews(gameId)

	return (
		<div id='container' className='main-content--container'>
			<SideBar />
			<div className='main-content'>
				{isLoading && <LoadingSpinner />}
				{!isLoading && (
					<div className='gameinfo--container'>
						{game &&
							game.data.map(gameInfo => (
								<div key={gameInfo.id}>
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
														game={gameInfo}
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
														(genre, i) => (
															<a
																key={i}
																className=' button--plus row'
															>
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
														(platform, i) => (
															<a
																key={i}
																className='button--plus row'
															>
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
															(mode, i) => (
																<a
																	key={i}
																	className='button--plus row'
																>
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
											{gameInfo.similar_games
												.slice(0, 6)
												.map((game, i) => (
													<GameCard
														key={i}
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
										<button
											className='button button--plus'
											onClick={() => setToggle(!toggle)}
										>
											write a review
										</button>
										{toggle && (
											<ReviewForm
												user={currentUser}
												gameId={gameInfo.id}
											/>
										)}

										{reviews && reviews.data ? (
											reviews.data.map(review => (
												<Review
													key={review.id}
													user={currentUser}
													data={review}
												/>
											))
										) : (
											<p>No reviews yet</p>
										)}
									</div>
								</div>
							))}
					</div>
				)}
			</div>
			<SideProfileBar />
		</div>
	)
}

export default GamePage
