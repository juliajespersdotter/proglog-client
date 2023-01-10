import { useQuery } from 'react-query'
import User_API from '../services/User_API'

const useList = id => {
	return useQuery(
		['list', { id }],
		() => User_API.getList(id)
		// { keepPreviousData: true }
	)
}

export default useList
