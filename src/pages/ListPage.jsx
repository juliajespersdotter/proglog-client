import SideBar from '../components/SideBar'
import SideProfileBar from '../components/SideProfileBar'
import { useParams } from 'react-router-dom'
import useGamesList from '../hooks/useGamesList'
import LoadingSpinner from '../components/LoadingSpinner'
import ListGameCard from '../components/ListGameCard'
import { useAuthContext } from '../contexts/AuthContext'

const ListPage = () => {
	const { currentUser } = useAuthContext()
	const { id } = useParams()
	const { data, isLoading } = useGamesList(id)

	return (
		<div id='container' className='main-content--container'>
			<SideBar />
			<div className='main-content'>
				{data && data.list && <h3>{data.list.list_name}</h3>}
				{isLoading && <LoadingSpinner />}
				<div>
					{data &&
						data.games &&
						data.games.map(game => (
							<ListGameCard
								key={game.id}
								data={game}
								list={data.list}
								user={currentUser}
							/>
						))}
					{data && data.status === 'error' && <p>No games in list</p>}
				</div>
			</div>
			<SideProfileBar />
		</div>
	)
}

export default ListPage
