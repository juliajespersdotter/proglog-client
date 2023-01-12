import { useQuery } from 'react-query'
import PLDB_API from '../services/PLDB_API'

const useUser = id => {
	return useQuery(
		['user', { id }],
		() => PLDB_API.getUser(id)
		// { keepPreviousData: true }
	)
}

export default useUser
