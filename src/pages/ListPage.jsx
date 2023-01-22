import React from 'react'
import SideBar from '../components/Navigation/SideBar'
import SideProfileBar from '../components/User/SideProfileBar'
import { useParams, Link } from 'react-router-dom'
import useGamesList from '../hooks/useGamesList'
import LoadingSpinner from '../components/Loading/LoadingSpinner'
import ListSorter from '../components/List/ListSorter'
import HamburgerMenu from '../components/Navigation/HamburgerMenu'

const ListPage = ({ currentUser }) => {
	const { id } = useParams()
	const { data, isLoading } = useGamesList(id)

	return (
		<div id='container' className='main-content--container'>
			<SideBar />
			<HamburgerMenu />
			<div className='main-content'>
				{data && data.list && <h3>{data.list.list_name}</h3>}
				{isLoading && <LoadingSpinner />}

				<div>
					{!isLoading && data && data.games && (
						<ListSorter
							list={data.games}
							data={data}
							user={currentUser}
						/>
					)}
					{!isLoading && data && data.status === 'error' && (
						<div className='error'>
							<h2>No games in list</h2>
							<Link to='/browse' className='button button--plus'>
								Explore Genres
							</Link>
						</div>
					)}
				</div>
			</div>
			<SideProfileBar />
		</div>
	)
}

export default ListPage
