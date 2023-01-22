import React from 'react'
import { useSearchParams, useParams, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/Loading/LoadingSpinner'
import SideBar from '../components/Navigation/SideBar'
import SideProfileBar from '../components/User/SideProfileBar'
import useGamesByGenre from '../hooks/useGamesByGenre'
import GameCard from '../components/GameCard'
import Pagination from '../components/Navigation/Pagination'
import HamburgerMenu from '../components/Navigation/HamburgerMenu'

const GenrePage = ({ currentUser }) => {
	const { id } = useParams()
	const { genre } = useParams()
	const [searchParams, setSearchParams] = useSearchParams({ page: 0 })
	const page = searchParams.get('page')
		? Number(searchParams.get('page'))
		: null
	const { data: games, isLoading } = useGamesByGenre(id, page)

	return (
		<div id='container' className='main-content--container'>
			<SideBar />
			<HamburgerMenu />
			<div className='main-content genres'>
				<h2 className='heading--red'>
					{genre.toUpperCase().replaceAll('-', ' ')}
				</h2>
				{isLoading && <LoadingSpinner />}
				{games && games.data && !isLoading && (
					<div>
						<div className='game-feed'>
							{games.data.map(game => (
								<GameCard
									key={game.id}
									data={game}
									user={currentUser}
								/>
							))}
						</div>

						<Pagination
							page={page + 1}
							numPages={Math.ceil(games.count / 20)}
							hasPreviousPage={page !== 0}
							hasNextPage={
								page + 1 !== Math.ceil(games.count / 20)
							}
							onPreviousPage={() =>
								setSearchParams({ page: page - 1 })
							}
							onNextPage={() =>
								setSearchParams({ page: page + 1 })
							}
						/>
					</div>
				)}
			</div>
			<SideProfileBar currentUser={currentUser} />
		</div>
	)
}

export default GenrePage
