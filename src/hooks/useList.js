import { useQuery } from 'react-query'
import PLDB_API from '../services/PLDB_API'

const useList = id => {
	return useQuery(['list', { id }], () => PLDB_API.getList(id))
}

export default useList
