import { useEffect, useState } from 'react'

const Profile = ({ user, steamUser }) => {
	const [mostPlayedGames, setMostPlayedGames] = useState()

	const mostPlayed = () => {
		const arr = steamUser.games.sort(
			(a, b) => b.playtime_forever - a.playtime_forever
		)
		return arr
	}

	useEffect(() => {
		if (steamUser) {
			const sortedArray = mostPlayed()
			setMostPlayedGames(sortedArray)
		}
	}, [steamUser])

	return (
		<div className='profile--container dashed-border'>
			<div className='profile--image'>
				<img src={user.avatar} alt='' />
				<div className='profile--info'>
					<h1>{user.username}</h1>
				</div>
			</div>

			{steamUser && (
				<div className='profile--stats'>
					<h4>
						Games on Steam:{' '}
						<span className='heading--red'>
							{steamUser.game_count}
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
	)
}

export default Profile
