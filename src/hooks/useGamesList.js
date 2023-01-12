import { useQuery } from 'react-query'
import PLDB_API from '../services/PLDB_API'

const useGamesList = id => {
	return useQuery(
		['games-list', { id }],
		() => PLDB_API.getGamesInList(id)
		// { keepPreviousData: true }
	)
}

export default useGamesList
