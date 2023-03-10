import { useEffect, useState } from 'react'
import Review from '../Review/Review'
import PLDB_API from '../../services/PLDB_API'
import { Link } from 'react-router-dom'
import SmallLoadingSpinner from '../Loading/SmallLoadingSpinner'
import LoadingSpinner from '../Loading/LoadingSpinner'

const Profile = ({ user, profile, loggedInUser }) => {
	const [mostPlayedGames, setMostPlayedGames] = useState()
	const [loading, setLoading] = useState(false)
	const [toggle, setToggle] = useState(false)
	const [show, setShow] = useState(false)
	const [steamData, setSteamData] = useState(null)

	const handleImageError = event => {
		event.target.src = './images/default--avatar.png'
	}

	useEffect(() => {
		const getSteamData = async () => {
			setLoading(true)
			const res = await PLDB_API.getSteamUserData(profile.user.steamId)
			setLoading(false)
			setSteamData(res.data)
		}
		if (profile.user.steamId) {
			getSteamData()
		}
	}, [profile])

	const mostPlayed = () => {
		const arr = steamData.games.sort(
			(a, b) => b.playtime_forever - a.playtime_forever
		)
		return arr
	}

	useEffect(() => {
		if (steamData) {
			const sortedArray = mostPlayed()
			setMostPlayedGames(sortedArray)
		}
	}, [steamData])

	return (
		<div className='profile--container dashed-border'>
			<div className='profile--image'>
				{user.avatar && (
					<img src={user.avatar} onError={handleImageError} />
				)}
				<div className='profile--info'>
					<h1>{user.username}</h1>
				</div>
			</div>

			<div className='profile--stats'>
				{loading && <LoadingSpinner />}

				{profile && !loading && (
					<div>
						<button
							onClick={() => setShow(!show)}
							className='button button--wide'
						>
							Lists:{' '}
							<span className='heading--red'>
								{profile.lists.length}
							</span>
						</button>
						{show && (
							<ul>
								{profile.userId == loggedInUser.userId
									? profile.lists.map(list => (
											<li key={list.id}>
												<Link
													to={`/list/${list.id}`}
													className=''
												>
													{list.list_name}
												</Link>
											</li>
									  ))
									: profile.lists
											.filter(list => !list.private)
											.map(list => (
												<li key={list.id}>
													<Link
														to={`/list/${list.id}`}
														className=''
													>
														{list.list_name}
													</Link>
												</li>
											))}
							</ul>
						)}
						<button
							className='button button--wide'
							onClick={() => setToggle(!toggle)}
						>
							Reviews:{' '}
							<span className='heading--red'>
								{profile.reviews.length}
							</span>
						</button>
						{toggle &&
							profile.reviews.map(review => (
								<Review
									key={review.id}
									user={profile.user}
									data={review}
								/>
							))}
					</div>
				)}
				{steamData && !loading && (
					<div>
						<h3 className='header--divider'>Steam Stats</h3>
						<h4>
							Games on Steam:{' '}
							<span className='heading--red'>
								{steamData.game_count}
							</span>
						</h4>
						<h4 className='heading--red'>Most played:</h4>
						{mostPlayedGames &&
							mostPlayedGames.slice(0, 5).map(game => (
								<div key={game.appid} className='profile--list'>
									<p>{game.name}</p>
									<div className='steam--icon'>
										<img
											src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
										/>
									</div>
									<p className='heading--red'>
										{Math.floor(
											Number(game.playtime_forever) / 60
										)}{' '}
										h
									</p>
								</div>
							))}
					</div>
				)}
			</div>
		</div>
	)
}

export default Profile
