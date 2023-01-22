import { useState, useEffect } from 'react'
import { ImCross } from 'react-icons/im'
import { FaRegStar } from 'react-icons/fa'
import { BsStarFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import PLDB_API from '../../services/PLDB_API'
import { useQueryClient } from 'react-query'
import SmallLoadingSpinner from '../Loading/SmallLoadingSpinner'
import moment from 'moment'

const ListGameCard = ({ data, list, user }) => {
	const queryClient = useQueryClient()
	const [loading, setLoading] = useState(false)
	const [starLoading, setStarLoading] = useState(false)
	const [rating, setRating] = useState(0)
	const [favorited, setFavorited] = useState(0)
	const [hover, setHover] = useState(0)
	const [coverImg, setCoverImg] = useState('')

	useEffect(() => {
		// console.log(rating)
		if (rating > 0) {
			rateGame(rating)
		}
	}, [rating])

	const deleteGame = async () => {
		setLoading(true)
		const res = await PLDB_API.deleteGame(
			user.userId,
			list.id,
			data.game_id
		)

		if (res.status === 'success') {
			queryClient.invalidateQueries('games-list')
		}
	}

	const favoriteGame = async () => {
		setStarLoading(true)
		if (data.favorited) {
			const res = await PLDB_API.updateGame(data.game_id, list.id, {
				favorited: false,
			})
			if (res.status === 'success') {
				console.log(res.data)

				queryClient.invalidateQueries('games-list')
				// console.log('favorited!')
				setTimeout(() => {
					setStarLoading(false)
				}, 1500)
			}
		} else {
			const res = await PLDB_API.updateGame(data.game_id, list.id, {
				favorited: true,
			})
			if (res.status === 'success') {
				console.log(res.data)

				queryClient.invalidateQueries('games-list')
				// console.log('favorited!')
				setTimeout(() => {
					setStarLoading(false)
				}, 1500)
			}
		}
	}

	const rateGame = async () => {
		const res = await PLDB_API.updateGame(data.game_id, list.id, {
			rating: rating,
		})
		if (res.status === 'success') {
			console.log(res.data)
			console.log('rated', rating)
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
				<div className='title'>
					<Link to={`/game/${data.game_id}`}>
						<h4 className='button--tertiery'>{data.name}</h4>
					</Link>
					{data.favorited && (
						<button
							onClick={favoriteGame}
							className='favorited star-favorite'
						>
							{starLoading ? (
								<SmallLoadingSpinner />
							) : (
								<span>&#9733;</span>
							)}
						</button>
					)}
					{user.userId == list.user_id && !data.favorited && (
						<button
							onClick={favoriteGame}
							className='star-favorite'
						>
							{starLoading ? (
								<SmallLoadingSpinner />
							) : (
								<span>&#9733;</span>
							)}
						</button>
					)}
				</div>
				<p className='date'>
					<span className='heading--red'>Release Date: </span>
					{moment.unix(data.first_release_date).format('L')}
				</p>
				<p className='date'>
					<span className='heading--red'>Date Added: </span>
					{moment(data.date_added).format('L')}
				</p>
			</div>
			{user.userId == list.user_id ? (
				<div className='user-actions'>
					<div className='cross--container'>
						<span onClick={deleteGame} className='cross'>
							{!loading && <ImCross />}
							{loading && <SmallLoadingSpinner />}
						</span>
					</div>

					<div className='star-rating'>
						{[...Array(5)].map((star, index) => {
							index += 1
							return (
								<button
									type='button'
									key={index}
									className={
										index <= (hover || data.rating)
											? 'on'
											: 'off'
									}
									onClick={() => setRating(index)}
									onMouseEnter={() => setHover(index)}
									onMouseLeave={() => setHover(rating)}
								>
									<span className='star'>&#9733;</span>
								</button>
							)
						})}
					</div>
				</div>
			) : (
				[...Array(data.rating)].map((item, index) => (
					<span key={index} className='star'>
						&#9733;
					</span>
				))
			)}
		</div>
	)
}

export default ListGameCard
