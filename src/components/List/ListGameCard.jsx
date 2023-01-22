import { useState, useEffect } from 'react'
import { ImCross } from 'react-icons/im'
import { Link } from 'react-router-dom'
import PLDB_API from '../../services/PLDB_API'
import { useQueryClient } from 'react-query'
import SmallLoadingSpinner from '../Loading/SmallLoadingSpinner'
import moment from 'moment'

//https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/dfgkfivjrhcksyymh9vw.jpg

const ListGameCard = ({ data, list, user }) => {
	const queryClient = useQueryClient()
	const [loading, setLoading] = useState()
	const [coverImg, setCoverImg] = useState('')

	const deleteGame = async () => {
		setLoading(true)
		const res = await PLDB_API.deleteGame(
			user.userId,
			list.id,
			data.game_id
		)

		if (res.status === 'success') {
			queryClient.invalidateQueries('games-list')
			setLoading(false)
		}
	}

	useEffect(() => {
		if (data.cover) {
			setCoverImg(data.cover)
		} else if (data.screenshots) {
			setCoverImg(data.screenshots[0])
		}
	}, [])
	return (
		<div className='game-card-table'>
			<div className='game-card-table--image'>
				{coverImg && (
					<img
						src={`https://images.igdb.com/igdb/image/upload/t_1080p/${coverImg.image_id}.jpg`}
						alt=''
					/>
				)}
			</div>

			<div className='game-card-table--title'>
				<Link to={`/game/${data.game_id}`}>
					<h4 className='button--tertiery'>{data.name}</h4>
				</Link>
				<p className='date'>
					<span className='heading--red'>Release Date: </span>
					{moment.unix(data.first_release_date).format('L')}
				</p>
				<p className='date'>
					<span className='heading--red'>Date Added: </span>
					{moment(data.date_added).format('L')}
				</p>
			</div>
			{user.userId == list.user_id && (
				<div className='cross--container'>
					<span onClick={deleteGame} className='cross'>
						{!loading && <ImCross />}
						{loading && <SmallLoadingSpinner />}
					</span>
				</div>
			)}
		</div>
	)
}

export default ListGameCard
