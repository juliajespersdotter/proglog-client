import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DropdownMenu from './DropdownMenu'
import SmallLoadingSpinner from './Loading/SmallLoadingSpinner'

//https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/dfgkfivjrhcksyymh9vw.jpg

const GameCard = ({ data, user }) => {
	const [coverImg, setCoverImg] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		if (data.cover) {
			setCoverImg(data.cover)
		} else if (data.screenshots) {
			setCoverImg(data.screenshots[0])
		} else if (data.artworks) {
			setCoverImg(data.artworks[0])
		}
		setLoading(false)
	}, [])
	return (
		<div className='game-card'>
			{loading && <SmallLoadingSpinner />}
			{!loading && (
				<>
					<div className='game-card--image'>
						<Link to={`/game/${data.id}`}>
							{coverImg && (
								<img
									src={`https://images.igdb.com/igdb/image/upload/t_1080p/${coverImg.image_id}.jpg`}
									alt=''
								/>
							)}
							{!coverImg && <p>{data.name}</p>}
						</Link>
					</div>
					<DropdownMenu user={user} game={data} />
				</>
			)}
		</div>
	)
}

export default GameCard
