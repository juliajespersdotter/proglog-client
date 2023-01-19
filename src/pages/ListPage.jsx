import SideBar from '../components/Navigation/SideBar'
import SideProfileBar from '../components/User/SideProfileBar'
import { useParams } from 'react-router-dom'
import useGamesList from '../hooks/useGamesList'
import LoadingSpinner from '../components/Loading/LoadingSpinner'
import ListGameCard from '../components/List/ListGameCard'
import { useAuthContext } from '../contexts/AuthContext'

const ListPage = ({ currentUser }) => {
	// const { currentUser } = useAuthContext()
	const { id } = useParams()
	const { data, isLoading } = useGamesList(id)
	// console.log(data)

	return (
		<div id='container' className='main-content--container'>
			<SideBar />
			<div className='main-content'>
				{data && data.list && <h3>{data.list.list_name}</h3>}
				{isLoading && <LoadingSpinner />}
				<div>
					{data &&
						!isLoading &&
						data.games &&
						data.games.map(game => (
							<ListGameCard
								key={game.id}
								data={game}
								list={data.list}
								user={currentUser}
								stats={() =>
									data.list_game.game_id === game.id
										? data.list_game
										: ''
								}
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
