import { useState } from 'react'
import useUser from '../../hooks/useUser'
import SmallLoadingSpinner from '../Loading/SmallLoadingSpinner'
import moment from 'moment'
import { ImCross } from 'react-icons/im'
import PLDB_API from '../../services/PLDB_API'
import { queryClient } from '../../main'

const Comment = ({ data, user }) => {
	const [loading, setLoading] = useState(false)
	const { data: creator, isLoading } = useUser(data.created_by)
	console.log(creator)

	const deleteComment = async () => {
		setLoading(true)
		const res = await PLDB_API.deleteComment(data.id, user)

		if (res.status === 'success') {
			queryClient.invalidateQueries('comments')
		}
	}

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
						{user && user == data.created_by && (
							<div className='cross--container'>
								<span onClick={deleteComment} className='cross'>
									{!loading && <ImCross />}
									{loading && <SmallLoadingSpinner />}
								</span>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default Comment
