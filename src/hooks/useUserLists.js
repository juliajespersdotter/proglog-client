import { useQuery } from 'react-query'
import PLDB_API from '../services/PLDB_API'

const useUserLists = id => {
	return useQuery(['userlists', { id }], () => PLDB_API.getUserLists(id))
}

export default useUserLists
