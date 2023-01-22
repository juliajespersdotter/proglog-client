import { useState } from 'react'
import { Link } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import LoadingSpinner from '../Loading/LoadingSpinner'
import { ImCross } from 'react-icons/im'
import { useQueryClient } from 'react-query'
import SmallLoadingSpinner from '../Loading/SmallLoadingSpinner'
import PLDB_API from '../../services/PLDB_API'
import moment from 'moment'
import CommentForm from '../Comment/CommentForm'
import useComments from '../../hooks/useComments'
import Comment from '../Comment/Comment'
import { useAuthContext } from '../../contexts/AuthContext'

const Review = ({ user, data }) => {
	const { currentUser } = useAuthContext()
	const queryClient = useQueryClient()
	const [loading, setLoading] = useState(false)
	const [showReview, setShowReview] = useState(false)
	const { data: author, isLoading } = useUser(data.user_id)
	const { data: comments, isLoading: commentsLoading } = useComments(data.id)
	const [toggle, setToggle] = useState(false)
	const [showComments, setShowComments] = useState(false)

	const deleteReview = async () => {
		setLoading(true)
		const res = await PLDB_API.deleteReview(data.id, user.userId)
		console.log(res)

		if (res.status == 'success') {
			queryClient.invalidateQueries('reviews')
			queryClient.invalidateQueries('profile')
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
								to={`/profile/${author.data.userId}`}
							>
								{author.data.username}
							</Link>
							<span>
								rated{' '}
								<Link to={`/game/${data.game_id}`}>
									{data.game_name}
								</Link>
							</span>
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
							{user && currentUser.userId == data.user_id && (
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
									{data.content.length() > 100 ? (
										<p>
											{showReview
												? data.content
												: `${data.content.substring(
														0,
														100
												  )}`}
											<Link
												className='heading--red'
												onClick={() =>
													setShowReview(!showReview)
												}
											>
												{showReview
													? '... less'
													: '... more'}
											</Link>
										</p>
									) : (
										<p>{data.content}</p>
									)}

									<a onClick={() => setToggle(!toggle)}>
										Hide review
									</a>
								</div>
							)}
							{!toggle && (
								<a onClick={() => setToggle(!toggle)}>
									Hidden due to spoilers{' '}
								</a>
							)}
						</>
					) : (
						<div className='review--content'>
							<h4>{data.title}</h4>
							{data.content.length > 100 ? (
								<p>
									{showReview
										? data.content
										: `${data.content.substring(0, 100)}`}
									<Link
										className='heading--red'
										onClick={() =>
											setShowReview(!showReview)
										}
									>
										{showReview ? '... less' : '... more'}
									</Link>
								</p>
							) : (
								<p>{data.content}</p>
							)}
						</div>
					)}
					<div className='comments--container'>
						<CommentForm review={data} user={user} />
						{comments && comments.data && (
							<a
								onClick={() => {
									setShowComments(!showComments)
								}}
							>
								{!showComments
									? `show comments (${comments.data.length})`
									: 'hide comments'}
							</a>
						)}
						{commentsLoading && <SmallLoadingSpinner />}
						{showComments &&
							comments &&
							comments.data &&
							!commentsLoading && (
								<div className='comments'>
									{commentsLoading ? (
										<LoadingSpinner />
									) : (
										comments.data.map(comment => (
											<Comment
												data={comment}
												user={user.userId}
												key={comment.id}
											/>
										))
									)}
								</div>
							)}
					</div>
				</>
			)}
		</div>
	)
}

export default Review
