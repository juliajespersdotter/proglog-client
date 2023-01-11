import { useQuery } from 'react-query'
import User_API from '../services/User_API'
import { useAuthContext } from '../contexts/AuthContext'

const useSteamData = () => {
	const { currentUser } = useAuthContext()
	if (currentUser.steamId !== null) {
		const id = currentUser.steamId
		return useQuery(['steam', { id }], () => User_API.getSteamUserData(id))
	} else {
		return
	}
}

export default useSteamData
