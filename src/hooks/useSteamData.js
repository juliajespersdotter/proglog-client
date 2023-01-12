import { useQuery } from 'react-query'
import PLDB_API from '../services/PLDB_API'
import { useAuthContext } from '../contexts/AuthContext'

const useSteamData = () => {
	const { currentUser } = useAuthContext()
	if (currentUser.steamId !== null) {
		const id = currentUser.steamId
		return useQuery(['steam', { id }], () => PLDB_API.getSteamUserData(id))
	} else {
		return
	}
}

export default useSteamData
