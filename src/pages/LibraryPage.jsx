import React from 'react'
import ListCard from '../components/ListCard'
import SideBar from '../components/SideBar'
import SideProfileBar from '../components/SideProfileBar'
import { useAuthContext } from '../contexts/AuthContext'
import useUserLists from '../hooks/useUserLists'
import LoadingSpinner from '../components/LoadingSpinner'

const LibraryPage = () => {
	const { currentUser } = useAuthContext()
	const { data: lists, isLoading } = useUserLists(currentUser.userId)
	console.log(lists)

	return (
		<div id='container' className='main-content--container'>
			<SideBar />
			<div className='main-content'>
				<h3>My Games</h3>
				<div>
					{isLoading && <LoadingSpinner />}
					{lists &&
						lists.data.map(list => (
							<ListCard key={list.list_id} list={list} />
						))}
				</div>
			</div>
			<SideProfileBar />
		</div>
	)
}

export default LibraryPage
