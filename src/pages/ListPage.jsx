import React from 'react'
import SideBar from '../components/Navigation/SideBar'
import SideProfileBar from '../components/User/SideProfileBar'
import { useParams } from 'react-router-dom'
import useGamesList from '../hooks/useGamesList'
import LoadingSpinner from '../components/Loading/LoadingSpinner'
import ListSorter from '../components/List/ListSorter'

const ListPage = ({ currentUser }) => {
	const { id } = useParams()
	const { data, isLoading } = useGamesList(id)

	return (
		<div id='container' className='main-content--container'>
			<SideBar />
			<div className='main-content'>
				{data && data.list && <h3>{data.list.list_name}</h3>}
				{isLoading && <LoadingSpinner />}

				<div>
					{!isLoading && (
						<ListSorter
							list={data.games}
							data={data}
							user={currentUser}
						/>
					)}
					{data && data.status === 'error' && <p>No games in list</p>}
				</div>
			</div>
			<SideProfileBar />
		</div>
	)
}

export default ListPage
