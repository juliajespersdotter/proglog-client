import { useState, useEffect } from 'react'
import Review from './Review'
import ReviewForm from './ReviewForm'
import useReviews from '../../hooks/useReviews'
import LoadingSpinner from '../Loading/LoadingSpinner'
import { useMutation } from 'react-query'
import PLDB_API from '../../services/PLDB_API'

const ReviewSection = ({ currentUser, game }) => {
	const [toggle, setToggle] = useState(false)
	const [refetchReviews, setRefetchReviews] = useState('')
	const { data: reviews, isLoading, isError, error } = useReviews(game.id)

	useEffect(() => {
		setRefetchReviews(reviews)
	}, [reviews])

	return (
		<div className='reviews'>
			<p className='header--divider'>Reviews</p>
			<button
				className='button button--plus'
				onClick={() => setToggle(!toggle)}
			>
				write a review
			</button>
			{toggle && <ReviewForm user={currentUser} game={game} />}

			{reviews && reviews.data ? (
				reviews.data.map(review => (
					<Review key={review.id} user={currentUser} data={review} />
				))
			) : (
				<p>No reviews yet</p>
			)}
		</div>
	)
}

export default ReviewSection
