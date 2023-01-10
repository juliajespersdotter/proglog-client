import { useQuery } from 'react-query'
import User_API from '../services/User_API'

const useGamesList = id => {
	return useQuery(
		['games-list', { id }],
		() => User_API.getGamesInList(id)
		// { keepPreviousData: true }
	)
}

export default useGamesList
