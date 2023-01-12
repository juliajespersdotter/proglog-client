import { useState } from 'react'
import useUser from '../hooks/useUser'
import LoadingSpinner from './LoadingSpinner'

const Review = ({ data }) => {
	const { data: user, isLoading } = useUser(data.user_id)
	const [toggle, setToggle] = useState()
	console.log(data)

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
									<img src='./images/icons/arrow-right' />
								</a>
							)}
						</>
					) : (
						<div className='review--content'>
							<h4>{data.title}</h4>
							<p>{data.content}</p>
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default Review
