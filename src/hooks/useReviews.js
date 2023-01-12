import { useQuery } from 'react-query'
import PLDB_API from '../services/PLDB_API'

const useReviews = id => {
	return useQuery(['reviews', { id }], () => PLDB_API.getReviews(id))
}

export default useReviews
