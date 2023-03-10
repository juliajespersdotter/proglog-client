import { useEffect } from 'react'
import SideBar from '../components/Navigation/SideBar'
import SideProfileBar from '../components/User/SideProfileBar'
import { useSearchParams, useParams, useNavigate } from 'react-router-dom'
import useSearch from '../hooks/useSearch'
import GameCard from '../components/GameCard'
import LoadingSpinner from '../components/Loading/LoadingSpinner'
import Pagination from '../components/Navigation/Pagination'
import HamburgerMenu from '../components/Navigation/HamburgerMenu'

const SearchPage = ({ currentUser }) => {
	const [searchParams, setSearchParams] = useSearchParams({ page: 0 })
	const page = searchParams.get('page')
		? Number(searchParams.get('page'))
		: null
	const { query } = useParams()
	const { data: result, isLoading } = useSearch(query, page)

	useEffect(() => {
		// scroll to top on page load
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	}, [result])
	return (
		<div id='container' className='search-page main-content--container'>
			<SideBar />
			<HamburgerMenu />
			<div className='main-content'>
				{isLoading && <LoadingSpinner />}
				{!result ||
					(result.status === 'error' && (
						<h3 className='header--divider'>
							No results found for{' '}
							<span className='heading--red'>{query}</span>
						</h3>
					))}
				{result && result.data && (
					<>
						<div className='heading--container'>
							<h3 className='header--divider'>
								Results for{' '}
								<span className='heading--red'>{query}</span>
							</h3>
						</div>

						<div>
							<div className='game-feed'>
								{result.data.map(game => (
									<GameCard
										key={game.id}
										loading={isLoading}
										data={game}
										user={currentUser}
									/>
								))}
							</div>
						</div>

						{result && result.count && result.data && (
							<Pagination
								page={page + 1}
								numPages={Math.ceil(result.count / 20)}
								hasPreviousPage={page !== 0}
								hasNextPage={
									page + 1 !== Math.ceil(result.count / 20)
								}
								onPreviousPage={() =>
									setSearchParams({ page: page - 1 })
								}
								onNextPage={() =>
									setSearchParams({ page: page + 1 })
								}
							/>
						)}
					</>
				)}
			</div>
			<SideProfileBar />
		</div>
	)
}

export default SearchPage
