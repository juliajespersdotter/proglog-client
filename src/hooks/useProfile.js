import { useQuery } from 'react-query'
import PLDB_API from '../services/PLDB_API'

const useProfile = id => {
	return useQuery(['profile', { id }], () => PLDB_API.getProfile(id))
}

export default useProfile
