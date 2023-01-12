import { useState } from 'react'
import ListCard from '../components/ListCard'
import SideBar from '../components/SideBar'
import SideProfileBar from '../components/SideProfileBar'
import { useAuthContext } from '../contexts/AuthContext'
import useUserLists from '../hooks/useUserLists'
import LoadingSpinner from '../components/LoadingSpinner'
import ListForm from '../components/ListForm'

const LibraryPage = () => {
	const { currentUser } = useAuthContext()
	const [toggle, setToggle] = useState(false)
	const { data: lists, isLoading } = useUserLists(currentUser.userId)

	return (
		<div id='container' className='main-content--container'>
			<SideBar />
			<div className='main-content'>
				<div className='heading--container'>
					<h3>My Games</h3>
					<button
						className='button button--plus'
						onClick={() => setToggle(!toggle)}
					>
						NEW_
					</button>
					{toggle && <ListForm user={currentUser} />}
				</div>
				<div>
					{isLoading && <LoadingSpinner />}
					{lists &&
						lists.data.map(list => (
							<ListCard key={list.id} list={list} />
						))}
				</div>
			</div>
			<SideProfileBar />
		</div>
	)
}

export default LibraryPage
