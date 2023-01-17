import { useQuery } from 'react-query'
import IGDB_API from '../services/IGDB_API'

const useGamesByGenre = (id, page) => {
	return useQuery(
		['games-by-genre', { id, page }],
		() => IGDB_API.getGamesByGenre(id, page)
		// { keepPreviousData: true }
	)
}

export default useGamesByGenre
