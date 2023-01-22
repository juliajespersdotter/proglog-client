import { useQuery } from 'react-query'
import PLDB_API from '../services/PLDB_API'

const useGame = (listId, gameId) => {
	return useQuery(['game-in-list', { gameId, listId }], () =>
		PLDB_API.getGameInList(gameId, listId)
	)
}

export default useGame
