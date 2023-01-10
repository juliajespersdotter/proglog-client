import { useQuery } from 'react-query'
import User_API from '../services/User_API'

const useSteamData = id => {
	if (id) {
		return useQuery(['steam', { id }], () => User_API.getSteamUserData(id))
	}
}

export default useSteamData
