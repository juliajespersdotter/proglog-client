import { useQuery } from 'react-query'
import IGDB_API from '../services/IGDB_API'

const useSearch = query => {
	return useQuery(
		['search', { query }],
		() => IGDB_API.search(query)
		// { keepPreviousData: true }
	)
}

export default useSearch
