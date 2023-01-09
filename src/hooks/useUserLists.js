import { useQuery } from 'react-query'
import User_API from '../services/User_API'

const useUserLists = id => {
	return useQuery(
		['userlists', { id }],
		() => User_API.getUserLists(id)
		// { keepPreviousData: true }
	)
}

export default useUserLists
