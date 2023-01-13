import { useState } from 'react'
import { Link } from 'react-router-dom'
import useUser from '../hooks/useUser'
import LoadingSpinner from './LoadingSpinner'
import { ImCross } from 'react-icons/im'
import { queryClient } from '../main'
import SmallLoadingSpinner from './SmallLoadingSpinner'
import PLDB_API from '../services/PLDB_API'
import moment from 'moment'
import CommentForm from './CommentForm'
import useComments from '../hooks/useComments'

const Review = ({ user, data }) => {
	// const { currentUser } = useAuthContext()
	const [loading, setLoading] = useState()
	const { data: author, isLoading } = useUser(data.user_id)
	const { data: comments } = useComments(data.id)
	console.log(comments)
	const [toggle, setToggle] = useState(false)
	const [showComments, setShowComments] = useState(false)

	const deleteReview = async () => {
		setLoading(true)
		const res = await PLDB_API.deleteReview(data.id, user.userId)

		if (res.status === 'success') {
			queryClient.invalidateQueries('reviews')
		}
	}

	return (
		<div className='review--container'>
			{isLoading && <LoadingSpinner />}
			{!isLoading && (
				<>
					<div className='review--title'>
						<div className='review--rating'>
							<div className='review--avatar'>
								<img src={author.data.avatar} />
							</div>
							<Link
								className='author-link'
								to={`/user/${author.data.userId}`}
							>
								{author.data.username}
							</Link>
							<span>rated it</span>
							<div className='review--stars'>
								{[...Array(data.rating)].map((item, index) => (
									<span key={index} className='star'>
										&#9733;
									</span>
								))}
							</div>
						</div>
						<div className='date-cross'>
							<p className='date'>
								{moment(data.created_on).format(
									'MMMM Do YYYY, h:mm:ss a'
								)}
							</p>
							{user && user.userId == data.user_id && (
								<div className='cross--container'>
									<span
										onClick={deleteReview}
										className='cross'
									>
										{!loading && <ImCross />}
										{loading && <SmallLoadingSpinner />}
									</span>
								</div>
							)}
						</div>
					</div>
					{data.hide ? (
						<>
							{toggle && (
								<div className='review--content'>
									<h4>{data.title}</h4>
									<p>{data.content}</p>

									<a onClick={() => setToggle(!toggle)}>
										Hide review
									</a>
								</div>
							)}
							{!toggle && (
								<a onClick={() => setToggle(!toggle)}>
									Hidden due to spoilers{' '}
									{/* <img src='./images/icons/arrow-right' /> */}
								</a>
							)}
						</>
					) : (
						<div className='review--content'>
							<h4>{data.title}</h4>
							<p>{data.content}</p>
						</div>
					)}
					{comments && (
						<div>
							<a
								onClick={() => {
									setShowComments(!showComments)
								}}
							>
								Show comments ({comments.data.length})
							</a>
							<CommentForm review={data} user={user} />
							{showComments &&
								comments.data.map(comment => (
									<p key={comment.id}>{comment.content}</p>
								))}
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default Review
