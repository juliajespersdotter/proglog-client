import { useQuery } from 'react-query'
import IGDB_API from '../services/IGDB_API'

const useSearch = (query, page) => {
	return useQuery(
		['search', { query, page }],
		() => IGDB_API.search(query, page)
		// { keepPreviousData: true }
	)
}

export default useSearch
