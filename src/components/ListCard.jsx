import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ImCross } from 'react-icons/im'
import SmallLoadingSpinner from './SmallLoadingSpinner'
import User_API from '../services/User_API'
import { queryClient } from '../main'
import { useAuthContext } from '../contexts/AuthContext'

const ListCard = ({ list }) => {
	const [loading, setLoading] = useState()
	const { currentUser } = useAuthContext()
	const deleteList = async () => {
		setLoading(true)
		if (list.deletable) {
			const res = await User_API.deleteList(currentUser.userId, list.id)
			console.log(res)

			if (res.status === 'success') {
				queryClient.invalidateQueries('userlists')
			}
		}
	}
	return (
		<div className='list-card'>
			<div>
				<h4>
					<Link to={`/list/${list.id}`} className='button--tertiery'>
						{list.list_name}
					</Link>
				</h4>
				<p>{list.description}</p>
			</div>
			<div className='cross--container'>
				{list.deletable && (
					<span onClick={deleteList} className='cross'>
						{!loading && <ImCross />}
						{loading && <SmallLoadingSpinner />}
					</span>
				)}
			</div>
		</div>
	)
}

export default ListCard
