import { useQuery } from 'react-query'
import IGDB_API from '../services/IGDB_API'

const useGamesWithIds = id => {
	return useQuery(
		['gameswithids', { id }],
		() => IGDB_API.getGamesWithIds(id)
		// { keepPreviousData: true }
	)
}

export default useGamesWithIds
