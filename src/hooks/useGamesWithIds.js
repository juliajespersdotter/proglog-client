import { useQuery } from 'react-query'
import IGDB_API from '../services/IGDB_API'

const useGamesWithIds = id => {
	return useQuery(['games-with-ids', { id }], () =>
		IGDB_API.getGamesWithIds(id)
	)
}

export default useGamesWithIds
