import { useState } from 'react'
import Review from './Review'
import ReviewForm from './ReviewForm'
import useReviews from '../../hooks/useReviews'
import LoadingSpinner from '../Loading/LoadingSpinner'

const ReviewSection = ({ currentUser, game }) => {
	const [toggle, setToggle] = useState(false)
	const gameId = game.id
	const { data: reviews, isLoading, isError } = useReviews(gameId)
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

			{isError && <div>Error occurred while fetching reviews</div>}
			{isLoading && <LoadingSpinner />}
			{reviews && reviews.data && reviews.data.length > 0 ? (
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
