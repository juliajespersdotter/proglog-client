import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ImCross } from 'react-icons/im'
import SmallLoadingSpinner from '../Loading/SmallLoadingSpinner'
import PLDB_API from '../../services/PLDB_API'
import { useQueryClient } from 'react-query'
import { useAuthContext } from '../../contexts/AuthContext'

const ListCard = ({ list }) => {
	const queryClient = useQueryClient()
	const [loading, setLoading] = useState()
	const { currentUser } = useAuthContext()

	const deleteList = async () => {
		setLoading(true)
		if (list.deletable) {
			const res = await PLDB_API.deleteList(currentUser.userId, list.id)

			if (res.status === 'success') {
				queryClient.invalidateQueries('userlists')
				setLoading(false)
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
				{list.deletable && currentUser.userId == list.user_id && (
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
