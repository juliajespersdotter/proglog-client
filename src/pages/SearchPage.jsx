import React from 'react'
import SideBar from '../components/Navigation/SideBar'
import SideProfileBar from '../components/User/SideProfileBar'
import { useSearchParams, useParams, useNavigate } from 'react-router-dom'
import useSearch from '../hooks/useSearch'
import { useAuthContext } from '../contexts/AuthContext'
import GameCard from '../components/GameCard'
import useUserLists from '../hooks/useUserLists'
import LoadingSpinner from '../components/Loading/LoadingSpinner'

const SearchPage = () => {
	const { query } = useParams()
	const { currentUser } = useAuthContext()
	const { data: result, isLoading } = useSearch(query)
	const { data: lists } = useUserLists(currentUser.userId)
	return (
		<div id='container' className='search-page main-content--container'>
			<SideBar />
			<div className='main-content'>
				<div className='heading--container'>
					{result && result.data && (
						<h3 className='header--divider'>
							Results for{' '}
							<span className='heading--red'>{query}</span>
						</h3>
					)}
					{!result ||
						(result.status === 'error' && (
							<h3 className='header--divider'>
								No results found for{' '}
								<span className='heading--red'>{query}</span>
							</h3>
						))}
				</div>
				{isLoading && <LoadingSpinner />}

				<div>
					<div className='game-feed'>
						{result &&
							result.data &&
							result.data.map(game => (
								<GameCard
									key={game.id}
									loading={isLoading}
									data={game}
									lists={lists}
									user={currentUser}
								/>
							))}
					</div>
				</div>
			</div>
			<SideProfileBar />
		</div>
	)
}

export default SearchPage
