import React from 'react'
import useUser from '../hooks/useUser'
import LoadingSpinner from './LoadingSpinner'

const Review = ({ data }) => {
	const { data: user, isLoading } = useUser(data.user_id)
	console.log(user)

	return (
		<div className='review--container'>
			{isLoading && <LoadingSpinner />}
			{!isLoading && (
				<>
					<div className='review--title'>
						<img src={user.data.avatar} />
						<p>
							<a href={`/user/${user.data.id}`}>
								{user.data.username}
							</a>{' '}
							recommends it
						</p>
					</div>
					<h4>{data.title}</h4>
					<p>{data.content}</p>
				</>
			)}
		</div>
	)
}

export default Review
