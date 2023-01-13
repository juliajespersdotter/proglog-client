import { useQuery } from 'react-query'
import PLDB_API from '../services/PLDB_API'

const useComments = id => {
	return useQuery(['comments', { id }], () => PLDB_API.getComments(id))
}

export default useComments
