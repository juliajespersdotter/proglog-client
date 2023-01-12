import { useState, useEffect } from 'react'
import { ImCross } from 'react-icons/im'
import { Link } from 'react-router-dom'
import PLDB_API from '../services/PLDB_API'
import { queryClient } from '../main'
import SmallLoadingSpinner from './SmallLoadingSpinner'

//https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/dfgkfivjrhcksyymh9vw.jpg

const ListGameCard = ({ data, list, user }) => {
	const [loading, setLoading] = useState()
	const [coverImg, setCoverImg] = useState('')

	const deleteGame = async () => {
		setLoading(true)
		const res = await PLDB_API.deleteGame(user.userId, list.id, data.id)

		if (res.status === 'success') {
			queryClient.invalidateQueries('games-list')
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
				<Link to={`/game/${data.id}`}>
					<h4 className='button--tertiery'>{data.name}</h4>
				</Link>
				<p>Date Added:</p>
				<p>Date Completed:</p>
				{/* <p>{data.summary}</p> */}
			</div>
			<div className='cross--container'>
				<span onClick={deleteGame} className='cross'>
					{!loading && <ImCross />}
					{loading && <SmallLoadingSpinner />}
				</span>
			</div>
		</div>
	)
}

export default ListGameCard
