import { useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import PLDB_API from '../../services/PLDB_API'
import { useQueryClient } from 'react-query'
import SmallLoadingSpinner from '../Loading/SmallLoadingSpinner'

const ReviewForm = ({ user, game }) => {
	const queryClient = useQueryClient()
	const [rating, setRating] = useState(0)
	const [hover, setHover] = useState(0)
	const [loading, setLoading] = useState(0)
	const [error, setError] = useState()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm()

	const onSubmit = async formData => {
		if (!rating) {
			setError('Please rate the game')
			return
		}
		if (formData) {
			setLoading(true)
			const userId = user.userId
			const data = { ...formData, userId, rating, game }
			const res = await PLDB_API.addReview(game.id, data)
			reset()
			console.log(res)

			if (res.status === 'success') {
				queryClient.invalidateQueries('reviews')
				setLoading(false)
			}
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			id='add-review-form'
			className='form--post'
			action='submit'
		>
			{error && <p>{error}</p>}
			<div className='star-rating'>
				{[...Array(5)].map((star, index) => {
					index += 1
					return (
						<button
							type='button'
							key={index}
							className={
								index <= (hover || rating) ? 'on' : 'off'
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
			<input
				required
				{...register('title')}
				autoFocus
				className='inputbox input--large'
				placeholder='TITLE_'
				type='text'
				maxLength={45}
			/>
			<textarea
				required
				{...register('content')}
				rows={10}
				maxLength={65535}
				className='inputbox input--large'
				placeholder='WRITE YOUR REVIEW_'
				type='text'
			/>
			<div className='submit--container'>
				<div className='checkbox--container'>
					{' '}
					<input {...register('hide')} type='checkbox' />
					<label>Hide due to spoilers</label>
				</div>
				{loading ? (
					<SmallLoadingSpinner />
				) : (
					<button type='submit' className='button button--small'>
						Submit <BiPlus />
					</button>
				)}
			</div>
		</form>
	)
}

export default ReviewForm
