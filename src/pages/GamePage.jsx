import React from 'react'
import SideBar from '../components/SideBar'
import SideProfileBar from '../components/SideProfileBar'
import { useParams } from 'react-router-dom'
import useGamesWithIds from '../hooks/useGamesWithIds'
import LoadingSpinner from '../components/LoadingSpinner'
import { BiArrowToTop } from 'react-icons/bi'
import moment from 'moment'

const GamePage = () => {
	const { gameId } = useParams()
	console.log(gameId)
	const { data: game, isLoading } = useGamesWithIds(gameId)
	console.log(game)

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
									<div className='gameinfo--header'>
										{/* {gameInfo.artworks &&
									gameInfo.artworks.map(art => (
										<div className='gameinfo--artworks-img'>
											<img
												src={`https://images.igdb.com/igdb/image/upload/t_1080p/${art.image_id}.jpg`}
												alt=''
											/>
										</div>
									))} */}
										{gameInfo.cover && (
											<div className='gameinfo--cover-img'>
												<img
													src={`https://images.igdb.com/igdb/image/upload/t_1080p/${gameInfo.cover.image_id}.jpg`}
													alt=''
												/>
											</div>
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

										<div>
											{/* {isLoading && <LoadingSpinner />}
					{lists &&
						lists.data.map(list => (
							<ListCard key={list.list_id} list={list} />
						))} */}
											{/* <h2>Game Info</h2> */}
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
															<a className='button--plus row'>
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
