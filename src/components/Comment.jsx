import React from 'react'
import useUser from '../hooks/useUser'
import SmallLoadingSpinner from './SmallLoadingSpinner'
import moment from 'moment'

const Comment = ({ data }) => {
	const { data: creator, isLoading } = useUser(data.created_by)
	console.log(creator)

	return (
		<div className='comment--container'>
			{isLoading && <SmallLoadingSpinner />}
			{!isLoading && (
				<>
					<div className='comment--content'>
						<div className='comment--avatar'>
							<img src={creator.data.avatar} />
						</div>
						<div className='comment--text'>
							<div className='comment-row'>
								<p className='comment--username'>
									{creator.data.username}
								</p>
								<p>{data.content}</p>
							</div>
							<p className='date'>
								{moment(data.created_on).format(
									'MMM Do YY, h:mm:ss a'
								)}
							</p>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default Comment
